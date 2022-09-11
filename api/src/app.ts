import express from 'express'
import 'express-async-errors'
import { json } from 'body-parser'
import cors from 'cors'

import { currentUser, errorHandler, NotFoundError } from './common'

import { currentUserRouter } from './routes/auth/current-user'
import { signinRouter } from './routes/auth/signin'
import { signoutRouter } from './routes/auth/signout'
import { signupRouter } from './routes/auth/signup'
import { refreshTokenRouter } from './routes/auth/refresh-token'
import { createRoleRouter } from './routes/auth/create-role'

import { facilityRouter } from './routes/facility'
import { visitRouter } from './routes/visit'

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

// set the express listening port
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3001

const app = express()
app.set('trust proxy', true)
app.use(json())
app.use(cors({ origin: ['https://localhost:3000', 'https://localhost:5000'], credentials: true }))

// Middleware to set the current user, if available, to all the requests
app.use(currentUser)

app.use(currentUserRouter)
app.use(signinRouter)
app.use(signoutRouter)
app.use(signupRouter)
app.use(refreshTokenRouter)
app.use(createRoleRouter)
app.use(facilityRouter)
app.use(visitRouter)

app.all('*', async () => {
  throw new NotFoundError()
})

app.use(errorHandler)

export { app, PORT }
