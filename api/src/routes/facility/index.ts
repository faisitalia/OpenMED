import express, { Request, Response } from 'express'
import { constants } from 'http2'
import { body } from 'express-validator'

import { requireAuth, validateRequest } from '../../common'
import {
  findNearest,
  getAllFacilities,
  getCoordinatesByAddress,
  getFacilityById,
  createFacility,
} from '../../services/facility'
import { Role } from '../../models/user'

// create the express router
const router = express.Router()

/**
 * @openapi
 * /facilities:
 *   post:
 *     description: Create a facility
 *     tags:
 *      - Facility
 *     consumes:
 *      - application/json
 *     parameters:
 *         - in: body
 *           name: body
 *           description: The details of the facility to created
 *           required: true
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 required: true
 *               email:
 *                 type: string
 *                 required: false
 *               street:
 *                 type: string
 *                 required: true
 *               town:
 *                 type: string
 *                 required: true
 *               state:
 *                 type: string
 *                 required: true
 *               county:
 *                 type: string
 *                 required: true
 *               country:
 *                 type: string
 *                 required: true
 *               postalcode:
 *                 type: string
 *                 required: true
 *     responses:
 *       201:
 *         description: The created facility
 */
router.post(
  '/v1/facilities',
  requireAuth([Role.SUPER_ADMIN]),
  [
    body('name').trim().not().isEmpty().withMessage('Facility name is required'),
    // body('email').isEmail().withMessage('Email is required'),
    body('street').trim().not().isEmpty().withMessage('Street is required'),
    body('town').trim().not().isEmpty().withMessage('Town is required'),
    body('state').trim().not().isEmpty().withMessage('State is required'),
    body('county').trim().not().isEmpty().withMessage('County is required'),
    body('country').trim().not().isEmpty().withMessage('Country is required'),
    body('postalcode').trim().not().isEmpty().isNumeric().withMessage('Postal code is required'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { name, email, street, town, state, county, country, postalcode } = req.body

    const createdFacility = await createFacility({
      name,
      email,
      street,
      town,
      state,
      county,
      country,
      postalcode,
    })
    res.status(constants.HTTP_STATUS_CREATED).send(createdFacility)
  }
)

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
router.get(
  '/v1/facilities/findnearest',
  requireAuth([Role.USER]),
  async (req: Request, res: Response) => {
    // get the params
    const queryParams = req.query
    if (!queryParams.longitude || !queryParams.latitude)
      throw new Error('The input params are invalid: longitude or latitude unavailable')

    // latitude and logitude - required
    const latitude = parseFloat(queryParams.latitude as string)
    const longitude = parseFloat(queryParams.longitude as string)

    // ...get the not required parameters
    const minDistance = queryParams.minDistance
      ? parseInt(queryParams.minDistance as string, 10)
      : 0
    const maxDistance = queryParams.maxDistance
      ? parseInt(queryParams.maxDistance as string, 10)
      : 1000
    const limit = queryParams.limit ? parseInt(queryParams.limit as string, 10) : 5

    // get the nearest facility
    const nearestFacility = await findNearest(latitude, longitude, minDistance, maxDistance, limit)

    res.send(nearestFacility)
  }
)

/**
 * @openapi
 * /facilities/coordinatesByAddress:
 *   get:
 *     description: Returns the coordinates of the address passed as parameter
 *     tags:
 *      - Facility
 *     produces:
 *      - application/json
 *     parameters:
 *       - name: address
 *         description: Address
 *         in: query
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: A JSON object with longitude and latitude of the address
 */
router.get(
  '/v1/facilities/coordinatesByAddress',
  requireAuth([Role.USER]),
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
router.get(
  '/v1/facilities/:facilityId',
  requireAuth([Role.USER]),
  async (req: Request, res: Response) => {
    const facility = await getFacilityById(req.params.facilityId)
    res.send(facility)
  }
)

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
router.get('/v1/facilities', requireAuth([Role.USER]), async (req: Request, res: Response) => {
  const facilities = await getAllFacilities()
  res.send(facilities)
})

export { router as facilityRouter }
