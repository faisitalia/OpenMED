import request from 'supertest'
import { constants } from 'http2'

import { app } from '../../../app'
import { deleteUserById } from '../../../services/user'

it('returns a 200 on successful signup', async () => {
  const email = 'john-signup@test.com'
  const username = 'john-signup'
  const { body: user } = await request(app)
    .post('/v1/users/signup')
    .send({
      username,
      email,
      password: 'password',
      firstname: 'John',
      lastname: 'Doe',
      birthdate: new Date()
    })
    .expect(constants.HTTP_STATUS_CREATED)

  expect(user.id).toBeDefined()
  expect(user.username).toStrictEqual(username)
  expect(user.email).toStrictEqual(email)
  expect(user.person).toBeDefined()

  // TODO add the checks for the "person"

  await deleteUserById(user.id)
})

it('returns a 400 with an invalid username', async () => {
  return request(app)
    .post('/v1/users/signup')
    .send({
      email: 'alskdflaskjfd',
      password: 'p',
      firstname: 'John',
      lastname: 'Doe',
      birthdate: new Date()
    })
    .expect(constants.HTTP_STATUS_BAD_REQUEST)
})

it('returns a 400 with an invalid email', async () => {
  return request(app)
    .post('/v1/users/signup')
    .send({
      username: 'john',
      email: 'alskdflaskjfd',
      password: 'password',
      firstname: 'John',
      lastname: 'Doe',
      birthdate: new Date()
    })
    .expect(constants.HTTP_STATUS_BAD_REQUEST)
})

it('returns a 400 with an invalid password', async () => {
  return request(app)
    .post('/v1/users/signup')
    .send({
      username: 'john',
      email: 'alskdflaskjfd',
      password: 'p',
      firstname: 'John',
      lastname: 'Doe',
      birthdate: new Date()
    })
    .expect(constants.HTTP_STATUS_BAD_REQUEST)
})

it('returns a 400 with missing email and password', async () => {
  await request(app)
    .post('/v1/users/signup')
    .send({
      username: 'john',
      email: 'test@test.com',
      firstname: 'John',
      lastname: 'Doe',
      birthdate: new Date()
    })
    .expect(constants.HTTP_STATUS_BAD_REQUEST)

  await request(app)
    .post('/v1/users/signup')
    .send({
      username: 'john',
      password: 'alskjdf',
      firstname: 'John',
      lastname: 'Doe',
      birthdate: new Date()
    })
    .expect(constants.HTTP_STATUS_BAD_REQUEST)
})

it('returns a 400 with missing fistname, lastname and birthdate', async () => {
  await request(app)
    .post('/v1/users/signup')
    .send({
      username: 'john',
      email: 'test@test.com',
      password: 'alskjdf'
    })
    .expect(constants.HTTP_STATUS_BAD_REQUEST)

  await request(app)
    .post('/v1/users/signup')
    .send({
      username: 'john',
      email: 'test@test.com',
      password: 'alskjdf',
      lastname: 'Doe',
      birthdate: new Date()
    })
    .expect(constants.HTTP_STATUS_BAD_REQUEST)

  await request(app)
    .post('/v1/users/signup')
    .send({
      username: 'john',
      email: 'test@test.com',
      password: 'alskjdf',
      firstname: 'John',
      birthdate: new Date()
    })
    .expect(constants.HTTP_STATUS_BAD_REQUEST)

  await request(app)
    .post('/v1/users/signup')
    .send({
      username: 'john',
      email: 'test@test.com',
      password: 'alskjdf',
      firstname: 'John',
      lastname: 'Doe'
    })
    .expect(constants.HTTP_STATUS_BAD_REQUEST)
})

it('disallows duplicate emails', async () => {
  const email = 'john-duplicate@test.com'
  const { body: user } = await request(app)
    .post('/v1/users/signup')
    .send({
      username: 'john',
      email,
      password: 'password',
      firstname: 'John',
      lastname: 'Doe',
      birthdate: new Date()
    })
    .expect(constants.HTTP_STATUS_CREATED)

  await request(app)
    .post('/v1/users/signup')
    .send({
      username: 'john',
      email,
      password: 'password',
      firstname: 'John',
      lastname: 'Doe',
      birthdate: new Date()
    })
    .expect(constants.HTTP_STATUS_BAD_REQUEST)

  await deleteUserById(user.id)
})
