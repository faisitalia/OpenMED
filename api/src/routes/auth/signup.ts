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
 *     description: Returns the just created user
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
 *               username:
 *                 type: string
 *                 description: The user's name.
 *                 example: user
 *               password:
 *                 type: string
 *                 description: The user's name.
 *                 example: password
 *     security: []    # no authentication
 *     responses:
 *      '200':
 *         description: Successfully signed up. The user just created is returned in a response body.
 *         headers:
 *           Authorization:
 *             schema:
 *               type: string
 *               example: Bearer fadsuyhds876fd789yfdadjsfhasdf789
 */
router.post(
  '/v1/users/signup',
  [
    body('username').trim().notEmpty().withMessage('Username is required'),
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
    const { username, email, password, firstname, lastname, birthdate } = req.body

    // TODO transaction

    // create the person
    const personDoc = Person.build({ firstname, lastname, birthdate })
    await personDoc.save()

    const userId = await createUser(username, email, password)

    // retrieve the user just created
    const user = await getUserById(userId)

    res.status(constants.HTTP_STATUS_CREATED).send(user)
  }
)

export { router as signupRouter }
