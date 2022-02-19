// https://github.com/keycloak/keycloak-nodejs-admin-client/blob/main/test/users.spec.ts
import Keycloak from 'keycloak-connect'
import https from 'https'

import { MemoryStore } from '../../../session-store'

https.globalAgent.options.rejectUnauthorized = false

// Provide the session store to the Keycloak so that sessions
// can be invalidated from the Keycloak console callback.
//
// Additional configuration is read from keycloak.json file
// installed from the Keycloak web console.
export class KcConnect {
  private static instance: Keycloak.Keycloak

  private constructor() {}

  public static getInstance(): Keycloak.Keycloak {
    if (!KcConnect.instance) {
      // Create a session-store to be used by both the express-session
      // middleware and the keycloak middleware.
      KcConnect.instance = new Keycloak({
        store: MemoryStore.getInstance(),
      })
    }

    return KcConnect.instance
  }
}
