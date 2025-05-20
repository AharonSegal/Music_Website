// components/VideoSection.js
import React, { useState, useEffect, useRef } from 'react';
import theme from '../theme';
import content from '../content';
import { loadYouTubeApi, getYouTubeVideoId } from '../utils/youtubeApiHelper';

const VideoSection = () => {
  const { colors, spacing, fontSize, borderRadius } = theme;
  const { videos } = content;
  const [videoLoaded, setVideoLoaded] = useState(Array(videos.length).fill(false));
  const [videoError, setVideoError] = useState(Array(videos.length).fill(false));
  const iframeRefs = useRef([]);

  // Initialize refs array
  useEffect(() => {
    iframeRefs.current = Array(videos.length).fill().map((_, i) => iframeRefs.current[i] || null);
    
    // Load YouTube API
    loadYouTubeApi().catch(error => {
      console.error('Failed to load YouTube API:', error);
    });
  }, [videos.length]);

  // Handle iframe load success
  const handleVideoLoad = (index) => {
    const newLoadedState = [...videoLoaded];
    newLoadedState[index] = true;
    setVideoLoaded(newLoadedState);
  };

  // Handle iframe load error
  const handleVideoError = (index) => {
    const newErrorState = [...videoError];
    newErrorState[index] = true;
    setVideoError(newErrorState);
    console.error(`Error loading video at index ${index}`);
  };

  // Clean up function to pause videos when component unmounts
  useEffect(() => {
    return () => {
      // Attempt to pause any playing videos when component unmounts
      iframeRefs.current.forEach(ref => {
        if (ref) {
          try {
            // This creates a new src attribute with autoplay=0 parameter added
            const currentSrc = ref.src;
            ref.src = currentSrc.includes('?') 
              ? currentSrc.replace('autoplay=1', 'autoplay=0') 
              : currentSrc;
          } catch (e) {
            console.error('Error pausing video:', e);
          }
        }
      });
    };
  }, []);

  return (
    <div style={{ marginBottom: spacing.large, width: '100%' }}>
      <h2 
        style={{ 
          color: colors.primary, 
          fontSize: fontSize.large, 
          fontWeight: 'bold',
          marginBottom: spacing.medium,
          textAlign: 'center'
        }}
      >
        וידאו
      </h2>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.medium }}>
        {videos.map((videoUrl, index) => (
          <div key={index} style={{ width: '100%' }}>
            {videoError[index] ? (
              <div style={{
                width: '100%',
                height: '200px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                borderRadius: borderRadius.medium,
                color: colors.text
              }}>
                שגיאה בטעינת הסרטון. נסה לרענן את הדף.
              </div>
            ) : (
              <div style={{ position: 'relative', width: '100%', height: '200px' }}>
                {!videoLoaded[index] && (
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    borderRadius: borderRadius.medium,
                    zIndex: 1
                  }}>
                    טוען סרטון...
                  </div>
                )}
                <iframe 
                  ref={el => iframeRefs.current[index] = el}
                  src={`${videoUrl}?enablejsapi=1&origin=${window.location.origin}`}
                  title={`סרטון ${index + 1}`}
                  style={{ 
                    width: '100%', 
                    height: '100%', 
                    borderRadius: borderRadius.medium,
                    border: 'none',
                    zIndex: videoLoaded[index] ? 2 : 1,
                    opacity: videoLoaded[index] ? 1 : 0,
                    transition: 'opacity 0.3s ease'
                  }}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  onLoad={() => handleVideoLoad(index)}
                  onError={() => handleVideoError(index)}
                ></iframe>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoSection;