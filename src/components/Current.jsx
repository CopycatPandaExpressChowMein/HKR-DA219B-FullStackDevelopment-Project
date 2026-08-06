import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

function Current() {
	//Alla regioner i sverige, ska fyllas i med kommun med
	const locationMasterKey = [
		["Blekinge", ["Test1", "Test2"]],
		["Dalarna", ["Test3", "Test4", "Test5"]],
		["Gotland", []],
		["Gävleborg", []],
		["Halland", []],
		["Jämtland", []],
		["Jönköping", []],
		["Kalmar", []],
		["kronoberg", []],
		["Norrbotten", []],
		["Skåne", []],
		["Stockholm", []],
		["Södermanland", []],
		["Uppsala", []],
		["Värmland", []],
		["Västerbotten", []],
		["Västernorrland", []],
		["Västmanland", []],
		["Västra Götaland", []],
		["Örebro", []],
		["Östergötland", []]
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
