import facilitiesData from './facilities.json'
import { Facility } from '../../../models/facility'

import { getCoordinatesByAddress, findNearest } from '../../../services/facility'

describe('Facility unit test suite', function () {
  beforeEach(async () => {
    // create and populate facility collection
    await Facility.insertMany(facilitiesData)
  })

  it('should return the param errors trying to retrieve the coordinates from an address', async () => {
    await expect(getCoordinatesByAddress('')).rejects.toThrow(
      'The input params are invalid: address unavailable'
    )
  })

  it('should return a pair of coordinates, along with the full resolved address', async () => {
    const address = 'via Paolo Fabbri 43, Bologna'

    const response = await getCoordinatesByAddress(address)
    expect(response.latitude).toStrictEqual(44.4949473)
    expect(response.longitude).toStrictEqual(11.3630593)
    expect(response.address).toStrictEqual(
      '43, Via Paolo Fabbri, Cirenaica, San Donato-San Vitale, Bologna, Emilia-Romagna, 40138, Italia'
    )

    // TODO test more addresses --> via fabbri 43 Bologna / via fabbri 43 Bologna 40138
  })

  it('should get the nearest facilities starting from latitude and longitude', async () => {
    // get the nearest facilities
    const latitude = 38.1041882
    const longitude = 13.3627699

    const minDistance = 0
    const maxDistance = 5000
    const limit = 5

    const facilities = await findNearest(latitude, longitude, minDistance, maxDistance, limit)

    // check data
    expect(Array.isArray(facilities)).toBeTruthy()
    expect(facilities).toHaveLength(3)

    const nearestFaciity = facilities[0]
    const fartherFaciity = facilities[2]

    // check data
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
  })
})
