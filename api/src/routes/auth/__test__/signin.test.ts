import request from 'supertest'
import { constants } from 'http2'

import { app } from '../../../app'

it('fails when a email that does not exist is supplied', async () => {
  await request(app)
    .post('/v1/users/signin')
    .send({
      email: 'test-fail@test.com',
      password: 'password',
    })
    .expect(400)
})

it('fails when an incorrect password is supplied', async () => {
  await request(app)
    .post('/v1/users/signin')
    .send({
      email: 'test@test.com',
      password: 'aslkdfjalskdfj',
    })
    .expect(400)
})

it('responds with a access token when given valid credentials', async () => {
  const login: any = await request(app)
    .post('/v1/users/signin')
    .send({
      email: 'test@test.com',
      password: 'password',
    })
    .expect(constants.HTTP_STATUS_OK)

  expect(login.access_token).toBeDefined()
})
