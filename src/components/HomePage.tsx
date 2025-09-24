import React from 'react';
import Hero from './Hero';
import FestivalSales from './FestivalSales';
import About from './About';
import ShopNow from './ShopNow';

const HomePage: React.FC = () => {
  return (
    <>
      <Hero />
      <section id="shop-now" className="py-16 bg-warm-cream bg-indian-pattern">
        <div className="container mx-auto px-4">
          <h2 className="font-playfair text-2xl md:text-3xl font-bold text-center text-deep-espresso mb-8 tracking-wide">Shop Our Collections</h2>
          <ShopNow />
        </div>
      </section>
      <section id="festival-sales" className="bg-festival-pattern">
        <div className="container mx-auto px-4">
          <FestivalSales />
        </div>
      </section>
      <section id="about" className="py-16 bg-golden-tan bg-indian-pattern">
        <div className="container mx-auto px-4">
          <h2 className="font-playfair text-2xl md:text-3xl font-bold text-center text-deep-espresso mb-8 tracking-wide">Our Story</h2>
          <About />
        </div>
      </section>
    </>
  );
};

export default HomePage;