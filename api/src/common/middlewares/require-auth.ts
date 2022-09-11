import { Request, Response, NextFunction } from 'express'

import { NotAuthorizedError } from '../errors/not-authorized-error'

const checker = (userRoles: (string | undefined)[], allowedRoles: string[]) => {
  for (const userRole of userRoles) {
    if (userRole && allowedRoles.includes(userRole)) return true
  }
  return false
}

export const requireAuth = (allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.currentUser) {
      throw new NotAuthorizedError('No current user available!')
    }

    const currentUser = req.currentUser
    if (!currentUser.roles)
      throw new Error(`No roles available for the current user: ${currentUser.username}`)

    const currentUserRoles = currentUser.roles.map((item) => item.name)
    if (!checker(currentUserRoles, allowedRoles))
      throw new NotAuthorizedError(`Access denied for user "${currentUser.username}"`)

    next()
  }
}
