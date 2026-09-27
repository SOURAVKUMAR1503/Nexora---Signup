import React from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  return (
    <div className="dashboard-page">
      <div className="dashboard-card">
        <div className="dashboard-icon">✓</div>
        <p className="dashboard-label">NEXORA</p>
        <h1>Welcome to your Dashboard</h1>
        <p className="dashboard-text">You have successfully logged in. This is your dummy dashboard page.</p>
        <button className="logout-button" onClick={() => navigate("/login")}>Logout</button>
      </div>
    </div>
  );
}

export default Dashboard;