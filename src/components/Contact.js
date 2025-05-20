// components/Contact.js
import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import theme from '../theme';
import content from '../content';

const Contact = () => {
  const { colors, spacing, fontSize } = theme;
  const { contact } = content;

  return (
    <div style={{ marginBottom: spacing.medium, width: '100%' }}>
      <h2 
        style={{ 
          color: colors.primary, 
          fontSize: fontSize.large, 
          fontWeight: 'bold',
          marginBottom: spacing.medium,
          textAlign: 'center'
        }}
      >
        יצירת קשר
      </h2>
      
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Mail size={18} color={colors.primary} />
          <a 
            href={`mailto:${contact.email}`}
            style={{ color: colors.text, textDecoration: 'none' }}
            onMouseOver={(e) => e.target.style.color = colors.primary}
            onMouseOut={(e) => e.target.style.color = colors.text}
          >
            {contact.email}
          </a>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Phone size={18} color={colors.primary} />
          <a 
            href={`tel:${contact.phone}`}
            style={{ color: colors.text, textDecoration: 'none' }}
            onMouseOver={(e) => e.target.style.color = colors.primary}
            onMouseOut={(e) => e.target.style.color = colors.text}
          >
            {contact.phone}
          </a>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <MapPin size={18} color={colors.primary} />
          <span>{contact.address}</span>
        </div>
      </div>
    </div>
  );
};

export default Contact;