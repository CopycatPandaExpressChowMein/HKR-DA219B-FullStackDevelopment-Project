import express from 'express'

const ROUTER = express.Router()

// +----------+ New routes from imports go here +---------+


//Route for testing
//TO BE REMOVED
ROUTER.get('/test', (req, res) => {
    res.send('This is a test route.')
})

// +------------------------------------------------------+

export {ROUTER}