import request from 'supertest'

import { app } from '../../../app'
import { Role } from '../../../models/user'
import { Person, PersonDoc } from '../../../models/person'

let person: PersonDoc

beforeAll(async () => {
  // create the person
  const firstname = 'John'
  const lastname = 'Doe'
  const birthdate = new Date()
  const personDoc = Person.build({ firstname, lastname, birthdate })
  person = await personDoc.save()
})

it('returns a 201 on successful signup', async () => {
  return request(app)
    .post('/v1/users/signup')
    .send({
      email: 'test@test.com',
      password: 'password',
      role: Role.USER,
      personId: person.id,
    })
    .expect(201)
})

it('returns a 400 with an invalid email', async () => {
  return request(app)
    .post('/v1/users/signup')
    .send({
      email: 'alskdflaskjfd',
      password: 'password',
      role: Role.USER,
      personId: person.id,
    })
    .expect(400)
})

it('returns a 400 with an invalid password', async () => {
  return request(app)
    .post('/v1/users/signup')
    .send({
      email: 'alskdflaskjfd',
      password: 'p',
      role: Role.USER,
      personId: person.id,
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

it('disallows duplicate emails', async () => {
  await request(app)
    .post('/v1/users/signup')
    .send({
      email: 'test@test.com',
      password: 'password',
      role: Role.USER,
      personId: person.id,
    })
    .expect(201)

  await request(app)
    .post('/v1/users/signup')
    .send({
      email: 'test@test.com',
      password: 'password',
      role: Role.USER,
      personId: person.id,
    })
    .expect(400)
})

it('sets a cookie after successful signup', async () => {
  const response = await request(app)
    .post('/v1/users/signup')
    .send({
      email: 'test@test.com',
      password: 'password',
      role: Role.USER,
      personId: person.id,
    })
    .expect(201)

  expect(response.get('Set-Cookie')).toBeDefined()
})
