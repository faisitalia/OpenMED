import express from 'express'
import 'express-async-errors'
import { json } from 'body-parser'
import cookieSession from 'cookie-session'
import cors from 'cors'

import { errorHandler, NotFoundError, currentUser } from './common'

import { currentUserRouter } from './routes/auth/current-user'
import { signinRouter } from './routes/auth/signin'
import { signoutRouter } from './routes/auth/signout'
import { signupRouter } from './routes/auth/signup'

import { facilityRouter } from './routes/facility'
import { visitRouter } from './routes/visit'

import swaggerDocs from './utils/swagger'

// set the express listening port
const PORT: number = process.env.PORT ? parseInt(process.env.PORT) : 3001

const app = express()
app.set('trust proxy', true)
app.use(json())
app.use(cors({ origin: ['https://localhost:3000', 'https://localhost:5000'], credentials: true }))
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  })
)
app.use(currentUser)

app.use(currentUserRouter)
app.use(signinRouter)
app.use(signoutRouter)
app.use(signupRouter)
app.use(facilityRouter)
app.use(visitRouter)

// run swagger/openapi docs
swaggerDocs(app, 3001)

app.all('*', async (req, res) => {
  throw new NotFoundError()
})

app.use(errorHandler)

export { app, PORT }
