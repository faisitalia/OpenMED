import express, { Request, Response } from 'express'

import { requireAuth } from '../../common'
import {
  findNearest,
  getAllFacilities,
  getCoordinatesByAddress,
  getFacilityById,
} from '../../services/facility'

// create the express router
const router = express.Router()

/**
 * @openapi
 * /facilities/findnearest:
 *   get:
 *     description: Returns the nearest facilities to the coordinates sent via query parameters
 *     tags:
 *      - Facility
 *     produces:
 *      - application/json
 *     parameters:
 *       - name: latitude
 *         description: latitude
 *         in: query
 *         required: true
 *         type: string
 *       - name: longitude
 *         description: Longitude
 *         in: query
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: facilities
 */
router.get('/v1/facilities/findnearest', requireAuth, async (req: Request, res: Response) => {
  // get the params
  const queryParams = req.query
  if (!queryParams.longitude || !queryParams.latitude)
    throw new Error('The input params are invalid: longitude or latitude unavailable')

  // latitude and logitude - required
  const latitude = parseFloat(queryParams.latitude as string)
  const longitude = parseFloat(queryParams.longitude as string)

  // ...get the not required parameters
  const minDistance = queryParams.minDistance ? parseInt(queryParams.minDistance as string, 10) : 0
  const maxDistance = queryParams.maxDistance
    ? parseInt(queryParams.maxDistance as string, 10)
    : 1000
  const limit = queryParams.limit ? parseInt(queryParams.limit as string, 10) : 5

  // get the nearest facility
  const nearestFacility = await findNearest(latitude, longitude, minDistance, maxDistance, limit)

  res.send(nearestFacility)
})

/**
 *
 */
router.get(
  '/v1/facilities/coordinatesByAddress',
  requireAuth,
  async (req: Request, res: Response) => {
    if (!req.query.address) throw new Error('No address to search provided!')

    const addressToSearch = req.query.address as string
    const coordinates = await getCoordinatesByAddress(addressToSearch)
    res.send(coordinates)
  }
)

/**
 * @openapi
 * /facilities/{facilityId}:
 *   get:
 *     description: Returns the facility details
 *     tags:
 *      - Facility
 *     produces:
 *      - application/json
 *     parameters:
 *       - name: facilityId
 *         description: The id of the facility
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: facility details
 */
router.get('/v1/facilities/:facilityId', requireAuth, async (req: Request, res: Response) => {
  const facility = await getFacilityById(req.params.facilityId)
  res.send(facility)
})

/**
 * @openapi
 * /facilities:
 *   get:
 *     description: Returns all the facilities
 *     tags:
 *      - Facility
 *     produces:
 *      - application/json
 *     responses:
 *       200:
 *         description: List of the all facilities available in the database
 */
router.get('/v1/facilities', requireAuth, async (req: Request, res: Response) => {
  const facilities = await getAllFacilities()
  res.send(facilities)
})

export { router as facilityRouter }
