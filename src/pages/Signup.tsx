// pages/Signup.tsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useAuth } from '../contexts/AuthContext';
// import './Auth.css'; // Optional: CSS for styling the auth pages

const Signup: React.FC = () => {
    const navigate = useNavigate();
    const { signup } = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await signup({ email, password });
            navigate('/lobby'); // Redirect to lobby on successful signup
        } catch (err: unknown) {
            if (err instanceof Error) setError(err.message);
            else setError('An unknown error occurred');
        }
    };

    return (
        <div className="auth-container">
            <h1>Sign Up</h1>
            {error && <div className="error">{error}</div>}
            <form onSubmit={handleSubmit} className="auth-form">
                <label htmlFor="email">Email:</label>
                <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <label htmlFor="password">Password:</label>
                <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <button type="submit">Sign Up</button>
            </form>
            <p>
                Already have an account? <Link to="/login">Login</Link>
            </p>
        </div>
    );
};

export default Signup;