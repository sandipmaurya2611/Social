import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { handleSuccess } from "../services/handleSuccess";
import { Menu, X } from "lucide-react"; // For Hamburger Icon

const Navbar = () => {
    const navigate = useNavigate();
    const [profilePic, setProfilePic] = useState(null);
    const [showDropdown, setShowDropdown] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const username = localStorage.getItem("loggedInUser") || "User";

    useEffect(() => {
        const savedProfile = localStorage.getItem("profilePic");
        if (savedProfile) setProfilePic(savedProfile);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("loggedInUser");
        localStorage.removeItem("profilePic");
        handleSuccess("User Logged Out");
        setTimeout(() => {
            navigate("/login");
        }, 1000);
    };

    return (
        <nav className="fixed top-0 left-0 w-full bg-gradient-to-r from-gray-900 via-purple-900 to-black text-white py-4 px-6 flex justify-between items-center shadow-lg z-50 font-[Poppins]">
            {/* Left Side - Logo */}
            <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600 tracking-wide">
                Give India
            </h1>

            {/* Center - Navigation Links (Hidden on mobile) */}
            <ul className="hidden md:flex space-x-8 text-lg font-medium tracking-wide">
                <li><Link to="/" className="hover:opacity-80 transition duration-300">Home 🏠</Link></li>
                <li><Link to="/content-library" className="hover:opacity-80 transition duration-300">Content Library 📚</Link></li>
                <li><Link to="/interactive-map" className="hover:opacity-80 transition duration-300">Interactive Map 🗺️</Link></li>
                <li><Link to="/find-your-passion" className="hover:opacity-80 transition duration-300">Find Your Passion 🔍</Link></li>
                <li><Link to="/action-hub" className="hover:opacity-80 transition duration-300">Action Hub ⚡</Link></li>
                <li><Link to="/community" className="hover:opacity-80 transition duration-300">Community 💬</Link></li>
                <li><Link to="/gamification" className="hover:opacity-80 transition duration-300">Gamification 🏆</Link></li>
            </ul>

            {/* Mobile Menu Button */}
            <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
                {menuOpen ? <X size={30} /> : <Menu size={30} />}
            </button>

            {/* Mobile Dropdown Menu */}
            {menuOpen && (
                <div className="absolute top-16 left-0 w-full bg-gray-900 text-center py-4 md:hidden">
                    <ul className="space-y-4 text-lg font-medium tracking-wide">
                        <li><Link to="/" className="block py-2 hover:opacity-80 transition duration-300" onClick={() => setMenuOpen(false)}>Home 🏠</Link></li>
                        <li><Link to="/content-library" className="block py-2 hover:opacity-80 transition duration-300" onClick={() => setMenuOpen(false)}>Content Library 📚</Link></li>
                        <li><Link to="/interactive-map" className="block py-2 hover:opacity-80 transition duration-300" onClick={() => setMenuOpen(false)}>Interactive Map 🗺️</Link></li>
                        <li><Link to="/find-passion" className="block py-2 hover:opacity-80 transition duration-300" onClick={() => setMenuOpen(false)}>Find Your Passion 🔍</Link></li>
                        <li><Link to="/action-hub" className="block py-2 hover:opacity-80 transition duration-300" onClick={() => setMenuOpen(false)}>Action Hub ⚡</Link></li>
                        <li><Link to="/community" className="block py-2 hover:opacity-80 transition duration-300" onClick={() => setMenuOpen(false)}>Community 💬</Link></li>
                        <li><Link to="/gamification" className="block py-2 hover:opacity-80 transition duration-300" onClick={() => setMenuOpen(false)}>Gamification 🏆</Link></li>
                    </ul>
                </div>
            )}

            {/* Right Side - Profile Dropdown */}
            <div className="relative">
                <button onClick={() => setShowDropdown(!showDropdown)} className="flex items-center space-x-2">
                    {profilePic ? (
                        <img src={profilePic} alt="Profile" className="w-10 h-10 rounded-full border-2 border-cyan-400 shadow-md" />
                    ) : (
                        <div className="w-10 h-10 flex items-center justify-center rounded-full border-2 border-cyan-400 bg-gray-700 text-white font-bold shadow-md">
                            {username.charAt(0).toUpperCase()}
                        </div>
                    )}
                </button>

                {/* Dropdown Menu */}
                {showDropdown && (
                    <div className="absolute right-0 mt-2 w-52 bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-50 overflow-hidden">
                        <ul className="text-white text-md font-medium">
                            <li className="p-4 hover:bg-gray-700 cursor-pointer transition duration-200" onClick={() => navigate("/dashboard")}>
                                My Account
                            </li>
                            <li className="p-4 hover:bg-red-600 cursor-pointer transition duration-200" onClick={handleLogout}>
                                Logout
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
