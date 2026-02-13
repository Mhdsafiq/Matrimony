import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Mail, Lock, Heart } from 'lucide-react';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login Attempt:", { email, password });
  };

  return (
    <div className="login-page">
      <Navbar />
      <div className="login-container">
        <div className="login-card glass-panel">
          <div className="login-header">
            <Heart size={40} className="login-icon" />
            <h2>Welcome Back</h2>
            <p>Login to continue your journey</p>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            <div className="input-group">
              <Mail className="input-icon" size={20} />
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <Lock className="input-icon" size={20} />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="form-options">
              <label className="remember-me">
                <input type="checkbox" /> Remember me
              </label>
              <a href="/forgot-password">Forgot Password?</a>
            </div>

            <button type="submit" className="btn btn-primary login-btn">Login</button>
          </form>

          <div className="login-footer">
            <p>Don't have an account? <a href="/register">Register Free</a></p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
