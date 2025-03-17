import React from "react";
import UserFP from "../components/UserFP"; // Import UserFP component
import ViewProducts from "../components/ViewProducts";

const UserFrontPage = () => {
  return (
    <div>
      <UserFP /> {/* Display the navbar from UserFP */}
      <ViewProducts disableButtons={true} /> {/* Pass disable prop */}
    </div>
  );
};

export default UserFrontPage;
