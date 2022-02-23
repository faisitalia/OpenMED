import KeycloakAdminClient from '@keycloak/keycloak-admin-client'

export function getOpenIDConnectURI(keycloakAdminClient: KeycloakAdminClient) {
  // set openid connect URI
  const baseUrl = keycloakAdminClient.baseUrl
  const realmName = keycloakAdminClient.realmName
  return `${baseUrl}/realms/${realmName}/protocol/openid-connect`
}
