// https://github.com/keycloak/keycloak-nodejs-admin-client/blob/main/test/users.spec.ts

import KcAdminClient from '@keycloak/keycloak-admin-client'
import https from 'https'

https.globalAgent.options.rejectUnauthorized = false

const kcAdminClient = new KcAdminClient({
  baseUrl: 'https://127.0.0.1:8443/auth',
  requestConfig: {
    httpsAgent: new https.Agent({
      rejectUnauthorized: false,
    }),
  },
})

// Authorize with username / password
async function authorizeClient() {
  await kcAdminClient.auth({
    username: 'admin',
    password: 'admin',
    grantType: 'password',
    clientId: 'admin-cli',
    // totp: '123456', // optional Time-based One-time Password if OTP is required in authentication flow
  })
}
authorizeClient()

// Override client configuration for all further requests:
kcAdminClient.setConfig({
  realmName: 'OpenMED',
})

export { kcAdminClient }
