// utils/soundcloud-api.js
/**
 * This utility file helps with resolving SoundCloud URLs to stream URLs
 * You only need this file if you want to dynamically fetch track information
 */

const CLIENT_ID = 'ff43d3c6d5b0e537049b7e68eb69fa44'; // Public embed client ID

/**
 * Resolves a SoundCloud URL to get track information
 * @param {string} url - The SoundCloud track URL
 * @returns {Promise<Object>} - Track information including stream URL
 */
export const resolveTrack = async (url) => {
  try {
    // Step 1: Resolve the track URL to get the track ID
    const resolveUrl = `https://api.soundcloud.com/resolve?url=${encodeURIComponent(url)}&client_id=${CLIENT_ID}`;
    const response = await fetch(resolveUrl);
    const trackInfo = await response.json();
    
    if (!trackInfo || !trackInfo.id) {
      throw new Error('Failed to resolve track');
    }
    
    // Step 2: Generate the stream URL
    const streamUrl = `https://api.soundcloud.com/tracks/${trackInfo.id}/stream?client_id=${CLIENT_ID}`;
    
    // Return track information with the stream URL
    return {
      id: trackInfo.id,
      title: trackInfo.title,
      artwork: trackInfo.artwork_url ? trackInfo.artwork_url.replace('-large', '-t200x200') : null,
      streamUrl,
      duration: trackInfo.duration / 1000, // Convert to seconds
      artist: trackInfo.user?.username || 'Unknown Artist'
    };
  } catch (error) {
    console.error('Error resolving SoundCloud track:', error);
    throw error;
  }
};

/**
 * Resolves multiple SoundCloud URLs
 * @param {Array<string>} urls - Array of SoundCloud track URLs
 * @returns {Promise<Array<Object>>} - Array of track information
 */
export const resolveTracks = async (urls) => {
  try {
    const trackPromises = urls.map(url => resolveTrack(url));
    return await Promise.all(trackPromises);
  } catch (error) {
    console.error('Error resolving SoundCloud tracks:', error);
    throw error;
  }
};

export default {
  resolveTrack,
  resolveTracks
};