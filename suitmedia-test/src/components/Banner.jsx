import React from 'react';
import useScrollPosition from '../hooks/useScrollPosition';

const Banner = ({ title, subtitle, backgroundImage }) => {
  const { scrollPosition } = useScrollPosition();
  
  return (
    <div className="relative h-96 overflow-hidden banner-container">
      <div 
        className="absolute inset-0 bg-cover bg-center banner-background"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          transform: `translateY(${scrollPosition * 0.3}px)`,
        }}
      />
      
      <div className="absolute inset-0 bg-black/50 z-10 banner-overlay"></div>
      
      <div 
        className="absolute bottom-0 left-0 right-0 h-20 bg-gray-100 z-20 banner-slant"
        style={{
          clipPath: 'polygon(0 100%, 100% 100%, 100% 0)',
        }}
      ></div>
      
      <div 
        className="relative z-30 flex flex-col justify-center items-center h-full text-white text-center banner-content"
        style={{
          transform: `translateY(${-scrollPosition * 0.15}px)`,
        }}
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4 banner-title">{title}</h1>
        <p className="text-xl md:text-2xl banner-subtitle">{subtitle}</p>
      </div>
    </div>
  );
};

export default Banner;