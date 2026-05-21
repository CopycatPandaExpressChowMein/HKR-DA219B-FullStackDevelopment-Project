import express from 'express'

import { ROUTER as LOGINROUTER } from './routes_login.js'
import { ROUTER as CRUDROUTER } from './routes_CRUD.js'

const ROUTER = express.Router()

ROUTER.use('/login', LOGINROUTER)
ROUTER.use('/CRUD', CRUDROUTER)

export { ROUTER }