import express, { Request, Response } from 'express'
import { body } from 'express-validator'

import { validateRequest, BadRequestError } from '../../common'
import { getAuthToken, getUserByEmail } from '../../services/auth'

const router = express.Router()

/**
 * @openapi
 * /users/signin:
 *   post:
 *     description: Returns the logged user
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
 *               email:
 *                 type: string
 *                 description: The user's name.
 *                 example: user@openmed.test
 *               password:
 *                 type: string
 *                 description: The user's password.
 *                 example: password
 *     security: []    # no authentication
 *     responses:
 *      '200':
 *         description: Successfully authenticated. The session ID is returned in a cookie named `jwt`. You need to include this cookie in subsequent requests.
 *         headers:
 *           Set-Cookie:
 *             schema:
 *               type: string
 *               example: jwt=abcde12345; Path=/; HttpOnly
 */
router.post(
  '/v1/users/signin',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password').trim().notEmpty().withMessage('You must supply a password'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body

    const existingUser = await getUserByEmail(email)
    if (!existingUser) {
      throw new BadRequestError('Invalid credentials')
    }

    const login = await getAuthToken(existingUser.username!, password)

    // Store it on session object
    // req.session = {
    //   jwt: login.accessToken,
    // }

    res.status(200).send(login)
  }
)

export { router as signinRouter }
