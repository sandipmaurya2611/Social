import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils';

function Login() {
    const [loginInfo, setLoginInfo] = useState({
        email: '',
        password: ''
    });

    const navigate = useNavigate();
    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginInfo({ ...loginInfo, [name]: value });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        const { email, password } = loginInfo;
        if (!email || !password) {
            return handleError('Email and password are required');
        }
        try {
            const response = await fetch(`http://localhost:8080/auth/login`, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(loginInfo)
            });
            const result = await response.json();
            const { success, message, jwtToken, name, error } = result;
            if (success) {
                handleSuccess(message);
                localStorage.setItem('token', jwtToken);
                localStorage.setItem('loggedInUser', name);
                setTimeout(() => navigate('/home'), 1000);
            } else {
                handleError(error?.details[0]?.message || message);
            }
        } catch (err) {
            handleError(err);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-black bg-gradient-to-r from-indigo-800 via-fuchsia-600 to-teal-400">
            <div className="relative bg-black/40 backdrop-blur-xl p-8 shadow-lg border border-teal-500 rounded-2xl w-96 neon-glow">
                <h1 className="text-3xl font-bold text-center text-white mb-6 tracking-wide neon-text">Login</h1>
                <form onSubmit={handleLogin} className="space-y-5">
                    <div>
                        <label className="block text-gray-300 font-medium">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={loginInfo.email}
                            onChange={handleChange}
                            placeholder="Enter your email..."
                            className="w-full p-2 border border-teal-400 bg-transparent text-white rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-300 font-medium">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={loginInfo.password}
                            onChange={handleChange}
                            placeholder="Enter your password..."
                            className="w-full p-2 border border-teal-400 bg-transparent text-white rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                    </div>
                    <button className="w-full bg-teal-600 text-white py-2 rounded-md hover:bg-teal-700 transition neon-button">
                        Login
                    </button>
                    <p className="text-sm text-center text-gray-400">
                        Don't have an account? <Link to="/signup" className="text-fuchsia-400 hover:underline">Sign Up</Link>
                    </p>
                </form>
                <ToastContainer />
            </div>
        </div>
    );
}

export default Login;
