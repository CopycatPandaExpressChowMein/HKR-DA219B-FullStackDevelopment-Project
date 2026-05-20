import { Event } from "./event_schema.js"

async function retrieve(){
    const URL = 'https://polisen.se/api/events'
    try {
        const res = await fetch(URL)

        if(!res.ok) {
            throw new Error(`Response status: ${res.status}`)
        }

        const data = await res.json()
        console.log('Data retrieved without issue...')
        return data

    } catch (err) {
        console.log("Retrieval failed:", err.message);
    }
}

async function addToDB(data){
    for(const eventObj of data){    
        try {
            const event = new Event({
                datetime: Date.parse(eventObj.datetime),
                eventId: eventObj.id,
                type: eventObj.type,
                summary: eventObj.summary,
                location: eventObj.location,
                url: eventObj.url
            })
            console.log(event)
            
            console.log("Attempting to save event to DB...")
            await event.save()
            console.log("Succesfully saved...")
            } 
        catch (err) {
            if(err.name === 'ValidationError'){
                console.log('Entry exists, updating...')
                Event.findOneAndUpdate(
                    {eventId: eventObj.id},
                    {
                        datetime: Date.parse(eventObj.datetime),
                        type: eventObj.type,
                        summary: eventObj.summary,
                        location: eventObj.location,
                        url: eventObj.url,
                        lastUpdate: Date.now
                    }
                )
            }
            else{
                console.log('Save failed: ' + err.message)
            }
        }
    }
}


export {retrieve, addToDB}