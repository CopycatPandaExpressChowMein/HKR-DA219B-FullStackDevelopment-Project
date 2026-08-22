import { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

function Arkiv() {
    //Alla regioner i sverige, ska fyllas i med kommun med
    const locationMasterKey = [
        ["Blekinge", ["Karlskrona", "Karlshamn", "Ronneby", "Sölvesborg", "Olofström"]],
        ["Dalarna", ["Avesta", "Borlänge", "Falu", "Gagnef", "Hedemora", "Leksand", "Ludvika", "Malung-Sälen", "Mora", "Orsa", "Rättvik", "Smedjebacken", "Säter", "Vansbro", "Älvdalen"]],
        ["Gotland", ["Region Gotland"]],
        ["Gävleborg", ["Bollnäs", "Gävle", "Hofors", "Hudiksvall", "Ljusdal", "Nordanstig", "Ockelbo", "Ovanåker", "Sandviken", "Söderhamn"]],
        ["Halland", ["Falkenberg", "Halmstad", "Hylte", "Kungsbacka", "Laholm", "Varberg"]],
        ["Jämtland", ["Berg", "Bräcke", "Härjedalen", "Krokom", "Ragunda", "Strömsund", "Åre", "Östersund"]],
        ["Jönköping", ["Aneby", "Eksjö", "Gislaved", "Gnosjö", "Habo", "Jönköping", "Mullsjö", "Nässjö", "Sävsjö", "Tranås", "Vaggeryd", "Vetlanda", "Värnamo"]],
        ["Kalmar", ["Borgholm", "Emmaboda", "Hultsfred", "Högsby", "Kalmar", "Mönsterås", "Mörbylånga", "Nybro", "Oskarshamn", "Torsås", "Vimmerby", "Västervik"]],
        ["kronoberg", ["Alvesta", "Lessebo", "Ljungby", "Markaryd", "Tingsryd", "Uppvidinge", "Växjö", "Älmhult"]],
        ["Norrbotten", ["Arjeplog", "Arvidsjaur", "Boden", "Gällivare", "Haparanda", "Jokkmokk", "Kalix", "Kiruna", "Luleå", "Pajala", "Piteå", "Älvsbyn", "Överkalix", "Övertorneå"]],
        ["Skåne", ["Malmö", "Helsingborg", "Lund", "Kristianstad", "Hässleholm", "Landskrona", "Trelleborg", "Ängelholm", "Vellinge", "Eslöv", "Kävlinge", "Ystad", "Höganäs", "Staffanstorp", "Lomma", "Svedala", "Burlöv", "Sjöbo", "Simrishamn", "Höör", "Klippan", "Skurup", "åstorp", "Bjuv", "Båstad", "Hörby", "Svalöv", "Östra Göinge", "Tomelilla", "Osby", "Bromölla", "Örkelljunga", "Perstorp"]],
        ["Stockholm", ["Botkyrka", "Danderyd", "Ekerö", "Haninge", "Huddinge", "Järfälla", "Lidingö", "Nacka", "Norrtälje", "Nykvarn", "Nynäshamn", "Salem", "Sigtuna", "Sollentuna", "Solna", "Stockholm", "Sundbyberg", "Södertälje", "Tyresö", "Täby", "Upllands Väsby", "Upplands-Bro", "Vallentuna", "Vaxholm", "Värmdö", "Österåker"]],
        ["Södermanland", ["Eskilstuna", "Flens", "Gnesta", "Katrineholm", "Nyköping", "Oxelösund", "Strängnäs", "Trosa", "Vingåker"]],
        ["Uppsala", ["Enköping", "Heby", "Håbo", "Knivsta", "Tierp", "Uppsala", "Älvkarleby", "Östhammar"]],
        ["Värmland", ["Arvika", "Eda", "Filipstad", "Forshaga", "Grums", "Hagfors", "Hammarö", "Karlstad", "Kil", "Kristinehamn", "Munkfors", "Storfors", "Sunne", "Säffle", "Torsby", "Årjäng"]],
        ["Västerbotten", ["Bjurholm", "Dorotea", "Lycksele", "Malå"], "Nordmaling", "Norsjö", "Robertsfprs", "Skellefteå", "Sorsele", "Storuman", "Umeå", "Vilhelmina", "Vindeln", "Vännäs", "Åsele"],
        ["Västernorrland", ["Härnösand", "kramfors", "Sollefteå", "Sundsvall", "Timrå", "Ånge", "Örnsköldvik"]],
        ["Västmanland", ["Arboga", "Fagersta", "Hallstahammar", "Kungsör", "Köping", "Norberg", "Sala", "Skinnskatteberg", "Surahammar", "Västerås"]],
        ["Västra Götaland", ["Ale", "Alingsås", "bengtsfors", "Bollebygd", "Borås", "Dals-Eds", "Essunga", "Falköping", "Färgelanda", "Grästorp", "Gullspång", "Göteborg", "Götene", "Herrljunga", "Hjo", "Härryda", "Karlsborg", "Kungälv", "Lerum", "Lidköping", "Lilla Edet", "Lysekil", "Mariestad", "Mark", "Mellerud", "Munkedal", "Mölndal", "Orus", "Partille", "Skara", "Skövde", "Sotenäs", "Stenungsund", "Strömstad", "Svenljunga", "Tanum", "Tjörn", "Tranemo", "Trollhättan", "Töreboda", "Uddevalla", "Ulricehamn", "Vara", "Vårgårda", "Vänersborg", "Åmål", "Öckerö"]],
        ["Örebro", ["Askersund", "Degerfors", "Hallsberg", "Hällefors", "Karlskoga", "Kumla", "Laxå", "Lekeberg", "Lindesberg", "Ljusnarsberg", "Nora", "Örebro"]],
        ["Östergötland", ["Boxholm", "Finspång", "Kinda", "Linköping", "Mjölny", "Motala", "Norrköping", "Söderköping", "Vadstena", "Valemarsviks", "Ydre", "Åtvidaberg", "Ödeshög"]]
    ]

    const eventTypeMasterKey = [] //Kanske testa att hämta all event typer som finns från databasen istället?

    const [events, setEvents] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [selected, setSelected] = useState(null);

    const [locationDropDownOpen, setLocationDropDownOpen] = useState(false)
    const [selectedRegionDropDown, setSelectedRegionDropDown] = useState(null)
    const [selectedRegion, setSelectedRegion] = useState({})

    const [eventTypeDropDownOpen, setEventTypeDropDownOpen] = useState(false)
    const [types, setTypes] = useState([])
    const [selectedTypes, setSelectedTypes] = useState({})

    const [newCommentContent, setNewCommentContent] = useState("");

    const handleLocationChange = (e) => {
        const target = e.target
        const value = target.checked
        const name = target.name
        setSelectedRegion(values => ({...values, [name]: value}))
        setHasMore(true)
        setEvents([])
    }

    const handleTypeChange = (e) => {
        const target = e.target
        const value = target.checked
        const name = target.name
        setSelectedTypes(values => ({...values, [name]: value}))
        setHasMore(true)
        setEvents([])
    }

    const handleCommentSend = async () => {
        if (!newCommentContent.trim() || !selected) return;

        const res = await fetch(
            `${window.location.origin}/CRUD/archived_events/${selected.eventId}/comments`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ body: newCommentContent }),
            }
        );

        if (res.ok) {
            const newComment = await res.json();
            setSelected((prev) => ({
                ...prev,
                comments: [...prev.comments, newComment],
            }));
            setNewCommentContent("");
        }
    };

    const fetchMore = async () => {

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
    };

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

    return (
        <div className="page">
            <h2>Arkiv</h2>
            <p>Arkiverade polishändelser i Sverige</p>

            <div className="menu-wrapper">
                <button
                    className="dropdown-menu-button"
                    type="button"
                    onClick={() => setLocationDropDownOpen(!locationDropDownOpen)}
                >
                    Plats
                </button>

                {locationDropDownOpen && (
                    <div className="filter-dropdown-menu">
                        {locationMasterKey.map((region) => (
                            <label className="filter-dropdown-item" key={region[0]}>
                                {region[0]}
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

            <div className="menu-wrapper">
                <button
                    className="dropdown-menu-button"
                    type="button"
                    onClick={() => setEventTypeDropDownOpen(!eventTypeDropDownOpen)}
                >
                    Typ
                </button>

                {eventTypeDropDownOpen && (
                    <div className="filter-dropdown-menu">
                        {types.map((type) => (
                            <label className="filter-dropdown-item" key={type}>
                                {type}
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

                        <div className="comment-section">
                            <h4>Kommentarer</h4>

                            {selected.comments.length === 0 && (
                                <p className="comment-empty">Inga kommentarer än.</p>
                            )}

                            {selected.comments.map((comment, i) => (
                                <div className="comment-item" key={i}>
                                    <div className="comment-meta">
                                        <span className="comment-author">{comment.author}</span>
                                        <span className="comment-time">{comment.date}</span>
                                    </div>
                                    <p className="comment-text">{comment.body}</p>
                                </div>
                            ))}

                            <div className="comment-input-row">
                                <input
                                    className="login-input"
                                    type="text"
                                    id="newCommentContent"
                                    name="newCommentContent"
                                    placeholder="Skriv en kommentar..."
                                    value={newCommentContent}
                                    onChange={(e) => setNewCommentContent(e.target.value)}
                                />
                                <button
                                    className="comment-submit-btn"
                                    type="button"
                                    onClick={handleCommentSend}
                                >
                                    Skicka
                                </button>
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