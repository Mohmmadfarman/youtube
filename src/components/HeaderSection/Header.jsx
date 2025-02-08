import React, { useState } from "react";
import { useAppContext } from "../../useContext/UseContextApi";
import { useTheme } from "../../useContext/useTheme";
import { Link, useNavigate } from "react-router-dom";

import Spinner from "../../utiles/Spinner";
import { CgClapperBoard, CgClose } from "react-icons/cg";
import { SlMenu } from "react-icons/sl";
import { IoIosSearch, IoMdMic } from "react-icons/io";
import { IoMdNotificationsOutline } from "react-icons/io";
import { FaMoon, FaSun, FaUserCircle } from "react-icons/fa";

import Logomobile from "../../assets/youtube_mobile.png";
import Logodestop from "../../assets/yt_dekstop.png";

function Header({online}) {
  const [searchQuery, setSearchQuery] = useState("");
  const { setmobilemenu, mobilemenu, loading } = useAppContext();
  const { toggoleTheme, isDarkMode } = useTheme();
  const navigate = useNavigate();

  const handleSearchQuery = () => {
    if (searchQuery.trim().length > 0) {
      navigate(`/search/${searchQuery}`);
      setSearchQuery("");
    }
  };

  const handleClearSearchQuery = () => setSearchQuery("");

  const mobileToggleMenu = () => setmobilemenu(!mobilemenu);

  return (
    <div
      className={`sticky top-0 z-10 flex items-center justify-between h-16 shadow-lg px-4 md:px-6 ${
        isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"
      }`}
    >
      {/* Left: Logo and Menu */}
      <div className="flex items-center space-x-2">
        {/* Hamburger Menu for Mobile */}
        <div
          className={`flex md:hidden cursor-pointer items-center justify-center h-9 w-9 rounded-full hover:${
            isDarkMode ? "bg-gray-700" : "bg-gray-300"
          }`}
          onClick={mobileToggleMenu}
        >
          {mobilemenu ? (
            <CgClose className="text-xl" />
          ) : (
            <SlMenu className="text-xl" />
          )}
        </div>

        {/* Logo */}
        <Link to="/" className="flex items-center h-full">
          <img
            src={Logodestop}
            alt="Desktop Logo"
            className={`hidden md:block h-20 ${isDarkMode ? "invert" : ""}`}
          />
          <img
            src={Logomobile}
            alt="Mobile Logo"
            className={`block md:hidden h-auto max-h-16 min-h-[64px] min-w-[80px] object-contain ${
              isDarkMode ? "invert" : ""
            }`}
          />
        </Link>
      </div>

      {/* Middle: Search Bar */}
      <div className="flex items-center flex-grow mx-4 max-w-full sm:max-w-lg">
        {/* only search icon */}
        <button id="btn" onClick={handleSearchQuery}><IoIosSearch className="text-lg" /></button>
        <div
          className={`flex flex-grow h-10 border rounded-full overflow-hidden ${
            isDarkMode ? "border-gray-700" : "border-gray-300"
          }` }
          id="input">
         {/* input  */}
         {
          online ? <input
          type="text"
          className={`flex-grow pl-4 text-sm bg-transparent outline-none ${
            isDarkMode ? "text-white" : "text-black"
          } `}
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyUp={(e) => e.key === "Enter" && handleSearchQuery()}
         />
        :
        <input
        type="text"
        className={`flex-grow pl-4 text-sm bg-transparent outline-none ${
          isDarkMode ? "text-white" : "text-black"
        } `}
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyUp={(e) => e.key === "Enter" && handleSearchQuery()}
        disabled/>
         }


         {/*  */}
          <button
            className={`w-10 flex items-center justify-center ${
              isDarkMode ? "bg-gray-700 text-white" : "bg-gray-300 text-black"
            }`}
            onClick={handleSearchQuery}
          >
            <IoIosSearch className="text-lg" />
          </button>
          <button
            className={`w-10 flex items-center justify-center ${
              isDarkMode ? "bg-gray-700 text-white" : "bg-gray-300 text-black"
            } ml-1`}
          >
            <IoMdMic className="text-lg" />
          </button>
           
        </div>
       

        {searchQuery && (
          <button
            className="ml-2 text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100"
            onClick={handleClearSearchQuery}
          >
            <CgClose className="text-xl" />
          </button>
        )}
      </div>

      {/* <div className=" bg-gray-300 p-2 rounded-full hover:bg-gray-500 duration-100">
        <IoMic className=" text-xl" />
      </div> */}

      {/* Right: Icons and Theme Toggle */}
      <div className="flex items-center space-x-4" id="allhide">
        <button
          className={`p-2 rounded-full hover:bg-gray-300 ${
            isDarkMode ? "hover:bg-gray-700" : ""
          }`}
        >
          <IoMdNotificationsOutline
            size={24}
            className="hidden lg:block md:block tablet:block"
          />
        </button>
        <button
          className={`p-2 rounded-full hover:bg-gray-300 ${
            isDarkMode ? "hover:bg-gray-700" : ""
          }`}
        >
          <FaUserCircle
            size={24}
            className="hidden lg:block md:block tablet:block"
          />
        </button>
       
      </div>
      {/* dark icon */}
      <button
          className={`p-2 rounded-full hover:bg-gray-300 ${
            isDarkMode ? "hover:bg-gray-700" : ""
          }`}
          onClick={toggoleTheme}
         id="btn1">
          {isDarkMode ? <FaSun /> : <FaMoon />}
        </button>

      {/* Spinner */}
      {loading && <Spinner />}
    </div>
  );
}

export default Header;
