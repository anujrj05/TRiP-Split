import React from "react";
import Navbar from "../components/Navbar";
import JoinTripByLink from "../components/JoinTripByLink";
import Footer from "../components/Footer";

function JoinByLinkPage() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen">
        <JoinTripByLink />
      </div>
      <Footer />
    </>
  );
}

export default JoinByLinkPage;
