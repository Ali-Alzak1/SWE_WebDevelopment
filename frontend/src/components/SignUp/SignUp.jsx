import { useState } from "react";
import "./SignUp.css";

export default function SignUp({ onBack, onSignUp, onOpenLogin, onOpenAdminLogin }) {
  const [form, setForm] = useState({ email: "", username: "", password: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSignUp) {
      onSignUp(form);
    }
  };

  return (
    <div className="auth-screen">
      <div className="auth-card">
        <button className="back-btn" onClick={onBack} type="button">
          <span>←</span>
        </button>

        <h1 className="title">Sign Up</h1>

        <form className="form" onSubmit={handleSubmit}>
          <div className="field">
            <input
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
            <span className="icon">✉️</span>
          </div>

          <div className="field">
            <input
              type="text"
              placeholder="Username"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              required
            />
            <span className="icon">👤</span>
          </div>

          <div className="field">
            <input
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
            <span className="icon">🔒</span>
          </div>

          <button type="submit" className="primary-btn">
            <span className="btn-text">Sign Up</span>
          </button>
        </form>

        <div className="meta">
          <div className="hint">
            Already have an account? <button type="button" className="link-btn" onClick={onOpenLogin}>Login</button>
          </div>
          <div className="hint">
            Admin? <button type="button" className="link-btn" onClick={onOpenAdminLogin}>Login</button>
          </div>
        </div>
      </div>
    </div>
  );
}

