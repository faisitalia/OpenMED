import request from 'supertest'

import { app } from '../../../app'
import facilitiesData from './facilities.json'
import { Facility } from '../../../models/facility'

describe('Facility integration test suite', function () {
  beforeEach(async () => {
    // create and populate facility collection
    await Facility.insertMany(facilitiesData)
  })

  it('should fetch all the facilities', async () => {
    // get the cookie
    const cookie = await global.signin()

    // make the request to fetch all the facilities
    const { body: fetchedFacilities } = await request(app)
      .get(`/v1/facilities`)
      .set('Cookie', cookie)
      .send()
      .expect(200)

    expect(fetchedFacilities.length).toBe(293)
  })

  it('should return an unauthorized error fetching all the facility with no login', async () => {
    // make an unauthorized request
    await request(app).get(`/v1/facilities`).send().expect(401)
  })

  it('should return the facility coordinates', async () => {
    // get the cookie
    const cookie = await global.signin()

    // get coordinates by town
    const townToSearch = 'Torino'
    const { body: townCoordinates } = await request(app)
      .get(`/v1/facilities/coordinatesByAddress?address=${encodeURIComponent(townToSearch)}`)
      .set('Cookie', cookie)
      .send()
      .expect(200)

    expect(townCoordinates).toBeDefined()
    expect(townCoordinates.latitude).toStrictEqual(45.0677551)
    expect(townCoordinates.longitude).toStrictEqual(7.6824892)
    expect(townCoordinates.address).toStrictEqual('Torino, Piemonte, Italia')

    // get coordinates by address
    const addressToSearch = 'Via Dei Ponderanesi 2, Biella Piemonte'
    const { body: addressCoordinates } = await request(app)
      .get(`/v1/facilities/coordinatesByAddress?address=${encodeURIComponent(addressToSearch)}`)
      .set('Cookie', cookie)
      .send()
      .expect(200)

    expect(addressCoordinates).toBeDefined()
    expect(addressCoordinates.latitude).toStrictEqual(45.5439946)
    expect(addressCoordinates.longitude).toStrictEqual(8.0624296)
    expect(addressCoordinates.address).toStrictEqual(
      '2, Via dei Ponderanesi, Alberetti, Ponderano, Biella, Piemonte, 13875, Italia'
    )
  })

  it('should return the nearest facilities to a particular point (lat, long)', async () => {
    // get the cookie
    const cookie = await global.signin()

    // set the params
    const latitude = 38.1041882
    const longitude = 13.3627699

    const minDistance = 0
    const maxDistance = 5000
    const limit = 5

    // get the nearest facility
    const { body: nearestFacilities } = await request(app)
      .get(
        `/v1/facilities/findnearest?latitude=${latitude}&longitude=${longitude}&minDistance=${minDistance}&maxDistance=${maxDistance}&limit=${limit}`
      )
      .set('Cookie', cookie)
      .send()
      .expect(200)

    // check data
    expect(nearestFacilities.length).toStrictEqual(5)

    const nearestFaciity = nearestFacilities[0]
    const fartherFaciity = nearestFacilities[4]

    expect(nearestFaciity).toBeDefined()
    expect(nearestFaciity.id).toBeDefined()
    expect(nearestFaciity.name).toStrictEqual('Ospedale Policlinico')
    expect(nearestFaciity.street).toStrictEqual('Via Del Vespro 129')
    expect(nearestFaciity.town).toStrictEqual('Palermo')
    expect(nearestFaciity.state).toStrictEqual('Sicilia')
    expect(nearestFaciity.county).toStrictEqual('Pa')
    expect(nearestFaciity.postalcode).toStrictEqual(90127)

    expect(fartherFaciity).toBeDefined()
    expect(fartherFaciity.id).toBeDefined()
    expect(fartherFaciity.name).toStrictEqual('Ospedale Civico')
    expect(fartherFaciity.street).toStrictEqual('---')
    expect(fartherFaciity.town).toStrictEqual('Palermo')
    expect(fartherFaciity.state).toStrictEqual('Sicilia')
    expect(fartherFaciity.county).toStrictEqual('Pa')
    expect(fartherFaciity.postalcode).toStrictEqual(90127)
  })

  it('should return the nearest facility to a particular point (lat, long)', async () => {
    // get the cookie
    const cookie = await global.signin()

    // set the params
    const latitude = 38.1041882
    const longitude = 13.3627699

    const minDistance = 0
    const maxDistance = 5000
    const limit = 1

    // get the nearest facility
    const { body: nearestFacilities } = await request(app)
      .get(
        `/v1/facilities/findnearest?latitude=${latitude}&longitude=${longitude}&minDistance=${minDistance}&maxDistance=${maxDistance}&limit=${limit}`
      )
      .set('Cookie', cookie)
      .send()
      .expect(200)

    // check data
    expect(nearestFacilities.length).toStrictEqual(1)

    const nearestFaciity = nearestFacilities[0]

    expect(nearestFaciity).toBeDefined()
    expect(nearestFaciity.id).toBeDefined()
    expect(nearestFaciity.name).toStrictEqual('Ospedale Policlinico')
    expect(nearestFaciity.street).toStrictEqual('Via Del Vespro 129')
    expect(nearestFaciity.town).toStrictEqual('Palermo')
    expect(nearestFaciity.state).toStrictEqual('Sicilia')
    expect(nearestFaciity.county).toStrictEqual('Pa')
    expect(nearestFaciity.postalcode).toStrictEqual(90127)
  })
})
