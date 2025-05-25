import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import { FaArrowLeft } from "react-icons/fa";

// Fix Leaflet marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

const MapComponent = () => {
  const [position, setPosition] = useState(null);
  const [filters, setFilters] = useState({ interests: [] });
  const [users, setUsers] = useState([]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition({ lat: pos.coords.latitude, lng: pos.coords.longitude });
      },
      (err) => console.error(err)
    );
  }, []);

  const handleInterestToggle = (main, sub) => {
    const tag = `${main}_${sub}`;
    setFilters((prev) => ({
      ...prev,
      interests: prev.interests.includes(tag)
        ? prev.interests.filter((i) => i !== tag)
        : [...prev.interests, tag],
    }));
  };

  const fetchUsers = async () => {
    if (!position) return;

    // Transform interests -> selectedTags
    const selectedTags = {};
    filters.interests.forEach((tag) => {
      const [main, sub] = tag.split("_");
      const key = main.toLowerCase(); // lowercase to match schema
      if (!selectedTags[key]) selectedTags[key] = [];
      selectedTags[key].push(sub);
    });

    try {
      const res = await axios.post("http://localhost:5000/users/nearby", {
        latitude: position.lat,
        longitude: position.lng,
        selectedTags,
      });
      setUsers(res.data);
    } catch (err) {
      console.error("Error fetching users", err);
    }
  };

  useEffect(() => {
    if (position) fetchUsers();
  }, [filters, position]);

  const tagCategories = {
    Environment: ["climate", "pollution", "wildlife"],
    Health: ["mental", "physical", "nutrition"],
    Tech: ["webdev", "ai", "blockchain"],
    Finance: ["investment", "crypto", "banking"],
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-6">
      {/* Home Button */}
      <div className="absolute top-5 left-5">
        <button
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-medium text-base rounded-full shadow-md transition-all hover:scale-105 hover:shadow-lg hover:from-pink-600 hover:to-purple-600"
          onClick={() => window.history.back()}
        >
          <FaArrowLeft className="text-lg opacity-80 transition-all hover:opacity-100" />
          <span>Home</span>
        </button>
      </div>

      {/* Main Content */}
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
        {/* Interests Selection Card */}
        <div className="bg-white p-6 rounded-2xl shadow-lg border w-full">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-4">
            🎯 Choose Your Interests
          </h2>
          {Object.entries(tagCategories).map(([main, subs]) => (
            <div key={main} className="mb-4">
              <p className="font-semibold text-lg text-gray-800 capitalize">{main}:</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {subs.map((sub) => {
                  const tag = `${main}_${sub}`;
                  return (
                    <button
                      key={tag}
                      onClick={() => handleInterestToggle(main, sub)}
                      className={`px-3 py-1 rounded-full border text-sm transition-all ${
                        filters.interests.includes(tag)
                          ? "bg-blue-600 text-white shadow-md"
                          : "bg-gray-100 hover:bg-gray-200"
                      }`}
                    >
                      #{sub}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Map Container */}
        <div className="w-full h-[500px] rounded-2xl overflow-hidden shadow-lg border bg-white">
          {position ? (
            <MapContainer center={position} zoom={12} scrollWheelZoom={false} className="h-full w-full">
              <TileLayer
                attribution="&copy; OpenStreetMap contributors"
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              {/* Current User Marker */}
              <Marker position={position}>
                <Popup>
                  <p className="font-bold text-blue-600">📍 You are here</p>
                </Popup>
              </Marker>

              {/* Other Users Markers */}
              {users.map((user, idx) => (
                <Marker key={idx} position={{ lat: user.latitude, lng: user.longitude }}>
                  <Popup>
                    <p className="font-bold text-lg text-gray-900">{user.name}</p>
                    <p className="text-sm text-gray-600">
                      Interests:{" "}
                      {Object.entries(user.selectedTags || {})
                        .flatMap(([cat, tags]) => tags.map((tag) => `#${tag}`))
                        .join(" ")}
                    </p>
                    <div className="flex gap-2 mt-3">
                      <button
                        className="px-3 py-1 text-sm bg-blue-600 text-white rounded-md shadow hover:bg-blue-700"
                        onClick={() => alert(`Request sent to ${user.name}`)}
                      >
                        Send Request
                      </button>
                      <button
                        className="px-3 py-1 text-sm bg-green-600 text-white rounded-md shadow hover:bg-green-700"
                        onClick={() => alert(`Messaging ${user.name}...`)}
                      >
                        Message
                      </button>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          ) : (
            <div className="flex justify-center items-center h-full text-lg font-semibold text-gray-700">
              Loading location...
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MapComponent;
