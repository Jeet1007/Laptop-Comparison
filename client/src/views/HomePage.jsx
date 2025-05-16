import React, { useState } from "react";
import ComboBox from "./ComboBox";
import { useNavigate } from "react-router";
import FlootingButton from "../component/FlootingButton"
import AuthButtons from "@/components/ui/logsin";


  const HomePage = () => {
  const navigate = useNavigate();
  const [id, setId] = useState(null);
  const fun = () =>{
    navigate("/homePage/tech");
  }

  return (
    <>
    <div onClick={fun}><FlootingButton /></div>
      
      <div className="flex flex-col min-h-screen">
        {/* Navbar Section */}
        <section className="relative h-[600px] flex items-center justify-center">
          <video
            autoPlay
            loop
            muted
            className="absolute inset-0 w-full h-screen object-cover"
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
              {/* ComboBox Component */}
              <div className="w-full max-w-xs">
                <ComboBox id={id} setId={setId} />
              </div>
              {/* Start Searching Button */}
              <button
                disabled={!id} // Button is disabled if `id` is falsy
                onClick={() => id && navigate(`/homePage/${id}`)} // Prevent navigation if `id` is falsy
                className={`${
                  !id
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                } text-white font-semibold py-3 px-8 rounded-lg text-xl transition-all duration-300 transform hover:scale-105 shadow-lg`}
              >
                Start Searching
              </button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 mt-24 bg-gradient-to-r from-blue-50 via-gray-100 to-white">
          <div className="container mx-auto text-center">
            <h2 className="text-4xl font-bold text-gray-800 mb-10 tracking-wide">
              Why Choose LaptopCompare?
            </h2>
            <div className="grid grid-cols-1  mt-12 sm:grid-cols-2 md:grid-cols-3 gap-8 px-10">
              <div className="bg-blue-50 p-6 rounded-lg shadow-md max-h-[350px] hover:bg-blue-100 transition-all duration-300 ease-in-out transform hover:scale-105">
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                  Compare Laptops
                </h3>
                <p className="text-gray-600 text-base leading-relaxed">
                  Compare multiple laptops side by side and make an informed
                  decision.
                </p>
              </div>
              <div className="bg-green-50 p-6 rounded-lg shadow-md max-h-[350px] hover:bg-green-100 transition-all duration-300 ease-in-out transform hover:scale-105">
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                  Detailed Reviews
                </h3>
                <p className="text-gray-600 text-base leading-relaxed">
                  Get in-depth reviews and specifications for the latest models.
                </p>
              </div>
              <div className="bg-yellow-50 p-6 rounded-lg shadow-md max-h-[350px] hover:bg-yellow-100 transition-all duration-300 ease-in-out transform hover:scale-105">
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                  Latest Models
                </h3>
                <p className="text-gray-600 text-base leading-relaxed">
                  Stay up-to-date with the newest releases and models in the
                  market.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer Section */}
      </div>
    </>
  );
};

export default HomePage;
