import {
  Settings,
  TokenResponse,
  TokenResponseRaw,
} from '@keycloak/keycloak-admin-client/lib/utils/auth'
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

// export const getToken = async (settings: Settings): Promise<TokenResponse> => {
//   // Construct URL
//   const baseUrl = kcAdminClient.baseUrl
//   const realmName = kcAdminClient.realmName
//   const url = `${baseUrl}/realms/${realmName}/protocol/openid-connect/token`

//   // Prepare credentials for openid-connect token request
//   // ref: http://openid.net/specs/openid-connect-core-1_0.html#TokenEndpoint
//   const credentials = settings.credentials || ({} as any)
//   const payload = querystring.stringify({
//     username: credentials.username,
//     password: credentials.password,
//     grant_type: credentials.grantType,
//     client_id: credentials.clientId,
//     totp: credentials.totp,
//     ...(credentials.offlineToken ? { scope: 'offline_access' } : {}),
//     ...(credentials.refreshToken
//       ? {
//           refresh_token: credentials.refreshToken,
//           client_secret: credentials.clientSecret,
//         }
//       : {}),
//   })

//   const config: AxiosRequestConfig = {
//     ...settings.requestConfig,
//   }

//   if (credentials.clientSecret) {
//     config.auth = {
//       username: credentials.clientId,
//       password: credentials.clientSecret,
//     }
//   }

//   const { data } = await axios.post<any, AxiosResponse<TokenResponseRaw>(url, payload, config)
//   return camelize(data)
// }

export { createUser, getUserById, deleteUserById, getUserByEmail }
