import { createVisit } from '..'
import { Person } from '../../../models/person'
import { Role } from '../../../models/user'
import { createUser, deleteUserById } from '../../auth'
import { createFacility } from '../../facility'

describe('Visit service test suite', function () {
  it('should create a visit', async () => {
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

    expect(facility).toBeDefined()

    const slot = new Date()

    // create the person / patient
    const patientUsername = `patient_${new Date().getMilliseconds()}`
    const patientName = 'Patient1'
    const patientLastname = 'Patient1Lastname'
    const patientBirthdate = new Date()
    const patientEmail = `${patientUsername}@openmed.test`
    const patientPassword = 'password'
    const patientId = await createUser(patientName, patientLastname, patientBirthdate, patientUsername, patientEmail, patientPassword, Role.PATIENT)

    // create the person / doctor
    const doctorUsername = `doctor_${new Date().getMilliseconds()}`
    const doctorName = 'Doctor1'
    const doctorLastname = 'Doctor1Lastname'
    const doctorBirthdate = new Date()
    const doctorEmail = `${doctorUsername}@openmed.test`
    const doctorPassword = 'password'
    const doctorId = await createUser(doctorName, doctorLastname, doctorBirthdate, doctorUsername, doctorEmail, doctorPassword, Role.DOCTOR)

    // create the person / caregiver
    const caregiverUsername = `caregiver_${new Date().getMilliseconds()}`
    const caregiverName = 'Caregiver1'
    const caregiverLastname = 'Caregiver1Lastname'
    const caregiverBirthdate = new Date()
    const caregiverEmail = `${caregiverUsername}@openmed.test`
    const caregiverPassword = 'password'
    const caregiverId = await createUser(
      caregiverName,
      caregiverLastname,
      caregiverBirthdate,
      caregiverUsername,
      caregiverEmail,
      caregiverPassword,
      Role.CAREGIVER
    )

    const createdVisit = await createVisit(facility.id, patientId, doctorId, caregiverId, slot)

    expect(createdVisit.facility.name).toStrictEqual(facilityName)
    expect(createdVisit.facility.email).toStrictEqual(facilityEmail)
    expect(createdVisit.facility.street).toStrictEqual(facilityStreet)
    expect(createdVisit.facility.town).toStrictEqual(facilityTown)

    expect(createdVisit.patientId).toStrictEqual(patientId)
    expect(createdVisit.doctorId).toStrictEqual(doctorId)
    expect(createdVisit.caregiverId).toStrictEqual(caregiverId)

    await deleteUserById(patientId)
    await deleteUserById(doctorId)
    await deleteUserById(caregiverId)
  })
})
