import request from 'supertest'
import { constants } from 'http2'

import { app } from '../../../app'
import { getUserInfo } from '../../../services/auth'

it('clears the session after signing out', async () => {
  const accessToken = global.signin()

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
})
