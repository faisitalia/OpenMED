import { apiServer } from '../../api/config'

/**
 *
 * @returns
 */
async function getFacilities() {
  return apiServer
    .get(`/v1/facilities`)
    .then((res) => {
      return res.data
    })
    .catch((err) => {
      throw err.response.data.errors
    })
}

/**
 *
 * @param {*} facilityId
 * @returns
 */
async function getFacilityByFacilityId(facilityId) {
  return apiServer
    .get(`/v1/facilities/${facilityId}`)
    .then((res) => {
      return res.data
    })
    .catch((err) => {
      throw err.response.data.errors
    })
}

/**
 *
 * @param {*} address
 * @returns
 */
async function getCoordinatesByAddress(address) {
  return apiServer
    .get(`/v1/facilities/coordinatesByAddress?address=${encodeURIComponent(address)}`)
    .then((res) => {
      return res.data
    })
    .catch((err) => {
      throw err.response.data.errors
    })
}

/**
 *
 * @param {*} latitude
 * @param {*} longitude
 * @returns
 */
async function getNearestFacilities(latitude, longitude) {
  return apiServer
    .get(`/v1/facilities/findnearest?latitude=${latitude}&longitude=${longitude}`)
    .then((res) => {
      return res.data
    })
    .catch((err) => {
      throw err.response.data.errors
    })
}

export { getFacilities, getFacilityByFacilityId, getNearestFacilities, getCoordinatesByAddress }
