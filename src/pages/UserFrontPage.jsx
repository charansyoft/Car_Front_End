import React from "react";
import { useNavigate } from "react-router-dom";

const UserFrontEnd = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove JWT from storage
    navigate("/login"); // Redirect to login page
  };

  return (
    <div>
      <h2>Welcome to Dashboard</h2>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default UserFrontEnd;
