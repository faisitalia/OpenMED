import request from 'supertest'

import { app } from '../../../app'
import { Facility } from '../../../models/facility'
import { Visit } from '../../../models/visit'

describe('Booking integration test suite', function () {
  beforeEach(async () => {})

  it('should create a booking', async () => {
    // get the cookie
    const cookie = await global.signin()

    // make the request to create the booking
    const { body: fetchedFacilities } = await request(app)
      .get(`/v1/facilities`)
      .set('Cookie', cookie)
      .send()
      .expect(200)

    expect(fetchedFacilities.length).toBe(293)
  })
})
