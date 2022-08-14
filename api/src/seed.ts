import mongoose from 'mongoose'
import fs from 'fs-extra'

import { Facility } from './models/facility'
import { Role } from './models/user'
import { Person } from './models/person'
import { transformData } from './services/facility/utils/etl-json'
import facilitiesData from './routes/facility/__test__/facilities.json'
import { createRole, createUser } from './services/auth'

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config()

/**
 *
 */
const createRoles = async () => {
  console.log('Creating roles....')
  for (const role of Object.keys(Role)) {
    await createRole(role)
  }
}

/**
 *
 */
const populateUsers = async function () {
  console.log('Droping users and persons....')
  await Person.deleteMany({})

  console.log('Inserting user....')

  // create an USER
  const username = 'user'
  const firstname = 'John'
  const lastname = 'Doe'
  const birthdate = new Date()
  const personDoc = Person.build({ firstname, lastname, birthdate, username })
  await personDoc.save()

  const email = 'user@openmed.cloud'
  const password = 'password'
  await createUser(username, email, password, Role.USER)

  console.log('User inserted!')
}

/**
 *
 * @param writeJSON
 */
const populateFacilities = async function (writeJSON = false) {
  console.log('Droping facilities....')
  await Facility.deleteMany({})

  const transformedData = await transformData(facilitiesData)

  // write the facilities json data
  if (writeJSON) {
    fs.writeJson('./facilities.json', transformedData, (err) => {
      if (err) return console.error(err)
      console.log('success!')
    })
  }
  console.log('Inserting facilities....')
  await Facility.insertMany(transformedData)

  console.log('Facilities inserted!')
}

/**
 *
 */
const runSeed = async () => {
  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI must be defined')
  }

  try {
    const openmedMongo = await mongoose.connect(process.env.MONGO_URI)
    const databaseName = openmedMongo.connection.db.databaseName
    console.log(`Connected to MongoDb database: ${databaseName}`)

    // create the REALM roles to the auth manager
    await createRoles()

    await populateUsers()

    const writeJSON = false
    await populateFacilities(writeJSON)

    await mongoose.disconnect()

    process.exit(0)
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

runSeed()
