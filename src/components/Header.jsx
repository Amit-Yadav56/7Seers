import React, { useState } from "react";

const Header = ({ currentPage, onToggleSidebar, onSearch }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchToggle = () => {
    setIsSearchOpen(!isSearchOpen);
    if (isSearchOpen) {
      setSearchQuery("");
      if (onSearch) onSearch("");
    }
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    if (onSearch) onSearch(value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (onSearch) onSearch(searchQuery);
  };

  // Get page icon based on current page
  const getPageIcon = (page) => {
    const icons = {
      dashboard: "📊",
      products: "📦",
      customers: "👥",
      marketing: "📈",
      reporting: "📋",
      settings: "⚙️",
      support: "🎧",
    };
    return icons[page.toLowerCase()] || "📄";
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-30">
      <div className="flex items-center justify-between px-4 py-3 md:px-6 md:py-4">
        {/* Left side - Mobile toggle + Page title */}
        <div className="flex items-center gap-4">
          {/* Mobile hamburger menu */}
          <button
            onClick={onToggleSidebar}
            className="md:hidden p-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors duration-200 shadow-md"
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
            <span className="text-2xl">{getPageIcon(currentPage)}</span>
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-gray-800 capitalize">
                {currentPage}
              </h1>
              <p className="text-xs md:text-sm text-gray-500 hidden md:block">
                {currentPage === "dashboard"
                  ? "Overview and analytics"
                  : currentPage === "products"
                  ? "Manage your products"
                  : currentPage === "customers"
                  ? "Customer management"
                  : currentPage === "marketing"
                  ? "Marketing campaigns"
                  : currentPage === "reporting"
                  ? "Reports and insights"
                  : currentPage === "settings"
                  ? "System configuration"
                  : currentPage === "support"
                  ? "Help and support"
                  : "Page content"}
              </p>
            </div>
          </div>
        </div>

        {/* Right side - Search */}
        <div className="flex items-center gap-3">
          {/* Search form - visible when open */}
          <form
            onSubmit={handleSearchSubmit}
            className={`
              relative transition-all duration-300 ease-in-out
              ${isSearchOpen ? "w-64 md:w-80 opacity-100" : "w-0 opacity-0"}
              overflow-hidden
            `}
          >
            <div className="relative">
              <input
                type="text"
                placeholder="Search anything..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors duration-200"
                autoFocus={isSearchOpen}
              />
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                <svg
                  className="w-4 h-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
          </form>

          {/* Search toggle button */}
          <button
            onClick={handleSearchToggle}
            className={`
              p-2 rounded-full transition-all duration-200
              ${
                isSearchOpen
                  ? "bg-red-100 text-red-600 hover:bg-red-200"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }
            `}
            title={isSearchOpen ? "Close search" : "Open search"}
          >
            {isSearchOpen ? (
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
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
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            )}
          </button>

          {/* User profile button */}
          <button className="p-1 rounded-full hover:bg-gray-100 transition-colors duration-200">
            <img
              src="https://via.placeholder.com/32x32/4F46E5/white?text=JP"
              alt="Profile"
              className="w-8 h-8 rounded-full border-2 border-gray-200"
            />
          </button>
        </div>
      </div>

      {/* Search results indicator (optional) */}
      {searchQuery && (
        <div className="px-4 md:px-6 pb-2">
          <p className="text-sm text-gray-500">
            Searching for:{" "}
            <span className="font-medium text-gray-700">"{searchQuery}"</span>
          </p>
        </div>
      )}
    </header>
  );
};

export default Header;
