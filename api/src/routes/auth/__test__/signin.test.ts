import request from 'supertest'
import { constants } from 'http2'

import { app } from '../../../app'
import { deleteUserById } from '../../../services/auth'

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
  const { body: user } = await request(app)
    .post('/v1/users/signup')
    .send({
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
      email: 'john@test.com',
      password: 'password',
    })
    .expect(constants.HTTP_STATUS_OK)

  expect(login.access_token).toBeDefined()

  await deleteUserById(user.id)
})
