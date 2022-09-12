import mongoose from 'mongoose'
import fs from 'fs-extra'

import { Facility } from './models/facility'
import { Role } from './models/user'
import { Person } from './models/person'
import { transformData } from './services/facility/utils/etl-json'
import facilitiesData from './routes/facility/__test__/facilities.json'
import { createRole, createUser, deleteRoleByRoleName, findRoleByRoleName } from './services/auth'

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config()

/**
 *
 */
const createRoles = async () => {
  console.log('Creating roles....')
  for (const role of Object.keys(Role)) {
    const existingRole = await findRoleByRoleName(role)
    if (existingRole) {
      await deleteRoleByRoleName(role)
    }
    await createRole(role)
  }
}

/**
 *
 */
const populateUsers = async function () {
  console.log('Droping users and persons....')
  await Person.deleteMany({})

  // TODO delete users from keycloak

  console.log('Inserting user....')

  const username = 'user'
  const firstname = 'John'
  const lastname = 'Doe'
  const birthdate = new Date()
  const personDoc = Person.build({ firstname, lastname, birthdate, username })
  await personDoc.save()

  const email = 'user@openmed.cloud'
  const password = 'password'
  await createUser(username, email, password, Role.USER)

  const adminUsername = 'admin'
  const adminFirstname = 'Admin'
  const adminLastname = 'Doe'
  const adminBirthdate = new Date()
  const adminPersonDoc = Person.build({
    firstname: adminFirstname,
    lastname: adminLastname,
    birthdate: adminBirthdate,
    username: adminUsername
  })
  await adminPersonDoc.save()

  const adminEmail = 'admin@openmed.cloud'
  const adminPassword = 'password'
  await createUser(adminUsername, adminEmail, adminPassword, Role.ADMIN)

  const doctorUsername = 'doctor'
  const doctorFirstname = 'John-doctor'
  const doctorLastname = 'Doe-doctor'
  const doctorBirthdate = new Date()
  const doctorPersonDoc = Person.build({ firstname: doctorFirstname, lastname: doctorLastname, birthdate: doctorBirthdate, username })
  await doctorPersonDoc.save()

  const doctorEmail = 'doctor@openmed.cloud'
  const doctorPassword = 'password'
  await createUser(doctorUsername, doctorEmail, doctorPassword, Role.DOCTOR)

  const nurseUsername = 'nurse'
  const nurseFirstname = 'John-nurse'
  const nurseLastname = 'Doe-nurse'
  const nurseBirthdate = new Date()
  const nursePersonDoc = Person.build({ firstname: nurseFirstname, lastname: nurseLastname, birthdate: nurseBirthdate, username })
  await nursePersonDoc.save()

  const nurseEmail = 'nurse@openmed.cloud'
  const nursePassword = 'password'
  await createUser(nurseUsername, nurseEmail, nursePassword, Role.NURSE)

  const patientUsername = 'patient'
  const patientFirstname = 'John-patient'
  const patientLastname = 'Doe-patient'
  const patientBirthdate = new Date()
  const patientPersonDoc = Person.build({ firstname: patientFirstname, lastname: patientLastname, birthdate: patientBirthdate, username })
  await patientPersonDoc.save()

  const patientEmail = 'patient@openmed.cloud'
  const patientPassword = 'password'
  await createUser(patientUsername, patientEmail, patientPassword, Role.PATIENT)

  const caregiverUsername = 'caregiver'
  const caregiverFirstname = 'John-caregiver'
  const caregiverLastname = 'Doe-caregiver'
  const caregiverBirthdate = new Date()
  const caregiverPersonDoc = Person.build({ firstname: caregiverFirstname, lastname: caregiverLastname, birthdate: caregiverBirthdate, username })
  await caregiverPersonDoc.save()

  const caregiverEmail = 'caregiver@openmed.cloud'
  const caregiverPassword = 'password'
  await createUser(caregiverUsername, caregiverEmail, caregiverPassword, Role.CAREGIVER)

  console.log('Users inserted!')
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
