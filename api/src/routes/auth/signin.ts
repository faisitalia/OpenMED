import express, { Request, Response } from 'express'
import { body } from 'express-validator'
import jwt from 'jsonwebtoken'
import { validateRequest, BadRequestError } from '../../common'

import { Password } from '../../services/password'
import { User } from '../../models/user'

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
    const { email, password, redirectURI } = req.body

    const redirect = decodeURI(redirectURI)

    const existingUser = await User.findOne({ email })
    if (!existingUser) {
      throw new BadRequestError('Invalid credentials')
    }

    const passwordsMatch = await Password.compare(existingUser.password, password)
    if (!passwordsMatch) {
      throw new BadRequestError('Invalid Credentials')
    }

    // Generate JWT
    // const userJwt = jwt.sign(
    //   {
    //     id: existingUser.id,
    //     email: existingUser.email,
    //   },
    //   process.env.JWT_KEY!
    // )

    // Store it on session object
    // req.session = {
    //   jwt: userJwt,
    // }

    if (!redirect || redirect === '' || redirect === 'null') {
      res.status(200).send(existingUser)
    } else {
      res.redirect(redirect)
    }
  }
)

export { router as signinRouter }
