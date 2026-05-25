import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

function Arkiv() {
	const [events, setEvents] = useState([]);
	const [hasMore, setHasMore] = useState(true);
	const [selected, setSelected] = useState(null);

	const fetchMore = async () => {
		const res = await fetch(
			`${window.location.origin}/CRUD/archived_events?offset=${events.length}`,
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
			<h2>Arkiv</h2>
			<p>Arkiverade polishändelser i Sverige</p>

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

export default Arkiv;
