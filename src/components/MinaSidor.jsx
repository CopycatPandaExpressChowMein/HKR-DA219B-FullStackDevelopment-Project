function MinaSidor() {
	const user = {
		name: "Namn Efternamn",
		phone: "xxx-xxxxxx",
		address: "Exempelgatan 1",
		email: "exempel@mail.com",
	};

	const comments = [];
	const savedEvents = [];

	return (
		<div className="page">
			<h2>Mina sidor</h2>
			<p>Din profil och dina inställningar</p>

			<div className="team-grid">
				<div className="team-card">
					<h3>Min information</h3>
					<span className="team-role">Profil</span>
					<p>Namn: {user.name}</p>
					<p>Telefon: {user.phone}</p>
					<p>Adress: {user.address}</p>
					<p>Email: {user.email}</p>
				</div>

				<div className="team-card">
					<h3>Kommentarer</h3>
					<span className="team-role">Aktivitet</span>
					{comments.length === 0 ? (
						<p>Inga kommentarer ännu.</p>
					) : (
						comments.map((c, i) => <p key={i}>{c}</p>)
					)}
				</div>

				<div className="team-card">
					<h3>Sparade händelser</h3>
					<span className="team-role">Sparade</span>
					{savedEvents.length === 0 ? (
						<p>Inga sparade händelser ännu.</p>
					) : (
						savedEvents.map((e, i) => <p key={i}>{e}</p>)
					)}
				</div>
			</div>
		</div>
	);
}

export default MinaSidor