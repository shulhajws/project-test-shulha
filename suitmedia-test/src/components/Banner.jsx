import React from 'react';
import useScrollPosition from '../hooks/useScrollPosition';

const Banner = ({ title, subtitle, backgroundImage }) => {
  const { scrollPosition } = useScrollPosition();
  
  return (
    <div className="relative h-96 overflow-hidden">
      {/* Background image with parallax effect */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          transform: `translateY(${scrollPosition * 0.3}px)`,
        }}
      />
      
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black/50 z-10"></div>
      
      {/* Slanted bottom */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-20 bg-gray-100 z-20"
        style={{
          clipPath: 'polygon(0 100%, 100% 100%, 100% 0)',
        }}
      ></div>
      
      {/* Text content with opposite parallax effect */}
      <div 
        className="relative z-30 flex flex-col justify-center items-center h-full text-white text-center"
        style={{
          transform: `translateY(${-scrollPosition * 0.15}px)`,
        }}
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4">{title}</h1>
        <p className="text-xl md:text-2xl">{subtitle}</p>
      </div>
    </div>
  );
};