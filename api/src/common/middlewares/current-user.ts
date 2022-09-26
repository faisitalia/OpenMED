import RoleRepresentation from '@keycloak/keycloak-admin-client/lib/defs/roleRepresentation'
import { Request, Response, NextFunction } from 'express'
import { getUserInfo } from '../../services/user'

interface UserPayload {
  id: string
  username: string
  email: string
  roles: RoleRepresentation[]
  errorDescription: string
}

declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload
    }
  }
}

export const currentUser = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.headers.authorization) {
    return next()
  }

  const bearer = req.headers.authorization.split(' ')
  const bearerToken = bearer[1]

  try {
    const userInfo = await getUserInfo(bearerToken)
    if (userInfo && userInfo.id) {
      req.currentUser = userInfo
    } else throw new Error(userInfo.errorDescription)
  } catch (err) {
    console.error('error in user info: ' + err)
  }

  next()
}
