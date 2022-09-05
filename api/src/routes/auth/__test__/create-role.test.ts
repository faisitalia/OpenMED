import request from 'supertest'
import { constants } from 'http2'

import { app } from '../../../app'
import { assignRoleToUser, deleteRoleByRoleName, deleteUserById } from '../../../services/auth'
import { Role } from '../../../models/user'

it('returns a 200 on successful role creation', async () => {
  const username = 'john-role'
  const email = 'user-role@test.com'
  const password = 'password'
  const firstname = 'john'
  const lastname = 'doe'
  const birthdate = new Date()

  // signup
  const user = await global.signup(username, email, password, firstname, lastname, birthdate)
  const userId = user.id ?? ''

  await assignRoleToUser(Role.SUPER_ADMIN, userId)

  // get auth token
  const accessToken = await global.signin(username, password)

  const roleName = 'myRole'
  const { body: role } = await request(app)
    .post('/v1/roles')
    .set('Authorization', `Bearer ${accessToken}`)
    .send({
      name: roleName
    })
    .expect(constants.HTTP_STATUS_CREATED)

  expect(role).toBeDefined()
  expect(role.roleName).toStrictEqual(roleName)

  await deleteRoleByRoleName(roleName)
  await deleteUserById(userId)
})
