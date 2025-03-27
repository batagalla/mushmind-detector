
import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 md:flex md:items-center md:justify-between">
        <div className="flex justify-center space-x-6 md:order-2">
          <Link to="/feedback" className="text-gray-500 hover:text-mushroom-500">
            Feedback
          </Link>
          <a href="#" className="text-gray-500 hover:text-mushroom-500">
            Privacy Policy
          </a>
          <a href="#" className="text-gray-500 hover:text-mushroom-500">
            Terms of Service
          </a>
        </div>
        <div className="mt-8 md:mt-0 md:order-1">
          <p className="text-center text-gray-500 text-sm">
            &copy; {currentYear} MushroomID. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
