import express, { Request, Response } from 'express'
import { body } from 'express-validator'

import { validateRequest } from '../../common'
import { refreshAuthToken } from '../../services/auth'

const router = express.Router()

/**
 * @openapi
 * /users/refreshToken:
 *   post:
 *     description: Refresh the access token
 *     tags:
 *      - User
 *     produces:
 *      - application/json
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               refreshToken:
 *                 type: string
 *                 description: The refreshToken
 *
 *     security: []    # no authentication
 *     responses:
 *      '200':
 *         description: Successfully token refreshed.
 *         headers:
 *           Set-Cookie:
 *             schema:
 *               type: string
 *               example: jwt=abcde12345; Path=/; HttpOnly
 */
router.post(
  '/v1/users/refreshToken',
  [
    body('username').trim().notEmpty().withMessage('Username must be valid'),
    body('password').trim().notEmpty().withMessage('You must supply a password'),
    body('refreshToken').trim().notEmpty().withMessage('You must supply a refresh token'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { username, password, refreshToken } = req.body

    const newAccessToken = await refreshAuthToken(username, password, refreshToken)

    res.status(200).send(newAccessToken)
  }
)

export { router as refreshTokenRouter }
