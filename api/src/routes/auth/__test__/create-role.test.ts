import request from 'supertest'
import { constants } from 'http2'

import { app } from '../../../app'
import { deleteRoleByRoleName } from '../../../services/auth'

it('returns a 200 on successful role creation', async () => {
  const roleName = 'myRole'
  const { body: role } = await request(app)
    .post('/v1/roles')
    .send({
      name: roleName,
    })
    .expect(constants.HTTP_STATUS_CREATED)

  expect(role).toBeDefined()
  expect(role.roleName).toStrictEqual(roleName)

  await deleteRoleByRoleName(roleName)
})
