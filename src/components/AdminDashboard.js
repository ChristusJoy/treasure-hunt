import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import Leaderboard from "./Leaderboard";

const AdminDashboard = () => {
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
      console.error("Error fetching hunt data:", error);
    }
    setLoading(false);
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <input
        type="text"
        placeholder="Enter Hunt Code"
        value={huntCode}
        onChange={(e) => setHuntCode(e.target.value)}
      />
      <button onClick={joinHunt} disabled={loading}>
        {loading ? "Joining..." : "Join Hunt"}
      </button>

      {huntData && (
        <div>
          <h3>Hunt Name: {huntData.huntName}</h3>
          <Leaderboard huntCode={huntData.huntCode} /> {/* Add Leaderboard */}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
