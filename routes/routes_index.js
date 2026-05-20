import express from 'express'

// +----------+ Import Route files here +---------+
import {ROUTER as WEBPAGEROUTER} from './routes_webpages.js'
import {ROUTER as LOGINROUTER} from './routes_login.js'
import {ROUTER as CRUDROUTER} from './routes_CRUD.js'
import { ROUTER as LOGIN_ROUTER } from "./routes_login.js";

// +----------------------------------------------+

const ROUTER = express.Router()

// +----------+ New routes from imports go here +---------+
ROUTER.use('/', WEBPAGEROUTER)
ROUTER.use('/login', LOGINROUTER)
ROUTER.use('/CRUD', CRUDROUTER)
ROUTER.use("/auth", LOGIN_ROUTER);
// +------------------------------------------------------+


export {ROUTER}