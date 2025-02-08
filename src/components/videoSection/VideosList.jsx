import React, { useEffect, useState } from "react";
import { useTheme } from "../../useContext/useTheme";
import { Link } from "react-router-dom";
import {
  formatDuration,
  formatPublishTime,
  formatViewCount,
} from "../../utiles/Helper";
import { fetctApiforYoutuveData } from "../../utiles/FetchApi";
import { ShimmerDiv,ShimmerSectionHeader } from "shimmer-effects-react";



function VideosList({ video }) {
  const { isDarkMode } = useTheme();
  const [channelData, setChannelData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchChannelData = async () => {
    try {
      const data = await fetctApiforYoutuveData("channels", {
        part: "snippet,contentDetails,statistics",
        id: video?.snippet?.channelId,
      });
      setChannelData(data?.items[0]);
    } catch (error) {
      console.error("Error fetching channel data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      fetchChannelData();
    }, 1000);
  }, [video]);

  return (
    <div className="mt-4">
      {loading ? (
        // Shimmer Effect
       <div className="w-full">
        <ShimmerDiv mode="light" height={240} width={270} />
        <ShimmerSectionHeader center={true} mode="light" />

         
       </div>
      ) : // Loaded Data: Display in a 3x3 grid
      channelData ? (
        <Link to={`/video/${video.snippet.categoryId}/${video.id}`}>
          <div className="flex flex-col mb-8">
            <div className="relative overflow-hidden">
              <img
                src={video?.snippet?.thumbnails?.medium?.url}
                alt=""
                className="w-full h-full object-cover hover:rounded-md duration-500 mb-2"
              />
              <span className="absolute bottom-4 right-0 bg-black text-white text-xs p-1 m-1 rounded">
                {formatDuration(video?.contentDetails?.duration)}
              </span>
            </div>
            <div className="flex mt-3">
              <div className="flex items-center">
                <div className="flex h-9 w-9 rounded-full overflow-hidden">
                  <img
                    src={channelData?.snippet?.thumbnails?.default?.url}
                    alt=""
                    className="w-full h-full object-cover rounded-md mb-1"
                  />
                </div>
              </div>
              <div
                className={`flex flex-col ml-3 overflow-hidden ${
                  isDarkMode
                    ? "bg-gray-900 text-gray-300"
                    : "bg-white text-gray-800"
                }`}
              >
                <h3 className="text-md font-semibold">
                  {video?.snippet?.title}
                </h3>
                <div
                  className={`text-[14px] font-semibold ${
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  {video?.snippet?.channelTitle}
                </div>
                <div
                  className={`text-xs ${
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  {formatViewCount(video?.statistics?.viewCount)} views •{" "}
                  {formatPublishTime(video?.snippet?.publishedAt)}
                </div>
              </div>
            </div>
          </div>
        </Link>
      ) : (
        <div className="text-center mt-10">
          <h2
            className={`text-lg font-semibold ${
              isDarkMode ? "text-gray-300" : "text-gray-700"
            }`}
          >
            No data available.
          </h2>
        </div>
      )}
    </div>
  );
  
}

export default VideosList;
