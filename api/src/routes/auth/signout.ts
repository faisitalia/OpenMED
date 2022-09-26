import express, { Request, Response } from 'express'
import { constants } from 'http2'

import { logout } from '../../services/auth'
import { getUserInfo } from '../../services/user'

const router = express.Router()

/**
 * @openapi
 * /users/signout:
 *   post:
 *     description: Logout the current user
 *     tags:
 *      - Authentication
 *     produces:
 *      - application/json
 *     responses:
 *      '200':
 *         description: Successfully signed out. The access token is removed.
 */
router.post('/v1/users/signout', async (req: Request, res: Response) => {
  if (req.headers.authorization) {
    try {
      const bearer = req.headers.authorization.split(' ')
      const accessToken = bearer[1]

      const userInfo = await getUserInfo(accessToken)

      if (!userInfo.id) throw new Error(`User id non available for user ${userInfo}`)

      await logout(userInfo.id)

      res.status(constants.HTTP_STATUS_OK).send({})
    } catch (error: any) {
      throw new Error(error)
    }
  } else {
    res.status(constants.HTTP_STATUS_BAD_REQUEST).send({
      errors: [{ message: `Logout failed! No access token provided` }],
    })
  }
})

export { router as signoutRouter }
