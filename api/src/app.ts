import express from 'express'
import 'express-async-errors'
import { json } from 'body-parser'
import expressSession from 'express-session'
// import bodyParser from 'body-parser'
import cors from 'cors'

import { MemoryStore } from './session-store'

import { errorHandler, NotFoundError, currentUser } from './common'

import { currentUserRouter } from './routes/auth/current-user'
import { signinRouter } from './routes/auth/signin'
import { signoutRouter } from './routes/auth/signout'
import { signupRouter } from './routes/auth/signup'

import { facilityRouter } from './routes/facility'
import { visitRouter } from './routes/visit'

import swaggerDocs from './utils/swagger'
import { KcConnect } from './services/auth/config/keycloakConnect'

// set the express listening port
const PORT: number = process.env.PORT ? parseInt(process.env.PORT) : 3001

const app = express()
app.set('trust proxy', true)
// app.use(bodyParser.json())
app.use(json())
app.use(cors({ origin: ['https://localhost:3000', 'https://localhost:5000'], credentials: true }))

// Create a session-store to be used by both the express-session
// middleware and the keycloak middleware.
const memoryStore = MemoryStore.getInstance()

app.use(
  expressSession({
    secret: 'some secret',
    resave: false,
    saveUninitialized: true,
    store: memoryStore,
  })
)

// set up keycloak
const keycloak = KcConnect.getInstance()
app.use(keycloak.middleware())

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
