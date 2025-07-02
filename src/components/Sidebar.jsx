import React, { useState } from "react";
import {
  dashboardIcon,
  productsIcon,
  customberIcon,
  marketingIcon,
  reportingIcon,
  settingsIcon,
  supportIcon,
  upDownIcon,
} from "../assets/icons";
import SearchBar from "./SearchBar";

const Sidebar = ({ isOpen, onToggle, onPageChange, currentPage }) => {
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

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 md:hidden bg-white/30 backdrop-blur-sm"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed left-0 top-0 h-screen w-auto transform transition-transform duration-300 ease-in-out
          bg-white text-black border-r border-gray-200
          grid grid-rows-[auto_auto_1fr_auto]
          lg:sticky lg:translate-x-0
          ${isOpen ? "translate-x-0 z-40" : "-translate-x-full"}
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
                0px -0.5px 20px 20px rgba(10, 13, 18, 0.10) inset
              `,
            }}
          ></div>
        </div>

        {/* Search Bar Section */}
        <div className="p-5">
          <SearchBar />
        </div>

        {/* Menu Items Section */}
        <div className="px-5 py-6 overflow-y-auto">
          <nav className="space-y-2">
            {menuItems.map((item, index) => (
              <button
                key={item.id}
                onClick={() => handleMenuClick(item.id)}
                className={`
                  w-full flex items-center gap-4 px-5 py-2 rounded-xl
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
                    flex w-full items-center gap-4 px-5 py-2 rounded-xl
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
                  {item.id === "support" && (
                    <div className="ml-auto flex items-center gap-1 px-2 py-1 border border-[#D5D7DA]  rounded-md">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-xs text-[#414651] font-medium">
                        Online
                      </span>
                    </div>
                  )}
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
                <div className="text-sm font-semibold text-gray-800 mb-1">
                  Used space
                </div>
                <div className="text-sm text-[#535862] mb-2">
                  Your team has used 80% of your available space. Need more?
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-[#099250] h-2 rounded-full"
                    style={{ width: "75%" }}
                  ></div>
                </div>
                <div className="flex gap-[5%] mt-2 font-semibold text-sm ">
                  <span className="text-[#535862]">Dismiss</span>
                  <span className="text-[#087443]">Upgrade Plan</span>
                </div>
              </div>
            </div>
          )}
          <div className="flex items-start gap-3 p-4 rounded-xl border border-gray-200 relative">
            <div className="w-11 h-11 rounded-full border relative border-gray-300">
              <div className="absolute right-0 bottom-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-sm text-black truncate">
                Clara Smith
              </div>
              <div className="text-sm text-gray-600 truncate">
                clara@bizclues.com
              </div>
            </div>
            <div className="h-full hover:cursor-pointer">
              <img src={upDownIcon} alt="" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
