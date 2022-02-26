import request from 'supertest'
import { constants } from 'http2'

import { app } from '../../../app'
import { deleteUserById } from '../../../services/auth'

it('responds with a refresh token when given valid refresh token', async () => {
  const { body: user } = await request(app)
    .post('/v1/users/signup')
    .send({
      username: 'john',
      email: 'john@test.com',
      password: 'password',
      firstname: 'John',
      lastname: 'Doe',
      birthdate: new Date(),
    })
    .expect(constants.HTTP_STATUS_CREATED)

  const { body: login } = await request(app)
    .post('/v1/users/signin')
    .send({
      username: 'john',
      password: 'password',
    })
    .expect(constants.HTTP_STATUS_OK)

  const refreshToken = login.refresh_token

  const { body: newToken } = await request(app)
    .post('/v1/users/refreshToken')
    .send({
      username: 'john',
      password: 'password',
      refreshToken,
    })
    .expect(constants.HTTP_STATUS_OK)

  expect(newToken.access_token).toBeDefined()
  expect(newToken.access_token).not.toBe(login.access_token)

  await deleteUserById(user.id)
})
