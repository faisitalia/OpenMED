import { Facility, FacilityAttrs } from '../../models/facility'
import { geoServer } from './utils/geoServer'

/**
 *
 * @param data
 */
async function createFacility(data: FacilityAttrs, location: object) {
  console.log(location)
  const facilityDoc = Facility.build(data)
  return facilityDoc.save()
}

/**
 *
 * @returns
 */
async function getAllFacilities() {
  return Facility.find()
}

/**
 *
 * @param facilityId
 * @returns
 */
async function getFacilityById(facilityId: string) {
  // TODO check mongo ID
  if (true) {
    return Facility.findById(facilityId)
  } else {
    throw Error(`The param value ${facilityId} is not a valid id value`)
  }
}

/**
 *
 * @param addressToSearch
 * @returns
 */
async function getCoordinatesByAddress(addressToSearch: string) {
  // check params
  if (!addressToSearch) {
    throw Error('The input params are invalid: address unavailable')
  }

  const results = await geoServer.search({ q: addressToSearch })

  // return an empty object if no results are available
  if (results.length === 0) return {}

  // for now we get the place with the greatest value in "importance" attribute
  const firstResult = results[0]

  // return coordinates
  return {
    latitude: parseFloat(firstResult.lat),
    longitude: parseFloat(firstResult.lon),
    address: firstResult.display_name,
  }
}

/**
 *
 * @param latitude
 * @param longitude
 * @param minDistance
 * @param maxDistance
 * @param limit
 * @returns
 */
async function findNearest(
  latitude: number,
  longitude: number,
  minDistance: number = 0,
  maxDistance: number = 1000,
  limit: number = 5
) {
  if (!longitude || !latitude) {
    throw Error('The input params are invalid: longitude or latitude unavailable')
  }

  const facilities = await Facility.find({
    location: {
      $near: {
        $geometry: {
          type: 'Point',
          coordinates: [longitude, latitude],
        },
        $minDistance: minDistance,
        $maxDistance: maxDistance,
      },
    },
  }).limit(limit)

  return facilities
}

export { getAllFacilities, getFacilityById, getCoordinatesByAddress, findNearest, createFacility }
