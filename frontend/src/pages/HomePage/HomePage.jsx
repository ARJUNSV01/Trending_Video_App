import React from "react";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import VideosSection from "../../components/VideosSection/VideosSection";

const HomePage = () => {
  return (
    <div>
      <Navbar />
      <VideosSection />
      <Footer/>
    </div>
  );
};

export default HomePage;
