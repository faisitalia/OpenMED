import express, { Request, Response } from 'express'
import { constants } from 'http2'

import { getUserInfo, logout } from '../../services/auth'

const router = express.Router()

/**
 * @openapi
 * /users/signout:
 *   post:
 *     description: Logout the current user
 *     tags:
 *      - User
 *     produces:
 *      - application/json
 *     responses:
 *      '200':
 *         description: Successfully signed out. The session ID is removed.
 */
router.post('/v1/users/signout', async (req: Request, res: Response) => {
  if (req.headers.authorization) {
    const bearer = req.headers.authorization.split(' ')
    const accessToken = bearer[1]

    const userInfo = await getUserInfo(accessToken)

    await logout(userInfo.sub)

    res.status(constants.HTTP_STATUS_OK).send({})
  } else {
    res.status(constants.HTTP_STATUS_BAD_REQUEST).send({
      errors: [{ message: `Logout failed! No access token provided` }],
    })
  }
})

export { router as signoutRouter }
