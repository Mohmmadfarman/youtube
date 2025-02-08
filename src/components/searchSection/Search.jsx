import React, { useEffect, useState } from 'react';
import { useTheme } from '../../useContext/useTheme';
import { useAppContext } from '../../useContext/UseContextApi';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { fetctApiforYoutuveData } from '../../utiles/FetchApi';
import Header from '../HeaderSection/Header';
import { IoMdHome } from "react-icons/io";

import search from '../../assets/nosearch.png';
import Sidebar from '../sidebarSection/Sidebar';
import { formatPublishTime, formatViewCount } from '../../utiles/Helper';
import { ShimmerDiv,ShimmerSectionHeader,ShimmerCategoryItems } from "shimmer-effects-react";


function Search({online}) {
  const [searchResult, setSearchResult] = useState([]);
  const { isDarkMode } = useTheme();
  const { setloading, loading, mobilemenu, setmobilemenu } = useAppContext();
  const { searchQuery } = useParams();
  const navigate = useNavigate();

  const backToHome = () => {
    navigate('/');
    setmobilemenu(false);
  };

  const fetchSearchVideos = async () => {
    setloading(true);
    try {
      const data = await fetctApiforYoutuveData('search', {
        part: "snippet",
        regionCode: "IN",
        q: searchQuery,
        type: "video",
        maxResults: 10,
      });

      const videosIds = data.items.map((item) => item.id.videoId).join(",");
      const videoDetailsResponse = await fetctApiforYoutuveData('videos', {
        part: "snippet,contentDetails,statistics",
        id: videosIds,
      });

      setSearchResult(videoDetailsResponse.items);
    } catch (error) {
      console.error('Error fetching search videos', error);
    } finally {
      setloading(false);
    }
  };

  useEffect(() => {
    fetchSearchVideos();
  }, [searchQuery]);

  return (
    <div>
      <Header online={online} />
      <div>
        <div id="back" className={`${isDarkMode ? "bg-gray-800" : ""}`}>
          {mobilemenu && (
            <button
              className={`p-2 mt-1 ml-3 rounded-md ${isDarkMode ? "bg-white" : "bg-gray-500"}`}
              onClick={backToHome}
            >
              <IoMdHome />
            </button>
          )}
        </div>
        <div className="flex w-full h-full">
          <div className={`flex-grow overflow-y-auto ${isDarkMode ? "bg-gray-900 text-gray-300" : "bg-white text-gray-800"}`}>
            {/* Content Rendering */}
            {loading ? (
              // Shimmer Effect
               <div className=" w-full grid-flow-col-3">
                <ShimmerCategoryItems mode="light" />
                <ShimmerCategoryItems mode="light" />
                <ShimmerCategoryItems mode="light" />
                <ShimmerCategoryItems mode="light" />
                      
              
                       
                     </div>
            ) : searchResult.length > 0 ? (
              // Display Results
              <div className="p-4">
                {searchResult.map((result) => (
                  <div key={result.id} className="flex flex-col md:flex-row mb-8">
                    <Link to={`/video/${result?.snippet?.categoryId}/${result?.id}`}>
                      <img
                        src={result?.snippet?.thumbnails?.medium?.url}
                        alt={result?.snippet?.title}
                        className="w-full h-auto object-cover rounded-md mb-2"
                      />
                    </Link>
                    <div className="md:ml-4 md:w-2/3">
                      <h3 className="text-lg font-semibold">{result?.snippet?.title}</h3>
                      <div className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                        {result?.snippet?.channelTitle}
                      </div>
                      <div className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                        {formatViewCount(result?.statistics?.viewCount)} views • {formatPublishTime(result?.snippet?.publishedAt)}
                      </div>
                      <p className="mt-2">{result?.snippet?.description.slice(0, 70)}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              // No Data Found
              <div className="h-screen flex flex-col items-center justify-center">
                <img src={search} alt="No results" className="w-64 h-auto mb-4" />
                <h2 className={`text-lg font-semibold ${isDarkMode ? "text-gray-200" : "text-gray-800"}`}>
                  No results found for "{searchQuery}"
                </h2>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Search;
