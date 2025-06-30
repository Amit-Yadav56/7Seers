import React, { useState } from "react";
import {
  searchIcon,
  dashboardIcon,
  productsIcon,
  customberIcon,
  marketingIcon,
  reportingIcon,
  settingsIcon,
  supportIcon,
  upDownIcon,
} from "../assets/icons";

const Sidebar = ({ isOpen, onToggle, onPageChange, currentPage }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showStorageNotification, setShowStorageNotification] = useState(true);

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: dashboardIcon },
    { id: "products", label: "Products", icon: productsIcon },
    { id: "customers", label: "Customers", icon: customberIcon },
    { id: "marketing", label: "Marketing", icon: marketingIcon },
    { id: "reporting", label: "Reporting", icon: reportingIcon },
  ];

  const bottomMenuItems = [
    { id: "settings", label: "Settings", icon: settingsIcon },
    { id: "support", label: "Support", icon: supportIcon },
  ];

  const handleMenuClick = (itemId) => {
    console.log(`Clicked on ${itemId}`);
    // Update the current page
    if (onPageChange) {
      onPageChange(itemId);
    }
    // Close sidebar on mobile after clicking menu item
    if (window.innerWidth < 1024) {
      onToggle();
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed left-0 top-0 h-screen w-auto z-50 transform transition-transform duration-300 ease-in-out
          bg-white text-black shadow-2xl border-r border-gray-200
          grid grid-rows-[auto_auto_1fr_auto]
          lg:relative lg:translate-x-0
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Header Section with Profile Pic */}
        <div className="p-8 pb-5 flex justify-start">
          <div
            className="w-8 h-8 rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300 border-[0.2px] border-[#0A0D121F]"
            style={{
              background:
                "linear-gradient(180deg, rgba(255, 255, 255, 0.2) 0%, rgba(10, 13, 18, 0.2) 100%)",
              boxShadow: `
                0px 1px 2px 0px rgba(10, 13, 18, 0.06),
                0px 1px 3px 0px rgba(10, 13, 18, 0.10),
                0px 1px 1px -0.5px rgba(10, 13, 18, 0.13),
                0px -0.5px 0.5px 0px rgba(10, 13, 18, 0.10) inset
              `,
            }}
          ></div>
        </div>

        {/* Search Bar Section */}
        <div className="p-5">
          <div className="relative flex items-center rounded-md px-4 border border-[#D5D7DA]">
            <span className="text-gray-600 mr-3 size-5">
              <img src={searchIcon} alt="search" />
            </span>
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={handleSearchChange}
              className="bg-transparent border-none outline-none text-black py-3 flex-1 placeholder-gray-500 w-[80%]"
            />
            <span className="text-[#717680] font-medium  w-auto h-full border border-[#E9EAEB] rounded-xs py-[1px] px-1">
              ⌘K
            </span>
          </div>
        </div>

        {/* Menu Items Section */}
        <div className="px-5 py-6 overflow-y-auto">
          <nav className="space-y-2">
            {menuItems.map((item, index) => (
              <button
                key={item.id}
                onClick={() => handleMenuClick(item.id)}
                className={`
                  w-full flex items-center gap-4 px-5 py-4 rounded-xl
                  border transition-all duration-300
                  text-left font-semibold text-md tracking-wide text-[#414651]
                  animate-slideIn
                  bg-transparent border-transparent hover:bg-gray-50 hover:border-gray-200
                  hover:translate-x-1
                `}
                style={{
                  animationDelay: `${index * 0.1}s`,
                  animationFillMode: "both",
                }}
              >
                <span className="text-lg w-6 h-6 flex items-center justify-center">
                  <img src={item.icon} alt="" />
                </span>
                <span className="font-semibold tracking-wide text-[#414651]">
                  {item.label}
                </span>
              </button>
            ))}
          </nav>
        </div>

        {/* User Info Section at Bottom */}
        <div className="p-5">
          {/* Bottom Menu Items */}
          <div className="mb-4">
            <nav className="space-y-2">
              {bottomMenuItems.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => handleMenuClick(item.id)}
                  className={`
                    flex w-full items-center gap-4 px-5 py-4 rounded-xl
                    border transition-all duration-300
                    text-left font-semibold text-md tracking-wide text-[#414651]
                    bg-transparent border-transparent hover:bg-gray-50 hover:border-gray-200
                    hover:translate-x-1
                  `}
                >
                  <span className="text-lg w-6 h-6 flex items-center justify-center">
                    <img src={item.icon} alt="" />
                  </span>
                  <span className="font-semibold tracking-wide text-[#414651]">
                    {item.label}
                  </span>
                </button>
              ))}
            </nav>
          </div>
          {/* Storage Notification */}
          {showStorageNotification && (
            <div className="mb-4 p-3 bg-[#FAFAFA] rounded-lg relative">
              <button
                onClick={() => setShowStorageNotification(false)}
                className="absolute top-2 right-2 text-[#A4A7AE] hover:text-gray-600"
              >
                ✕
              </button>
              <div className="pr-6">
                <div className="text-sm font-medium text-gray-800 mb-1">
                  Used space
                </div>
                <div className="text-xs text-gray-600 mb-2">
                  Your team has used 80% of your available space. Need more?
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-[#099250] h-2 rounded-full"
                    style={{ width: "75%" }}
                  ></div>
                </div>
                <div className="flex gap-[5%] mt-2 font-semibold ">
                  <span className="text-[#535862]">Dismiss</span>
                  <span className="text-[#087443]">Upgrade Plan</span>
                </div>
              </div>
            </div>
          )}
          <div className="flex items-start gap-3 p-4  rounded-xl border border-gray-200">
            <div className="w-11 h-11 rounded-full overflow-hidden border border-gray-300"></div>
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-sm text-black truncate">
                John Parker
              </div>
              <div className="text-xs text-gray-600 truncate">
                john.parker@company.com
              </div>
            </div>
            <div className="h-full">
              <img src={upDownIcon} alt="" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
