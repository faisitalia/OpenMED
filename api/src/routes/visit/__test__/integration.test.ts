import request from 'supertest'
import { constants } from 'http2'
import mongoose from 'mongoose'

import { app } from '../../../app'
import { Facility, FacilityDoc } from '../../../models/facility'
import { createFacility } from '../../../services/facility'
import { Person } from '../../../models/person'
import { User, Role, UserDoc } from '../../../models/user'
import { Visit, VisitDoc } from '../../../models/visit'
import { deleteUserById } from '../../../services/auth'

describe('Visit integration test suite', function () {
  let patient: UserDoc
  let doctor: UserDoc
  let caregiver: UserDoc
  let facility: FacilityDoc

  beforeEach(async () => {
    // create the person / patient
    const patientName = 'Patient1'
    const patientLastname = 'Patient1Lastname'
    const patientBirthdate = new Date()
    const patientPersonDoc = Person.build({
      firstname: patientName,
      lastname: patientLastname,
      birthdate: patientBirthdate,
    })
    const patientPerson1 = await patientPersonDoc.save()

    const patientEmail = 'patient@openmed.test'
    const patientPassword = 'password'
    const patientModel = User.build({
      email: patientEmail,
      password: patientPassword,
      role: Role.PATIENT,
      personId: patientPerson1.id,
    })
    patient = await patientModel.save()

    // create the person / doctor
    const doctorName = 'Doctor1'
    const doctorLastname = 'Doctor1Lastname'
    const doctorBirthdate = new Date()
    const doctorPersonDoc = Person.build({
      firstname: doctorName,
      lastname: doctorLastname,
      birthdate: doctorBirthdate,
    })
    const doctorPerson1 = await doctorPersonDoc.save()

    const doctorEmail = 'doctor@openmed.test'
    const doctorPassword = 'password'
    const doctorModel = User.build({
      email: doctorEmail,
      password: doctorPassword,
      role: Role.DOCTOR,
      personId: doctorPerson1.id,
    })
    doctor = await doctorModel.save()

    // create the person / caregiver
    const caregiverName = 'Caregiver1'
    const caregiverLastname = 'Caregiver1Lastname'
    const caregiverBirthdate = new Date()
    const caregiverPersonDoc = Person.build({
      firstname: caregiverName,
      lastname: caregiverLastname,
      birthdate: caregiverBirthdate,
    })
    const caregiverPerson1 = await caregiverPersonDoc.save()

    const caregiverEmail = 'user@openmed.test'
    const caregiverPassword = 'password'
    const caregiverModel = User.build({
      email: caregiverEmail,
      password: caregiverPassword,
      role: Role.CAREGIVER,
      personId: caregiverPerson1.id,
    })
    caregiver = await caregiverModel.save()

    // create the facility
    const facilityName = 'Facility1'
    const facilityEmail = 'facility@openmed.cloud'
    const facilityStreet = 'Corso Bramante 88'
    const facilityTown = 'Torino'
    const facilityState = 'Piemonte'
    const facilityCounty = 'To'
    const facilityCountry = 'IT'
    const facilityPostalcode = 10126

    facility = await createFacility({
      name: facilityName,
      email: facilityEmail,
      street: facilityStreet,
      town: facilityTown,
      state: facilityState,
      county: facilityCounty,
      country: facilityCountry,
      postalcode: facilityPostalcode,
    })
  })

  it('should create a visit', async () => {
    // get the access token
    const email = 'user-visit@test.com'
    const password = 'password'
    const firstname = 'john'
    const lastname = 'doe'
    const birthdate = new Date()

    // signup
    const user = await global.signup(email, password, firstname, lastname, birthdate)

    // get auth token
    const accessToken = await global.signin(email, password)

    // set the slot
    const slot = new Date()

    // set the visit data
    const visitData = {
      facilityId: facility.id,
      patientId: patient.id,
      doctorId: doctor.id,
      caregiverId: caregiver.id,
      slot,
    }

    // make the request to create the visit
    const response = await request(app)
      .post(`/v1/visits`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send(visitData)
      .expect(constants.HTTP_STATUS_CREATED)

    const createdVisit = response.body

    // check data
    expect(createdVisit.id).toBeDefined()
    expect(createdVisit.facility.id).toStrictEqual(facility.id)
    expect(createdVisit.patient.id).toStrictEqual(patient.id)
    expect(createdVisit.doctor.id).toStrictEqual(doctor.id)
    expect(createdVisit.caregiver.id).toStrictEqual(caregiver.id)
    expect(new Date(createdVisit.slot)).toStrictEqual(slot)

    await deleteUserById(user.id!)
  })

  it('should returns a 400 if the slot is not found', async () => {
    // get the access token
    const email = 'user-no-visit@test.com'
    const password = 'password'
    const firstname = 'john'
    const lastname = 'doe'
    const birthdate = new Date()

    // signup
    const user = await global.signup(email, password, firstname, lastname, birthdate)

    // get auth token
    const accessToken = await global.signin(email, password)

    // set the slot
    const slot = new Date()

    // set the visit data
    const visitData = {
      facilityId: facility.id,
      patientId: patient.id,
      doctorId: doctor.id,
      caregiverId: caregiver.id,
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

    await deleteUserById(user.id!)
  })

  it('returns a 404 if the visit is not found', async () => {
    // get the access token
    const email = 'user-no2-visit@test.com'
    const password = 'password'
    const firstname = 'john'
    const lastname = 'doe'
    const birthdate = new Date()

    // signup
    const user = await global.signup(email, password, firstname, lastname, birthdate)

    // get auth token
    const accessToken = await global.signin(email, password)

    // create a dummy mongo id
    const id = new mongoose.Types.ObjectId().toHexString()

    await request(app)
      .get(`/v1/visits/${id}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send()
      .expect(404)

    await deleteUserById(user.id!)
  })

  it('returns the visit if the visit is found', async () => {
    // get the access token
    const email = 'user-id-visit@test.com'
    const password = 'password'
    const firstname = 'john'
    const lastname = 'doe'
    const birthdate = new Date()

    // signup
    const user = await global.signup(email, password, firstname, lastname, birthdate)

    // get auth token
    const accessToken = await global.signin(email, password)

    // set the slot
    const slot = new Date()

    // set the visit data
    const visitData = {
      facilityId: facility.id,
      patientId: patient.id,
      doctorId: doctor.id,
      caregiverId: caregiver.id,
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

    const retrievedVisit = retrievedVisitResponse.body

    // check the retrieved visit
    expect(retrievedVisit.facility.id).toStrictEqual(createdVisit.facility.id)
    expect(retrievedVisit.patient.id).toStrictEqual(createdVisit.patient.id)
    expect(retrievedVisit.doctor.id).toStrictEqual(createdVisit.doctor.id)
    expect(retrievedVisit.caregiver.id).toStrictEqual(createdVisit.caregiver.id)
    expect(retrievedVisit.slot).toStrictEqual(createdVisit.slot)

    await deleteUserById(user.id!)
  })

  it('should fetch all the available visits', async () => {
    // get the access token
    const email = 'user-all-visit@test.com'
    const password = 'password'
    const firstname = 'john'
    const lastname = 'doe'
    const birthdate = new Date()

    // signup
    const user = await global.signup(email, password, firstname, lastname, birthdate)

    // get auth token
    const accessToken = await global.signin(email, password)

    // set the slot
    const slot1 = new Date()
    const slot2 = new Date()
    const slot3 = new Date()

    // set the visit data
    const visitData1 = {
      facilityId: facility.id,
      patientId: patient.id,
      doctorId: doctor.id,
      caregiverId: caregiver.id,
      slot: slot1,
    }
    const visitData2 = {
      facilityId: facility.id,
      patientId: patient.id,
      doctorId: doctor.id,
      caregiverId: caregiver.id,
      slot: slot2,
    }
    const visitData3 = {
      facilityId: facility.id,
      patientId: patient.id,
      doctorId: doctor.id,
      caregiverId: caregiver.id,
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
    expect(await Visit.countDocuments()).toBe(3)

    await deleteUserById(user.id!)
  })

  it('should update the visit', async () => {
    // get the access token
    const email = 'user-update-visit@test.com'
    const password = 'password'
    const firstname = 'john'
    const lastname = 'doe'
    const birthdate = new Date()

    // signup
    const user = await global.signup(email, password, firstname, lastname, birthdate)

    // get auth token
    const accessToken = await global.signin(email, password)

    // set the slot
    const slot = new Date()

    // set the visit data
    const visitData = {
      facilityId: facility.id,
      patientId: patient.id,
      doctorId: doctor.id,
      caregiverId: caregiver.id,
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
    const newDoctorPersonDoc = Person.build({
      firstname: 'UpdatedDoctor',
      lastname: 'UpdatedDoctor1Lastname',
      birthdate: new Date(),
    })
    const newDoctorPerson1 = await newDoctorPersonDoc.save()

    const newDoctorModel = User.build({
      email: 'updatedDoctor@openmed.test',
      password: 'password',
      role: Role.DOCTOR,
      personId: newDoctorPerson1.id,
    })
    const newDoctor = await newDoctorModel.save()
    expect(newDoctor).toBeDefined()
    expect(newDoctor.id).toBeDefined()

    // update the slot
    const newSlot = new Date()

    // update the visit
    const updateResponse = await request(app)
      .put(`/v1/visits/${createdVisit.id}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        facilityId: newFacility.id,
        patientId: patient.id,
        doctorId: newDoctor.id,
        caregiverId: caregiver.id,
        slot: newSlot,
      })
      .expect(constants.HTTP_STATUS_OK)

    const updatedVisit = updateResponse.body

    // check the updated visit
    expect(updatedVisit.facility.id).toStrictEqual(newFacility.id)
    expect(updatedVisit.patient.id).toStrictEqual(patient.id)
    expect(updatedVisit.doctor.id).toStrictEqual(newDoctor.id)
    expect(updatedVisit.caregiver.id).toStrictEqual(caregiver.id)
    expect(new Date(updatedVisit.slot)).toStrictEqual(newSlot)

    await deleteUserById(user.id!)
  })

  it('should delete a visit', async () => {
    // get the access token
    const email = 'user-delete-visit@test.com'
    const password = 'password'
    const firstname = 'john'
    const lastname = 'doe'
    const birthdate = new Date()

    // signup
    const user = await global.signup(email, password, firstname, lastname, birthdate)

    // get auth token
    const accessToken = await global.signin(email, password)

    // set the slot
    const slot = new Date()

    // set the visit data
    const visitData = {
      facilityId: facility.id,
      patientId: patient.id,
      doctorId: doctor.id,
      caregiverId: caregiver.id,
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

    await deleteUserById(user.id!)
  })
})
