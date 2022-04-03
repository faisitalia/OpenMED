import mongoose from 'mongoose'
import https from 'https'
import fs from 'fs-extra'

import { app, PORT } from './app'

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config()

const key = fs.readFileSync(`./certs/${process.env.API_PRIVATE_KEY}`)
const cert = fs.readFileSync(`./certs/${process.env.API_CERT}`)

const start = async () => {
  if (!process.env.OPENID_CLIENT_ID) {
    throw new Error('OPENID_CLIENT_ID must be defined')
  }
  if (!process.env.OPENID_CLIENT_SECRET) {
    throw new Error('OPENID_CLIENT_SECRET must be defined')
  }
  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI must be defined')
  }

  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log('Connected to MongoDb')
  } catch (err) {
    console.error(err)
  }

  https.createServer({ key: key, cert: cert }, app).listen(PORT, () => {
    console.log(`The API server is running at port ${PORT}`)
  })
}

start()
