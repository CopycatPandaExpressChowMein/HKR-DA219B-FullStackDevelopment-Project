import express from 'express'

// +----------+ Import Route files here +---------+
import {ROUTER as WEBPAGEROUTER} from './routes_webpages.js'
import {ROUTER as LOGINROUTER} from './routes_login.js'
import {ROUTER as CRUDROUTER} from './routes_CRUD.js'
// +----------------------------------------------+

const ROUTER = express.Router()

// +----------+ New routes from imports go here +---------+
ROUTER.use('/', WEBPAGEROUTER)
ROUTER.use('/login', LOGINROUTER)
ROUTER.use('/CRUD', CRUDROUTER)
// +------------------------------------------------------+


export {ROUTER}