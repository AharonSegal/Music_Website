// components/About.js
import React from 'react';
import { Music, Award, Clock, BookOpen, MessageSquare, Mic, Headphones } from 'lucide-react';
import theme from '../theme';
import content from '../content';

const About = () => {
  const { colors, spacing, fontSize } = theme;
  const { about } = content;

  // Map icon names to actual components
  const iconMap = {
    'Music': Music,
    'Award': Award,
    'Clock': Clock,
    'BookOpen': BookOpen,
    'MessageSquare': MessageSquare,
    'Mic': Mic,
    'Headphones': Headphones
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
        קצת עליי
      </h2>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {about.map((item, index) => {
          const IconComponent = iconMap[item.icon];
          
          return (
            <div key={index} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
              <IconComponent size={20} color={colors.primary} style={{ flexShrink: 0, marginTop: '4px' }} />
              <p style={{ textAlign: 'right' }}>{item.text}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default About;