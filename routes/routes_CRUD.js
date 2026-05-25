import express from 'express'
import { Event } from '../models/event_schema.js'
const ROUTER = express.Router()

// +----------+ New routes from imports go here +---------+
// kanske behöver lägga till mer tillfälligt atm
ROUTER.get('/current_events', async (req, res) => {
  const limit = 12
  const offset = req.query.offset

  const events = await Event.find({archived: false}).sort({datetime: -1}).skip(offset).limit(limit)
  res.json(events)
})

ROUTER.get('/archived_events', async (req, res) => {
  const limit = 12
  const offset = req.query.offset

  const events = await Event.find({archived: true}).sort({datetime: -1}).skip(offset).limit(limit)
  console.log(events)
  res.json(events)
})

// +------------------------------------------------------+

export {ROUTER}