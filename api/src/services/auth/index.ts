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

export { createUser, getUserById, deleteUserById, getUserByEmail }
