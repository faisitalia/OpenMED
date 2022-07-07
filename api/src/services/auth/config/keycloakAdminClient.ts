import KcAdminClient from '@keycloak/keycloak-admin-client'
import https from 'https'

// TODO only in dev
https.globalAgent.options.rejectUnauthorized = false

export class KeycloakAdminClientImpl {
  private static instance: KcAdminClient

  // Authorize with username / password
  private static async authorizeClient() {
    await KeycloakAdminClientImpl.instance.auth({
      username: 'admin',
      password: 'admin',
      grantType: 'password',
      clientId: 'admin-cli',
      // totp: '123456', // optional Time-based One-time Password if OTP is required in authentication flow
    })

    // Override client configuration for all further requests:
    KeycloakAdminClientImpl.instance.setConfig({
      realmName: 'OpenMED',
    })
  }

  /**
   *
   */
  public static async getInstance() {
    if (!KeycloakAdminClientImpl.instance) {
      // console.log('Creating keycloak admin client instance....')
      KeycloakAdminClientImpl.instance = new KcAdminClient({
        baseUrl: 'https://127.0.0.1:8443',
        requestConfig: {
          httpsAgent: new https.Agent({
            rejectUnauthorized: false,
          }),
        },
      })

      // console.log('Authorizing keycloak admin client....')
      await KeycloakAdminClientImpl.authorizeClient()
    }

    return KeycloakAdminClientImpl.instance
  }
}
