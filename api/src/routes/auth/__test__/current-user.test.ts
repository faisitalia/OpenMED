import request from 'supertest'
import { constants } from 'http2'

import { app } from '../../../app'

it('responds with details about the current user', async () => {
  const accessToken = global.signin()

  const response = await request(app)
    .get('/v1/users/currentuser')
    .set('Authorization', `Bearer ${accessToken}`)
    .send()
    .expect(constants.HTTP_STATUS_OK)

  expect(response.body.currentUser.email).toEqual('test@test.com')
})

it('responds with null if not authenticated', async () => {
  const response = await request(app)
    .get('/v1/users/currentuser')
    .send()
    .expect(constants.HTTP_STATUS_OK)

  expect(response.body.currentUser).toEqual(null)
})
