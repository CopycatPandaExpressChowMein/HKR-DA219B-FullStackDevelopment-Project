import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const eventSchema = new mongoose.Schema({
    datetime: Date,
    eventId: {
        type: Number,
        unique: true
    },
    type: String,
    summary: String,
    location: {
        name: String,
        gps: String
    },
    url: String,
    comments: [{
        author: String,
        body: String,
        date: {type: Date, default: Date.now}
    }],
    lastUpdate: {type: Date, default: Date.now},
    archived: {type: Boolean, default: false}
})

eventSchema.plugin(uniqueValidator)

const Event = mongoose.model('event', eventSchema)

export {Event}