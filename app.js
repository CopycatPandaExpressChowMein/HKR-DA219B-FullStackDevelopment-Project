import express from 'express'
import logger from 'morgan'
import cron from 'node-cron'
import cors from 'cors'
import {ROUTER} from './routes/routes_index.js'
import {connect} from './config/db.js'
import {retrieve, addToDB} from './models/police_api_connection.js'
<<<<<<< HEAD
<<<<<<< HEAD
import cors from "cors";
import dotenv from "dotenv";



dotenv.config();
=======
import cors from 'cors'
>>>>>>> 7ac524e58394584b8d0fdaeaa072e657a0ca5d73
=======

>>>>>>> 3137ae02fb077ee26ffb0af61c288ec1252eb268

const APP = express()
const DB = connect()

<<<<<<< HEAD
APP.use(cors());
APP.use(express.json());

=======
APP.use(cors({                    
  origin: 'http://localhost:5173'
}))
>>>>>>> 3137ae02fb077ee26ffb0af61c288ec1252eb268
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


//TODO: Add eslint 'https://gitlab.com/mikael-roos/node/-/tree/main/src/express5/hello?ref_type=heads#add-a-linter-with-eslint'
//TODO: Look into and potentially add error handler 
 
const PORT = process.env.PORT || 3001 //Different port from .env 
APP.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})


