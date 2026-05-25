import express from 'express'
import { Event } from '../models/event_schema.js'
const ROUTER = express.Router()

// +----------+ New routes from imports go here +---------+
// kanske behöver lägga till mer tillfälligt atm
ROUTER.get('/events', async (req, res) => {
  const events = await Event.find()
  res.json(events)
})

// +------------------------------------------------------+

export {ROUTER}