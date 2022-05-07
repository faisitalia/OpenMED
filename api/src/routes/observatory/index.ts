import express, { Request, Response } from 'express'
import { constants } from 'http2'
import { body } from 'express-validator'

import { requireAuth, validateRequest } from '../../common'

// create the express router
const router = express.Router()

/**
 * @openapi
 * /observatory:
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
  '/v1/observatory/',
  [
    body('name').trim().not().isEmpty().withMessage('Facility name is required'),
    // body('email').isEmail().withMessage('Email is required'),
    // body('street').trim().not().isEmpty().withMessage('Street is required'),
    // body('town').trim().not().isEmpty().withMessage('Town is required'),
    // body('state').trim().not().isEmpty().withMessage('State is required'),
    // body('county').trim().not().isEmpty().withMessage('County is required'),
    // body('country').trim().not().isEmpty().withMessage('Country is required'),
    // body('postalcode').trim().not().isEmpty().isNumeric().withMessage('Postal code is required'),
  ],
  validateRequest,
  requireAuth,
  async (req: Request, res: Response) => {
    // const { name, email, street, town, state, county, country, postalcode } = req.body

    // const createdFacility = await createFacility({
    //   name,
    //   email,
    //   street,
    //   town,
    //   state,
    //   county,
    //   country,
    //   postalcode,
    // })
    res.status(constants.HTTP_STATUS_CREATED).send({})
  }
)
