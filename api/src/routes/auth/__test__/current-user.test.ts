import request from 'supertest'
import { constants } from 'http2'

import { app } from '../../../app'
import { deleteUserById } from '../../../services/auth'

it('responds with details about the current user', async () => {
  const username = 'john'
  const email = 'user-current@test.com'
  const password = 'password'
  const firstname = 'john'
  const lastname = 'doe'
  const birthdate = new Date()

  // signup
  const user = await global.signup(username, email, password, firstname, lastname, birthdate)

  // get auth token
  const accessToken = await global.signin(username, password)

  const response = await request(app)
    .get('/v1/users/currentuser')
    .set('Authorization', `Bearer ${accessToken}`)
    .send()
    .expect(constants.HTTP_STATUS_OK)

  expect(response.body.currentUser.email).toEqual(email)

  await deleteUserById(user.id!)
})

it('responds with null if not authenticated', async () => {
  const response = await request(app)
    .get('/v1/users/currentuser')
    .send()
    .expect(constants.HTTP_STATUS_OK)

  expect(response.body.currentUser).toEqual(null)
})
