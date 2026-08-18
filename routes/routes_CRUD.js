import express from "express";
import { Event } from "../models/event_schema.js";

const ROUTER = express.Router();

// +----------+ New routes from imports go here +---------+
// kanske behöver lägga till mer tillfälligt atm
ROUTER.get("/current_events", async (req, res) => {
	const limit = 12;
	const offset = req.query.offset;
	const location_filter = req.query.location_filter.split(',');
	const type_filter = req.query.type_filter.split(',');


	let query = {archived: false}
	if(location_filter[0] !== '') {
		query.location = {name: {$in: location_filter}}
		query = {archived: false, "location.name": {$in: location_filter.map(location => new RegExp(location))}}
	}
	if(type_filter[0] !== ''){
		query.type = {$in: type_filter}
	}	

	console.log(query)

	const events = await Event.find(query)
		.sort({ datetime: -1 })
		.skip(offset)
		.limit(limit);
	res.json(events);
});

ROUTER.get("/archived_events", async (req, res) => {
	const limit = 12;
	const offset = req.query.offset;

	const events = await Event.find({ archived: true })
		.sort({ datetime: -1 })
		.skip(offset)
		.limit(limit);
	console.log(events);
	res.json(events);
});

ROUTER.get("/types_events", async (req, res) => {
	const event_types = await Event.find({archived: false}, {_id: 0, type: 1})
	res.json(event_types)
})

// +------------------------------------------------------+

export { ROUTER };
