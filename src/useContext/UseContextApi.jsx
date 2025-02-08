import { useContext,createContext,useState,useEffect } from "react";
import { fetctApiforYoutuveData } from "../utiles/FetchApi";


export const Context=createContext()
export const AppContext=({children})=>{
    const [selectcatagory,setselectcatagory]=useState('0')
    const [loading,setloading]=useState(false)
    const [videoData,setvideoData]=useState([])
    const [mobilemenu,setmobilemenu]=useState(false)
   

    const fetchYoutubeData=async(params)=>{
        setloading(true)
        try {
            const res=await fetctApiforYoutuveData('videos',params)
            setvideoData(res.items)
            // console.log(res.items);
            

            
        } catch (error) {
            console.log(error,'error fetching response');
            
            
        }
        finally{
            setloading(false)
        }

    }

    useEffect(() => {
        // console.log("Selected category changed to:", selectcatagory);
        if (selectcatagory) {
            if (selectcatagory === "0") {
                fetchYoutubeData({
                    part: "snippet,contentDetails,statistics",
                    regionCode: "IN",
                    maxResults: 10,
                    chart: "mostPopular",
                });
            } else {
                fetchYoutubeData({
                    part: "snippet,contentDetails,statistics",
                    chart: "mostPopular",
                    regionCode: "IN",
                    maxResults: 8,
                    videoCategoryId: selectcatagory, // Ensure this is valid
                });
            }
        }
    }, [selectcatagory]);
    

    return(
        <Context.Provider value={{selectcatagory,setselectcatagory,setmobilemenu,mobilemenu,videoData,loading,setloading}}>
            {children}

        </Context.Provider>
    )

    
    

}

export const useAppContext=()=>{
    return useContext(Context);
}
