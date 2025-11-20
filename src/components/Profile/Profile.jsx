import "./Profile.css";

export default function Profile() {
  return (
    <div className="profile-screen">
      <div className="profile-avatar">
        <span>👤</span>
      </div>

      <div className="profile-form">
        <div className="buttons-row">
          <div className="field" style={{ width: "220px" }}>
            <input type="text" placeholder="Name" />
          </div>

          <div className="field" style={{ width: "220px" }}>
            <input type="text" placeholder="Email" />
            <span className="icon">📧</span>
          </div>
        </div>

        <div className="buttons-row">
          <div className="field" style={{ width: "220px" }}>
            <input type="password" placeholder="Password" />
          </div>

          <button className="action-btn">Change Email</button>
        </div>

        <button className="action-btn full-btn">Change Password</button>
      </div>
    </div>
  );
}

