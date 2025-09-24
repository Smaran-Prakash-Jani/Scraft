import React from 'react';

const About: React.FC = () => {
  return (
    <section className="py-16 bg-deep-espresso text-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <div className="h-64 md:h-96 bg-golden-tan rounded-lg flex items-center justify-center text-deep-espresso font-inter font-bold text-xl">
              Artisan Image
            </div>
          </div>
          <div className="md:w-1/2 md:pl-12">
            <h2 className="font-playfair text-2xl md:text-3xl font-bold mb-6 text-warm-cream tracking-wide">About Our Craft</h2>
            <p className="font-inter text-lg mb-4 leading-relaxed font-light">
              At Scraft, we celebrate the rich tradition of handmade crafts passed down through generations. 
              Our artisans blend traditional techniques with contemporary designs to create unique pieces.
            </p>
            <p className="font-inter text-lg mb-6 leading-relaxed font-light">
              Each item tells a story of cultural heritage and skilled craftsmanship, bringing a piece of 
              tradition into modern homes.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-terracotta-brown p-4 rounded-lg">
                <h3 className="font-playfair font-semibold mb-2 text-lg">Sustainable Materials</h3>
                <p className="font-inter text-sm font-light leading-relaxed">We source eco-friendly materials to create sustainable crafts</p>
              </div>
              <div className="bg-terracotta-brown p-4 rounded-lg">
                <h3 className="font-playfair font-semibold mb-2 text-lg">Artisan Support</h3>
                <p className="font-inter text-sm font-light leading-relaxed">Every purchase directly supports our community of skilled artisans</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;