import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h1>Welcome to the Treasure Hunt</h1>
      <p>Choose your role:</p>
      <div>
        <Link to="/user-dashboard">
          <button>User Dashboard</button>
        </Link>
        <Link to="/admin-dashboard">
          <button>Admin Dashboard</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
