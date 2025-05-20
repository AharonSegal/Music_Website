// components/VideoSection.js
import React from 'react';
import theme from '../theme';
import content from '../content';

const VideoSection = () => {
  const { colors, spacing, fontSize, borderRadius } = theme;
  const { videos } = content;

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
        {videos.map((video, index) => (
          <div key={index} style={{ width: '100%' }}>
            <iframe 
              src={video}
              title={`סרטון ${index + 1}`}
              style={{ 
                width: '100%', 
                height: '200px', 
                borderRadius: borderRadius.medium,
                border: 'none'
              }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoSection;