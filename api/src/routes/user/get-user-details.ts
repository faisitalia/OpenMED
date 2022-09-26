import express, { Request, Response } from 'express'
import { constants } from 'http2'

import { requireAuth } from '../../common'
import { Role } from '../../models/user'
import { getUserById } from '../../services/user'

const router = express.Router()

/**
 * @openapi
 * /users/{userId}:
 *   get:
 *     description: Returns the user details
 *     tags:
 *      - User
 *     produces:
 *      - application/json
 *     parameters:
 *       - name: userId
 *         description: The id of the user
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: user details
 */
router.get(
  '/v1/users/:userId',
  requireAuth([Role.USER, Role.ADMIN, Role.DOCTOR, Role.NURSE, Role.PATIENT]),
  async (req: Request, res: Response) => {
    const userDetails = await getUserById(req.params.userId)
    res.status(constants.HTTP_STATUS_OK).send(userDetails)
  }
)

export { router as userDetailsRouter }
