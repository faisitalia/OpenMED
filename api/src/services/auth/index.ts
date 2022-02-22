import UserRepresentation from '@keycloak/keycloak-admin-client/lib/defs/userRepresentation'
import { TokenResponse } from '@keycloak/keycloak-admin-client/lib/utils/auth'
import axios from 'axios'
import url from 'url'
import { KeycloakAdminClientImpl } from './config/keycloakAdminClient'
import { getOpenIDConnectURI } from './config/openid-connect'

/**
 *
 * @param username
 * @param email
 * @param password
 * @returns
 */
async function createUser(username: string, email: string, password: string) {
  const kcAdminClient = await KeycloakAdminClientImpl.getInstance()

  const { id: userId } = await kcAdminClient.users.create({
    username,
    email,
    enabled: true,
  })

  await kcAdminClient.users.resetPassword({
    id: userId!,
    credential: {
      temporary: false,
      type: 'password',
      value: password,
    },
  })

  return userId
}

/**
 *
 * @param id
 * @returns
 */
async function getUserById(id: string) {
  const kcAdminClient = await KeycloakAdminClientImpl.getInstance()
  return kcAdminClient.users.findOne({
    id,
  })
}

/**
 *
 * @param email
 * @returns
 */
async function getUserByEmail(email: string) {
  const kcAdminClient = await KeycloakAdminClientImpl.getInstance()
  const user = await kcAdminClient.users.find({
    email,
  })

  if (user && user[0]) return user[0]

  return null
}

/**
 *
 * @param userId
 * @returns
 */
async function deleteUserById(userId: string) {
  const kcAdminClient = await KeycloakAdminClientImpl.getInstance()
  return kcAdminClient.users.del({
    id: userId!,
  })
}

/**
 *
 * @param username
 * @param password
 * @returns
 */
async function getAuthToken(username: string, password: string): Promise<TokenResponse> {
  // Construct URL
  const kcAdminClient = await KeycloakAdminClientImpl.getInstance()
  const openidURI = getOpenIDConnectURI(kcAdminClient)

  // Prepare credentials for openid-connect token request
  // ref: http://openid.net/specs/openid-connect-core-1_0.html#TokenEndpoint
  const payload = new url.URLSearchParams({
    username: username,
    password: password,
    grant_type: 'password',
    client_id: process.env.OPENID_CLIENT_ID,
    client_secret: process.env.OPENID_CLIENT_SECRET,
  })

  // console.log('openid URI', openidURI)
  // console.log('payload', payload)

  const { data } = await axios.post(`${openidURI}/token`, payload.toString())
  return data
}

/**
 *
 * @param accessToken
 * @returns
 */
async function getUserInfo(accessToken: string) {
  const kcAdminClient = await KeycloakAdminClientImpl.getInstance()
  const openidURI = getOpenIDConnectURI(kcAdminClient)

  if (!accessToken) throw 'Access token is invalid!'

  try {
    const { data } = await axios.get(`${openidURI}/userinfo`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    return data
  } catch (error: any) {
    throw error.response.data.error_description
  }
}

/**
 *
 * @param userId
 * @returns
 */
async function logout(userId: string) {
  const kcAdminClient = await KeycloakAdminClientImpl.getInstance()
  await kcAdminClient.users.logout({ id: userId! })
}

/**
 *
 * @param roleName
 * @param user
 */
async function assignRoleToUser(roleName: string, user: UserRepresentation) {
  const kcAdminClient = await KeycloakAdminClientImpl.getInstance()
  const role = await kcAdminClient.roles.findOneByName({
    name: roleName,
  })

  if (!role) throw new Error(`The role ${roleName} is not available!`)

  const clientId = process.env.OPENID_CLIENT_ID!
  const clients = await kcAdminClient.clients.find({ clientId })

  const response = await kcAdminClient.users.addClientRoleMappings({
    id: user.id!,
    clientUniqueId: clients[0].id!,

    // at least id and name should appear
    roles: [
      {
        id: role.id!,
        name: role.name!,
      },
    ],
  })
  console.log(response)
}

export {
  createUser,
  getUserById,
  deleteUserById,
  getUserByEmail,
  getAuthToken,
  assignRoleToUser,
  getUserInfo,
  logout,
}
