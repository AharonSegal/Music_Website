// components/Footer.js
import React from 'react';
import theme from '../theme';

const Footer = () => {
  const { colors, spacing, fontSize } = theme;

  return (
    <div 
      style={{ 
        width: '100%',
        borderTop: `1px solid ${colors.border}`,
        paddingTop: spacing.medium,
        opacity: 0.5,
        fontSize: fontSize.small,
        textAlign: 'center'
      }}
    >
      © {new Date().getFullYear()} כל הזכויות שמורות
    </div>
  );
};

export default Footer;