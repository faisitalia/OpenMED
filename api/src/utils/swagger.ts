import { Express, Request, Response } from 'express'
import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'

import { version } from '../../package.json'
import swaggerSpecJSON from './swagger-spec.json'

const options: swaggerJsdoc.Options = swaggerSpecJSON

// set current version
if (options.definition) {
  options.definition.info.version = version
}

const swaggerSpec = swaggerJsdoc(options)

function swaggerDocs(app: Express, port: number) {
  // Swagger page
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

  // Docs in JSON format
  app.get('/docs.json', (req: Request, res: Response) => {
    res.setHeader('Content-Type', 'application/json')
    res.send(swaggerSpec)
  })

  console.info(`Docs available at http://localhost:${port}/docs`)
}

export default swaggerDocs
