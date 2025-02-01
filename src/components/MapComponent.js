import React from "react";

const MapComponent = ({ mapUrl }) => {
  return (
    <div>
      <h3>Treasure Map</h3>
      {mapUrl ? <img src={mapUrl} alt="Treasure Map" style={{ width: "100%" }} /> : <p>No map available</p>}
    </div>
  );
};

export default MapComponent;
