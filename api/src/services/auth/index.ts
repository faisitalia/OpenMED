import {
  Settings,
  TokenResponse,
  TokenResponseRaw,
} from '@keycloak/keycloak-admin-client/lib/utils/auth'
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import url from 'url'

import { kcAdminClient } from '../../services/auth/config/keycloak'

/**
 *
 * @param username
 * @param email
 * @param password
 * @returns
 */
async function createUser(username: string, email: string, password: string) {
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
  const baseUrl = kcAdminClient.baseUrl
  const realmName = kcAdminClient.realmName
  const uri = `${baseUrl}/realms/${realmName}/protocol/openid-connect/token`

  // Prepare credentials for openid-connect token request
  // ref: http://openid.net/specs/openid-connect-core-1_0.html#TokenEndpoint
  const payload = new url.URLSearchParams({
    username: username,
    password: password,
    grant_type: 'password',
    client_id: 'openmed-client',
    client_secret: 'Z4Q7mLVDqcbcLXueTCGC1efoMSLAJVGv',
  })

  const { data } = await axios.post(uri, payload.toString())

  return data
}

export { createUser, getUserById, deleteUserById, getUserByEmail, getAuthToken }
