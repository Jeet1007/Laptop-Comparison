import React from "react";

const Footer = () => {
    return (
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
    );
}

export default Footer;
