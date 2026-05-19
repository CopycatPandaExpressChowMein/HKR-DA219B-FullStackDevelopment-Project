import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
    datetime: Date,
    type: String,
    summary: String,
    location: {
        locationName: String,
        gps: String
    },
    url: String,
    comments: {
        body: String,
        date: Date
    },
    lastUpdate: {type: Date, default: Date.now},
    archived: Boolean
})

const event = mongoose.model('event', eventSchema)

export {event}