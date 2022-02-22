import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose'
import request from 'supertest'
import { constants } from 'http2'

import { app } from '../app'
import { assignRoleToUser, deleteUserById } from '../services/auth'
import UserRepresentation from '@keycloak/keycloak-admin-client/lib/defs/userRepresentation'

declare global {
  namespace NodeJS {
    interface Global {
      signup(
        email: string,
        password: string,
        firstname: string,
        lastname: string,
        birthdate: Date
      ): Promise<UserRepresentation>
      signin(email: string, password: string): Promise<string>
      person: {
        firstname: string
        lastname: string
        birthdate: Date
      }
    }
  }
}

let mongo: any

beforeAll(async () => {
  process.env.OPENID_CLIENT_ID = 'api-server'
  process.env.OPENID_CLIENT_SECRET = 'CVXrccbQqxTdTJGKqa39kUyhEAlnHdd1'
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

  mongo = await MongoMemoryServer.create()
  const mongoUri = await mongo.getUri()

  await mongoose.connect(mongoUri)
})

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections()

  for (let collection of collections) {
    await collection.deleteMany({})
  }
})

afterAll(async () => {
  await mongo.stop()
  // await mongoose.connection.close();
})

global.signup = async (email: string, password: string, firstname, lastname, birthdate) => {
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

  const user = signup.body

  // add the "user" role to the test user
  // await assignRoleToUser('user', user)

  return user
}

global.signin = async (email: string, password: string) => {
  const response = await request(app)
    .post('/v1/users/signin')
    .send({
      email,
      password,
    })
    .expect(constants.HTTP_STATUS_OK)

  const token = response.body.access_token

  return token
}
