import express from 'express'
import { currentUser } from '../../common'

const router = express.Router()

/**
 * @openapi
 * /users/currentuser:
 *   get:
 *     description: Returns the logged user details
 *     tags:
 *      - User
 *     produces:
 *      - application/json
 *     responses:
 *       200:
 *         description: JSON Object with the logged user details
 */
router.get('/v1/users/currentuser', currentUser, async (req, res) => {
  res.send({ currentUser: req.currentUser || null })
})

export { router as currentUserRouter }
