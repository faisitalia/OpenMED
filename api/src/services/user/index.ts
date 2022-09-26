import axios from 'axios'

import { Person } from '../../models/person'
import { assignRoleToUser } from '../auth'
import { KeycloakAdminClientImpl } from '../auth/config/keycloakAdminClient'
import { getOpenIDConnectURI } from '../auth/config/openid-connect'

/**
 *
 * @param firstname
 * @param lastname
 * @param birthdate
 * @param username
 * @param email
 * @param password
 * @param role
 * @param attributes
 * @returns
 */
async function createUser(
  firstname: string,
  lastname: string,
  birthdate: Date,
  username: string,
  email: string,
  password: string,
  role: string,
  attributes = {}
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

  const person = await Person.findOne({ username: user.username })

  return {
    id: user.id,
    username: user.username,
    email: user.email,
    roles: roles,
    attributes: user.attributes,
    person: person,
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
 * @param facilityId
 * @param role
 * @returns
 */
async function getAllUsers(facilityId = undefined, role = undefined) {
  const kcAdminClient = await KeycloakAdminClientImpl.getInstance()
  const users = await kcAdminClient.users.find()

  const allUsers = []

  for (const user of users) {
    if (user.id) {
      const roles = await kcAdminClient.users.listRealmRoleMappings({
        id: user.id,
      })
      const person = await Person.findOne({ username: user.username })

      const userToAdd = {
        id: user.id,
        username: user.username,
        email: user.email,
        roles: roles,
        attributes: user.attributes,
        person: person,
      }
      allUsers.push(userToAdd)
    }
  }

  return allUsers
}

export { createUser, getUserById, deleteUserById, getUserByEmail, getUserInfo, getAllUsers }
