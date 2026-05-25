import { useState } from "react";

function Login({ onClose }) {
	const [isRegister, setIsRegister] = useState(false);
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const handleSubmit = async () => {
		if (!email || !password) {
			alert("Fyll i email och lösenord");
			return;
		}

		if (isRegister && !username) {
			alert("Fyll i användarnamn");
			return;
		}

		if (!email.includes("@")) {
			alert("Skriv en giltig email");
			return;
		}

		if (password.length < 6) {
			alert("Lösenord måste vara minst 6 tecken");
			return;
		}

		if (isRegister && password !== confirmPassword) {
			alert("Lösenorden matchar inte");
			return;
		}

		const url = isRegister
			? "http://localhost:3000/login/register"
			: "http://localhost:3000/login/login";

		const body = isRegister
			? { username, email, password }
			: { email, password };

		const res = await fetch(url, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(body),
		});

		const data = await res.json();

		if (!res.ok) {
			alert(data.message || "Något gick fel");
			return;
		}

		if (data.token) {
			localStorage.setItem("token", data.token);
			alert("Inloggad!");
			onClose();
		} else if (data.message === "Registered") {
			alert("Registrerad! Logga in nu.");
			setIsRegister(false);
		} else {
			alert(data.message);
		}
	};

	return (
		<div className="modal-overlay" onClick={onClose}>
			<div className="modal-card" onClick={(e) => e.stopPropagation()}>
				<h3>{isRegister ? "Registrera dig" : "Logga in"}</h3>

				{isRegister && (
					<input
						className="login-input"
						type="text"
						placeholder="Användarnamn"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
					/>
				)}

				<input
					className="login-input"
					type="email"
					placeholder="Email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>

				<input
					className="login-input"
					type="password"
					placeholder="Lösenord"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>

				{isRegister && (
					<input
						className="login-input"
						type="password"
						placeholder="Bekräfta lösenord"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
					/>
				)}

				<div className="login-actions">
					<button
						className="modal-close"
						onClick={() => setIsRegister(!isRegister)}
					>
						{isRegister ? "Har konto? Logga in" : "Registrera dig"}
					</button>

					<button className="modal-close" onClick={handleSubmit}>
						{isRegister ? "Registrera" : "Logga in"}
					</button>
				</div>

				<button className="modal-close login-close" onClick={onClose}>
					Stäng
				</button>
			</div>
		</div>
	);
}

export default Login;
