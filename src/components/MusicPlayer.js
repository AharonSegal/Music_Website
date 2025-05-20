// components/MusicPlayer.js
import React, { useState } from 'react';
import { Play, Pause } from 'lucide-react';
import theme from '../theme';
import content from '../content';

const MusicPlayer = () => {
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  
  const { colors, spacing, fontSize, borderRadius } = theme;
  const { music } = content;

  const togglePlay = (trackId) => {
    if (currentTrack === trackId) {
      setIsPlaying(!isPlaying);
    } else {
      setCurrentTrack(trackId);
      setIsPlaying(true);
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
        המוזיקה שלי ושל תלמידים שלי
      </h2>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {music.map(track => (
          <div 
            key={track.id} 
            style={{ 
              padding: '12px', 
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              borderRadius: borderRadius.small,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <button 
                onClick={() => togglePlay(track.id)}
                style={{ 
                  width: '32px', 
                  height: '32px', 
                  borderRadius: '50%', 
                  backgroundColor: colors.secondary,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: 'none',
                  cursor: 'pointer',
                  marginLeft: '12px'
                }}
              >
                {isPlaying && currentTrack === track.id ? <Pause size={14} /> : <Play size={14} />}
              </button>
              <span>{track.title}</span>
            </div>
            <div 
              style={{ 
                width: '100px', 
                height: '8px', 
                backgroundColor: 'rgba(0, 0, 0, 0.3)',
                borderRadius: '4px',
                overflow: 'hidden'
              }}
            >
              <div 
                style={{ 
                  height: '100%', 
                  width: '30%', 
                  backgroundColor: colors.primary,
                  borderRadius: '4px'
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MusicPlayer;