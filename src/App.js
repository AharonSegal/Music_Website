// App.js
import React from 'react';
import theme from './theme';
import Hero from './components/Hero';
import About from './components/About';
import ContactForm from './components/ContactForm';
import MusicPlayer from './components/MusicPlayer';
import VideoSection from './components/VideoSection';
import ReviewCarousel from './components/ReviewCarousel';
import Contact from './components/Contact';
import Footer from './components/Footer';
import PhoneButton from './components/PhoneButton';
import WhatsAppButton from './components/WhatsAppButton';

const App = () => {
  const { colors } = theme;

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
        <Footer />
      </div>
      
      {/* Floating action buttons */}
      <PhoneButton />
      <WhatsAppButton />
    </div>
  );
};

export default App;