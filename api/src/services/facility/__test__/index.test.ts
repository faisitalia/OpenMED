import { createFacility, getFacilityById } from '..'

describe('Facility service test suite', function () {
  it('should retrieve a facility by id', async () => {
    // create the facility
    const facilityName = 'Facility1'
    const facilityEmail = 'facility@openmed.cloud'
    const facilityStreet = 'Corso Bramante 88'
    const facilityTown = 'Torino'
    const facilityState = 'Piemonte'
    const facilityCounty = 'To'
    const facilityCountry = 'IT'
    const facilityPostalcode = 10126

    const createdFacility = await createFacility({
      name: facilityName,
      email: facilityEmail,
      street: facilityStreet,
      town: facilityTown,
      state: facilityState,
      county: facilityCounty,
      country: facilityCountry,
      postalcode: facilityPostalcode,
    })

    expect(createdFacility).toBeDefined()

    const retrieveFacility = await getFacilityById(createdFacility.id)
    expect(retrieveFacility).toBeDefined()
    expect(retrieveFacility?.id).toStrictEqual(createdFacility.id)
    expect(retrieveFacility?.name).toStrictEqual(createdFacility.name)
    expect(retrieveFacility?.email).toStrictEqual(createdFacility.email)
    expect(retrieveFacility?.street).toStrictEqual(createdFacility.street)
    expect(retrieveFacility?.town).toStrictEqual(createdFacility.town)
    expect(retrieveFacility?.state).toStrictEqual(createdFacility.state)
    expect(retrieveFacility?.county).toStrictEqual(createdFacility.county)
    expect(retrieveFacility?.country).toStrictEqual(createdFacility.country)
    expect(retrieveFacility?.postalcode).toStrictEqual(createdFacility.postalcode)
  })
})
