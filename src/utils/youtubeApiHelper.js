// utils/youtubeApiHelper.js
let youtubeApiLoaded = false;
let youtubeApiLoading = false;
let callbackQueue = [];

/**
 * Loads the YouTube IFrame API if it hasn't been loaded already
 * @returns {Promise} A promise that resolves when the API is ready
 */
export function loadYouTubeApi() {
  return new Promise((resolve, reject) => {
    // If API is already loaded, resolve immediately
    if (youtubeApiLoaded && window.YT) {
      resolve(window.YT);
      return;
    }

    // Add to callback queue if API is still loading
    if (youtubeApiLoading) {
      callbackQueue.push({ resolve, reject });
      return;
    }

    // Start loading the API
    youtubeApiLoading = true;
    callbackQueue.push({ resolve, reject });

    // Create a global callback function
    window.onYouTubeIframeAPIReady = function() {
      youtubeApiLoaded = true;
      youtubeApiLoading = false;
      
      // Process all callbacks in the queue
      callbackQueue.forEach(callback => {
        callback.resolve(window.YT);
      });
      
      // Clear the queue
      callbackQueue = [];
    };

    // Load the API script
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    tag.onerror = (error) => {
      youtubeApiLoading = false;
      callbackQueue.forEach(callback => {
        callback.reject(error);
      });
      callbackQueue = [];
    };
    
    // Insert the script tag before the first script tag on the page
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  });
}

/**
 * Creates a YouTube player for an existing iframe
 * @param {string} iframeId - The ID of the iframe element
 * @param {Object} options - YouTube player options
 * @returns {Promise} A promise that resolves with the created player
 */
export function createYouTubePlayer(iframeId, options = {}) {
  return new Promise((resolve, reject) => {
    loadYouTubeApi()
      .then(YT => {
        try {
          const player = new YT.Player(iframeId, {
            events: {
              'onReady': (event) => resolve(event.target),
              'onError': (event) => reject(event)
            },
            ...options
          });
        } catch (error) {
          reject(error);
        }
      })
      .catch(reject);
  });
}

/**
 * Extracts the video ID from a YouTube URL
 * @param {string} url - The YouTube URL
 * @returns {string|null} The extracted video ID or null if invalid
 */
export function getYouTubeVideoId(url) {
  if (!url) return null;
  
  // Match standard YouTube URLs
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  
  return (match && match[2].length === 11) ? match[2] : null;
}

export default {
  loadYouTubeApi,
  createYouTubePlayer,
  getYouTubeVideoId
};