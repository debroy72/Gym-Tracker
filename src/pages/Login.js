import { useState } from "react";

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (username === "user" && password === "1234") {
      localStorage.setItem("isLoggedIn", "true"); // Store login state
      onLogin(true); // Notify App that login is successful
    } else {
      setError("Invalid username or password! ❌");
    }
  };

  return (
    <div className="login-container">
      <h2>🔐 Login to Gym Tracker</h2>

      {error && <p className="error">{error}</p>}

      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;