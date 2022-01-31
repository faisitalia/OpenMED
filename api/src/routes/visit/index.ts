import express, { Request, Response } from 'express'
import { constants } from 'http2'
import { body } from 'express-validator'

import { requireAuth, validateRequest } from '../../common'

import {
  createVisit,
  updateVisit,
  fetchVisitById,
  deleteVisitById,
  fetchAllVisits,
} from '../../services/visit'
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

    const createdVisit: VisitDoc = await createVisit(
      facilityId,
      patientId,
      doctorId,
      caregiverId,
      slot
    )

    res.status(constants.HTTP_STATUS_CREATED).send(createdVisit.toJSON())
  }
)

/**
 * @openapi
 * /visits/{visitId}:
 *   put:
 *     description: Update a visit
 *     tags:
 *      - Visit
 *     consumes:
 *      - application/json
 *     parameters:
 *         - in: body
 *           name: body
 *           description: The details to update a visit
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
 *       200:
 *         description: The updated visit
 */
router.put(
  '/v1/visits/:visitId',
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
    const visitId = req.params.visitId
    const { facilityId, patientId, doctorId, caregiverId, slot } = req.body

    const updatedVisit: VisitDoc = await updateVisit(visitId, {
      facilityId,
      patientId,
      doctorId,
      caregiverId,
      slot,
    })

    res.status(constants.HTTP_STATUS_OK).send(updatedVisit.toJSON())
  }
)

/**
 * @openapi
 * /visits/{visitId}:
 *   get:
 *     description: Returns the visit details
 *     tags:
 *      - Visit
 *     produces:
 *      - application/json
 *     parameters:
 *       - name: visitId
 *         description: The id of the visit
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: visit details
 */
router.get('/v1/visits/:visitId', requireAuth, async (req: Request, res: Response) => {
  const visitId = req.params.visitId

  const visit = await fetchVisitById(visitId)

  res.status(constants.HTTP_STATUS_OK).send(visit.toJSON())
})

/**
 * @openapi
 * /visits:
 *   get:
 *     description: Returns all the visits
 *     tags:
 *      - Visit
 *     produces:
 *      - application/json
 *     responses:
 *       200:
 *         description: All the available visits
 */
router.get('/v1/visits', requireAuth, async (req: Request, res: Response) => {
  const visits = await fetchAllVisits()

  res.status(constants.HTTP_STATUS_OK).send(visits)
})

/**
 * @openapi
 * /visits/{visitId}:
 *   delete:
 *     description: Delete a visit
 *     tags:
 *      - Visit
 *     produces:
 *      - application/json
 *     parameters:
 *       - name: visitId
 *         description: The id of the visit
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       204:
 *         description: Visit has been enacted and no further information is to be supplied.
 */
router.delete('/v1/visits/:visitId', requireAuth, async (req: Request, res: Response) => {
  const visitId = req.params.visitId

  await deleteVisitById(visitId)

  res.status(constants.HTTP_STATUS_NO_CONTENT).send()
})

export { router as visitRouter }
