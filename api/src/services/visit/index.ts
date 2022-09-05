import { NotFoundError } from '../../common'
import { Visit } from '../../models/visit'
import { getFacilityById } from '../facility'

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

  const facility = await getFacilityById(facilityId)

  if (!facility) {
    throw new NotFoundError(`Facility ${facilityId} not found`)
  }

  const visitDoc = Visit.build({
    facility,
    patientId,
    doctorId,
    caregiverId,
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

  const facility = await getFacilityById(newVisitData.facilityId)

  if (!facility) {
    throw new NotFoundError(`Facility ${newVisitData.facilityId} not found`)
  }

  visit.set({
    facility, 
    patientId: newVisitData.patientId,
    doctorId: newVisitData.doctorId,
    caregiverId: newVisitData.caregiverId,
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
