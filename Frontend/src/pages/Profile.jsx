import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import api from "../utils/api";

const MapView = () => {
  const [position, setPosition] = useState(null);
  const [nearbyUsers, setNearbyUsers] = useState([]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setPosition([latitude, longitude]);
        api.post("/map/store-location", { lat: latitude, lng: longitude });
      },
      (err) => console.error("Error fetching location:", err)
    );
  }, []);

  useEffect(() => {
    if (position) {
      api.get(`/map/nearby?lat=${position[0]}&lng=${position[1]}`)
        .then(({ data }) => setNearbyUsers(data))
        .catch((err) => console.error("Error fetching nearby users:", err));
    }
  }, [position]);

  return (
    <MapContainer center={position || [0, 0]} zoom={13} className="w-full h-96">
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {position && (
        <Marker position={position}>
          <Popup>You are here</Popup>
        </Marker>
      )}
      {nearbyUsers.map((user, index) => (
        <Marker key={index} position={[user.lat, user.lng]}>
          <Popup>{user.name}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapView;
