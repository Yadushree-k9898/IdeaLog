import { useState } from 'react';
import { Link, useLocation } from "react-router-dom";
import { Mic, Moon, Sun } from "lucide-react";

const Navbar = () => {
  const location = useLocation();
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <header className={`fixed w-full ${isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"} shadow-md z-10 transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <Mic className="text-purple-600 mr-2" size={24} />
            <span className="text-2xl font-bold text-purple-600">VoiceNotes</span>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Navigation links based on current page */}
            {location.pathname === "/homepage" ? (
              <Link
                to="/dashboard"
                className={`px-4 py-2 rounded-md ${isDarkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-100 hover:bg-gray-200"} transition-colors duration-200`}
              >
                Dashboard
              </Link>
            ) : location.pathname === "/dashboard" ? (
              <Link
                to="/homepage"
                className={`px-4 py-2 rounded-md ${isDarkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-100 hover:bg-gray-200"} transition-colors duration-200`}
              >
                Home
              </Link>
            ) : null}
            
            {/* Dark mode toggle */}
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-full ${isDarkMode ? "bg-gray-700 text-yellow-300" : "bg-gray-100 text-gray-700"} transition-colors duration-200`}
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            
            {/* Auth links - show these conditionally based on auth state in a real app */}
            {location.pathname !== "/dashboard" ? (
              <>
                <Link 
                  to="/login" 
                  className={`px-4 py-2 rounded-md ${isDarkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-100 hover:bg-gray-200"} transition-colors duration-200`}
                >
                  Login
                </Link>
                <Link 
                  to="/signup" 
                  className="px-4 py-2 rounded-md bg-purple-600 text-white hover:bg-purple-700 transition-colors duration-200"
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <button className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 text-gray-700 transition-colors duration-200">
                Sign Out
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;