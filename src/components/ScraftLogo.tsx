import React from 'react';

interface ScraftLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const ScraftLogo: React.FC<ScraftLogoProps> = ({ className = '', size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  return (
    <div className={`flex items-center ${className}`}>
      <svg 
        className={`${sizeClasses[size]} mr-3`}
        viewBox="0 0 100 100" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Outer circle representing wholeness and tradition */}
        <circle 
          cx="50" 
          cy="50" 
          r="45" 
          stroke="#8B4513" 
          strokeWidth="2" 
          fill="none"
          opacity="0.8"
        />
        
        {/* Inner decorative pattern inspired by traditional Indian motifs */}
        <circle 
          cx="50" 
          cy="50" 
          r="35" 
          stroke="#D2691E" 
          strokeWidth="1.5" 
          fill="none"
          strokeDasharray="3,2"
          opacity="0.6"
        />
        
        {/* Central 'S' for Scraft with artistic flourishes */}
        <path 
          d="M35 30 Q40 25 45 30 Q50 35 45 40 Q40 45 45 50 Q50 55 45 60 Q40 65 45 70 Q50 75 55 70" 
          stroke="#8B4513" 
          strokeWidth="3" 
          fill="none" 
          strokeLinecap="round"
        />
        
        {/* Decorative dots representing craftsmanship details */}
        <circle cx="30" cy="35" r="2" fill="#D2691E" opacity="0.7" />
        <circle cx="70" cy="35" r="2" fill="#D2691E" opacity="0.7" />
        <circle cx="30" cy="65" r="2" fill="#D2691E" opacity="0.7" />
        <circle cx="70" cy="65" r="2" fill="#D2691E" opacity="0.7" />
        
        {/* Small traditional pattern elements */}
        <path 
          d="M25 50 L30 45 L30 55 Z" 
          fill="#8B4513" 
          opacity="0.5"
        />
        <path 
          d="M75 50 L70 45 L70 55 Z" 
          fill="#8B4513" 
          opacity="0.5"
        />
      </svg>
      
      <span className="font-playfair text-lg md:text-xl font-bold tracking-wide text-deep-espresso">
        Scraft
      </span>
    </div>
  );
};

export default ScraftLogo;