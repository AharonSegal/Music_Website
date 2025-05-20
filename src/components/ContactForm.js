  
// components/ContactForm.js - Complete updated code
import React, { useState } from 'react';
import { User, Phone, Send } from 'lucide-react';
import theme from '../theme';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [formErrors, setFormErrors] = useState({});

  const { colors, spacing, fontSize, borderRadius } = theme;

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) {
      errors.name = 'שם הוא שדה חובה';
    }
    
    // Check if phone number field is empty
    if (!formData.phoneNumber.trim()) {
      errors.phoneNumber = 'מספר טלפון הוא שדה חובה';
    } else {
      // Clean up the phone number for validation by removing all non-digit characters
      const cleanPhone = formData.phoneNumber.replace(/\D/g, '');
      
      // First, check if this is a valid Israeli number format with country code
      if (cleanPhone.startsWith('972') && cleanPhone.length >= 11) {
        // Valid international format, no error
      } 
      // Then check if it's a valid Israeli number format without country code
      else if (cleanPhone.startsWith('0') && cleanPhone.length >= 9 && cleanPhone.length <= 10) {
        // Valid local format, no error
      }
      // If it doesn't match either pattern, it's invalid
      else {
        errors.phoneNumber = 'מספר טלפון לא תקין';
      }
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
    
    // Clear error when user types
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };
  
  // Function to clean and standardize phone numbers
  const cleanPhoneNumber = (phone) => {
    // Remove all non-digit characters
    let cleaned = phone.replace(/\D/g, '');
    
    // Handle international format with +972 prefix
    if (cleaned.startsWith('972')) {
      // Convert +972XXXXXXXX to 0XXXXXXXX format
      cleaned = '0' + cleaned.substring(3);
    }
    
    // Make sure it starts with 0 if it doesn't already
    if (!cleaned.startsWith('0')) {
      cleaned = '0' + cleaned;
    }
    
    // Format for display and storage
    if (cleaned.length >= 10) {
      // Extract just the first 10 digits if there are more
      const digits = cleaned.substring(0, 10);
      return digits.substring(0, 3) + '-' + digits.substring(3, 6) + '-' + digits.substring(6);
    }
    
    // If less than 10 digits, just return what we have
    return cleaned;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Clean up phone number before sending
      const cleanedPhoneNumber = cleanPhoneNumber(formData.phoneNumber);
      
      // This URL should be replaced with your actual Google Apps Script Web App URL
      const scriptURL = 'https://script.google.com/macros/s/AKfycbz6wuP60JnVzjy7h3iNoYCzypWeLoMuTpQE0al815z2cmm1MV9Vqn3mIjNPQ9EvQkBaOQ/exec';      
      
      const response = await fetch(scriptURL, {
        method: 'POST',
        body: JSON.stringify({
          name: formData.name,
          phoneNumber: cleanedPhoneNumber
        }),
        headers: {
          'Content-Type': 'application/json'
        },
        mode: 'no-cors'
      });
      
      // Reset form
      setFormData({ name: '', phoneNumber: '' });
      setSubmitStatus('success');
      
      // Clear success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);
      
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ 
      marginBottom: spacing.large, 
      width: '100%',
      backgroundColor: 'rgba(255, 255, 255, 0.03)',
      borderRadius: borderRadius.medium,
      padding: spacing.medium,
      border: `1px solid ${colors.border}`,
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
    }}>
      <h2 
        style={{ 
          color: colors.primary, 
          fontSize: fontSize.large, 
          fontWeight: 'bold',
          marginBottom: spacing.medium,
          textAlign: 'center'
        }}
      >
השאר פרטים ואחזור אליך במהירות!      </h2>
      
      <form 
        onSubmit={handleSubmit} 
        style={{ width: '100%' }} 
        autoComplete="on" 
        id="contactForm" 
        name="contactForm"
      >
        <div style={{ marginBottom: spacing.medium }}>
          <label htmlFor="name" style={{ display: 'none' }}>שם</label>
          <div style={{ 
            display: 'flex',
            alignItems: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0.08)',
            borderRadius: borderRadius.small,
            padding: '12px 16px',
            border: formErrors.name ? `1px solid red` : `1px solid ${colors.border}`,
            transition: 'all 0.3s ease',
            boxShadow: formErrors.name ? '0 0 0 2px rgba(255, 0, 0, 0.1)' : 'none'
          }}>
            <User size={20} color={colors.primary} style={{ marginLeft: '10px' }} />
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="שם"
              autoComplete="name"
              autoCapitalize="words"
              style={{
                width: '100%',
                backgroundColor: 'transparent',
                border: 'none',
                color: colors.text,
                fontSize: fontSize.regular,
                outline: 'none',
                direction: 'rtl'
              }}
            />
          </div>
          {formErrors.name && (
            <p style={{ color: 'red', fontSize: fontSize.small, textAlign: 'right', marginTop: '5px' }}>
              {formErrors.name}
            </p>
          )}
        </div>
        
        <div style={{ marginBottom: spacing.medium }}>
          <label htmlFor="phoneNumber" style={{ display: 'none' }}>מספר טלפון</label>
          <div style={{ 
            display: 'flex',
            alignItems: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0.08)',
            borderRadius: borderRadius.small,
            padding: '12px 16px',
            border: formErrors.phoneNumber ? `1px solid red` : `1px solid ${colors.border}`,
            transition: 'all 0.3s ease',
            boxShadow: formErrors.phoneNumber ? '0 0 0 2px rgba(255, 0, 0, 0.1)' : 'none'
          }}>
            <Phone size={20} color={colors.primary} style={{ marginLeft: '10px' }} />
            <input
              type="tel"
              inputMode="tel"
              name="phoneNumber"
              id="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="מספר טלפון"
              autoComplete="tel"
              style={{
                width: '100%',
                backgroundColor: 'transparent',
                border: 'none',
                color: colors.text,
                fontSize: fontSize.regular,
                outline: 'none',
                direction: 'rtl'
              }}
            />
          </div>
          {formErrors.phoneNumber && (
            <p style={{ color: 'red', fontSize: fontSize.small, textAlign: 'right', marginTop: '5px' }}>
              {formErrors.phoneNumber}
            </p>
          )}
        </div>
        
        <button 
          type="submit"
          disabled={isSubmitting}
          style={{
            width: '100%',
            backgroundColor: colors.primary,
            color: '#fff',
            border: 'none',
            borderRadius: borderRadius.small,
            padding: '15px',
            fontSize: fontSize.regular,
            fontWeight: 'bold',
            cursor: isSubmitting ? 'default' : 'pointer',
            opacity: isSubmitting ? 0.7 : 1,
            transition: 'all 0.3s ease',
            marginTop: spacing.small,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)'
          }}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = '#ff8c5a';
            e.target.style.boxShadow = '0 6px 15px rgba(0, 0, 0, 0.3)';
            e.target.style.transform = 'translateY(-2px)';
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = colors.primary;
            e.target.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.2)';
            e.target.style.transform = 'translateY(0)';
          }}
        >
          {isSubmitting ? 'שולח...' : 'שלח בקשה'}
          <Send size={18} color="white" style={{ marginRight: '5px' }} />
        </button>
        
        {submitStatus === 'success' && (
          <div style={{ 
            color: '#4caf50', 
            textAlign: 'center', 
            marginTop: spacing.medium,
            padding: '10px',
            backgroundColor: 'rgba(76, 175, 80, 0.1)',
            borderRadius: borderRadius.small,
            border: '1px solid rgba(76, 175, 80, 0.3)',
            animation: 'fadeIn 0.5s ease'
          }}>
            <p style={{ margin: 0, fontWeight: 'bold' }}>
              הטופס נשלח בהצלחה! 
            </p>
            <p style={{ margin: 0, fontSize: fontSize.small }}>
              נצור איתך קשר בהקדם.
            </p>
          </div>
        )}
        
        {submitStatus === 'error' && (
          <div style={{ 
            color: '#f44336', 
            textAlign: 'center', 
            marginTop: spacing.medium,
            padding: '10px',
            backgroundColor: 'rgba(244, 67, 54, 0.1)',
            borderRadius: borderRadius.small,
            border: '1px solid rgba(244, 67, 54, 0.3)',
            animation: 'fadeIn 0.5s ease'
          }}>
            <p style={{ margin: 0, fontWeight: 'bold' }}>
              אירעה שגיאה בשליחת הטופס.
            </p>
            <p style={{ margin: 0, fontSize: fontSize.small }}>
              אנא נסה שוב מאוחר יותר או צור קשר באמצעות הטלפון.
            </p>
          </div>
        )}
      </form>
    </div>
  );
};

export default ContactForm;