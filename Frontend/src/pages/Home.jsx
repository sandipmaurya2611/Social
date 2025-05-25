import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import HomeContent from "../components/HomeContent"; // New component for content

const Home = () => {
    const [showText, setShowText] = useState(true);
    const username = localStorage.getItem("loggedInUser") || "User";

    useEffect(() => {
        setTimeout(() => {
            setShowText(false);
        }, 2000); // Show username for 2 seconds
    }, []);

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-r from-gray-900 via-purple-900 to-black text-white">
            <Navbar />
            <div className="flex flex-grow items-center justify-center flex-col text-center">
                {showText ? (
                    <div className="animate-fadeIn">
                        <h1 className="text-4xl md:text-6xl font-bold text-cyan-400">
                            Welcome, {username}!
                        </h1>
                        <p className="text-sm md:text-lg font-light text-gray-300 italic mt-2">
                            A platform that connects donors with NGOs.
                        </p>
                    </div>
                ) : (
                    <HomeContent /> // Show main content after 2 seconds
                )}
            </div>
        </div>
    );
};

export default Home;
