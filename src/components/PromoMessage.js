// components/PromoMessage.js
import React from 'react';
import theme from '../theme';

const PromoMessage = () => {
  const { colors, spacing, fontSize, borderRadius } = theme;

  return (
    <div style={{ 
      marginBottom: spacing.medium, 
      width: '100%',
      background: `linear-gradient(135deg, rgba(255, 160, 122, 0.15) 0%, rgba(70, 130, 180, 0.15) 100%)`,
      borderRadius: borderRadius.medium,
      padding: spacing.medium,
      border: `1px solid ${colors.border}`,
      textAlign: 'center',
      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)'
    }}>
      <p style={{ 
        fontSize: fontSize.medium,
        fontWeight: 'bold',
        color: colors.primary,
        marginBottom: spacing.small
      }}>
        אהבת את האתר הזה? אני יצרתי אותו! ✨🚀
      </p>
      <p style={{ 
        fontSize: fontSize.regular,
        lineHeight: 1.6,
        marginBottom: 0
      }}>
        במחיר הכי טוב בארץ  גם לך יכול להיות דף משלך בדיוק כמו זה תוך יומיים , 
        כולל כל האוטומציות הרלוונטיות .<br />
        תשלום חד פעמי בלבד - פשוט, ברור וללא דמי מנוי חודשיים! 🔥
      </p>
    </div>
  );
};

export default PromoMessage;