import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppContext } from "../../useContext/UseContextApi";
import { useTheme } from "../../useContext/useTheme";
import { fetctApiforYoutuveData } from "../../utiles/FetchApi";
import Header from "../HeaderSection/Header";
import { formatPublishTime, formatViewCount } from "../../utiles/Helper";
import { FaDownload, FaThumbsDown, FaThumbsUp } from "react-icons/fa";
import VideoComments from "./VideoComments";
import Relatedvideos from "./Relatedvideos";
import { IoMdHome } from "react-icons/io";

function VideoDetails({online}) {
  const { categoryId, videoId } = useParams();
  const { setloading,mobilemenu } = useAppContext();
  const { isDarkMode } = useTheme();
  const [showDescription,setshowDescription]=useState(false);
  const [sub,setsub]=useState(false)

  const [selectedvideoDetails, setselectedvideoDetails] = useState();
  const [channelData, setchannelData] = useState();
  const [comments, setcomments] = useState();

  const fetchSelectedVideoDetails = async () => {
    setloading(true);

    try {
      const data = await fetctApiforYoutuveData("videos", {
        part: "snippet,contentDetails,statistics",
        id: videoId,
      });
      setselectedvideoDetails(data.items[0]);
    } catch (error) {
      console.log(error, "error selected videos");
    }
  };
  // channel data
  const fetchChannelData = async () => {
    if (selectedvideoDetails?.snippet?.channelId) {
      try {
        const data = await fetctApiforYoutuveData("channels", {
          part: "snippet,contentDetails,statistics",
          id: selectedvideoDetails?.snippet?.channelId,
        });
        // console.log("nnnnnn", data.items[0]);

        setchannelData(data?.items[0]);
      } catch (error) {
        console.log(error, "error fetching channel data");
      } finally {
        setloading(false);
      }
    }
  };
  //
  useEffect(() => {
    fetchSelectedVideoDetails();
  }, [videoId]);
  //video comments

  const fetchVideoComments = async () => {
        setloading(true)
      try {
        const data = await fetctApiforYoutuveData("commentThreads", {
          part: "snippet",
          videoId:videoId,
          maxResults:10
        });
        // console.log("nnnnnn", data.items[0]);

        setcomments(data?.items);
      } catch (error) {
        console.log(error, "error fetching channel data");
      } finally {
        setloading(false);
      }
    
  };
  //
  useEffect(() => {
    fetchSelectedVideoDetails();
    fetchVideoComments();
  }, [videoId]);


  useEffect(() => {
    fetchChannelData();
  }, [selectedvideoDetails]);

  const toggledescription=()=>{
    setshowDescription(!showDescription);


  }

  const subs=()=>{
    setsub(!sub)
  }

  const description=selectedvideoDetails?.snippet?.description;
  const truncatedescription=description?.slice(0,200);
  console.log('comments',comments);
  

  console.log("videodetails", selectedvideoDetails);
  console.log("channeldetails", channelData);

  //
  const navigator=useNavigate()
  const backtohome1=()=>{
    navigator("/");
  }

  return (
    <div>
      <Header online={online}/>
       <div id='back' className={`${isDarkMode ? "bg-gray-900":""}`}>
                
              {mobilemenu && <button className={`p-2 mt-1 ml-3 bg-gray-500 rounded-md ${isDarkMode ?"bg-white":""}`} onClick={backtohome1}><IoMdHome/></button> }
              </div>
      <div
      
        className={`flex justify-center flex-row h-full ${
          isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
        }`}
      >
        <div className="w-full flex flex-col p-4 md:flex-row lg:flex-row lg:space-x-4">
          <div className="flex flex-col lg:w-[70%] px-4 py-3 lg:py-6 overflow-auto">
            {/*  */}
            <div className="h-[260px] md:h-[340px] lg:h-[370px] ml-[-16px] lg:ml-0 mr-[-16px] lg:mr-0 ">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerpolicy="strict-origin-when-cross-origin"
                allowfullscreen
                className="rounded-lg"
              ></iframe>
            </div>
            {/*  */}
            {selectedvideoDetails && (
              <div className="mt-4 flex flex-col gap-6">
                <h2 className="text-xl font-semibold">
                  {selectedvideoDetails?.snippet?.title}
                </h2>
                {/*  */}
                <div className="flex flex-col lg:flex-row  lg:items-center justify-between">
                  <></>
                  <div className="flex items-center mb-4 lg:mb-0">
                    <img
                      src={channelData?.snippet?.thumbnails?.default?.url}
                      alt=""
                      className="rounded-full  w-12 h-12"
                    />
                  </div>
                  {/* channel name */}
                  <div className="mt-2 ml-2 lg:mt-0">
                    <h3 className="text-lg font-semibold">
                      {channelData?.snippet?.title}
                    </h3>
                    <p
                      className={`font-mono ${
                        isDarkMode ? "text-gray-200" : "text-gray-700 "
                      }`}
                    >
                      {formatViewCount(
                        channelData?.statistics?.subscriberCount
                      )}{" "}
                      subscriber
                    </p>
                  </div>
                  {/* button */}
                  <div onClick={subs}>
                    {!sub ?<button className=" bg-black text-white font-semibold px-6 py-2 lg:py-2 mt-2 lg:mt-0 ml-1 lg:ml-6 rounded-lg">
                    Subscribe
                  </button>:<button className=" bg-[red] text-white font-semibold px-6 py-2 lg:py-2 mt-2 lg:mt-0 ml-1 lg:ml-6 rounded-lg">
                    Subscribed
                  </button>}
                  </div>
                  {/*  */}
                  <div className="flex items-ceter justify-between space-x-4">
                    <button
                      className={`flex items-center space-x-2 rounded-full px-4 py-2 md:px-6 md:py-3 ${
                        isDarkMode ? "bg-black" : "bg-slate-200"
                      }`}
                    >
                      <FaThumbsUp />
                      <span>
                        {formatViewCount(
                          selectedvideoDetails?.statistics?.likeCount
                        )}
                      </span>
                      <div className="h-5 w-[1px] bg-gray-400 mx-2 ">
                        <FaThumbsDown />
                      </div>
                    </button>
                    {/*  */}
                    <button
                      className={`flex items-center space-x-2 rounded-full px-4 py-2 md:px-6 md:py-3 ${
                        isDarkMode ? "bg-black" : "bg-slate-200"
                      }`}
                    >
                      <FaDownload />
                    </button>
                  </div>

                </div>
                {/*  */}
                <div className="bg-slate-200 rounded-xl p-4">
                  <p className="text-gray-900">
                    {formatViewCount(selectedvideoDetails?.statistics?.viewCount)} {" "}views .{" "}{formatPublishTime(selectedvideoDetails?.snippet?.publishedAt)}
                  </p>
                  <p className="text-black">
                    {showDescription? description:truncatedescription} {" "}
                    <span onClick={toggledescription} className="text-blue-600 cursor-pointer">{showDescription ? 'show less':'show more...'}</span>
                  </p>
                </div>
              </div>
            )}
            {/* comment */}
            <div className="mt-3">
              <p className={`${isDarkMode ? "text-gray-200":"text-black"} font-semibold text-lg`}>
                {formatViewCount(selectedvideoDetails?.statistics?.commentCount)} {" "}Comments
              </p>

            </div>
           <div className={`flex flex-col ${isDarkMode ?"bg-gray-800 p-3 rounded-md":""}`}>
           {comments?.map((comment)=>{
              return(
                <VideoComments key={comment.id} comment={comment}/>
              )
            })}
           </div>
          </div>
           {/* related video*/}
          <div className="lg:w-[30%] p-4">
          <h1 className="text-[17px] lg:text-2xl font-bold mb-4">Related videos</h1>
              <Relatedvideos categoryId={categoryId}/>
        </div>
        </div>
       
       
      </div>
    </div>
  );
}

export default VideoDetails;
