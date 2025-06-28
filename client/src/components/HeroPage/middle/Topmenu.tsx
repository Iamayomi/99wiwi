import { useState } from "react";
import { FaSearch, FaHome, FaTrophy, FaAngleRight, FaGamepad, FaBars } from "react-icons/fa";

import { IoMdMore, IoMdArrowDropdown } from "react-icons/io";

const Topmenu = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [active, setActive] = useState<string>("Matches");

  return (
    <section>
      {/* Top Navigation Bar */}
      <nav className="bg-[#1e1e1e] text-white flex items-center px-4 py-2 text-sm">
        {/* Left Icons */}
        <div className="flex items-center gap-2">
          <FaHome className="text-lg cursor-pointer" />
          <FaAngleRight className="text-gray-400 hidden sm:inline" />
          <FaTrophy className="text-lg cursor-pointer" />
        </div>

        {/* Navigation Links */}
        <div className="hidden sm:flex ml-4 gap-4">
          {["Matches", "Recommended", "Upcoming events", "1st period", "2nd period"].map((item) => (
            <span key={item} className={`cursor-pointer px-2 py-1 ${active === item ? "border-b-2 border-theme-color" : "text-gray-400"}`} onClick={() => setActive(item)}>
              {item}
            </span>
          ))}
        </div>

        {/* Search */}
        <div className="ml-auto flex items-center bg-[#2e2e2e] px-2 py-1 rounded-md w-full max-w-[200px] sm:max-w-xs">
          <input type="text" placeholder="Search" className="bg-transparent outline-none text-white px-2 text-sm w-full" />
          <FaSearch className="text-gray-400" />
        </div>

        {/* Mobile Menu Icon */}
        <div className="sm:hidden flex ml-2">
          <FaBars className="text-lg cursor-pointer" onClick={() => setMenuOpen(!menuOpen)} />
        </div>
      </nav>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="bg-gray-900 text-white p-2 absolute top-12 left-0 w-full z-50 sm:hidden">
          {["Matches", "Recommended", "Upcoming events", "1st period", "2nd period"].map((item) => (
            <div
              key={item}
              className="p-2 border-b border-gray-700 hover:bg-gray-800"
              onClick={() => {
                setActive(item);
                setMenuOpen(false);
              }}>
              {item}
            </div>
          ))}
        </div>
      )}

      {/* Secondary Nav */}
      <div className="bg-black text-white flex items-center p-2 space-x-4 text-sm relative">
        <div className="flex space-x-4">
          <FaGamepad className="text-lg cursor-pointer" />
          <IoMdMore className="text-lg cursor-pointer" />
          <IoMdArrowDropdown className="text-lg cursor-pointer" />
        </div>
      </div>
    </section>
  );
};

export default Topmenu;
