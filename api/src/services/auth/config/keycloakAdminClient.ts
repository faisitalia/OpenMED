import KcAdminClient from '@keycloak/keycloak-admin-client'
import https from 'https'

import { Issuer } from 'openid-client'

// TODO only in dev
https.globalAgent.options.rejectUnauthorized = false

const BASE_URL = 'https://127.0.0.1:8443'

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config()
// TODO set env variables for master admin user

export class KeycloakAdminClientImpl {
  private static instance: KcAdminClient

  // Authorize with username / password
  private static async authorizeClient() {
    try {
      const keycloakIssuer = await Issuer.discover(`${BASE_URL}/realms/master`)

      const client = new keycloakIssuer.Client({
        client_id: 'admin-cli', // Same as `clientId` passed to client.auth()
        token_endpoint_auth_method: 'none', // to send only client_id in the header
      })

      // Use the grant type 'password'
      let tokenSet = await client.grant({
        grant_type: 'password',
        username: 'admin',
        password: 'admin',
      })
      KeycloakAdminClientImpl.instance.setAccessToken(tokenSet.access_token ?? '')

      // Periodically using refresh_token grant flow to get new access token here
      setInterval(async () => {
        const refreshToken = tokenSet.refresh_token
        tokenSet = await client.refresh(refreshToken ?? '')
        KeycloakAdminClientImpl.instance.setAccessToken(tokenSet.access_token ?? '')
      }, 58 * 1000) // 58 seconds
    } catch (error) {
      throw new Error('Error in keycloak admin client: ' + error)
    }
  }

  /**
   *
   */
  public static async getInstance() {
    if (!KeycloakAdminClientImpl.instance) {
      console.log('Creating keycloak admin client instance....')
      KeycloakAdminClientImpl.instance = new KcAdminClient({
        baseUrl: BASE_URL,
        requestConfig: {
          httpsAgent: new https.Agent({
            rejectUnauthorized: false,
          }),
        },
      })

      await KeycloakAdminClientImpl.authorizeClient()

      // Override client configuration for all further requests:
      KeycloakAdminClientImpl.instance.setConfig({
        realmName: 'OpenMED',
      })
    }

    return KeycloakAdminClientImpl.instance
  }
}
