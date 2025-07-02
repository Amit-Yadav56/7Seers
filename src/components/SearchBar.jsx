import React, { useState } from "react";
import { searchIcon } from "../assets/icons";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
  return (
    <div>
      <div
        className="relative flex items-center rounded-md px-4 border border-[#D5D7DA]"
        style={{
          boxShadow: "0px 1px 2px 0px rgba(213, 215, 218, 1)",
        }}
      >
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
  );
};

export default SearchBar;
