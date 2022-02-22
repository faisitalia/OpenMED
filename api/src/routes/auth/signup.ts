import express, { Request, Response } from 'express'
import { body } from 'express-validator'
import { constants } from 'http2'

import { validateRequest } from '../../common'
import { Person } from '../../models/person'
import { createUser, getUserById } from '../../services/auth'

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
    body('firstname').trim().not().isEmpty().isAlpha().withMessage('Firstname is required'),
    body('lastname').trim().not().isEmpty().isAlpha().withMessage('Lastname is required'),
    body('birthdate').isISO8601().toDate().withMessage('Birthdate is required'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password, firstname, lastname, birthdate } = req.body

    // const existingUser = await User.findOne({ email })

    // if (existingUser) {
    //   throw new BadRequestError('Email in use')
    // }

    // TODO transaction

    // create the person
    const personDoc = Person.build({ firstname, lastname, birthdate })
    const person = await personDoc.save()

    // create the user
    // const user = User.build({ email, password, role: Role.USER, personId: person.id })
    // await user.save()
    const username = `person_${person.id}`
    const userId = await createUser(username, email, password)

    // retrieve the user just created
    const user = await getUserById(userId)

    res.status(constants.HTTP_STATUS_CREATED).send(user)
  }
)

export { router as signupRouter }
