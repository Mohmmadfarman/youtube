import React,{useContext,useState,createContext} from "react";

const ThemeContext=createContext()

export const useTheme=()=>useContext(ThemeContext);


export const ThemeProvider=({children})=>{
    const [temp,settemp]=useState(false)
    const [isDarkMode,setisDarkMode]=useState(false)
    const toggoleTheme=()=>{
        setisDarkMode(preMode=>!preMode),
        settemp(!temp)

    }

    return(
        <ThemeContext.Provider value={{toggoleTheme,isDarkMode,temp}}>

            {children}

        </ThemeContext.Provider>
    )
}
