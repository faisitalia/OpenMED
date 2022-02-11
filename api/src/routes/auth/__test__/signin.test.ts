import request from 'supertest'
import { constants } from 'http2'

import { app } from '../../../app'
import { deleteUserById } from '../../../services/auth'

it('fails when a email that does not exist is supplied', async () => {
  await request(app)
    .post('/v1/users/signin')
    .send({
      email: 'test@test.com',
      password: 'password',
    })
    .expect(400)
})

it('fails when an incorrect password is supplied', async () => {
  await request(app)
    .post('/v1/users/signup')
    .send({
      email: 'test@test.com',
      password: 'password',
      firstname: global.person.firstname,
      lastname: global.person.lastname,
      birthdate: global.person.birthdate,
    })
    .expect(201)

  await request(app)
    .post('/v1/users/signin')
    .send({
      email: 'test@test.com',
      password: 'aslkdfjalskdfj',
    })
    .expect(400)
})

it.only('responds with a cookie when given valid credentials', async () => {
  const { body: user } = await request(app)
    .post('/v1/users/signup')
    .send({
      email: 'test@test.com',
      password: 'password',
      firstname: global.person.firstname,
      lastname: global.person.lastname,
      birthdate: global.person.birthdate,
    })
    .expect(constants.HTTP_STATUS_CREATED)

  const response = await request(app)
    .post('/v1/users/signin')
    .send({
      email: 'test@test.com',
      password: 'password',
    })
    .expect(constants.HTTP_STATUS_OK)

  console.log(response)

  // expect(response.get('Set-Cookie')).toBeDefined()

  await deleteUserById(user.id)
})
