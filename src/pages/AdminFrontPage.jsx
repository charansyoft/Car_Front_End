import React from "react";
import AdminOptions from "../components/Admin/AdminOptions.jsx";
import Footer from "../components/Footer.jsx";
import UserFrontPageNavbar from "../components/UserFrontPageNavbar.jsx"; // Import UserFP component

const AdminFrontPage = () => {
  return (
    <div>
      <UserFrontPageNavbar /> {/* Display the navbar from UserFP */}
      {/* <ViewProducts disableButtons={true} /> Pass disable prop */}
      <AdminOptions />
      <Footer />
    </div>
  );
};

export default AdminFrontPage;
