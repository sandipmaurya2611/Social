import React from "react";
import { motion as Motion } from "framer-motion";

const HeroSection = () => {
    return (
        <div className="relative flex flex-col items-center justify-center h-screen bg-gradient-to-r from-gray-900 via-purple-900 to-black text-white">
            <video autoPlay loop muted className="absolute w-full h-full object-cover opacity-50">
                <source src="/assets/hero-bg.mp4" type="video/mp4" />
            </video>
            <Motion.h1
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="text-5xl font-bold neon-text text-center"
            >
                Empowering Change Through Knowledge & Action
            </Motion.h1>
            <Motion.p className="mt-4 text-lg text-gray-300 text-center">
                Discover, Connect & Take Action for a Better World
            </Motion.p>
            <Motion.div className="mt-6 flex space-x-4">
                <button className="bg-cyan-400 px-6 py-3 rounded-md text-black hover:bg-cyan-500 transition">
                    Explore Now
                </button>
                <button className="bg-gray-800 px-6 py-3 rounded-md hover:bg-gray-700 transition">
                    Join the Community
                </button>
            </Motion.div>
        </div>
    );
};

export default HeroSection;
