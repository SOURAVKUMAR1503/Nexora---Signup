import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function validateForm() {
    if (!email.trim()) return "Email is required.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "Please enter a valid email address.";
    if (!password) return "Password is required.";
    if (password.length < 6) return "Password must be at least 6 characters.";
    return "";
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    const validationError = validateForm();
    if (validationError) { setError(validationError); return; }

    try {
      setLoading(true);
      const response = await axios.post("https://backend-rosy-three-29.vercel.app/login", { email, password });
      if (response.data.success) navigate("/dashboard");
    } catch (error) {
      setError(error.response?.data?.message || "Unable to connect to the server.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="brand"><div className="brand-icon">N</div><h1>NEXORA</h1></div>
        <div className="auth-heading"><h2>Welcome back</h2><p>Sign in to continue to your account</p></div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email address</label>
            <input type="email" placeholder="demo@nexora.com" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          {error && <p className="error-message">{error}</p>}
          <button className="primary-button" type="submit" disabled={loading}>{loading ? "Signing in..." : "Sign in"}</button>
        </form>
        <div className="demo-info"><p>Demo account</p><span>demo@nexora.com</span><span>123456</span></div>
        <p className="switch-text">Don't have an account? <Link to="/signup">Create one</Link></p>
      </div>
    </div>
  );
}

export default Login;
