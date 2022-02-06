require('dotenv').config()

import mongoose from 'mongoose'
import https from 'https'
import fs from 'fs-extra'

import { app, PORT } from './app'

const key = fs.readFileSync('./key.pem')
const cert = fs.readFileSync('./cert.pem')

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined')
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

  // app.listen(PORT, () => {
  //   console.log(`Listening on port ${PORT}`)
  // })
  https.createServer({ key: key, cert: cert }, app).listen(PORT, () => {
    console.log(`The API server is running at port ${PORT}`)
  })
}

start()
