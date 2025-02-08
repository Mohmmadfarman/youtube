import React from 'react'
import { useAppContext } from '../../useContext/UseContextApi';

function MenuItems({item,isSelected,onClick}) {
  // console.log("MenuItems item:", item);

  const {isDarkMode}=useAppContext()
  
  return (
    <div
    onClick={item.type === "category" ? () => { console.log("Clicked:", item.name); onClick(); } : undefined}
    className={`px-4 py-3 flex items-center space-x-4 rounded-md cursor-pointer mb-2 ${
      isDarkMode ? "text-gray-300 hover:bg-gray-700" : "hover:bg-gray-100 text-gray-500"
    } ${isSelected ? (isDarkMode ? "bg-gray-700" : "bg-gray-100") : ""}`}
  >
  

      <span className={`text-xl ${isDarkMode ?"text-gray-300":"text-gray-700"}`}>
        {item.icon}
      </span>
      <span className={`font-medium ${isDarkMode ?"text-gray-300":"text-gray-700"}`}>
        {item.name}
      </span>
      
      
    </div>
  )
}

export default MenuItems
