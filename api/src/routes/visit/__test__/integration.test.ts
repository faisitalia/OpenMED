import request from 'supertest'
import { constants } from 'http2'
import mongoose from 'mongoose'

import { app } from '../../../app'
import { createFacility } from '../../../services/facility'
import { Role } from '../../../models/user'
import { Visit, VisitDoc } from '../../../models/visit'
import { assignRoleToUser, createUser, deleteUserById } from '../../../services/auth'

async function createTestFacility() {
  const facilityName = 'Facility1'
    const facilityEmail = 'facility@openmed.cloud'
    const facilityStreet = 'Corso Bramante 88'
    const facilityTown = 'Torino'
    const facilityState = 'Piemonte'
    const facilityCounty = 'To'
    const facilityCountry = 'IT'
    const facilityPostalcode = 10126
  
    const facility = await createFacility({
        name: facilityName,
        email: facilityEmail,
        street: facilityStreet,
        town: facilityTown,
        state: facilityState,
        county: facilityCounty,
        country: facilityCountry,
        postalcode: facilityPostalcode
      })
    return facility
}

describe('Visit integration test suite', function () {
  let patientId: string
  let doctorId: string
  let caregiverId: string

  beforeAll(async () => {
    const patientUsername = 'patient1'
    const patientName = 'Patient1'
    const patientLastname = 'Patient1Lastname'
    const patientBirthdate = new Date()
    const patientEmail = 'patient@openmed.test'
    const patientPassword = 'password'
    patientId = await createUser(patientName, patientLastname, patientBirthdate, patientUsername, patientEmail, patientPassword, Role.PATIENT)

    const doctorUsername = 'doctor1'
    const doctorName = 'Doctor1'
    const doctorLastname = 'Doctor1Lastname'
    const doctorBirthdate = new Date()
    const doctorEmail = 'doctor@openmed.test'
    const doctorPassword = 'password'
    doctorId = await createUser(doctorName, doctorLastname, doctorBirthdate, doctorUsername, doctorEmail, doctorPassword, Role.DOCTOR)

    const caregiverUsername = 'caregiver1'
    const caregiverName = 'Caregiver1'
    const caregiverLastname = 'Caregiver1Lastname'
    const caregiverBirthdate = new Date()
    const caregiverEmail = 'user@openmed.test'
    const caregiverPassword = 'password'
    caregiverId = await createUser(
      caregiverName, 
      caregiverLastname, 
      caregiverBirthdate,
      caregiverUsername,
      caregiverEmail,
      caregiverPassword,
      Role.CAREGIVER
    )
  })

  afterAll(async ()=> {
    await deleteUserById(patientId)
    await deleteUserById(doctorId)
    await deleteUserById(caregiverId)
  })

  it('should create a visit', async () => {
    
    const facility = await createTestFacility()

    const username = 'visit'
    const email = 'user-visit@test.com'
    const password = 'password'
    const firstname = 'john'
    const lastname = 'doe'
    const birthdate = new Date()

    // signup
    const user = await global.signup(username, email, password, firstname, lastname, birthdate)
    const userId = user.id ?? ''

    // get auth token
    const accessToken = await global.signin(username, password)

    await assignRoleToUser(Role.DOCTOR, userId)

    // set the slot
    const slot = new Date()

    // set the visit data
    const visitData = {
      facilityId: facility.id,
      patientId,
      doctorId,
      caregiverId,
      slot,
    }

    // make the request to create the visit
    const response = await request(app)
      .post(`/v1/visits`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send(visitData)

    expect(response.statusCode).toBe(constants.HTTP_STATUS_CREATED)

    const createdVisit = response.body

    // check data
    expect(createdVisit.id).toBeDefined()
    expect(createdVisit.facility.id).toStrictEqual(facility.id)
    expect(createdVisit.patientId).toStrictEqual(patientId)
    expect(createdVisit.doctorId).toStrictEqual(doctorId)
    expect(createdVisit.caregiverId).toStrictEqual(caregiverId)
    expect(new Date(createdVisit.slot)).toStrictEqual(slot)

    await deleteUserById(userId)
  })

  it('should returns a 400 if the slot is not found', async () => {
    const facility = await createTestFacility()

    const username = 'visit-no'
    const email = 'user-no-visit@test.com'
    const password = 'password'
    const firstname = 'john'
    const lastname = 'doe'
    const birthdate = new Date()

    // signup
    const user = await global.signup(username, email, password, firstname, lastname, birthdate)
    const userId = user.id ?? ''

    // get auth token
    const accessToken = await global.signin(username, password)

    await assignRoleToUser(Role.DOCTOR, userId)

    // set the slot
    const slot = new Date()

    // set the visit data
    const visitData = {
      facilityId: facility.id,
      patientId: patientId,
      doctorId: doctorId,
      caregiverId: caregiverId,
      slot1: slot,
    }

    // make the request to create the visit
    const response = await request(app)
      .post(`/v1/visits`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send(visitData)

    // check data
    expect(response.statusCode).toStrictEqual(400)
    const { errors } = response.body
    expect(errors[0]).toBeDefined()
    const error = errors[0]
    expect(error.message).toStrictEqual('The slot is required')
    expect(error.field).toStrictEqual('slot')

    await deleteUserById(userId)
  })

  it('returns a 404 if the visit is not found', async () => {
    // get the access token
    const username = 'visit-no-2'
    const email = 'user-no2-visit@test.com'
    const password = 'password'
    const firstname = 'john'
    const lastname = 'doe'
    const birthdate = new Date()

    // signup
    const user = await global.signup(username, email, password, firstname, lastname, birthdate)
    const userId = user.id ?? ''

    // get auth token
    const accessToken = await global.signin(username, password)

    await assignRoleToUser(Role.DOCTOR, userId)

    // create a dummy mongo id
    const id = new mongoose.Types.ObjectId().toHexString()

    await request(app)
      .get(`/v1/visits/${id}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send()
      .expect(404)

    await deleteUserById(userId)
  })

  it('returns the visit if the visit is found', async () => {
    const facility = await createTestFacility()

    const username = 'visit-id'
    const email = 'user-id-visit@test.com'
    const password = 'password'
    const firstname = 'john'
    const lastname = 'doe'
    const birthdate = new Date()

    // signup
    const user = await global.signup(username, email, password, firstname, lastname, birthdate)
    const userId = user.id ?? ''

    // get auth token
    const accessToken = await global.signin(username, password)

    await assignRoleToUser(Role.DOCTOR, userId)

    // set the slot
    const slot = new Date()

    // set the visit data
    const visitData = {
      facilityId: facility.id,
      patientId: patientId,
      doctorId: doctorId,
      caregiverId: caregiverId,
      slot,
    }

    // make the request to create the visit
    const response = await request(app)
      .post(`/v1/visits`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send(visitData)
      .expect(constants.HTTP_STATUS_CREATED)

    const createdVisit: VisitDoc = response.body
    expect(createdVisit.id).toBeDefined()

    // retrieve the visit just created
    const retrievedVisitResponse = await request(app)
      .get(`/v1/visits/${createdVisit.id}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(constants.HTTP_STATUS_OK)

    const retrievedVisit: VisitDoc = retrievedVisitResponse.body

    // check the retrieved visit
    expect(retrievedVisit.facility.id).toStrictEqual(createdVisit.facility.id)
    expect(retrievedVisit.patientId).toStrictEqual(createdVisit.patientId)
    expect(retrievedVisit.doctorId).toStrictEqual(createdVisit.doctorId)
    expect(retrievedVisit.caregiverId).toStrictEqual(createdVisit.caregiverId)
    expect(retrievedVisit.slot).toStrictEqual(createdVisit.slot)

    await deleteUserById(userId)
  })

  it('should fetch all the available visits', async () => {
    const facility = await createTestFacility()
    
    const username = 'visit-all'
    const email = 'user-all-visit@test.com'
    const password = 'password'
    const firstname = 'john'
    const lastname = 'doe'
    const birthdate = new Date()

    // signup
    const user = await global.signup(username, email, password, firstname, lastname, birthdate)
    const userId = user.id ?? ''

    // get auth token
    const accessToken = await global.signin(username, password)

    await assignRoleToUser(Role.DOCTOR, userId)

    // set the slot
    const slot1 = new Date()
    const slot2 = new Date()
    const slot3 = new Date()

    // set the visit data
    const visitData1 = {
      facilityId: facility.id,
      patientId: patientId,
      doctorId: doctorId,
      caregiverId: caregiverId,
      slot: slot1,
    }
    const visitData2 = {
      facilityId: facility.id,
      patientId: patientId,
      doctorId: doctorId,
      caregiverId: caregiverId,
      slot: slot2,
    }
    const visitData3 = {
      facilityId: facility.id,
      patientId: patientId,
      doctorId: doctorId,
      caregiverId: caregiverId,
      slot: slot3,
    }

    // make the request to create the visits
    await request(app)
      .post(`/v1/visits`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send(visitData1)
      .expect(constants.HTTP_STATUS_CREATED)

    await request(app)
      .post(`/v1/visits`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send(visitData2)
      .expect(constants.HTTP_STATUS_CREATED)

    await request(app)
      .post(`/v1/visits`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send(visitData3)
      .expect(constants.HTTP_STATUS_CREATED)

    // check data
    const response = await request(app)
      .get(`/v1/visits`)
      .set('Authorization', `Bearer ${accessToken}`)

    const retrievedVisit: VisitDoc[] = response.body
    expect(retrievedVisit).toHaveLength(3)

    expect(retrievedVisit[0].facility).toStrictEqual(facility.id)
    expect(retrievedVisit[0].patientId).toStrictEqual(patientId)
    expect(retrievedVisit[0].doctorId).toStrictEqual(doctorId)
    expect(retrievedVisit[0].caregiverId).toStrictEqual(caregiverId)
    expect(new Date(retrievedVisit[0].slot)).toStrictEqual(slot1)

    expect(retrievedVisit[1].facility).toStrictEqual(facility.id)
    expect(retrievedVisit[1].patientId).toStrictEqual(patientId)
    expect(retrievedVisit[1].doctorId).toStrictEqual(doctorId)
    expect(retrievedVisit[1].caregiverId).toStrictEqual(caregiverId)
    expect(new Date(retrievedVisit[1].slot)).toStrictEqual(slot2)

    expect(retrievedVisit[2].facility).toStrictEqual(facility.id)
    expect(retrievedVisit[2].patientId).toStrictEqual(patientId)
    expect(retrievedVisit[2].doctorId).toStrictEqual(doctorId)
    expect(retrievedVisit[2].caregiverId).toStrictEqual(caregiverId)
    expect(new Date(retrievedVisit[2].slot)).toStrictEqual(slot3)

    await deleteUserById(userId)
  })

  it('should update the visit', async () => {
    const facility = await createTestFacility()

    const username = 'visit-update'
    const email = 'user-update-visit@test.com'
    const password = 'password'
    const firstname = 'john'
    const lastname = 'doe'
    const birthdate = new Date()

    // signup
    const user = await global.signup(username, email, password, firstname, lastname, birthdate)
    const userId = user.id ?? ''

    // get auth token
    const accessToken = await global.signin(username, password)

    await assignRoleToUser(Role.DOCTOR, userId)

    // set the slot
    const slot = new Date()

    // set the visit data
    const visitData = {
      facilityId: facility.id,
      patientId: patientId,
      doctorId: doctorId,
      caregiverId: caregiverId,
      slot,
    }

    // make the request to create the visit
    const response = await request(app)
      .post(`/v1/visits`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send(visitData)
      .expect(constants.HTTP_STATUS_CREATED)

    const createdVisit = response.body
    expect(createdVisit.id).toBeDefined()

    // update the facility
    const newFacility = await createFacility({
      name: 'UpdatedFacility',
      email: 'updatedFacility@openmed.cloud',
      street: 'corso unione sovietica, 88',
      town: 'Torino',
      state: 'Piemonte',
      county: 'To',
      country: 'IT',
      postalcode: 10134,
    })
    expect(newFacility).toBeDefined()
    expect(newFacility.id).toBeDefined()

    // update the doctor
    const newDoctorUsername = 'updatedDoctor'
    const newDoctorId = await createUser(
      'UpdatedDoctor',
      'UpdatedDoctor1Lastname',
      new Date(),
      newDoctorUsername,
      'updatedDoctor@openmed.test',
      'password',
      Role.DOCTOR
    )

    // update the slot
    const newSlot = new Date()

    // update the visit
    const updateResponse = await request(app)
      .put(`/v1/visits/${createdVisit.id}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        facilityId: newFacility.id,
        patientId: patientId,
        doctorId: newDoctorId,
        caregiverId: caregiverId,
        slot: newSlot,
      })
      .expect(constants.HTTP_STATUS_OK)

    const updatedVisit = updateResponse.body

    // check the updated visit
    expect(updatedVisit.facility.id).toStrictEqual(newFacility.id)
    expect(updatedVisit.patientId).toStrictEqual(patientId)
    expect(updatedVisit.doctorId).toStrictEqual(newDoctorId)
    expect(updatedVisit.caregiverId).toStrictEqual(caregiverId)
    expect(new Date(updatedVisit.slot)).toStrictEqual(newSlot)

    await deleteUserById(userId)
    await deleteUserById(newDoctorId)
  })

  it('should delete a visit', async () => {
     const facility = await createTestFacility()

    const username = 'visit-delete'
    const email = 'user-delete-visit@test.com'
    const password = 'password'
    const firstname = 'john'
    const lastname = 'doe'
    const birthdate = new Date()

    // signup
    const user = await global.signup(username, email, password, firstname, lastname, birthdate)
    const userId = user.id ?? ''

    // get auth token
    const accessToken = await global.signin(username, password)

    await assignRoleToUser(Role.DOCTOR, userId)

    // set the slot
    const slot = new Date()

    // set the visit data
    const visitData = {
      facilityId: facility.id,
      patientId: patientId,
      doctorId: doctorId,
      caregiverId: caregiverId,
      slot,
    }

    // make the request to create the visit
    const response = await request(app)
      .post(`/v1/visits`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send(visitData)
      .expect(constants.HTTP_STATUS_CREATED)

    const createdVisit = response.body
    expect(createdVisit.id).toBeDefined()

    // delete the visit
    await request(app)
      .delete(`/v1/visits/${createdVisit.id}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(constants.HTTP_STATUS_NO_CONTENT)

    expect(await Visit.countDocuments({ _id: createdVisit.id })).toBe(0)

    await deleteUserById(userId)
  })
})
