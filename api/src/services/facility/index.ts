import { Facility, FacilityAttrs } from '../../models/facility'
import { geoServer } from './utils/geoServer'

/**
 *
 * @param facility
 */
async function createFacility(facility: FacilityAttrs) {
  const facilityDoc = Facility.build(facility)

  // retrieve the location data
  const address = `${facility.street}, ${facility.postalcode}, ${facility.town}, ${facility.country}`
  const coordinates = await getCoordinatesByAddress(address)

  // check coordinates
  if (!coordinates) throw new Error(`No coordinates available for the address ${address}`)

  // add location to the facility doc
  facilityDoc.location = {
    type: 'Point',
    coordinates: [coordinates.longitude, coordinates.latitude],
  }

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
  return Facility.findById(facilityId)
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
  minDistance = 0,
  maxDistance = 1000,
  limit = 5
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
