import React from "react";
import { FaBook, FaMap, FaSearch, FaBolt, FaComments, FaGamepad } from "react-icons/fa";

const features = [
    { icon: <FaBook />, title: "Content Library", desc: "Daily updated TED Talks, books, and reports" },
    { icon: <FaMap />, title: "Interactive Map", desc: "Find and connect with like-minded people" },
    { icon: <FaSearch />, title: "Find Your Passion", desc: "Discover causes that match your interests" },
    { icon: <FaBolt />, title: "Action Hub", desc: "Access NGOs, grants, and learning resources" },
    { icon: <FaComments />, title: "Community Chat", desc: "Collaborate and discuss social impact ideas" },
    { icon: <FaGamepad />, title: "Gamification", desc: "Earn badges and track achievements" },
];

const Features = () => {
    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-r from-gray-900 via-purple-900 to-black text-white mt-12">
            <h2 className="text-4xl font-bold text-center neon-text">Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-8">
                {features.map((feature, index) => (
                    <div key={index} className="p-6 border border-cyan-400 rounded-lg text-center">
                        <div className="text-4xl text-cyan-400">{feature.icon}</div>
                        <h3 className="mt-4 text-xl font-semibold">{feature.title}</h3>
                        <p className="text-gray-300">{feature.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Features;
