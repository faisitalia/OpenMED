import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose'
import request from 'supertest'
import { constants } from 'http2'

import { app } from '../app'

declare global {
  namespace NodeJS {
    interface Global {
      signin(): Promise<string[]>
      person: {
        firstname: string
        lastname: string
        birthdate: Date
      }
    }
  }
}

let mongo: any

// person data
const PERSON = {
  firstname: 'Test',
  lastname: 'Usertest',
  birthdate: new Date(),
}

beforeAll(async () => {
  process.env.JWT_KEY = 'asdfasdf'
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

global.person = PERSON

global.signin = async () => {
  // user data
  const email = 'test@test.com'
  const password = 'password'

  // person data
  const firstname = PERSON.firstname
  const lastname = PERSON.lastname
  const birthdate = PERSON.birthdate

  await request(app)
    .post('/v1/users/signup')
    .send({
      email,
      password,
      firstname,
      lastname,
      birthdate,
    })
    .expect(constants.HTTP_STATUS_CREATED)

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
