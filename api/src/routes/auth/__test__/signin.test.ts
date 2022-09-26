import request from 'supertest'
import { constants } from 'http2'

import { app } from '../../../app'
import { deleteUserById } from '../../../services/user'

it('fails when a username that does not exist is supplied', async () => {
  const response = await request(app)
    .post('/v1/users/signin')
    .send({
      username: 'test-fail',
      password: 'password'
    })
  expect(response.statusCode).toStrictEqual(constants.HTTP_STATUS_UNAUTHORIZED)

  const errors = JSON.parse(response.text).errors
  expect(errors[0].message).toStrictEqual('Not Authorized: the credentials could be wrong')
})

it('fails when an incorrect password is supplied', async () => {
  await request(app)
    .post('/v1/users/signin')
    .send({
      username: 'test',
      password: 'aslkdfjalskdfj'
    })
    .expect(constants.HTTP_STATUS_UNAUTHORIZED)
})

it('responds with a access token when given valid credentials', async () => {
  const username = 'john_signin'
  const { body: user } = await request(app)
    .post('/v1/users/signup')
    .send({
      username,
      email: 'john-signin@test.com',
      password: 'password',
      firstname: 'John',
      lastname: 'Doe',
      birthdate: new Date()
    })
    .expect(constants.HTTP_STATUS_CREATED)

  const { body: login } = await request(app)
    .post('/v1/users/signin')
    .send({
      username,
      password: 'password'
    })
    .expect(constants.HTTP_STATUS_OK)

  expect(login.access_token).toBeDefined()

  await deleteUserById(user.id)
})
