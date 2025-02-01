import React, { useState } from "react";
import QrScanner from "react-qr-scanner";
import { db } from "../firebase";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";

const QRScanner = ({ huntCode, userId }) => {
  const [scannedData, setScannedData] = useState(null);
  const [message, setMessage] = useState("");

  const handleScan = async (data) => {
    if (data) {
      setScannedData(data.text);

      try {
        // Check if QR code is valid
        const q = query(collection(db, "clues"), where("qrCode", "==", data.text), where("huntCode", "==", huntCode));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          // QR Code is valid, add points
          await addDoc(collection(db, "scores"), {
            userId,
            huntCode,
            timestamp: new Date(),
          });

          setMessage("QR Code Verified! Points added.");
        } else {
          setMessage("Invalid QR Code!");
        }
      } catch (error) {
        console.error("Error verifying QR Code:", error);
      }
    }
  };

  const handleError = (err) => {
    console.error(err);
  };

  return (
    <div>
      <h3>Scan QR Code</h3>
      <QrScanner delay={300} onError={handleError} onScan={handleScan} style={{ width: "100%" }} />
      {scannedData && <p>Scanned: {scannedData}</p>}
      {message && <p>{message}</p>}
    </div>
  );
};

export default QRScanner;
