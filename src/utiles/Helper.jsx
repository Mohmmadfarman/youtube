import {formatDistanceToNow} from 'date-fns'

export const formatViewCount = (count) => {
    if (count >= 1000000) {
        return (count / 1000000).toFixed(1) + 'M';
    } else if (count >= 1000) {
        return (count / 1000).toFixed(1) + 'K';
    } else {
        return count?.toString();
    }
  };
  
  export const formatPublishTime = (publishTime) => {
    return formatDistanceToNow(new Date(publishTime), { addSuffix: true });
  };
  
  export const formatDuration = (duration) => {
    // Match the ISO 8601 duration format
    const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);

    // If the duration string is invalid, return "00:00"
    if (!match) {
        console.warn("Invalid duration format:", duration);
        return "00:00";
    }

    // Extract hours, minutes, and seconds
    const hours = parseInt(match[1]) || 0;
    const minutes = parseInt(match[2]) || 0;
    const seconds = parseInt(match[3]) || 0;

    // Format the duration as HH:MM:SS
    return [hours, minutes, seconds]
        .map((v) => (v < 10 ? "0" + v : v)) // Pad single digits with "0"
        .filter((v, i) => v !== "00" || i > 0) // Remove leading "00" unless it's the only value
        .join(":");
};
