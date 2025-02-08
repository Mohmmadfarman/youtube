import axios from "axios"
const BASE_URL='https://www.googleapis.com/youtube/v3'
const API_KEY="AIzaSyDr_d8s8N9DOSirI39D8YT9NCQ6j6eK5AU"

export const fetctApiforYoutuveData= async(endpoints,params={})=>{
try {
    const response=await axios.get(`${BASE_URL}/${endpoints}`,{
        params:{
            ...params,
            key:API_KEY
        }
    })
    // console.log('this res',response);
    return response.data
    
    
} catch (error) {
    console.log(error);
    
    
}

}