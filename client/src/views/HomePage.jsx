import React, { useState } from "react";
import ComboBox from "./ComboBox";
import { useNavigate } from "react-router";

const HomePage = () => {


  const navigate = useNavigate();
  const [id, setId] = useState("");


  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar Section */}
      <section className="relative h-[600px] flex items-center justify-center">
        <video
          autoPlay
          loop
          muted
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/video2.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl font-semibold mb-4 text-white">
            Welcome to LaptopCompare
          </h1>
          <p className="text-xl mb-6 text-white">
            Find, compare, and choose the best laptop for your needs.
          </p>
          <div className="flex items-center justify-center flex-col space-y-6 p-8">
            {/* Start Searching Button */}
            <button
              onClick={() => navigate(`/homePage/${id}`)}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg text-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Start Searching
            </button>
      

      {/* Hero Section */}
      {/* <section className="bg-cover bg-center text-white h-[600px] flex items-center justify-center bg-[url('https://images.unsplash.com/photo-1516424716439-aeccb78c41c8?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')]">
        <div className="text-center px-4">
          <h1 className="text-4xl font-semibold mb-4">
            Welcome to LaptopCompare
          </h1>
          <p className="text-xl mb-6">
            Find, compare, and choose the best laptop for your needs.
          </p>
          <div className="flex items-center justify-center flex-col space-y-6 p-8">
          
            <button
              onClick={() => navigate(`/homePage/${id}`)}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg text-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Start Searching
            </button> */}

            {/* ComboBox Component */}
            <div className="w-full max-w-xs">
              <ComboBox id={id} setId={setId} />
            </div>
          </div>
         
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-8">
            Why Choose LaptopCompare?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-medium mb-4">Compare Laptops</h3>
              <p className="text-gray-600">
                Compare multiple laptops side by side and make an informed
                decision.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-medium mb-4">Detailed Reviews</h3>
              <p className="text-gray-600">
                Get in-depth reviews and specifications for the latest models.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-medium mb-4">Latest Models</h3>
              <p className="text-gray-600">
                Stay up-to-date with the newest releases and models in the
                market.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
     
    </div>
  );
};

export default HomePage;
