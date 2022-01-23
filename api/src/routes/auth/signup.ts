import express, { Request, Response } from 'express'
import { body } from 'express-validator'
import jwt from 'jsonwebtoken'
import { validateRequest, BadRequestError } from '../../common'

import { User } from '../../models/user'

const router = express.Router()

/**
 * @openapi
 * /users/signup:
 *   post:
 *     description: Returns the nearest facilities to the coordinates sent via query parameters
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
 *                 description: The user's name.
 *                 example: password
 *     security: []    # no authentication
 *     responses:
 *      '200':
 *         description: Successfully signed up. The session ID is returned in a cookie named `jwt`. You need to include this cookie in subsequent requests.
 *         headers:
 *           Set-Cookie:
 *             schema:
 *               type: string
 *               example: jwt=abcde12345; Path=/; HttpOnly
 */
router.post(
  '/v1/users/signup',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Password must be between 4 and 20 characters'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body

    const existingUser = await User.findOne({ email })

    if (existingUser) {
      throw new BadRequestError('Email in use')
    }

    // create the person

    const user = User.build({ email, password })
    await user.save()

    // Generate JWT
    const userJwt = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_KEY!
    )

    // Store it on session object
    req.session = {
      jwt: userJwt,
    }

    res.status(201).send(user)
  }
)

export { router as signupRouter }
