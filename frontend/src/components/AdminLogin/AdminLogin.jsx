import { useState } from "react";
import "./AdminLogin.css";

export default function AdminLogin({ onBack, onLogin, onOpenUserLogin }) {
  const [admin, setAdmin] = useState({ username: "", password: "" });

  function handleSubmit(e) {
    e.preventDefault();
    if (onLogin) {
      onLogin(admin);
    }
  }

  return (
    <div className="auth-screen">
      <div className="auth-card">
        <button type="button" className="back-btn" onClick={onBack}>←</button>

        <h1 className="title">Admin Login</h1>

        <form className="form" onSubmit={handleSubmit}>
          <div className="field">
            <input
              type="text"
              placeholder="Username"
              value={admin.username}
              onChange={(e) => setAdmin({ ...admin, username: e.target.value })}
              required
            />
            <span className="icon">👤</span>
          </div>

          <div className="field">
            <input
              type="password"
              placeholder="Password"
              value={admin.password}
              onChange={(e) => setAdmin({ ...admin, password: e.target.value })}
              required
            />
            <span className="icon">🔒</span>
          </div>

          <button className="primary-btn" type="submit">
            <span className="btn-text">Login</span>
          </button>
        </form>

        <div className="meta">
          <div className="hint">Not an admin?</div>
          <button type="button" className="link-btn" onClick={onOpenUserLogin}>User Login</button>
        </div>
      </div>
    </div>
  );
}

