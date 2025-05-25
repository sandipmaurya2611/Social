import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const CallToAction = () => {
    return (
        <div className="bg-gradient-to-r from-gray-900 via-purple-900 to-black text-white text-center -mt-40 mb-10">
            <motion.h2
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="text-4xl font-bold"
            >
                Join the Movement. Make an Impact.
            </motion.h2>
            <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mt-4 text-lg"
            >
                Discover, Learn, and Take Action to create positive change.
            </motion.p>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="mt-6 flex justify-center space-x-4"
            >
                <Link to="/explore">
                    <button className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition">
                        Explore Now
                    </button>
                </Link>
                <Link to="/join">
                    <button className="px-6 py-3 bg-white text-black rounded-lg hover:bg-gray-200 transition">
                        Join Us
                    </button>
                </Link>
            </motion.div>
        </div>
    );
};

export default CallToAction;
