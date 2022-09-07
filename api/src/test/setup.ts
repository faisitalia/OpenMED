/* eslint-disable no-unused-vars */
import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose'
import request from 'supertest'
import { constants } from 'http2'

import { app } from '../app'
// import { assignRoleToUser, deleteUserById } from '../services/auth'
import UserRepresentation from '@keycloak/keycloak-admin-client/lib/defs/userRepresentation'
import { logger } from '../utils/logger'

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config()

declare global {
  namespace NodeJS {
    interface Global {
      signup(
        username: string,
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

let mongo: MongoMemoryServer

beforeAll(async () => {
  mongo = await MongoMemoryServer.create()
  const mongoUri = mongo.getUri()

  await mongoose.connect(mongoUri)
})

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections()

  for (const collection of collections) {
    await collection.deleteMany({})
  }
})

afterAll(async () => {
  await mongo.stop()
  // await mongoose.connection.close();
})

global.signup = async (
  username: string,
  email: string,
  password: string,
  firstname,
  lastname,
  birthdate
) => {
  try {
    const signup = await request(app).post('/v1/users/signup').send({
      username,
      email,
      password,
      firstname,
      lastname,
      birthdate,
    })

    return signup.body
  } catch (error) {
    logger.error(error)
  }

  // add the "user" role to the test user
  // await assignRoleToUser('user', user)
}

global.signin = async (username: string, password: string) => {
  const response = await request(app)
    .post('/v1/users/signin')
    .send({
      username,
      password,
    })
    .expect(constants.HTTP_STATUS_OK)

  const token = response.body.access_token

  return token
}
