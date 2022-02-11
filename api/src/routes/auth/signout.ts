import express from 'express'

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
router.post('/v1/users/signout', (req, res) => {
  // @TODO: In order to test it, currentUser has to be logged in
  // await kcAdminClient.users.logout({id: currentUser.id!});
  res.send({})
})

export { router as signoutRouter }
