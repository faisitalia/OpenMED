import request from 'supertest'
import { constants } from 'http2'

import { app } from '../../../app'
import { Facility, FacilityDoc } from '../../../models/facility'
import { createFacility } from '../../../services/facility'
import { Person } from '../../../models/person'
import { User, Role, UserDoc } from '../../../models/user'
import { Visit, VisitDoc } from '../../../models/visit'

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
    // get the cookie
    const cookie = await global.signin()

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
      .set('Cookie', cookie)
      .send(visitData)
      .expect(constants.HTTP_STATUS_CREATED)

    const createdVisit: VisitDoc = response.body

    // check data
    expect(createdVisit.id).toBeDefined()
    expect(createdVisit.facilityId).toStrictEqual(facility.id)
    expect(createdVisit.patientId).toStrictEqual(patient.id)
    expect(createdVisit.doctorId).toStrictEqual(doctor.id)
    expect(createdVisit.caregiverId).toStrictEqual(caregiver.id)
    expect(new Date(createdVisit.slot)).toStrictEqual(slot)
  })
})
