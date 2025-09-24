import React from 'react';

const FestivalSales: React.FC = () => {
  const bannerText = [
    "🪔 DIWALI MEGA SALE - 40% OFF 🪔",
    "🎄 CHRISTMAS SPECIAL - BUY 2 GET 1 FREE 🎄", 
    "✨ NEW YEAR COLLECTION - EXCLUSIVE DESIGNS ✨",
    "🌈 HOLI FESTIVAL - COLORFUL CRAFTS 🌈",
    "🎁 RAKHI SPECIAL - HANDCRAFTED GIFTS 🎁",
    "🏹 DUSSEHRA CELEBRATION - TRADITIONAL CRAFTS 🏹"
  ];

  const festivalProducts = [
    {
      id: 1,
      name: "Diwali Diya Set",
      description: "Handcrafted clay diyas with intricate designs",
      originalPrice: 1999,
      salePrice: 1199,
      discount: "40% OFF",
      emoji: "🪔"
    },
    {
      id: 2,
      name: "Rangoli Stencils",
      description: "Beautiful traditional rangoli patterns",
      originalPrice: 1499,
      salePrice: 899,
      discount: "40% OFF", 
      emoji: "🌺"
    },
    {
      id: 3,
      name: "Festival Lanterns",
      description: "Colorful handmade paper lanterns",
      originalPrice: 2499,
      salePrice: 1499,
      discount: "40% OFF",
      emoji: "🏮"
    }
  ];

  return (
    <section className="py-16 relative">
      <div className="container mx-auto px-4">
        {/* Header with sparkle effects */}
        <div className="text-center mb-12 relative">
          <div className="festival-sparkle absolute top-0 left-1/4 w-4 h-4 bg-yellow-400 rounded-full opacity-70"></div>
          <div className="festival-sparkle absolute top-4 right-1/4 w-3 h-3 bg-orange-400 rounded-full opacity-60" style={{animationDelay: '1s'}}></div>
          <div className="festival-sparkle absolute -top-2 left-1/3 w-2 h-2 bg-pink-400 rounded-full opacity-80" style={{animationDelay: '2s'}}></div>
          
          <h2 className="font-playfair text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 tracking-wide drop-shadow-lg">
            🎉 Festival Exclusives 🎉
          </h2>
          <p className="font-inter text-warm-cream text-lg font-light leading-relaxed max-w-2xl mx-auto">
            Celebrate the spirit of festivals with our exclusive handcrafted collection. Limited time offers on traditional crafts!
          </p>
        </div>
        
        {/* Scrolling Banner */}
        <div className="overflow-hidden relative rounded-xl shadow-2xl bg-gradient-to-r from-red-900 via-red-800 to-red-900 mb-12 border-2 border-yellow-400">
          <div className="animate-festival-banner whitespace-nowrap py-6 text-white font-inter font-bold flex text-lg">
            {/* First set of banner items */}
            {bannerText.map((text, index) => (
              <span key={`first-${index}`} className="mx-12 inline-block text-shadow-lg">{text}</span>
            ))}
            {/* Duplicate set for seamless loop */}
            {bannerText.map((text, index) => (
              <span key={`second-${index}`} className="mx-12 inline-block text-shadow-lg">{text}</span>
            ))}
          </div>
        </div>
        
        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {festivalProducts.map((product) => (
            <div key={product.id} className="festival-card bg-white bg-opacity-95 p-8 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 backdrop-blur-sm border border-yellow-200 relative overflow-hidden">
              {/* Discount Badge */}
              <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold transform rotate-12 shadow-lg">
                {product.discount}
              </div>
              
              {/* Product Image Placeholder */}
              <div className="h-56 bg-gradient-to-br from-golden-tan via-yellow-400 to-orange-400 rounded-lg mb-6 flex items-center justify-center text-white font-inter text-4xl font-bold shadow-inner relative overflow-hidden">
                <div className="absolute inset-0 bg-black bg-opacity-10"></div>
                <span className="relative z-10 text-4xl">{product.emoji}</span>
                <div className="absolute bottom-2 right-2 text-white text-sm font-medium opacity-75">
                  Handcrafted
                </div>
              </div>
              
              {/* Product Info */}
              <h3 className="font-playfair text-2xl font-semibold text-deep-espresso mb-3 tracking-wide">
                {product.name}
              </h3>
              <p className="font-inter text-terracotta-brown mb-6 font-light leading-relaxed text-sm">
                {product.description}
              </p>
              
              {/* Pricing and CTA */}
              <div className="flex justify-between items-center mb-4">
                <div className="flex flex-col">
                  <span className="font-inter text-2xl text-deep-red-clay font-bold">₹{product.salePrice}</span>
                  <span className="font-inter line-through text-gray-500 text-sm">₹{product.originalPrice}</span>
                </div>
                <div className="text-green-600 font-bold text-sm">
                  Save ₹{product.originalPrice - product.salePrice}
                </div>
              </div>
              
              <button className="w-full font-inter bg-gradient-to-r from-deep-espresso to-red-800 text-white py-3 px-6 rounded-lg hover:from-red-800 hover:to-deep-espresso transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:scale-105">
                🛒 Add to Festival Cart
              </button>
            </div>
          ))}
        </div>
        
        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 p-8 rounded-2xl shadow-2xl max-w-4xl mx-auto">
            <h3 className="font-playfair text-3xl font-bold text-white mb-4 drop-shadow-lg">
              🎊 Limited Time Festival Offers! 🎊
            </h3>
            <p className="font-inter text-white text-lg mb-6 opacity-90">
              Don't miss out on these exclusive festival deals. Celebrate with authentic handcrafted items!
            </p>
            <button className="font-inter bg-white text-red-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-colors shadow-lg hover:shadow-xl transform hover:scale-105">
              🛍️ Shop All Festival Items
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FestivalSales;