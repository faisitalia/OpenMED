import request from 'supertest'
import { constants } from 'http2'

import { app } from '../../../app'
import { Role } from '../../../models/user'
import { deleteUserById } from '../../../services/auth'

it('returns a constants.HTTP_STATUS_CREATED on successful signup', async () => {
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

  expect(user.id).toBeDefined()
  expect(user.email).toStrictEqual('john@test.com')

  await deleteUserById(user.id)
})

it('returns a 400 with an invalid email', async () => {
  return request(app)
    .post('/v1/users/signup')
    .send({
      email: 'alskdflaskjfd',
      password: 'password',
      firstname: 'John',
      lastname: 'Doe',
      birthdate: new Date(),
    })
    .expect(constants.HTTP_STATUS_BAD_REQUEST)
})

it('returns a 400 with an invalid password', async () => {
  return request(app)
    .post('/v1/users/signup')
    .send({
      email: 'alskdflaskjfd',
      password: 'p',
      firstname: 'John',
      lastname: 'Doe',
      birthdate: new Date(),
    })
    .expect(constants.HTTP_STATUS_BAD_REQUEST)
})

it('returns a 400 with missing email and password', async () => {
  await request(app)
    .post('/v1/users/signup')
    .send({
      email: 'test@test.com',
    })
    .expect(constants.HTTP_STATUS_BAD_REQUEST)

  await request(app)
    .post('/v1/users/signup')
    .send({
      password: 'alskjdf',
    })
    .expect(constants.HTTP_STATUS_BAD_REQUEST)
})

it('returns a 400 with missing fistname, lastname and birthdate', async () => {
  await request(app)
    .post('/v1/users/signup')
    .send({
      email: 'test@test.com',
      password: 'alskjdf',
    })
    .expect(constants.HTTP_STATUS_BAD_REQUEST)

  await request(app)
    .post('/v1/users/signup')
    .send({
      email: 'test@test.com',
      password: 'alskjdf',
      lastname: 'Doe',
      birthdate: new Date(),
    })
    .expect(constants.HTTP_STATUS_BAD_REQUEST)

  await request(app)
    .post('/v1/users/signup')
    .send({
      email: 'test@test.com',
      password: 'alskjdf',
      firstname: 'John',
      birthdate: new Date(),
    })
    .expect(constants.HTTP_STATUS_BAD_REQUEST)

  await request(app)
    .post('/v1/users/signup')
    .send({
      email: 'test@test.com',
      password: 'alskjdf',
      firstname: 'John',
      lastname: 'Doe',
    })
    .expect(constants.HTTP_STATUS_BAD_REQUEST)
})

it('disallows duplicate emails', async () => {
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

  await request(app)
    .post('/v1/users/signup')
    .send({
      email: 'john@test.com',
      password: 'password',
      firstname: 'John',
      lastname: 'Doe',
      birthdate: new Date(),
    })
    .expect(constants.HTTP_STATUS_BAD_REQUEST)

  await deleteUserById(user.id)
})

// it('sets a cookie after successful signup', async () => {
//   const response = await request(app)
//     .post('/v1/users/signup')
//     .send({
//       email: 'john@test.com',
//       password: 'password',
//       firstname: 'John',
//       lastname: 'Doe',
//       birthdate: new Date(),
//     })
//     .expect(constants.HTTP_STATUS_CREATED)

//   expect(response.get('Set-Cookie')).toBeDefined()

//   await deleteUserById(response.body.user.id)
// })
