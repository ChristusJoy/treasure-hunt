import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";

const Leaderboard = ({ huntCode }) => {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "scores"), where("huntCode", "==", huntCode));
    
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const newScores = [];
      querySnapshot.forEach((doc) => {
        newScores.push(doc.data());
      });
      setScores(newScores);
    });

    return () => unsubscribe();
  }, [huntCode]);

  return (
    <div>
      <h3>Leaderboard</h3>
      {scores.length === 0 ? (
        <p>No scores available yet.</p>
      ) : (
        <ul>
          {scores.map((score, index) => (
            <li key={index}>
              User: {score.userId} - Points: {score.points} - Time: {score.timestamp.toDate().toLocaleString()}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Leaderboard;
