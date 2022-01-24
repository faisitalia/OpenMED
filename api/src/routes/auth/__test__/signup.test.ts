import request from 'supertest'

import { app } from '../../../app'
import { Role } from '../../../models/user'

it('returns a 201 on successful signup', async () => {
  return request(app)
    .post('/v1/users/signup')
    .send({
      email: 'test@test.com',
      password: 'password',
      firstname: 'John',
      lastname: 'Doe',
      birthdate: new Date(),
    })
    .expect(201)
    .catch((err) => console.error(err))
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
    .expect(400)
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
    .expect(400)
})

it('returns a 400 with missing email and password', async () => {
  await request(app)
    .post('/v1/users/signup')
    .send({
      email: 'test@test.com',
    })
    .expect(400)

  await request(app)
    .post('/v1/users/signup')
    .send({
      password: 'alskjdf',
    })
    .expect(400)
})

it('returns a 400 with missing fistname, lastname and birthdate', async () => {
  await request(app)
    .post('/v1/users/signup')
    .send({
      email: 'test@test.com',
      password: 'alskjdf',
    })
    .expect(400)

  await request(app)
    .post('/v1/users/signup')
    .send({
      email: 'test@test.com',
      password: 'alskjdf',
      lastname: 'Doe',
      birthdate: new Date(),
    })
    .expect(400)

  await request(app)
    .post('/v1/users/signup')
    .send({
      email: 'test@test.com',
      password: 'alskjdf',
      firstname: 'John',
      birthdate: new Date(),
    })
    .expect(400)

  await request(app)
    .post('/v1/users/signup')
    .send({
      email: 'test@test.com',
      password: 'alskjdf',
      firstname: 'John',
      lastname: 'Doe',
    })
    .expect(400)
})

it('disallows duplicate emails', async () => {
  await request(app)
    .post('/v1/users/signup')
    .send({
      email: 'test@test.com',
      password: 'password',
      firstname: 'John',
      lastname: 'Doe',
      birthdate: new Date(),
    })
    .expect(201)

  await request(app)
    .post('/v1/users/signup')
    .send({
      email: 'test@test.com',
      password: 'password',
      firstname: 'John',
      lastname: 'Doe',
      birthdate: new Date(),
    })
    .expect(400)
})

it('sets a cookie after successful signup', async () => {
  const response = await request(app)
    .post('/v1/users/signup')
    .send({
      email: 'test@test.com',
      password: 'password',
      firstname: 'John',
      lastname: 'Doe',
      birthdate: new Date(),
    })
    .expect(201)

  expect(response.get('Set-Cookie')).toBeDefined()
})
