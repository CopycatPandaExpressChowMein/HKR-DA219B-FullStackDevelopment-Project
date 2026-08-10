import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

function Current() {
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
	const [selectedCommunities, setSelectedCommunities] = useState({})

	const [eventTypeDropDownOpen, setEventTypeDropDownOpen] = useState(false)
	const [selectedTypes, setSelectedTypes] = useState({})
	
	const handleLocationChange = (e) => {
		const target = e.target
		const value = target.checked
		const name = target.name
		setSelectedCommunities(values => ({...values, [name]: value}))
	}

	const handleTypeChange = (e) => {
		const target = e.target
		const value = target.checked
		const name = target.name
		setSelectedTypes(values => ({...values, [name]: value}))
	}

	const fetchMore = async () => {
		const res = await fetch(
			`${window.location.origin}/CRUD/current_events?offset=${events.length}`,
		);
		const next = await res.json();
		if (next.length === 0) {
			setHasMore(false);
			return;
		}
		setEvents((prev) => [...prev, ...next]);
	};

	return (
		<div className="page">
			<h2>Aktuellt</h2>
			<p>Aktuella polishändelser i Sverige</p>
			
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
						<div className="dropDown-Regions">
							{locationMasterKey.map((region) => (
							<button 
								className="dropDown-Item"
								type="button"
								onClick={() => setSelectedRegionDropDown(region)}
							>
								{region[0]}
							</button>
						))}
						</div>

						<div className="dropDown-Communities">
							{selectedRegionDropDown && (
								<div>
									{selectedRegionDropDown[1].map((community) => (
										<label className="dropDown-Item">{community}
											<input
												type="checkbox"
												name={community}
												checked={selectedCommunities.community}
												onChange={handleLocationChange}
											/>
										</label>
									))}
								</div>
							)}
						</div>						
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

export default Current;
