import React from "react";
import Footer from "../components/Footer";
import UserFrontPageNavbar from "../components/UserFrontPageNavbar";
import UserViewProducts from "../components/UserViewProducts";

const UserProductsPage = () => {
  return (
    <div>
      <UserFrontPageNavbar />
      <UserViewProducts />
      <Footer />
    </div>
  );
};

export default UserProductsPage;
