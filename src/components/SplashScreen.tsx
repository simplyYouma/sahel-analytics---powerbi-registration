import React, { useState, useEffect } from 'react';

export default function SplashScreen() {
  const [isVisible, setIsVisible] = useState(true);
  const [opacity, setOpacity] = useState(100);
  const [logoOpacity, setLogoOpacity] = useState(0);

  useEffect(() => {
    // 1. Fade logo in gently
    const timer1 = setTimeout(() => setLogoOpacity(100), 200);
    
    // 2. Fade entire screen out softly
    const timer2 = setTimeout(() => {
        setLogoOpacity(0);
        setOpacity(0);
    }, 1800);
    
    // 3. Remove from DOM completely
    const timer3 = setTimeout(() => setIsVisible(false), 2800);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center bg-white pointer-events-none transition-opacity duration-1000 ease-in-out"
      style={{ opacity: opacity === 100 ? 1 : 0 }}
    >
      <div 
        className="transition-opacity duration-1000 ease-in-out"
        style={{ opacity: logoOpacity === 100 ? 1 : 0 }}
      >
        <img 
          src="/Sahel-05.png" 
          alt="Sahel Analytics" 
          className="h-24 md:h-28 w-auto object-contain transform scale-150" 
        />
      </div>
    </div>
  );
}
