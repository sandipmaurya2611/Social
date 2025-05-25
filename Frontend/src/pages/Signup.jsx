import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils';

function Signup() {
    const [signupInfo, setSignupInfo] = useState({
        name: '',
        email: '',
        password: ''
    });

    const navigate = useNavigate();
    const handleChange = (e) => {
        const { name, value } = e.target;
        setSignupInfo({ ...signupInfo, [name]: value });
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        const { name, email, password } = signupInfo;
        if (!name || !email || !password) {
            return handleError('Name, email, and password are required');
        }
        try {
            const response = await fetch(`http://localhost:8080/auth/signup`, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(signupInfo)
            });
            const result = await response.json();
            const { success, message, error } = result;
            if (success) {
                handleSuccess(message);
                setTimeout(() => navigate('/login'), 1000);
            } else {
                handleError(error?.details[0]?.message || message);
            }
        } catch (err) {
            handleError(err);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-black bg-gradient-to-r from-purple-800 via-blue-600 to-cyan-400">
            <div className="relative bg-black/40 backdrop-blur-xl p-8 shadow-lg border border-purple-500 rounded-2xl w-96 neon-glow">
                <h1 className="text-3xl font-bold text-center text-white mb-6 tracking-wide neon-text">Sign Up</h1>
                <form onSubmit={handleSignup} className="space-y-5">
                    <div>
                        <label className="block text-gray-300 font-medium">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={signupInfo.name}
                            onChange={handleChange}
                            placeholder="Enter your name..."
                            className="w-full p-2 border border-purple-400 bg-transparent text-white rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-300 font-medium">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={signupInfo.email}
                            onChange={handleChange}
                            placeholder="Enter your email..."
                            className="w-full p-2 border border-purple-400 bg-transparent text-white rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-300 font-medium">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={signupInfo.password}
                            onChange={handleChange}
                            placeholder="Enter your password..."
                            className="w-full p-2 border border-purple-400 bg-transparent text-white rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                    </div>
                    <button className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition neon-button">
                        Sign Up
                    </button>
                    <p className="text-sm text-center text-gray-400">
                        Already have an account? <Link to="/login" className="text-cyan-400 hover:underline">Login</Link>
                    </p>
                </form>
                <ToastContainer />
            </div>
        </div>
    );
}

export default Signup;
