import request from 'supertest'
import { constants } from 'http2'

import { app } from '../../../app'
import { deleteUserById, getUserInfo } from '../../../services/auth'

it('clears the session after signing out', async () => {
  const username = 'john1'
  const email = 'user-session@test.com'
  const password = 'password'

  const { body: user } = await request(app)
    .post('/v1/users/signup')
    .send({
      username,
      email,
      password,
      firstname: 'John',
      lastname: 'Doe',
      birthdate: new Date(),
    })
    .expect(constants.HTTP_STATUS_CREATED)

  const accessToken = await global.signin(username, password)

  // logout
  await request(app)
    .post('/v1/users/signout')
    .set('Authorization', `Bearer ${accessToken}`)
    .send({})
    .expect(constants.HTTP_STATUS_OK)

  // try to get hthe user info with the previous access token
  try {
    await getUserInfo(accessToken)
  } catch (error) {
    expect(error).toBe(`User session not found or doesn't have client attached on it`)
  }

  await deleteUserById(user.id)
})
