// App.js
import React, { useEffect } from 'react';
import theme from './theme';
import Hero from './components/Hero';
import About from './components/About';
import ContactForm from './components/ContactForm';
import MusicPlayer from './components/MusicPlayer';
import VideoSection from './components/VideoSection';
import ReviewCarousel from './components/ReviewCarousel';
import Contact from './components/Contact';
import PromoMessage from './components/PromoMessage';
import Footer from './components/Footer';
import PhoneButton from './components/PhoneButton';
import WhatsAppButton from './components/WhatsAppButton';

// Ensure utils directory exists
import './utils/youtubeApiHelper';

const App = () => {
  const { colors } = theme;

  // Create utils directory on mount if it doesn't exist
  useEffect(() => {
    // This is just to ensure the directory structure exists
    console.log('App mounted');
  }, []);

  return (
    <div 
      style={{ 
        backgroundColor: colors.background, 
        color: colors.text,
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
        fontFamily: theme.fontFamily
      }}
    >
      {/* Main content container */}
      <div 
        style={{
          width: '100%',
          maxWidth: '600px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          position: 'relative'
        }}
        dir="rtl"
      >
        <Hero />
        <About />
        <ContactForm />
        <MusicPlayer />
        <VideoSection />
        <ReviewCarousel />
        <Contact />
        <PromoMessage />
        <Footer />
      </div>
      
      {/* Floating action buttons */}
      <PhoneButton />
      <WhatsAppButton />
    </div>
  );
};

export default App;