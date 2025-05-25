import React from 'react';
import useLogout from '../services/handleLogout';

function LogoutButton() {
    const handleLogout = useLogout();

    return (
        <button 
            onClick={handleLogout} 
            className="bg-red-500 px-4 py-2 rounded-md hover:bg-red-600 transition"
        >
            Logout
        </button>
    );
}

export default LogoutButton;
