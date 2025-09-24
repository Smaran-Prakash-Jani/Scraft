import React from 'react';
import { Link } from 'react-router-dom';
import artisanWorkshop from '../assets/artisan-workshop.jpg';

const Hero: React.FC = () => {
  return (
    <div id="hero" className="relative h-screen bg-cover bg-center bg-fixed" style={{ 
      backgroundImage: `url(${artisanWorkshop})` 
    }}>
      {/* Enhanced overlay with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-deep-espresso/70 via-deep-espresso/50 to-terracotta-brown/40"></div>
      
      {/* Content container with improved spacing and typography */}
      <div className="relative z-10 flex flex-col items-start justify-center h-full px-6 md:px-12 lg:px-16 xl:px-20 text-warm-cream">
        <div className="max-w-4xl">
          {/* Enhanced main heading */}
          <h1 className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl text-warm-cream mb-8 drop-shadow-2xl leading-none tracking-tight font-bold">
            Artisan Crafted,
            <span className="block text-golden-tan font-cormorant italic font-light text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
              Soul Inspired
            </span>
          </h1>
          
          {/* Enhanced subtitle */}
          <p className="text-body-large text-warm-cream/90 mb-8 max-w-2xl drop-shadow-lg font-light leading-relaxed">
            Discover handcrafted textiles and timeless stories from master artisans across India. 
            Each piece carries the soul of tradition and the beauty of authentic craftsmanship.
          </p>
          
          {/* Enhanced call-to-action section */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
            <Link 
              to="/shop"
              className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-inter font-semibold text-white bg-terracotta-brown/80 backdrop-blur-sm border border-terracotta-brown/60 rounded-lg overflow-hidden shadow-xl transition-all duration-300 hover:bg-terracotta-brown hover:shadow-2xl hover:scale-105 transform"
            >
              <span className="relative z-10">Explore Collections</span>
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
            </Link>
            
            <button className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-inter font-semibold text-warm-cream bg-white/10 backdrop-blur-sm border border-white/30 rounded-lg overflow-hidden shadow-xl transition-all duration-300 hover:bg-white/20 hover:shadow-2xl hover:scale-105 transform">
              <span className="relative z-10">Meet Our Artisans</span>
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
            </button>
          </div>
          
          {/* Additional decorative element */}
          <div className="mt-12 flex items-center space-x-4 text-warm-cream/70">
            <div className="w-12 h-px bg-golden-tan"></div>
            <span className="text-caption font-cormorant italic">Handcrafted with Love</span>
            <div className="w-12 h-px bg-golden-tan"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;