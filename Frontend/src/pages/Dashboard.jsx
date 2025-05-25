import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState(localStorage.getItem("loggedInUser") || "");
    const [profilePic, setProfilePic] = useState(null);

    const handleProfileUpdate = (e) => {
        e.preventDefault();

        // Update localStorage with new profile info
        localStorage.setItem("loggedInUser", username);
        if (profilePic) {
            const imageUrl = URL.createObjectURL(profilePic);
            localStorage.setItem("profilePic", imageUrl);
        }

        // Redirect to Home Page after update
        navigate("/");
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-6">
            <h2 className="text-3xl font-bold mb-4">Update Profile</h2>

            {/* Profile Picture Preview */}
            {profilePic && (
                <img src={URL.createObjectURL(profilePic)} alt="Profile Preview"
                    className="w-32 h-32 rounded-full border border-gray-500 mb-4"
                />
            )}

            <form onSubmit={handleProfileUpdate} className="flex flex-col items-center gap-4">
                {/* Username Input */}
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="p-2 text-white bg-gray-700 rounded-md"
                    placeholder="Enter new username"
                />

                {/* Profile Picture Upload */}
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setProfilePic(e.target.files[0])}
                    className="p-2 bg-gray-700 rounded-md"
                />

                {/* Update Button */}
                <button type="submit" className="bg-green-500 px-4 py-2 rounded-md hover:bg-green-600">
                    Update Profile
                </button>
            </form>
        </div>
    );
};

export default Dashboard;
