import express, { Request, Response } from 'express'
import { body } from 'express-validator'
import { constants } from 'http2'

import { validateRequest } from '../../common'
import { createRole } from '../../services/auth'

const router = express.Router()

/**
 * @openapi
 * /roles:
 *   post:
 *     description: Returns the created role
 *     tags:
 *      - Role
 *     produces:
 *      - application/json
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The role's name.
 *                 example: 'administrator'
 *     security: []    # no authentication
 *     responses:
 *      '200':
 *         description: Successfully role created. The role just created is returned in a response body.
 *         headers:
 *           Authorization:
 *             schema:
 *               type: string
 *               example: Bearer fadsuyhds876fd789yfdadjsfhasdf789
 */
router.post(
  '/v1/roles',
  [body('name').trim().notEmpty().withMessage('A role name is required')],
  validateRequest,
  async (req: Request, res: Response) => {
    const { name } = req.body

    const role = await createRole(name)

    res.status(constants.HTTP_STATUS_CREATED).send(role)
  }
)

export { router as createRoleRouter }
