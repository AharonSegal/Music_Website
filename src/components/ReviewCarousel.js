// ReviewCarousel.js
import React, { useEffect } from 'react';
import { register } from 'swiper/element/bundle';

// Register Swiper custom elements
register();

const ReviewCarousel = () => {
  // Colors from your site
  const colors = {
    background: '#1e2124',
    text: '#ffffff',
    primary: '#FFA07A',  // Orange
    secondary: '#4682B4', // Blue
    border: 'rgba(255, 255, 255, 0.1)'
  };

  // Review data in Hebrew
  const reviews = [
    {
      id: 1,
      name: "יוסי כהן",
      text: "שיעורי הגיטרה של אהרן שינו את חיי. הגישה שלו מותאמת אישית וסבלנית מאוד. תוך חודשיים כבר ניגנתי שירים מלאים!"
    },
    {
      id: 2,
      name: "אלמוג שדה",
      text: "בזכות שיעורי פיתוח הקול עם אהרן העזתי לשיר בפני קהל בפעם הראשונה. המקצועיות שלו והיחס האישי פשוט מדהימים."
    },
    {
      id: 3,
      name: "דניאל אברהם",
      text: "הפקתי שיר מקורי באולפן של אהרן וקיבלתי תוצאה ברמה מקצועית. אחלה אווירה והליווי היה מושלם."
    },
    {
      id: 4,
      name: "ג'רמי ראפאפורט",
      text: "למדתי פסנתר בגיל 40, אחרי שתמיד חלמתי על זה. אהרן הוכיח שלעולם לא מאוחר מדי, והשיעורים הם חוויה מעשירה ומהנה."
    },
    {
      id: 5,
      name: "ריקי זרקוביץ",
      text: "הילד שלי (בן 9) מתלהב מהשיעורים עם אהרן. הגישה החינוכית שלו מצליחה לשמור על הריכוז והמוטיבציה של ילדים בגיל צעיר."
    },
    {
      id: 6,
      name: "עידו מזרחי",
      text: "התחלתי ללמוד גיטרה אצל אהרן לפני 4 שנים, ומאז התמקצעתי בסגנונות רוק וג'אז. הדרך שבה הוא מלמד טכניקות מתקדמות ואלתור פתחה בפניי אפשרויות נגינה שלא חלמתי עליהן."
    },
    {
      id: 7,
      name: "אריאל שמש",
      text: "שיעורי היוקללי עם אהרן פתחו בפני עולם שלם של נגינה. הוא מלמד בצורה פשוטה וברורה שמתאימה לכל רמה."
    },
    {
      id: 8,
      name: "שירה ברק", 
      text: "למדתי לנגן בגיטרה שירים שאהבתי תוך מספר שיעורים בלבד. השיטה של אהרן פשוט עובדת!"
    },
    {
      id: 9,
      name: "עומר לביא",
      text: "שיעורי המוזיקה עם אהרן הם הרבה יותר מסתם לימוד נגינה - זו חוויה של יצירה והתפתחות אישית. ממליץ בחום!"
    },
    {
      id: 10,
      name: "טל אדלר",
      text: "הפקנו עם אהרן שיר מיוחד לחתונה שלנו והילדים שלנו שרו אותו. אהרן ידע בדיוק איך לעבוד עם הילדים ולהוציא מהם את המיטב. התוצאה הייתה מרגשת ומושלמת - כולם התרגשו והופתעו לטובה!"
    }
  ];

  useEffect(() => {
    // Initialize Swiper with autoplay
    const swiperEl = document.querySelector('swiper-container');
    
    const swiperParams = {
      slidesPerView: 3,
      spaceBetween: 20,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
      loop: true,
      breakpoints: {
        // when window width is >= 320px
        320: {
          slidesPerView: 1,
          spaceBetween: 10
        },
        // when window width is >= 640px
        640: {
          slidesPerView: 2,
          spaceBetween: 15
        },
        // when window width is >= 1024px
        1024: {
          slidesPerView: 3,
          spaceBetween: 20
        }
      }
    };

    // Assign the parameters to the element
    Object.assign(swiperEl, swiperParams);
    
    // Initialize Swiper
    swiperEl.initialize();
  }, []);

  return (
    <div style={{ width: '100%', padding: '20px 0', backgroundColor: colors.background, color: colors.text, direction: 'rtl' }}>
      <h2 
        style={{ 
          color: colors.primary, 
          fontSize: '24px', 
          fontWeight: 'bold',
          marginBottom: '20px',
          textAlign: 'center'
        }}
      >
        חוות דעת מתלמידים
      </h2>
      
      <swiper-container init="false">
        {reviews.map((review) => (
          <swiper-slide key={review.id}>
            <div 
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                borderRadius: '12px',
                padding: '25px',
                height: '280px', // Increased height
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative',
                overflow: 'hidden',
                boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2), 0 6px 6px rgba(0, 0, 0, 0.1)',
                transform: 'perspective(1000px) rotateX(2deg)',
                transition: 'transform 0.3s ease',
                // 3D effect with gradient overlay
                background: `
                  linear-gradient(
                    145deg,
                    rgba(255, 255, 255, 0.15) 0%,
                    rgba(255, 255, 255, 0.05) 100%
                  )
                `,
                backdropFilter: 'blur(5px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'perspective(1000px) rotateX(0deg) scale(1.03)';
                e.currentTarget.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.3), 0 10px 10px rgba(0, 0, 0, 0.2)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'perspective(1000px) rotateX(2deg)';
                e.currentTarget.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.2), 0 6px 6px rgba(0, 0, 0, 0.1)';
              }}
            >
              {/* Quote mark for decoration */}
              <div style={{ 
                position: 'absolute', 
                top: '10px', 
                right: '10px', 
                fontSize: '60px', 
                opacity: '0.1', 
                fontFamily: 'Georgia, serif',
                color: colors.primary
              }}>
                "
              </div>
              
              <p style={{ 
                fontSize: '16px', 
                lineHeight: '1.6',
                textAlign: 'right',
                marginBottom: '20px',
                position: 'relative',
                zIndex: '1',
                maxHeight: '180px', // Set max height for scrolling
                overflowY: 'auto', // Enable vertical scrolling
                paddingRight: '5px', // Add padding for scrollbar
                // Custom scrollbar styling
                scrollbarWidth: 'thin',
                scrollbarColor: `${colors.primary} transparent`,
              }}>
                {review.text}
              </p>
              
              <div style={{ 
                fontWeight: 'bold', 
                color: colors.primary,
                textAlign: 'right',
              }}>
                - {review.name}
              </div>
            </div>
          </swiper-slide>
        ))}
      </swiper-container>
    </div>
  );
};

export default ReviewCarousel;