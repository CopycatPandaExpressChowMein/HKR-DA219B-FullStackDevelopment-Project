import { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

function Arkiv() {
    //Alla regioner i sverige, ska fyllas i med kommun med
	const locationMasterKey = [
		["Blekinge"],
		["Dalarna"],
		["Gotland"],
		["Gävleborg"],
		["Halland"],
		["Jämtland"],
		["Jönköping"],
		["Kalmar"],
		["Kronoberg"],
		["Norrbotten"],
		["Skåne"],
		["Stockholm"],
		["Södermanland"],
		["Uppsala"],
		["Värmland"],
		["Västerbotten"],
		["Västernorrland"],
		["Västmanland"],
		["Västra Götaland"],
		["Örebro"],
		["Östergötland"]
	]

    const [events, setEvents] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [selected, setSelected] = useState(null);

    const [locationDropDownOpen, setLocationDropDownOpen] = useState(false)
    const [selectedRegion, setSelectedRegion] = useState({})

    const [eventTypeDropDownOpen, setEventTypeDropDownOpen] = useState(false)
    const [types, setTypes] = useState({})
    const [selectedTypes, setSelectedTypes] = useState({})
    
    const handleLocationChange = (e) => {
        const target = e.target
        const value = target.checked
        const name = target.name
        setSelectedRegion(values => ({...values, [name]: value}))
    }

    const handleTypeChange = (e) => {
        const target = e.target
        const value = target.checked
        const name = target.name
        setSelectedTypes(values => ({...values, [name]: value}))
    }

    const fetchMore = async () => {
        try{
            const location_filter = Array.from(Object.keys(Object.fromEntries(Object.entries(selectedRegion).filter(([, val]) => val === true))))
            const type_filter = Array.from(Object.keys(Object.fromEntries(Object.entries(selectedTypes).filter(([, val]) => val === true))))

            const params = new URLSearchParams()
            params.append('offset', events.length)
            params.append('location_filter', location_filter)
            params.append('type_filter', type_filter)
            const res = await fetch(
                `${window.location.origin}/CRUD/archived_events?${params}`
            );
            const next = await res.json();
            if (next.length === 0) {
                setHasMore(false);
                return;
            }
            else if(next.length < 12){
                setHasMore(false)
            }
            setEvents((prev) => [...prev, ...next]);
        } catch(error){
            console.error("Failed to fetch events: ", error)
            alert('Failed to fetch events: ' + error)
        }
    };
    //Fetches all types of events currently in the database on components initial load
    useEffect(() => {
        const fetchEventTypes = (async () => {
            const res = await fetch(
                `${window.location.origin}/CRUD/types_events_archived`
            )
            const data = await res.json()
            const filteredData = [...new Set(data.map(event => event.type).sort())]
            setTypes(filteredData)
        })()
    }, [])

    
    useEffect(() => {
        setEvents([]);
        setHasMore(true);
        fetchMore();
    }, [selectedRegion, selectedTypes]);

    return (
        <div className="page">
            <h2>Arkiv</h2>
            <p>Arkiverade polishändelser i Sverige</p>
            
            <div className="dropDown-Wrapper">
                <button 
                    className="dropDown-Button" 
                    type="button" 
                    onClick={() => setLocationDropDownOpen(!locationDropDownOpen)}
                >
                    Plats
                </button>

                {locationDropDownOpen && (
                    <div className="dropDown-Content">
                            {locationMasterKey.map((region) => (
                            <label className="dropDown-Item">{region[0]}
                                <input
                                    type="checkbox"
                                    name={region[0]}
                                    checked={!!selectedRegion[region[0]]}
                                    onChange={handleLocationChange}
                                />
                            </label>
                        ))}				
                    </div>
                )}
                
            </div>

            <div className="dropDown-Wrapper">
                <button 
                    className="dropDown-Button" 
                    type="button" 
                    onClick={() => setEventTypeDropDownOpen(!eventTypeDropDownOpen)}
                >
                    Typ
                </button>

                {eventTypeDropDownOpen && (
                    <div className="dropDown-Content">
                        {types.map((type) => (
                            <label className="dropDown-Item">{type}
                                <input
                                    type="checkbox"
                                    name={type}
                                    checked={!!selectedTypes[type]}
                                    onChange={handleTypeChange}
                                />
                            </label>
                        ))}
                    </div>
                )}
            </div>

            <InfiniteScroll
                className="card-grid feed-grid"
                dataLength={events.length}
                next={fetchMore}
                hasMore={hasMore}
                loader={<p style={{ textAlign: "center" }}>Laddar händelser...</p>}
                endMessage={
                    <p style={{ textAlign: "center" }}>Inga händelser hittades.</p>
                }
                style={{ overflow: "visible" }}
            >
                {events.map((event) => (
                    <article
                        className="event-card"
                        key={event.eventId}
                        onClick={() => setSelected(event)}
                        style={{ cursor: "pointer" }}
                    >
                        <span className="card-pill">{event.type}</span>
                        <h4>{event.summary}</h4>
                        <p>{event.location?.name}</p>
                        <p>{new Date(event.datetime).toLocaleDateString()}</p>
                    </article>
                ))}
            </InfiniteScroll>

            {selected && (
                <div className="modal-overlay" onClick={() => setSelected(null)}>
                    <div
                        className="modal-card modal-large"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <span className="card-pill">{selected.type}</span>
                        <h3>{selected.summary}</h3>
                        <p>
                            {selected.location?.name} —{" "}
                            {new Date(selected.datetime).toLocaleDateString()}
                        </p>

                        {selected.location?.gps && (
                            <iframe
                                title="karta"
                                width="100%"
                                height="500"
                                style={{ border: 0, borderRadius: "10px", marginTop: "15px" }}
                                src={`https://maps.google.com/maps?q=${selected.location.gps}&z=13&output=embed`}
                            />
                        )}

                        <div className="commentWrapper">
                            <div className="commentContainer">
                                {(selected.comments ?? []).map((comment) => (
                                    <div className="comment">
                                        <h4 className="commentAuthor">{comment.author}</h4>
                                        <p className="commentBody">{comment.body}</p>
                                        <p className="commentDate">{comment.date}</p>
                                    </div>
                                ))}
                            </div>							
                        </div>

                        <button
                            className="modal-close"
                            onClick={() => setSelected(null)}
                            style={{ marginTop: "15px" }}
                        >
                            Stäng
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Arkiv;
