import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose'
import request from 'supertest'
import { constants } from 'http2'

import { app } from '../app'
import { assignRoleToUser, deleteUserById } from '../services/auth'

declare global {
  namespace NodeJS {
    interface Global {
      signin(): string
      person: {
        firstname: string
        lastname: string
        birthdate: Date
      }
    }
  }
}

let mongo: any
let user: any
let token: any

// person data
const PERSON = {
  firstname: 'Test',
  lastname: 'Usertest',
  birthdate: new Date(),
}

beforeAll(async () => {
  process.env.OPENID_CLIENT_ID = 'api-server'
  process.env.OPENID_CLIENT_SECRET = 'CVXrccbQqxTdTJGKqa39kUyhEAlnHdd1'
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

  mongo = await MongoMemoryServer.create()
  const mongoUri = await mongo.getUri()

  await mongoose.connect(mongoUri)

  // user data
  const email = 'test@test.com'
  const password = 'password'

  // person data
  const firstname = PERSON.firstname
  const lastname = PERSON.lastname
  const birthdate = PERSON.birthdate

  const signup = await request(app)
    .post('/v1/users/signup')
    .send({
      email,
      password,
      firstname,
      lastname,
      birthdate,
    })
    .expect(constants.HTTP_STATUS_CREATED)

  user = signup.body

  // add the "user" role to the test user
  // await assignRoleToUser('user', user)

  const response = await request(app)
    .post('/v1/users/signin')
    .send({
      email,
      password,
    })
    .expect(constants.HTTP_STATUS_OK)

  token = response.body.access_token
})

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections()

  for (let collection of collections) {
    await collection.deleteMany({})
  }

  // delete users
  // if (user && user.id) {
  //   await deleteUserById(user.id)
  // }
})

afterAll(async () => {
  await mongo.stop()
  // await mongoose.connection.close();

  // delete users
  if (user && user.id) {
    await deleteUserById(user.id)
  }
})

global.person = PERSON

global.signin = () => {
  return token
}
