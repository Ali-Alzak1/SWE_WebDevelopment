import { useState } from "react";
import "./Login.css";

export default function Login({ onBack, onLogin, onOpenSignUp, onOpenAdminLogin }) {
  const [user, setUser] = useState({ username: "", password: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onLogin) {
      onLogin(user);
    }
  };

  return (
    <div className="auth-screen">
      <div className="auth-card">
        <button className="back-btn" onClick={onBack} type="button">
          <span>←</span>
        </button>

        <h1 className="title">Login</h1>

        <form className="form" onSubmit={handleSubmit}>
          <div className="field">
            <input
              type="text"
              placeholder="Username"
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              required
            />
            <span className="icon">👤</span>
          </div>

          <div className="field">
            <input
              type="password"
              placeholder="Password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              required
            />
            <span className="icon">🔒</span>
          </div>

          <button type="submit" className="primary-btn">
            <span className="btn-text">Login</span>
          </button>
        </form>

        <div className="meta">
          <div className="hint">
            If you do not have account <button type="button" className="link-btn" onClick={onOpenSignUp}>Sign Up</button>
          </div>
          <div className="hint">
            Admin? <button type="button" className="link-btn" onClick={onOpenAdminLogin}>Login</button>
          </div>
        </div>
      </div>
    </div>
  );
}

