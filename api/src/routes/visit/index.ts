import express, { Request, Response } from 'express'
import { constants } from 'http2'
import { body } from 'express-validator'

import { requireAuth, validateRequest } from '../../common'

import { createVisit } from '../../services/visit'
import { VisitDoc } from '../../models/visit'

// create the express router
const router = express.Router()

/**
 * @openapi
 * /visits:
 *   post:
 *     description: Create a visit
 *     tags:
 *      - Visit
 *     consumes:
 *      - application/json
 *     parameters:
 *         - in: body
 *           name: body
 *           description: The details to create a visit
 *           required: true
 *           schema:
 *             type: object
 *             properties:
 *               facilityId:
 *                 type: string
 *                 required: true
 *               patientId:
 *                 type: string
 *                 required: true
 *               doctorId:
 *                 type: string
 *                 required: true
 *               caregiverId:
 *                 type: string
 *                 required: true
 *               slot:
 *                 type: Date
 *                 required: true
 *     responses:
 *       201:
 *         description: The created visit
 */
router.post(
  '/v1/visits',
  [
    body('facilityId').trim().not().isEmpty().withMessage('The facility id is required'),
    body('patientId').trim().not().isEmpty().withMessage('The patient id is required'),
    body('doctorId').trim().not().isEmpty().withMessage('The doctor id is required'),
    body('caregiverId').trim().not().isEmpty().withMessage('The caregiver id is required'),
    body('slot').trim().not().isEmpty().withMessage('The slot is required'),
  ],
  validateRequest,
  requireAuth,
  async (req: Request, res: Response) => {
    const { facilityId, patientId, doctorId, caregiverId, slot } = req.body

    const createdVisit: VisitDoc = await createVisit({
      facilityId,
      patientId,
      doctorId,
      caregiverId,
      slot,
    })

    res.status(constants.HTTP_STATUS_CREATED).send(createdVisit)
  }
)

export { router as visitRouter }
