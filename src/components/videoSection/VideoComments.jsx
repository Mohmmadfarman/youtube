import React from "react";
import { formatPublishTime } from "../../utiles/Helper";

function VideoComments({ comment }) {
  console.log(comment);

  return (
    <div className="flex  mt-3 mb-5 lg:flex-row items-start lg:items-center">
      <img
        src={comment?.snippet?.topLevelComment?.snippet?.authorProfileImageUrl}
        alt="" className=" rounded-full w-12"
      />
      <div className="flex flex-col ml-6 gap-2 ">
        <h3 className=" text-sm lg:text-base font-semibold">{comment?.snippet?.topLevelComment?.snippet?.authorDisplayName
        } {" "} <span className="text-gray-500 ml-4 text-xs">{formatPublishTime(comment?.snippet?.topLevelComment?.snippet?.publishedAt
        )}</span></h3>
        <p className="text-xs lg:text-md ">{comment?.snippet?.topLevelComment?.snippet?.textOriginal} </p>
      </div>
    </div>
  );
}

export default VideoComments;
