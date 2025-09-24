import React from 'react';
import { Link } from 'react-router-dom';
import artisanWorkshop from '../assets/artisan-workshop.jpg';

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-warm-cream via-warm-cream to-golden-tan/30">
      {/* Enhanced Breadcrumb */}
      <div className="bg-gradient-to-r from-deep-espresso/10 to-terracotta-brown/10 backdrop-blur-sm py-6">
        <div className="container mx-auto px-4">
          <nav className="flex items-center space-x-2 text-sm text-deep-espresso">
            <Link to="/" className="hover:text-terracotta-brown transition-colors font-medium">Home</Link>
            <span className="text-terracotta-brown">›</span>
            <span className="font-semibold text-terracotta-brown">About Us</span>
          </nav>
        </div>
      </div>

      {/* Enhanced Hero Section */}
      <section className="relative bg-gradient-to-br from-deep-espresso via-terracotta-brown to-deep-espresso text-white py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-deep-espresso/90 to-terracotta-brown/80"></div>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 border border-golden-tan rounded-full"></div>
          <div className="absolute bottom-10 right-10 w-24 h-24 border border-golden-tan rounded-full"></div>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 border border-golden-tan rounded-full"></div>
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-display text-white mb-6 tracking-tight">About Scraft</h1>
          <p className="text-body-large text-warm-cream/90 max-w-4xl mx-auto leading-relaxed">
            Celebrating the artistry of traditional Indian craftsmanship. Each piece tells a story of heritage, skill, and passion 
            that spans generations of master artisans.
          </p>
        </div>
      </section>

      {/* Enhanced Main Content - Our Story Section */}
      <section className="py-20 bg-gradient-to-br from-warm-cream to-golden-tan/20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <h2 className="text-heading text-deep-espresso mb-8">Our Story</h2>
              <div className="space-y-6 text-body text-deep-espresso/80 leading-relaxed">
                <p className="text-lg">
                  Scraft was born from a deep appreciation for India's rich artisanal heritage. We believe that every handcrafted piece carries within it the soul of its creator, the wisdom of generations, and the beauty of traditional techniques.
                </p>
                <p className="text-lg">
                  Our journey began with a simple mission: to bridge the gap between skilled artisans and conscious consumers who value authenticity, quality, and the stories behind beautiful objects.
                </p>
                <p className="text-lg">
                  Today, we work directly with artisan communities across India, ensuring fair trade practices and helping preserve traditional crafts for future generations.
                </p>
              </div>
              
              {/* Decorative element */}
              <div className="flex items-center space-x-4 pt-6">
                <div className="w-16 h-px bg-terracotta-brown"></div>
                <span className="text-caption text-terracotta-brown font-cormorant italic">Crafted with Purpose</span>
                <div className="w-16 h-px bg-terracotta-brown"></div>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-terracotta-brown/20 to-golden-tan/30 rounded-2xl blur-xl"></div>
              <img 
                src={artisanWorkshop} 
                alt="Artisan at work" 
                className="relative w-full h-96 object-cover rounded-xl shadow-2xl border-4 border-white/50"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Values Section - "Our Values" */}
      <section className="py-20 bg-gradient-to-br from-golden-tan/30 via-warm-cream to-dusty-rose/20 relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full" style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, ${getComputedStyle(document.documentElement).getPropertyValue('--terracotta-brown') || '#A0522D'} 2px, transparent 2px)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-heading text-deep-espresso mb-6">Our Values</h2>
            <p className="text-subheading text-deep-espresso/70 max-w-2xl mx-auto">
              The principles that guide our mission and define our commitment to artisans and customers alike.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card-elegant p-8 text-center group hover:scale-105 transition-all duration-300">
              <div className="w-20 h-20 bg-gradient-to-br from-terracotta-brown to-deep-espresso rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
              <h3 className="text-subheading text-deep-espresso mb-4">Authenticity</h3>
              <p className="text-body text-deep-espresso/70">Every piece is genuinely handcrafted using traditional techniques passed down through generations of master artisans.</p>
            </div>
            
            <div className="card-elegant p-8 text-center group hover:scale-105 transition-all duration-300">
              <div className="w-20 h-20 bg-gradient-to-br from-terracotta-brown to-deep-espresso rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
              <h3 className="text-subheading text-deep-espresso mb-4">Fair Trade</h3>
              <p className="text-body text-deep-espresso/70">We ensure artisans receive fair compensation for their exceptional skills and dedicated craftsmanship.</p>
            </div>
            
            <div className="card-elegant p-8 text-center group hover:scale-105 transition-all duration-300">
              <div className="w-20 h-20 bg-gradient-to-br from-terracotta-brown to-deep-espresso rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V7h10v2z"/>
                </svg>
              </div>
              <h3 className="text-subheading text-deep-espresso mb-4">Sustainability</h3>
              <p className="text-body text-deep-espresso/70">We promote eco-friendly practices and sustainable production methods that honor our planet.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;