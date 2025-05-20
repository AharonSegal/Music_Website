// components/MusicPlayer.js
import React, { useState, useEffect } from 'react';
import { ExternalLink } from 'lucide-react';
import theme from '../theme';
import content from '../content';

const MusicPlayer = () => {
  const [currentTrack, setCurrentTrack] = useState(null);
  const [iframeReady, setIframeReady] = useState(false);
  
  const { colors, spacing, fontSize, borderRadius } = theme;
  const { music } = content;

  // Initialize SoundCloud Widget API
  useEffect(() => {
    // Load SoundCloud Widget API
    const script = document.createElement('script');
    script.src = 'https://w.soundcloud.com/player/api.js';
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      setIframeReady(true);
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // Handle track selection
  const playTrack = (trackId) => {
    setCurrentTrack(trackId);
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
      
      {/* Current track player */}
      {currentTrack && (
        <div 
          style={{ 
            marginBottom: spacing.medium,
            borderRadius: borderRadius.medium,
            overflow: 'hidden',
            position: 'relative',
            paddingBottom: '56.25%',  // 16:9 aspect ratio
            height: 0
          }}
        >
          <iframe
            width="100%"
            height="100%"
            scrolling="no"
            frameBorder="no"
            allow="autoplay"
            src={`https://w.soundcloud.com/player/?url=${music.find(t => t.id === currentTrack)?.url}&color=${colors.primary.replace('#', '')}&auto_play=true&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true`}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              borderRadius: borderRadius.medium
            }}
          ></iframe>
        </div>
      )}
      
      {/* Track list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {music.map(track => (
          <div 
            key={track.id} 
            onClick={() => playTrack(track.id)}
            style={{ 
              padding: '15px', 
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              borderRadius: borderRadius.medium,
              display: 'flex',
              alignItems: 'center',
              gap: '15px',
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
            {/* Track artwork placeholder - will be replaced by SoundCloud's visual player */}
            <div 
              style={{ 
                width: '60px', 
                height: '60px', 
                borderRadius: borderRadius.small,
                backgroundColor: colors.primary,
                flexShrink: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden'
              }}
            >
              {/* Music icon as placeholder until SoundCloud artwork loads */}
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 18V6C9 4.34315 10.3431 3 12 3C13.6569 3 15 4.34315 15 6V18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M18 12V18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M6 12V18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M3 15V18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M21 15V18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            
            {/* Track info */}
            <div style={{ 
              flexGrow: 1,
              textAlign: 'right'
            }}>
              <div style={{ 
                fontWeight: 'bold',
                marginBottom: '4px',
                color: currentTrack === track.id ? colors.primary : colors.text
              }}>
                {track.title}
              </div>
              <div style={{ 
                fontSize: fontSize.small,
                opacity: 0.7
              }}>
                אהרון סגל | אורגינל
              </div>
            </div>
            
            {/* Play indicator */}
            <div style={{ 
              width: '30px', 
              height: '30px', 
              borderRadius: '50%',
              backgroundColor: currentTrack === track.id ? colors.primary : 'rgba(255, 255, 255, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              {currentTrack === track.id ? (
                <span style={{ fontSize: '18px', color: colors.background }}>▶</span>
              ) : (
                <span style={{ fontSize: '18px', color: colors.text }}>▶</span>
              )}
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