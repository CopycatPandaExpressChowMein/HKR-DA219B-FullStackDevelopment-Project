import express from 'express'
import logger from 'morgan'
import {ROUTER} from '../routes/routes_index.js'


const APP = express()

APP.use(logger('dev', {
    immediate: true,
    skip: () => process.env.NODE_ENV === 'test'
}))
APP.use(express.static('public'))
APP.use('/', ROUTER)

//TODO: Add eslint 'https://gitlab.com/mikael-roos/node/-/tree/main/src/express5/hello?ref_type=heads#add-a-linter-with-eslint'
//TODO: Look into and potentially add error handler 
 
const PORT = process.env.PORT || 3001 //Different port from .env 
APP.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})