

import React from "react";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between px-4 py-3">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <input
            type="search"
            placeholder="Search notes..."
            className="px-4 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 w-64"
          />
        </div>
      </div>
      <button className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors flex items-center gap-2">
        <span>Sign Out</span>
      </button>
    </nav>
  );
};

export default Navbar;