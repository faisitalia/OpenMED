import { TokenResponse } from '@keycloak/keycloak-admin-client/lib/utils/auth'
import axios from 'axios'
import url from 'url'
import { NotAuthorizedError } from '../../common'
import { Person, PersonDoc } from '../../models/person'
import { KeycloakAdminClientImpl } from './config/keycloakAdminClient'
import { getOpenIDConnectURI } from './config/openid-connect'


async function createUser(
  firstname: string, 
  lastname: string, 
  birthdate: Date,
  username: string,
  email: string,
  password: string,
  role: string,
  attributes: Object = {}
) {

  const personDoc = Person.build({ firstname, lastname, birthdate, username })
  await personDoc.save()

  const kcAdminClient = await KeycloakAdminClientImpl.getInstance()

  const { id: userId } = await kcAdminClient.users.create({
    username,
    email,
    enabled: true,
    attributes,
  })

  await kcAdminClient.users.resetPassword({
    id: userId!,
    credential: {
      temporary: false,
      type: 'password',
      value: password,
    },
  })

  await assignRoleToUser(role, userId)

  return userId
}

/**
 *
 * @param id
 * @returns
 */
async function getUserById(id: string) {
  const kcAdminClient = await KeycloakAdminClientImpl.getInstance()
  const user = await kcAdminClient.users.findOne({
    id,
  })

  if (!user) throw new Error(`No user available with id: ${id}`)

  const roles = await kcAdminClient.users.listRealmRoleMappings({
    id: id,
  })

  const person = await Person.find({username : user.username})

  return {
    id: user.id,
    username: user.username,
    email: user.email,
    roles: roles,
    attributes: user.attributes,
    person: person
  }
}

/**
 *
 * @param email
 * @returns
 */
async function getUserByEmail(email: string) {
  try {
    const kcAdminClient = await KeycloakAdminClientImpl.getInstance()
    const user = await kcAdminClient.users.find({
      email,
    })

    if (user && user[0]) return user[0]
  } catch (error) {
    console.log(error)
    throw new Error(`Error trying to get user data for user ${email}`)
  }
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

  try {
    const { data } = await axios.post(`${openidURI}/token`, payload.toString())
    return data
  } catch (error) {
    throw new NotAuthorizedError('Not Authorized: the credentials could be wrong')
  }
}

/**
 *
 * @returns
 */
async function refreshAuthToken(
  username: string,
  password: string,
  refreshToken: string
): Promise<TokenResponse> {
  // Construct URL
  const kcAdminClient = await KeycloakAdminClientImpl.getInstance()
  const openidURI = getOpenIDConnectURI(kcAdminClient)

  // Prepare credentials for openid-connect token request
  // ref: http://openid.net/specs/openid-connect-core-1_0.html#TokenEndpoint
  const payload = new url.URLSearchParams({
    refresh_token: refreshToken,
    username: username,
    password: password,
    grant_type: 'password',
    client_id: process.env.OPENID_CLIENT_ID,
    client_secret: process.env.OPENID_CLIENT_SECRET,
  })

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

  if (!accessToken) throw new Error('Access token is invalid!')

  try {
    const { data } = await axios.get(`${openidURI}/userinfo`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })

    const currentUser = await getUserByEmail(data.email)
    if (!currentUser) throw new Error(`No user available with email: ${data.email}`)

    if (currentUser.id && currentUser.username && currentUser.email) {
      const roles = await kcAdminClient.users.listRealmRoleMappings({
        id: currentUser.id,
      })

      return {
        id: currentUser.id,
        username: currentUser.username,
        email: currentUser.email,
        roles: roles,
        errorDescription: data.error_description,
      }
    } else {
      throw new Error(`id or username or email not available: ${currentUser}`)
    }
  } catch (error: any) {
      throw new Error(error)   
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
async function assignRoleToUser(roleName: string, userId: string) {
  const kcAdminClient = await KeycloakAdminClientImpl.getInstance()
  const role = await kcAdminClient.roles.findOneByName({
    name: roleName,
  })

  if (!role) throw new Error(`The role ${roleName} is not available!`)

  // const clientId = process.env.OPENID_CLIENT_ID!
  // const clients = await kcAdminClient.clients.find({ clientId })
  // kcAdminClient.users.addClientRoleMapping
  await kcAdminClient.users.addRealmRoleMappings({
    id: userId!,
    // clientUniqueId: clients[0].id!,

    // at least id and name should appear
    roles: [
      {
        id: role.id!,
        name: role.name!,
      },
    ],
  })
}

async function createRole(roleName: string) {
  const kcAdminClient = await KeycloakAdminClientImpl.getInstance()

  const createdRole = await kcAdminClient.roles.create({
    name: roleName,
  })

  return createdRole
}

async function findRoleByRoleName(roleName: string) {
  const kcAdminClient = await KeycloakAdminClientImpl.getInstance()

  const role = await kcAdminClient.roles.findOneByName({ name: roleName })

  return role
}

async function deleteRoleByRoleName(roleName: string) {
  const kcAdminClient = await KeycloakAdminClientImpl.getInstance()

  await kcAdminClient.roles.delByName({ name: roleName })
}

export {
  createUser,
  getUserById,
  deleteUserById,
  getUserByEmail,
  getAuthToken,
  refreshAuthToken,
  getUserInfo,
  logout,
  createRole,
  findRoleByRoleName,
  deleteRoleByRoleName,
  assignRoleToUser,
}
