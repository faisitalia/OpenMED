import { Request, Response, NextFunction } from 'express'
import { getUserInfo } from '../../services/auth'

interface UserPayload {
  id: string
  email: string
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
  const userInfo = await getUserInfo(bearerToken)

  try {
    // const payload = jwt.verify(
    //   req.session.jwt,
    //   process.env.JWT_KEY!
    // ) as UserPayload;
    if (userInfo && userInfo.sub) {
      req.currentUser = userInfo
    } else throw new Error(userInfo.error_description)
  } catch (err) {
    console.error(err)
  }

  next()
}
