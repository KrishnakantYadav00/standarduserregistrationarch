import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import axios from 'axios';

export default function Login() {
  const [form, setForm]       = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const navigate              = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await axios.post('/api/auth/login', form);
      const token = data.token;

      // Decode payload to verify admin role
      const payload = JSON.parse(atob(token.split('.')[1]));

      if (payload.role !== 'admin') {
        toast.error('Access denied — admin only');
        setLoading(false);
        return;
      }

      localStorage.setItem('adminToken', token);
      toast.success('Welcome back, Administrator!');
      navigate('/dashboard');

    } catch (err) {
      const msg =
        err.response?.data?.message ||
        err.response?.data ||
        'Login failed';
      toast.error(String(msg));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      {/* Background orbs */}
      <div className="login-orb login-orb--1" />
      <div className="login-orb login-orb--2" />

      <div className="login-card">
        {/* Logo */}
        <div className="login-logo">
          <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
          </svg>
        </div>

        <h2 className="login-heading">Admin Login</h2>
        <p className="login-subheading">Sign in to your admin account</p>

        <form id="admin-login-form" onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <div className="input-wrapper">
              <svg className="input-icon" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="admin@test.com"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="input-wrapper">
              <svg className="input-icon" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                <path d="M7 11V7a5 5 0 0110 0v4"/>
              </svg>
              <input
                id="password"
                type="password"
                name="password"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <button
            id="login-submit-btn"
            type="submit"
            className="login-btn"
            disabled={loading}
          >
            {loading ? (
              <span className="spinner-sm" />
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        <p className="login-hint">
          Credentials: <code>admin@test.com</code> / <code>admin123</code>
        </p>
      </div>
    </div>
  );
}
