import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useAuth } from '../contexts/AuthContext';

const Login: React.FC = () => {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await login({ email, password });
            navigate('/lobby');
        } catch (err: unknown) {
            if (err instanceof Error) setError(err.message);
            else setError('An unknown error occurred');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-800 to-gray-900 text-white p-8">
            <div className="max-w-md mx-auto flex flex-col items-center justify-center space-y-6 pt-20">
                <h1 className="text-4xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-500">
                    Login
                </h1>

                {error && (
                    <div className="w-full p-4 bg-red-500 bg-opacity-20 border border-red-500 rounded-lg text-red-300">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="w-full space-y-6">
                    <div className="space-y-2">
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-300"
                        >
                            Email:
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none transition-all duration-200"
                        />
                    </div>

                    <div className="space-y-2">
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-300"
                        >
                            Password:
                        </label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none transition-all duration-200"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg font-semibold text-lg shadow-lg hover:from-blue-600 hover:to-blue-700 transform hover:scale-105 transition-all duration-200"
                    >
                        Login
                    </button>
                </form>

                <p className="text-gray-400">
                    Don't have an account?{' '}
                    <Link
                        to="/signup"
                        className="text-yellow-400 hover:text-yellow-300 font-medium transition-colors duration-200"
                    >
                        Sign Up
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;