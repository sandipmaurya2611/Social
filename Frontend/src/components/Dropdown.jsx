import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Dropdown = ({ onLogout }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600"
            >
                Settings ▼
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg">
                    <Link
                        to="/dashboard"
                        className="block px-4 py-2 hover:bg-gray-200"
                    >
                        My Account
                    </Link>
                    <button
                        onClick={onLogout}
                        className="w-full text-left px-4 py-2 hover:bg-gray-200"
                    >
                        Logout
                    </button>
                </div>
            )}
        </div>
    );
};

export default Dropdown;
