const http               = require('http')
const cors               = require('cors')
const YAML               = require('yamljs')
const helmet             = require('helmet')
const express            = require('express')
const bodyParser         = require('body-parser')
const compression        = require('compression')
const cookieParser       = require('cookie-parser')
const swaggerUi          = require('swagger-ui-express')
const methodOverride     = require('method-override')
const xrayExpress        = require('aws-xray-sdk-express')
const customCache        = require('../helpers/custom-cache')
const customErrorHandler = require('../helpers/custom-error-handler')

class Webserver {
  constructor (port = 3000, options = {}) {
    this.port = port
    this.options = options
  }

  configure (app) {
    const { initialPluginList, routeList, finalPluginList } = this.options

    app.use(xrayExpress.openSegment('defaultName'))
    app.use(helmet())
    app.use(methodOverride())
    app.use(cookieParser())
    app.use(bodyParser.json({ limit: this.options.bodyParserLimit }))
    app.use(bodyParser.urlencoded({ limit: this.options.bodyParserLimit, extended: false }))

    // app.use(bodyParser.urlencoded({extended: true }))
    // app.use(bodyParser.json())

    app.use(compression())
    app.use(cors())
    app.use(customCache)

    if (this.options.swagger) {
      const path = this.options.swagger.prefix ? `${this.options.swagger.prefix}/swagger` : '/swagger'
      app.use(path, swaggerUi.serve, swaggerUi.setup(YAML.load(this.options.swagger.yaml)))
    }

    if (initialPluginList && initialPluginList.length > 0) {
      initialPluginList.forEach((middleware) => app.use(middleware))
    }

    if (routeList && routeList.length > 0) {
      routeList.forEach((routeObj) => app.use(routeObj.prefix, this.mountRoutes(routeObj.routes)))
    }

      app.set('trust proxy', 1)
      app.get('/health', (req, res) => {
      res.end(`OK for ${process.uptime()} seconds`)
    })

    if (finalPluginList && finalPluginList.length > 0) {
      finalPluginList.forEach((middleware) => app.use(middleware))
    }

    app.use(xrayExpress.closeSegment())
    app.use(customErrorHandler)
  }

  mountRoutes (routesToMount) {
    const expressRouter = express.Router()

    Object.keys(routesToMount).forEach((httpVerb) => {
      routesToMount[httpVerb].forEach((route) => {
        expressRouter[httpVerb.toLowerCase()](route.path, route.handlers)
      })
    })

    return expressRouter
  }

  init () {

    const app = express()
    const httpServer = http.createServer(app)

    this.configure(app)
    this.server = httpServer.listen(this.port)
    this.server.setTimeout(300000)

    console.log(`Servidor da Web escutando na porta ${this.port}`)

  }

  getServer () {   
    return this.server
  } 
  

}

module.exports = Webserver
