import request from 'supertest'
import { constants } from 'http2'

import { app } from '../../../app'
import { createUser, deleteUserById } from '../../../services/user'
import { Role } from '../../../models/user'

describe('Get user details test suite', () => {
  // beforeEach(async () => {

  // })

  it('should a doctor retrieve the patient details', async () => {
    const patientName = 'John'
    const patientLastname = 'Details'
    const patientBirthdate = new Date()
    const patientUsername = 'john.details'
    const patientEmail = 'john.details@email.test'
    const patientPassword = '12345678'
    const patientId = await createUser(patientName, patientLastname, patientBirthdate, patientUsername, patientEmail, patientPassword, Role.PATIENT)
    expect(patientId).toBeDefined()

    const doctorName = 'DoctorJimi'
    const doctorLastname = 'DocDetails'
    const doctorBirthdate = new Date()
    const doctorUsername = 'jimi.doctor'
    const doctorEmail = 'jimi.doctor@email.test'
    const doctorPassword = '12345678'
    const doctorId = await createUser(doctorName, doctorLastname, doctorBirthdate, doctorUsername, doctorEmail, doctorPassword, Role.PATIENT)
    expect(doctorId).toBeDefined()

    const doctorAccessToken = await global.signin(doctorUsername, doctorPassword)

    const response = await request(app)
      .get(`/v1/users/${patientId}`)
      .set('Authorization', `Bearer ${doctorAccessToken}`)
    expect(response.statusCode).toBe(constants.HTTP_STATUS_OK)

    expect(response.body.id).toStrictEqual(patientId)
    expect(response.body.username).toStrictEqual(patientUsername)
    expect(response.body.email).toStrictEqual(patientEmail)
    expect(response.body.roles[0].name).toStrictEqual(Role.PATIENT)
    expect(response.body.person.firstname).toStrictEqual(patientName)
    expect(response.body.person.lastname).toStrictEqual(patientLastname)
    expect(new Date(response.body.person.birthdate)).toStrictEqual(patientBirthdate)

    await deleteUserById(patientId)
    await deleteUserById(doctorId)
  })
})
