import React from "react";
import { useAppContext } from "../../useContext/UseContextApi";
import { categories, menuItems } from "../../utiles/Constant";
import MenuItems from "./MenuItems";
import { useNavigate } from "react-router-dom";

function Sidebar() {
  const { selectcatagory, mobilemenu, setselectcatagory } = useAppContext();
  const { isDarkMode ,temp} = useAppContext();
  const navigate=useNavigate()

  const handleCatagoryClick = (id, name) => {
    // console.log("Category details:", id, name);
    setselectcatagory(id); // Update the selected category state
    if (name === "Home") {
        navigate("/");
    }
};


  return (
    <div
    className={ `small:relative mini:relative mobile:relative w-[180px] md:block overflow-y-auto h-full py-4 lg:w-[300px] md:w-[200px]  absolute md:relative z-10
      ${mobilemenu ? "block" : "hidden"}
    
   

    `}
  >
    {/* Sidebar content goes here */}

  
      <div className="flex flex-col pc-5 mb-20">
        {categories.map((item, index) => {
            return(
          <MenuItems
            key={index}
            item={item}
            isSelected={item.id === selectcatagory}
            onClick={() => handleCatagoryClick(item.id, item.name)}
          />
        )})}
        <hr
          className={`my-3 ${
            isDarkMode ? "border-gray-600" : "border-gray-200"
          }`}
        />

        {menuItems.map((item) => {
            return(
          <MenuItems item={item} key={item.name} isSelected={false} />
        )})}
        <hr
          className={`my-3 ${
            isDarkMode ? "border-gray-600" : "border-gray-300"
          }`}
        />

        <div className={`flex items-center text-sm justify-center ${isDarkMode ?"text-white":"text-gray-600"} font-bold`}>
          Made by -Mo Farman
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
