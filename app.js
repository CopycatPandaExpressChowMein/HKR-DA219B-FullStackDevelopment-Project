import express from 'express'
import logger from 'morgan'
import cron from 'node-cron'
import {ROUTER} from './routes/routes_index.js'
import {connect} from './config/db.js'
import {retrieve, addToDB} from './models/police_api_connection.js'
import cors from 'cors'

const APP = express()
const DB = connect()

cron.schedule('*/10 * * * *', async () => {
    const data = await retrieve()
    await addToDB(data)
})

APP.use(logger('dev', {
    immediate: true,
    skip: () => process.env.NODE_ENV === 'test'
}))
APP.use(express.static('public'))
APP.use('/', ROUTER)

APP.use(cors({                    
  origin: 'http://localhost:5173'
}))
//TODO: Add eslint 'https://gitlab.com/mikael-roos/node/-/tree/main/src/express5/hello?ref_type=heads#add-a-linter-with-eslint'
//TODO: Look into and potentially add error handler 
 
const PORT = process.env.PORT || 3001 //Different port from .env 
APP.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})