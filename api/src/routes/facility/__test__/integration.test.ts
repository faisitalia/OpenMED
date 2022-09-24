import request from 'supertest'
import { constants } from 'http2'

import { app } from '../../../app'
import facilitiesData from './facilities.json'
import { Facility } from '../../../models/facility'
import { assignRoleToUser } from '../../../services/auth'
import { Role } from '../../../models/user'
import { deleteUserById } from '../../../services/user'

describe('Facility integration test suite', () => {
  beforeEach(async () => {
    // create and populate facility collection
    await Facility.insertMany(facilitiesData)
  })

  it('should create a facility', async () => {
    // get the access token
    const username = 'facility'
    const email = 'user-facility@test.com'
    const password = 'password'
    const firstname = 'john'
    const lastname = 'doe'
    const birthdate = new Date()

    // signup
    const user = await global.signup(username, email, password, firstname, lastname, birthdate)
    const userId = user.id ?? ''

    // get auth token
    const accessToken = await global.signin(username, password)

    await assignRoleToUser(Role.SUPER_ADMIN, userId)

    // create the facility
    const facilityToCreate = {
      state: 'Piemonte',
      town: 'Torino',
      postalcode: 10126,
      county: 'To',
      name: 'Azienda Ospedaliera Molinette',
      street: 'Corso Bramante 88',
      email: '',
      country: 'IT',
    }
    const facility = Facility.build(facilityToCreate)

    // make the request to fetch all the facilities
    const { body: createdFacility } = await request(app)
      .post(`/v1/facilities`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send(facility.toJSON())
      .expect(constants.HTTP_STATUS_CREATED)

    // check data
    expect(createdFacility.id).toBeDefined()
    expect(createdFacility.name).toStrictEqual(facilityToCreate.name)
    expect(createdFacility.email).toStrictEqual(facilityToCreate.email)
    expect(createdFacility.state).toStrictEqual(facilityToCreate.state)
    expect(createdFacility.town).toStrictEqual(facilityToCreate.town)
    expect(createdFacility.postalcode).toStrictEqual(facilityToCreate.postalcode)
    expect(createdFacility.county).toStrictEqual(facilityToCreate.county)
    expect(createdFacility.country).toStrictEqual(facilityToCreate.country)
    expect(createdFacility.email).toStrictEqual(facilityToCreate.email)
    expect(createdFacility.location).toBeDefined()
    expect(createdFacility.location.type).toStrictEqual('Point')
    expect(createdFacility.location.coordinates[0]).toStrictEqual(7.6745153)
    expect(createdFacility.location.coordinates[1]).toStrictEqual(45.0416061)

    await deleteUserById(userId)
  })

  it('should fail creating a facility by a USER', async () => {
    // get the access token
    const username = 'facility'
    const email = 'user-facility@test.com'
    const password = 'password'
    const firstname = 'john'
    const lastname = 'doe'
    const birthdate = new Date()

    const EXPECTED_ERROR_MESSAGE = `Access denied for user "${username}"`

    // signup
    const user = await global.signup(username, email, password, firstname, lastname, birthdate)
    const userId = user.id ?? ''

    // get auth token
    const accessToken = await global.signin(username, password)

    // create the facility
    const facilityToCreate = {
      state: 'Piemonte',
      town: 'Torino',
      postalcode: 10126,
      county: 'To',
      name: 'Azienda Ospedaliera Molinette',
      street: 'Corso Bramante 88',
      email: '',
      country: 'IT',
    }
    const facility = Facility.build(facilityToCreate)

    // make the request to fetch all the facilities
    const response = await request(app)
      .post(`/v1/facilities`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send(facility.toJSON())

    // check data
    expect(response.statusCode).toBe(constants.HTTP_STATUS_UNAUTHORIZED)
    expect(response.error).toBeDefined()

    const data = JSON.parse(response.text)
    const errors = data.errors
    expect(errors).toHaveLength(1)
    expect(errors[0].message).toStrictEqual(EXPECTED_ERROR_MESSAGE)

    await deleteUserById(userId)
  })

  it('should fetch all the facilities', async () => {
    // get the access token
    const username = 'facility-all'
    const email = 'user-all-facility@test.com'
    const password = 'password'
    const firstname = 'john'
    const lastname = 'doe'
    const birthdate = new Date()

    // signup
    const user = await global.signup(username, email, password, firstname, lastname, birthdate)

    // get auth token
    const accessToken = await global.signin(username, password)

    // make the request to fetch all the facilities
    const response = await request(app)
      .get(`/v1/facilities`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send()

    expect(response.statusCode).toBe(constants.HTTP_STATUS_OK)

    const fetchedFacilities = response.body
    expect(fetchedFacilities).toHaveLength(55)

    await deleteUserById(user.id!)
  })

  it('should return an unauthorized error fetching all the facility with no login', async () => {
    // make an unauthorized request
    await request(app).get(`/v1/facilities`).send().expect(constants.HTTP_STATUS_UNAUTHORIZED)
  })

  it('should return the facility coordinates', async () => {
    // get the access token
    const username = 'facility-coord1'
    const email = 'user-coord-facility@test.com'
    const password = 'password'
    const firstname = 'john'
    const lastname = 'doe'
    const birthdate = new Date()

    // signup
    const user = await global.signup(username, email, password, firstname, lastname, birthdate)

    // get auth token
    const accessToken = await global.signin(username, password)

    // get coordinates by town
    const townToSearch = 'Torino'
    const { body: townCoordinates } = await request(app)
      .get(`/v1/facilities/coordinatesByAddress?address=${encodeURIComponent(townToSearch)}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send()
      .expect(constants.HTTP_STATUS_OK)

    expect(townCoordinates).toBeDefined()
    expect(townCoordinates.latitude).toStrictEqual(45.0677551)
    expect(townCoordinates.longitude).toStrictEqual(7.6824892)
    expect(townCoordinates.address).toStrictEqual('Torino, Piemonte, Italia')

    // get coordinates by address
    const addressToSearch = 'Via Dei Ponderanesi 2, Biella Piemonte'
    const { body: addressCoordinates } = await request(app)
      .get(`/v1/facilities/coordinatesByAddress?address=${encodeURIComponent(addressToSearch)}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send()
      .expect(constants.HTTP_STATUS_OK)

    expect(addressCoordinates).toBeDefined()
    expect(addressCoordinates.latitude).toStrictEqual(45.5439946)
    expect(addressCoordinates.longitude).toStrictEqual(8.0624296)
    expect(addressCoordinates.address).toStrictEqual(
      '2, Via dei Ponderanesi, Alberetti, Ponderano, Biella, Piemonte, 13875, Italia'
    )

    await deleteUserById(user.id!)
  })

  it('should return the nearest facilities to a particular point (lat, long)', async () => {
    // get the access token
    const username = 'facility-near'
    const email = 'user-near-facilities@test.com'
    const password = 'password'
    const firstname = 'john'
    const lastname = 'doe'
    const birthdate = new Date()

    // signup
    const user = await global.signup(username, email, password, firstname, lastname, birthdate)

    // get auth token
    const accessToken = await global.signin(username, password)

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
      .set('Authorization', `Bearer ${accessToken}`)
      .send()
      .expect(constants.HTTP_STATUS_OK)

    // check data
    expect(nearestFacilities).toHaveLength(3)

    const nearestFaciity = nearestFacilities[0]
    const fartherFaciity = nearestFacilities[2]

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
    expect(fartherFaciity.name).toStrictEqual(
      'Ospedali Riuniti Villa Sofia-cervello (presidio Villa Sofia)'
    )
    expect(fartherFaciity.street).toStrictEqual('Piazza Salerno1')
    expect(fartherFaciity.town).toStrictEqual('Palermo')
    expect(fartherFaciity.state).toStrictEqual('Sicilia')
    expect(fartherFaciity.county).toStrictEqual('Pa')
    expect(fartherFaciity.postalcode).toStrictEqual(90146)

    await deleteUserById(user.id!)
  })

  it('should return the nearest facility to a particular point (lat, long)', async () => {
    // get the access token
    const username = 'facility-point'
    const email = 'user-point-facility@test.com'
    const password = 'password'
    const firstname = 'john'
    const lastname = 'doe'
    const birthdate = new Date()

    // signup
    const user = await global.signup(username, email, password, firstname, lastname, birthdate)

    // get auth token
    const accessToken = await global.signin(username, password)

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
      .set('Authorization', `Bearer ${accessToken}`)
      .send()
      .expect(constants.HTTP_STATUS_OK)

    // check data
    expect(nearestFacilities).toHaveLength(1)

    const nearestFaciity = nearestFacilities[0]

    expect(nearestFaciity).toBeDefined()
    expect(nearestFaciity.id).toBeDefined()
    expect(nearestFaciity.name).toStrictEqual('Ospedale Policlinico')
    expect(nearestFaciity.street).toStrictEqual('Via Del Vespro 129')
    expect(nearestFaciity.town).toStrictEqual('Palermo')
    expect(nearestFaciity.state).toStrictEqual('Sicilia')
    expect(nearestFaciity.county).toStrictEqual('Pa')
    expect(nearestFaciity.postalcode).toStrictEqual(90127)

    await deleteUserById(user.id!)
  })
})
