import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function validateForm() {
    if (!name.trim()) return "Full name is required.";
    if (!email.trim()) return "Email is required.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "Please enter a valid email address.";
    if (!password) return "Password is required.";
    if (password.length < 6) return "Password must be at least 6 characters.";
    if (password !== confirmPassword) return "Passwords do not match.";
    return "";
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setSuccess("");
    const validationError = validateForm();
    if (validationError) { setError(validationError); return; }

    try {
      setLoading(true);
      const response = await axios.post("https://backend-rosy-three-29.vercel.app/signup", { name, email, password });
      if (response.data.success) {
        setSuccess("Account created successfully. Redirecting to login...");
        setTimeout(() => navigate("/login"), 1000);
      }
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
        <div className="auth-heading"><h2>Create account</h2><p>Join Nexora and get started today</p></div>
        <form onSubmit={handleSubmit}>
          <div className="form-group"><label>Full name</label><input type="text" placeholder="Enter your full name" value={name} onChange={(e) => setName(e.target.value)} /></div>
          <div className="form-group"><label>Email address</label><input type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} /></div>
          <div className="form-group"><label>Password</label><input type="password" placeholder="At least 6 characters" value={password} onChange={(e) => setPassword(e.target.value)} /></div>
          <div className="form-group"><label>Confirm password</label><input type="password" placeholder="Re-enter your password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} /></div>
          {error && <p className="error-message">{error}</p>}
          {success && <p className="success-message">{success}</p>}
          <button className="primary-button" type="submit" disabled={loading}>{loading ? "Creating account..." : "Create account"}</button>
        </form>
        <p className="switch-text">Already have an account? <Link to="/login">Sign in</Link></p>
      </div>
    </div>
  );
}

export default Signup;
