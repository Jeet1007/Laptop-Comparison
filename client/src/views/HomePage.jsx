import React from "react";
import NavBar from "@/component/NavBar";
import CompareComponent from "@/component/CompareComponent";

const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar Section */}
      <NavBar />
      <CompareComponent />

      {/* Hero Section */}
      <section className="bg-cover bg-center text-black h-[600px] flex items-center justify-center bg-[url('https://images.unsplash.com/photo-1516424716439-aeccb78c41c8?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')]">
        <div className="text-center px-4">
          <h1 className="text-4xl font-semibold mb-4">
            Welcome to LaptopCompare
          </h1>
          <p className="text-xl mb-6">
            Find, compare, and choose the best laptop for your needs.
          </p>
          <a
            href="/search"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg text-lg"
          >
            Start Searching
          </a>
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
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto text-center">
          <p className="mb-4">
            &copy; 2024 LaptopCompare. All rights reserved.
          </p>
          <div className="flex justify-center space-x-8">
            <a href="/privacy-policy" className="hover:underline">
              Privacy Policy
            </a>
            <a href="/terms-of-service" className="hover:underline">
              Terms of Service
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
