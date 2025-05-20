// components/PhoneButton.js
import React, { useState } from 'react';
import { Phone } from 'lucide-react';
import theme from '../theme';
import content from '../content';

const PhoneButton = () => {
  const [isPressed, setIsPressed] = useState(false);
  const { colors } = theme;
  const { contact } = content;
  
  // Remove any non-numeric characters from the phone number
  const cleanPhoneNumber = contact.phone.replace(/\D/g, '');

  return (
    <a
      href={`tel:${cleanPhoneNumber}`}
      style={{
        position: 'fixed',
        bottom: '90px', 
        right: '20px',
        width: '60px',
        height: '60px',
        borderRadius: '50%',
        backgroundColor: colors.primary, // Orange color from theme
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
        zIndex: 1000,
        transform: isPressed ? 'scale(1.1)' : 'scale(1)',
        transition: 'transform 0.2s ease-in-out',
      }}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
      onTouchStart={() => setIsPressed(true)}
      onTouchEnd={() => setIsPressed(false)}
    >
      <Phone size={30} color="white" />
    </a>
  );
};

export default PhoneButton;