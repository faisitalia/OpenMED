import express, { Request, Response } from 'express'
import { body } from 'express-validator'

import { validateRequest } from '../../common'
import { getAuthToken } from '../../services/auth'

const router = express.Router()

/**
 * @openapi
 * /users/signin:
 *   post:
 *     description: Returns the logged user
 *     tags:
 *      - Authentication
 *     produces:
 *      - application/json
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The username.
 *                 example: user
 *               password:
 *                 type: string
 *                 description: The user's password.
 *                 example: password
 *     security: []    # no authentication
 *     responses:
 *      '200':
 *         description: Successfully authenticated. The access token is returned in the response body. You need to include this token in subsequent requests.
 *         headers:
 *           Authorization:
 *             schema:
 *               type: string
 *               example: Bearer fadsuyhds876fd789yfdadjsfhasdf789
 */
router.post(
  '/v1/users/signin',
  [
    body('username').trim().notEmpty().withMessage('Username must be valid'),
    body('password').trim().notEmpty().withMessage('You must supply a password'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { username, password } = req.body

    const login = await getAuthToken(username, password)
    res.status(200).send(login)
  }
)

export { router as signinRouter }
