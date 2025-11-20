import "./AdminDashboard.css";

export default function AdminDashboard({ onSignOut }) {
  return (
    <div className="admin-screen">
      <h1 className="page-title">Admin Dashboard</h1>

      <button 
        className="signout-btn"
        onClick={onSignOut}
      >
        Sign Out
      </button>

      <div className="stats-row">
        <div className="stat">120<br/>Total Users</div>
        <div className="stat">35<br/>Programs</div>
        <div className="stat">540<br/>Workouts</div>
        <div className="stat">87<br/>Reviews</div>
      </div>

      <h2 className="section-title">Manage Users</h2>

      <h2 className="section-title">Manage Programs</h2>
    </div>
  );
}

