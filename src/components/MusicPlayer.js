// components/MusicPlayer.js
import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, ExternalLink } from 'lucide-react';
import theme from '../theme';
import content from '../content';

const MusicPlayer = () => {
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isWidgetReady, setIsWidgetReady] = useState(false);
  const iframeRef = useRef(null);
  const widgetRef = useRef(null);
  const progressIntervalRef = useRef(null);
  
  const { colors, spacing, fontSize, borderRadius } = theme;
  const { music } = content;

  // Initialize SoundCloud widget
  useEffect(() => {
    // Load SoundCloud API if it doesn't exist
    if (!window.SC) {
      const script = document.createElement('script');
      script.src = 'https://w.soundcloud.com/player/api.js';
      script.async = true;
      script.onload = () => {
        console.log('SoundCloud API loaded successfully');
        setIsWidgetReady(true);
      };
      script.onerror = (error) => {
        console.error('Error loading SoundCloud API:', error);
      };
      document.body.appendChild(script);
      
      return () => {
        document.body.removeChild(script);
      };
    } else {
      setIsWidgetReady(true);
    }
  }, []);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
      // Make sure to pause any playing track when component unmounts
      if (widgetRef.current && isPlaying) {
        try {
          widgetRef.current.pause();
        } catch (e) {
          console.error('Error pausing track on unmount:', e);
        }
      }
    };
  }, [isPlaying]);

  const togglePlay = (trackId) => {
    // If SoundCloud API is not ready, do nothing
    if (!isWidgetReady || !window.SC || !window.SC.Widget) {
      console.error('SoundCloud Widget API is not ready');
      return;
    }
    
    const track = music.find(t => t.id === trackId);
    
    // If track is already playing/paused
    if (currentTrack === trackId) {
      if (isPlaying) {
        // Pause current track
        if (widgetRef.current) {
          try {
            widgetRef.current.pause();
            setIsPlaying(false);
          } catch (e) {
            console.error('Error pausing track:', e);
          }
        }
      } else {
        // Resume current track
        if (widgetRef.current) {
          try {
            widgetRef.current.play();
            setIsPlaying(true);
          } catch (e) {
            console.error('Error playing track:', e);
          }
        }
      }
    } 
    // If selecting a new track
    else {
      // Stop current track if any
      if (widgetRef.current && isPlaying) {
        try {
          widgetRef.current.pause();
        } catch (e) {
          console.error('Error stopping current track:', e);
        }
      }
      
      // Clear previous progress interval
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
      
      setCurrentTrack(trackId);
      setIsPlaying(true);
      setProgress(0);
      
      // Get the container and update it
      const container = document.getElementById('soundcloud-container');
      if (container && track) {
        try {
          // Clear container
          container.innerHTML = '';
          
          // Create iframe
          const iframe = document.createElement('iframe');
          iframe.id = 'soundcloud-iframe';
          iframe.width = '100%';
          iframe.height = '166';
          iframe.scrolling = 'no';
          iframe.frameBorder = 'no';
          iframe.allow = 'autoplay';
          iframe.src = `https://w.soundcloud.com/player/?url=${encodeURIComponent(track.url)}&color=%23ff5500&auto_play=true&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false`;
          
          // Add iframe to container
          container.appendChild(iframe);
          
          // Save reference to iframe
          iframeRef.current = iframe;
          
          // Initialize widget after a short delay to ensure iframe is loaded
          setTimeout(() => {
            try {
              if (window.SC && window.SC.Widget) {
                const widget = window.SC.Widget(iframe);
                widgetRef.current = widget;
                
                // Set up event listeners
                widget.bind(window.SC.Widget.Events.READY, () => {
                  widget.play();
                  
                  // Start tracking progress
                  progressIntervalRef.current = setInterval(() => {
                    widget.getPosition((position) => {
                      widget.getDuration((duration) => {
                        if (duration > 0) {
                          setProgress((position / duration) * 100);
                        }
                      });
                    });
                  }, 500);
                });
                
                widget.bind(window.SC.Widget.Events.FINISH, () => {
                  setIsPlaying(false);
                  setProgress(0);
                  if (progressIntervalRef.current) {
                    clearInterval(progressIntervalRef.current);
                  }
                });
                
                widget.bind(window.SC.Widget.Events.PAUSE, () => {
                  setIsPlaying(false);
                });
                
                widget.bind(window.SC.Widget.Events.PLAY, () => {
                  setIsPlaying(true);
                });
              }
            } catch (error) {
              console.error("Error initializing SoundCloud widget:", error);
              setIsPlaying(false);
            }
          }, 500);
        } catch (error) {
          console.error("Error creating SoundCloud iframe:", error);
          setIsPlaying(false);
        }
      }
    }
  };

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
        המוזיקה שלי
      </h2>
      
      {/* Hidden SoundCloud container */}
      <div 
        id="soundcloud-container" 
        style={{ 
          position: 'absolute', 
          left: '-9999px', 
          visibility: 'hidden', 
          height: 0, 
          width: 0, 
          overflow: 'hidden' 
        }}
      ></div>
      
      {/* Track list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {music.map(track => (
          <div 
            key={track.id} 
            onClick={() => togglePlay(track.id)}
            style={{ 
              padding: '15px', 
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              borderRadius: borderRadius.medium,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              cursor: 'pointer',
              border: currentTrack === track.id ? `2px solid ${colors.primary}` : 'none',
              transition: 'transform 0.2s ease, background-color 0.2s ease',
              transform: currentTrack === track.id ? 'scale(1.02)' : 'scale(1)',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
            }}
          >
            {/* Play/Pause button */}
            <div 
              style={{ 
                width: '40px', 
                height: '40px', 
                borderRadius: '50%',
                backgroundColor: currentTrack === track.id && isPlaying ? colors.primary : 'rgba(255, 255, 255, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginLeft: '15px',
              }}
            >
              {currentTrack === track.id && isPlaying ? (
                <Pause size={18} color={colors.background} />
              ) : (
                <Play size={18} color={colors.text} style={{ marginLeft: '2px' }} />
              )}
            </div>
            
            {/* Track info */}
            <div style={{ 
              flexGrow: 1,
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              textAlign: 'right',
            }}>
              <div style={{ 
                fontWeight: 'bold',
                color: currentTrack === track.id ? colors.primary : colors.text
              }}>
                {track.title}
              </div>
              
              {/* Progress bar */}
              <div 
                style={{ 
                  width: '100%', 
                  height: '4px', 
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '2px',
                  overflow: 'hidden'
                }}
              >
                <div 
                  style={{ 
                    height: '100%', 
                    width: `${currentTrack === track.id ? progress : 0}%`, 
                    backgroundColor: colors.primary,
                    borderRadius: '2px',
                    transition: 'width 0.1s linear'
                  }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Link to SoundCloud profile */}
      <div style={{ 
        marginTop: spacing.medium,
        textAlign: 'center'
      }}>
        <a 
          href="https://soundcloud.com/aharon-segal-408164914" 
          target="_blank" 
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            color: colors.primary,
            textDecoration: 'none',
            fontSize: fontSize.small,
            padding: '6px 12px',
            borderRadius: borderRadius.small,
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            transition: 'background-color 0.2s ease'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
          }}
        >
          <span>עוד שירים בסאונדקלאוד</span>
          <ExternalLink size={14} />
        </a>
      </div>
    </div>
  );
};

export default MusicPlayer;