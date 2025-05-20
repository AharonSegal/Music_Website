// components/Hero.js
import React from 'react';
import theme from '../theme';
import content from '../content';

const Hero = () => {
  const { colors, spacing, fontSize } = theme;
  const { hero } = content;

  return (
    <>
      {/* Logo above title */}
      <div
        style={{
          width: '256px',
          height: '256px',
          borderRadius: '50%',
          overflow: 'hidden',
        }}
      >
        <img 
          src={hero.logo}
          alt="Logo" 
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
        />
      </div>
      
      {/* Title */}
      <h1 
        style={{ 
          color: colors.primary, 
          fontSize: fontSize.xlarge, 
          fontWeight: 'bold',
          marginBottom: '2px'
        }}
      >
        {hero.name}
      </h1>
      <h2
        style={{
          color: colors.primary,
          fontSize: fontSize.xlarge,
          fontWeight: 'bold',
        }}
      >
        {hero.title}
      </h2>
      <p style={{ fontSize: fontSize.medium, marginBottom: spacing.large }}>
        {hero.subtitle}
      </p>
      
      {/* Round Image */}
      <div 
        style={{
          width: '350px',
          height: '350px',
          borderRadius: '50%',
          overflow: 'hidden',
          border: `2px solid ${colors.primary}`,
          marginBottom: spacing.large
        }}
      >
        <img 
          src={hero.image}
          alt={hero.name} 
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
        />
      </div>
    </>
  );
};

export default Hero;