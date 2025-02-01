import React, { useState } from "react";
import { db } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import MapComponent from "./MapComponent";
import QRScanner from "./QRScanner"; // Import QR Scanner component

const UserDashboard = () => {
  const [huntCode, setHuntCode] = useState("");
  const [huntData, setHuntData] = useState(null);
  const [loading, setLoading] = useState(false);

  const joinHunt = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, "hunts"), where("huntCode", "==", huntCode));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const hunt = querySnapshot.docs[0].data();
        setHuntData(hunt);
      } else {
        alert("Hunt not found!");
      }
    } catch (error) {
      console.error("Error joining hunt:", error);
    }
    setLoading(false);
  };

  return (
    <div>
      <h2>User Dashboard</h2>
      {!huntData ? (
        <div>
          <input
            type="text"
            placeholder="Enter Hunt Code"
            value={huntCode}
            onChange={(e) => setHuntCode(e.target.value)}
          />
          <button onClick={joinHunt} disabled={loading}>
            {loading ? "Joining..." : "Join Hunt"}
          </button>
        </div>
      ) : (
        <div>
          <h3>Hunt Name: {huntData.huntName}</h3>
          <MapComponent mapUrl={huntData.mapUrl} />
          <QRScanner huntCode={huntData.huntCode} userId={"currentUserId"} /> {/* Add QR Scanner */}
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
