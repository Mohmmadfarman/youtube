import React, { useEffect, useState } from 'react';
import { useTheme } from '../../useContext/useTheme';
import { useAppContext } from '../../useContext/UseContextApi';
import { fetctApiforYoutuveData } from '../../utiles/FetchApi';
import { Link } from 'react-router-dom';
import { formatDuration, formatPublishTime, formatViewCount } from '../../utiles/Helper';

function RelatedVideos({ categoryId }) {
  const [relatedVideos, setRelatedVideos] = useState([]);
  const { isDarkMode } = useTheme();
  const { loading, setloading } = useAppContext();

  const fetchRelatedVideos = async () => {
    setloading(true);
    try {
      const data = await fetctApiforYoutuveData('videos', {
        part: 'snippet,contentDetails,statistics',
        regionCode: 'IN',
        chart: 'mostPopular',
        videoCategoryId: categoryId,
        maxResults: 10,
      });
      setRelatedVideos(data?.items || []);
    } catch (error) {
      console.error('Error fetching related videos:', error);
    } finally {
      setloading(false);
    }
  };

  useEffect(() => {
    fetchRelatedVideos();
  }, [categoryId]);

  return (
    <div className="related-videos-container">
      {relatedVideos.map((video) => (
        <div key={video.id} className="video-item mt-4">
          <Link to={`/video/${video.snippet.categoryId}/${video.id}`}>
            <div className="flex  flex-col lg:flex-row mb-8">
              {/* Thumbnail */}
              <div className="relative h-[140px] lg:h-[150px] md:h-[200px]  min-w-[230px] lg:w-96 rounded-md overflow-hidden md:w-80 w-40">
                <img
                  src={video.snippet.thumbnails.medium.url}
                  alt={video.snippet.title}
                  className="w-full  h-full object-cover"
                />
                {/* Duration */}
                <span className="absolute bottom-2 right-2 bg-black text-white text-xs px-1 py-0.5 rounded">
                  {formatDuration(video.contentDetails.duration)}
                </span>
              </div>
              {/* Video Details */}
              <div className="flex flex-col mt-3 lg:ml-3 overflow-hidden">
                <h3 className="text-sm font-semibold line-clamp-2">{video.snippet.title}</h3>
                <p
                  className={`text-sm ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}
                >
                  {video.snippet.channelTitle}
                </p>
                <p
                  className={`text-xs ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}
                >
                  {formatViewCount(video.statistics.viewCount)} views •{' '}
                  {formatPublishTime(video.snippet.publishedAt)}
                </p>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default RelatedVideos;
