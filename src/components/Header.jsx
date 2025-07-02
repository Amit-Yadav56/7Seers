import React, { useState } from "react";
import SearchBar from "./SearchBar";

const Header = ({ currentPage, onToggleSidebar }) => {
  return (
    <header className="bg-white relative top-0 z-30">
      <div className="flex items-center justify-between">
        {/* Left side - Mobile toggle + Page title */}
        <div className="flex items-center gap-4">
          {/* Mobile hamburger menu */}
          <button
            onClick={onToggleSidebar}
            className="lg:hidden p-2 rounded-lg bg-[#099250] text-white hover:bg-green-400 transition-colors duration-200 shadow-md"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          {/* Page title with icon */}
          <div className="flex items-center gap-3">
            <div>
              <h1 className="text-xl md:text-2xl font-semibold text-gray-800 capitalize">
                {currentPage}
              </h1>
            </div>
          </div>
        </div>

        {/* Right side - Search */}
        <SearchBar />
      </div>
    </header>
  );
};

export default Header;
