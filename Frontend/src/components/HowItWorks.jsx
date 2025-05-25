import React from "react";
import { motion} from "framer-motion";
import { FaUserPlus, FaSearch, FaHandsHelping, FaTrophy } from "react-icons/fa";

const steps = [
    {
        icon: <FaUserPlus size={40} />,
        title: "1. Sign Up & Create Profile",
        desc: "Register, set up your profile, and choose your interests.",
    },
    {
        icon: <FaSearch size={40} />,
        title: "2. Explore Content & Community",
        desc: "Discover daily updated content and find like-minded people.",
    },
    {
        icon: <FaHandsHelping size={40} />,
        title: "3. Take Action",
        desc: "Join projects, connect with NGOs, and contribute to causes.",
    },
    {
        icon: <FaTrophy size={40} />,
        title: "4. Earn Rewards",
        desc: "Complete activities, gain badges, and climb the leaderboard.",
    },
];

const HowItWorks = () => {
    return (
        <div className="bg-gradient-to-r from-gray-900 via-purple-900 to-black text-white text-center mt-3 py-12">
            <h2 className="text-4xl font-bold neon-text">How It Works</h2>
            <p className="text-gray-300 mt-4 mb-8">
                Follow these simple steps to start making an impact.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-8">
                {steps.map((step, index) => (
                    <motion.div
                        key={index}
                        className="p-6 border border-cyan-400 rounded-lg shadow-lg bg-gray-800"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.2 }}
                        viewport={{ once: true }}
                    >
                        <div className="text-cyan-400 mb-4">{step.icon}</div>
                        <h3 className="text-xl font-semibold">{step.title}</h3>
                        <p className="text-gray-300">{step.desc}</p>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default HowItWorks;
