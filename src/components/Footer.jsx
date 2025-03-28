
import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6">
        <div className="md:flex md:items-center md:justify-between">
          <div className="flex justify-center md:justify-start">
            <Link to="/" className="text-mushroom-600 font-bold text-xl">
              MushroomID
            </Link>
          </div>
          
          <div className="flex justify-center space-x-4 md:space-x-6 mt-4 md:mt-0">
            <Link to="/feedback" className="text-gray-500 hover:text-mushroom-500 text-sm md:text-base">
              Feedback
            </Link>
            <Link to="#" className="text-gray-500 hover:text-mushroom-500 text-sm md:text-base">
              Privacy Policy
            </Link>
            <Link to="#" className="text-gray-500 hover:text-mushroom-500 text-sm md:text-base">
              Terms of Service
            </Link>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-200 pt-4">
          <p className="text-center text-gray-500 text-sm">
            &copy; {currentYear} MushroomID. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
