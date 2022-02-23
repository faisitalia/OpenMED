import { NotFoundError } from '../../common'
import { Visit } from '../../models/visit'
import { Facility } from '../../models/facility'
import { Role, User } from '../../models/user'

/**
 *
 * @param facilityId
 * @param patientId
 * @param doctorId
 * @param caregiverId
 * @returns
 */
async function getVisitComponets(
  facilityId: string,
  patientId: string,
  doctorId: string,
  caregiverId: string
) {
  // retrieve the facility
  const facility = await Facility.findById(facilityId)

  if (!facility) {
    throw new NotFoundError()
  }

  // retrieve the patient
  const patient = await User.findOne({ _id: patientId, role: Role.PATIENT })

  if (!patient) {
    throw new NotFoundError()
  }

  // retrieve the doctor
  const doctor = await User.findOne({ _id: doctorId, role: Role.DOCTOR })

  if (!doctor) {
    throw new NotFoundError()
  }

  // retrieve the caregiver
  const caregiver = await User.findOne({ _id: caregiverId, role: Role.CAREGIVER })

  if (!caregiver) {
    throw new NotFoundError()
  }

  return {
    facility,
    patient,
    doctor,
    caregiver,
  }
}

/**
 * Create a visit
 * @param visit
 */
async function createVisit(
  facilityId: string,
  patientId: string,
  doctorId: string,
  caregiverId: string,
  slot: Date
) {
  // retrieve all the visit data
  const { facility, patient, doctor, caregiver } = await getVisitComponets(
    facilityId,
    patientId,
    doctorId,
    caregiverId
  )

  const visitDoc = Visit.build({
    facility,
    patient,
    doctor,
    caregiver,
    slot,
  })

  return visitDoc.save()
}

/**
 * Update a visit
 * @param visit
 */
async function updateVisit(visitId: string, newVisitData: any) {
  // retrieve the visit
  const visit = await Visit.findById(visitId)

  if (!visit) {
    throw new NotFoundError()
  }

  const { facility, patient, doctor, caregiver } = await getVisitComponets(
    newVisitData.facilityId,
    newVisitData.patientId,
    newVisitData.doctorId,
    newVisitData.caregiverId
  )

  visit.set({
    facility,
    patient,
    doctor,
    caregiver,
    slot: newVisitData.slot,
  })

  return visit.save()
}

/**
 *
 * @param visitId
 */
async function fetchVisitById(visitId: string) {
  // retrieve the visit
  const visit = await Visit.findById(visitId).populate('facility')

  if (!visit) {
    throw new NotFoundError()
  }

  // retrieve the patient
  const patient = await User.findOne({ _id: visit.patient, role: Role.PATIENT })

  if (!patient) {
    throw new NotFoundError()
  }

  // retrieve the doctor
  const doctor = await User.findOne({ _id: visit.doctor, role: Role.DOCTOR })

  if (!doctor) {
    throw new NotFoundError()
  }

  // retrieve the caregiver
  const caregiver = await User.findOne({ _id: visit.caregiver, role: Role.CAREGIVER })

  if (!caregiver) {
    throw new NotFoundError()
  }

  visit.patient = patient
  visit.doctor = doctor
  visit.caregiver = caregiver

  return visit
}

/**
 *
 * @returns
 */
async function fetchAllVisits() {
  // retrieve the visit
  const visits = await Visit.find()

  if (!visits) {
    throw new NotFoundError()
  }

  return visits
}

/**
 *
 * @param visitId
 */
async function deleteVisitById(visitId: string) {
  // retrieve the visit
  await Visit.deleteOne({ _id: visitId })
}

export { createVisit, updateVisit, fetchVisitById, deleteVisitById, fetchAllVisits }
