import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import artisanWorkshop from '../assets/artisan-workshop.jpg';
import { useCart } from '../contexts/CartContext';

const ShopPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { addItem, openCart } = useCart();

  // Categories with icons
  const categories = [
    { id: 'pots', name: 'Pottery & Ceramics', icon: '🏺', description: 'Handcrafted clay pots and ceramic art' },
    { id: 'sarees', name: 'Sarees & Textiles', icon: '🥻', description: 'Traditional handwoven fabrics' },
    { id: 'toys', name: 'Wooden Toys', icon: '🪀', description: 'Eco-friendly handmade toys' },
    { id: 'jewelry', name: 'Jewelry', icon: '💍', description: 'Silver and traditional ornaments' },
    { id: 'home-decor', name: 'Home Decor', icon: '🏠', description: 'Beautiful decorative items' },
    { id: 'bags', name: 'Bags & Accessories', icon: '👜', description: 'Handwoven bags and accessories' }
  ];

  // Bestsellers
  const bestsellers = [
    {
      id: 1,
      name: "Handwoven Silk Saree",
      price: "₹4,999",
      originalPrice: "₹7,999",
      image: artisanWorkshop,
      rating: 4.8,
      reviews: 124,
      badge: "Bestseller",
      category: "sarees",
      productId: "silk-saree-1"
    },
    {
      id: 2,
      name: "Traditional Clay Pot Set",
      price: "₹1,299",
      originalPrice: "₹1,899",
      image: artisanWorkshop,
      rating: 4.9,
      reviews: 89,
      badge: "Top Rated",
      category: "pots",
      productId: "ceramic-vase-1"
    },
    {
      id: 3,
      name: "Wooden Educational Toys",
      price: "₹899",
      originalPrice: "₹1,299",
      image: artisanWorkshop,
      rating: 4.7,
      reviews: 156,
      badge: "Eco-Friendly",
      category: "toys",
      productId: "wooden-toy-1"
    },
    {
      id: 4,
      name: "Silver Temple Jewelry",
      price: "₹3,499",
      originalPrice: "₹4,999",
      image: artisanWorkshop,
      rating: 4.9,
      reviews: 67,
      badge: "Premium",
      category: "jewelry",
      productId: "silver-jewelry-1"
    }
  ];

  // Product Gallery
  const products = [
    {
      id: 1,
      name: "Handwoven Silk Saree",
      price: "₹4,999",
      originalPrice: "₹7,999",
      image: artisanWorkshop,
      category: "sarees",
      isNew: false,
      discount: "38% OFF",
      productId: "silk-saree-2"
    },
    {
      id: 2,
      name: "Traditional Clay Pot Set",
      price: "₹1,299",
      originalPrice: "₹1,899",
      image: artisanWorkshop,
      category: "pots",
      isNew: true,
      discount: "32% OFF",
      productId: "ceramic-vase-2"
    },
    {
      id: 3,
      name: "Wooden Educational Toys",
      price: "₹899",
      originalPrice: "₹1,299",
      image: artisanWorkshop,
      category: "toys",
      isNew: false,
      discount: "31% OFF",
      productId: "wooden-toy-2"
    },
    {
      id: 4,
      name: "Silver Temple Jewelry",
      price: "₹3,499",
      originalPrice: "₹4,999",
      image: artisanWorkshop,
      category: "jewelry",
      isNew: true,
      discount: "30% OFF",
      productId: "silver-jewelry-2"
    },
    {
      id: 5,
      name: "Decorative Wall Hanging",
      price: "₹1,599",
      originalPrice: "₹2,299",
      image: artisanWorkshop,
      category: "home-decor",
      isNew: false,
      discount: "30% OFF",
      productId: "ceramic-vase-3"
    },
    {
      id: 6,
      name: "Handwoven Jute Bag",
      price: "₹799",
      originalPrice: "₹1,199",
      image: artisanWorkshop,
      category: "bags",
      isNew: true,
      discount: "33% OFF",
      productId: "silk-saree-3"
    }
  ];

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-warm-cream via-golden-tan/10 to-warm-cream">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-deep-espresso via-terracotta-brown to-deep-red-clay text-white py-24 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform -skew-y-6"></div>
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.1)_0%,transparent_50%)]"></div>
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <h1 className="font-playfair text-hero md:text-display lg:text-massive font-bold mb-8 tracking-wider text-shadow-lg">
              Shop Our Collections
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-golden-tan to-warm-cream mx-auto mb-8 rounded-full"></div>
            <p className="font-inter text-subtitle md:text-large max-w-3xl mx-auto leading-relaxed text-warm-cream/90">
              Discover authentic handcrafted treasures from skilled artisans across India. 
              Each piece tells a story of tradition, culture, and exceptional craftsmanship.
            </p>
          </div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-warm-cream/20 to-transparent"></div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-gradient-to-br from-warm-cream via-golden-tan/5 to-warm-cream relative">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(139,69,19,0.1)_25%,rgba(139,69,19,0.1)_50%,transparent_50%,transparent_75%,rgba(139,69,19,0.1)_75%)] bg-[length:20px_20px]"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-display md:text-large font-bold text-deep-espresso mb-6 tracking-wider">
              Shop by Category
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-terracotta-brown to-deep-red-clay mx-auto rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category) => (
              <Link 
                key={category.id}
                to={`/shop/${category.id}`}
                className="group cursor-pointer bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-golden-tan/20 hover:border-golden-tan/60 block relative overflow-hidden"
              >
                {/* Card Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-white via-golden-tan/5 to-warm-cream/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="text-center relative z-10">
                  <div className="text-5xl mb-6 group-hover:scale-125 transition-transform duration-500 filter drop-shadow-lg">
                    {category.icon}
                  </div>
                  <h3 className="font-playfair text-subtitle font-bold text-deep-espresso mb-4 tracking-wide group-hover:text-terracotta-brown transition-colors duration-300">
                    {category.name}
                  </h3>
                  <p className="font-inter text-terracotta-brown/80 text-body leading-relaxed mb-4">
                    {category.description}
                  </p>
                  <div className="mt-6 text-body font-semibold text-deep-red-clay opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    View Products →
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Bestsellers Section */}
      <section className="py-20 bg-gradient-to-br from-golden-tan/20 via-warm-cream to-terracotta-brown/10 relative overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-deep-red-clay/30 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-terracotta-brown/30 to-transparent rounded-full blur-3xl"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-display md:text-large font-bold text-deep-espresso mb-6 tracking-wider">
              ⭐ Bestsellers
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-deep-red-clay to-terracotta-brown mx-auto rounded-full"></div>
            <p className="font-inter text-body text-terracotta-brown/80 mt-4 max-w-2xl mx-auto">
              Discover our most loved handcrafted pieces, chosen by customers for their exceptional quality and beauty.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {bestsellers.map((product) => (
              <Link key={product.id} to={`/product/${product.productId}`} className="group bg-white rounded-xl shadow-lg overflow-hidden transform hover:-translate-y-3 transition-all duration-300 hover:shadow-2xl block">
                {/* Product Image */}
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-deep-red-clay text-white px-3 py-1 rounded-full text-xs font-bold">
                      {product.badge}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4 bg-white bg-opacity-90 px-2 py-1 rounded-full">
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-500 text-sm">⭐</span>
                      <span className="text-xs font-bold text-deep-espresso">{product.rating}</span>
                    </div>
                  </div>
                </div>
                
                {/* Product Info */}
                <div className="p-6">
                  <h3 className="font-playfair text-lg font-bold text-deep-espresso mb-2 tracking-wide">
                    {product.name}
                  </h3>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="font-inter text-lg font-bold text-deep-red-clay">
                      {product.price}
                    </span>
                    <span className="font-inter text-sm text-gray-400 line-through">
                      {product.originalPrice}
                    </span>
                  </div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-inter text-xs text-gray-600">
                      {product.reviews} reviews
                    </span>
                  </div>
                  <button 
                    onClick={(e) => {
                      e.preventDefault();
                      addItem({
                        id: `bestseller-${product.id}`,
                        productId: product.productId,
                        name: product.name,
                        price: product.price,
                        originalPrice: product.originalPrice,
                        image: product.image,
                        category: product.category,
                        inStock: true
                      });
                      openCart();
                    }}
                    className="w-full bg-terracotta-brown text-white py-3 rounded-lg hover:bg-deep-espresso transition-all duration-300 font-medium transform hover:scale-105 shadow-md hover:shadow-lg"
                  >
                    Add to Cart
                  </button>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Product Gallery */}
      <section className="py-20 bg-gradient-to-br from-warm-cream via-golden-tan/8 to-warm-cream relative">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(139,69,19,0.1)_0%,transparent_70%)] bg-[length:100px_100px]"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-center mb-16">
            <div className="text-center md:text-left mb-8 md:mb-0">
              <h2 className="font-playfair text-display md:text-large font-bold text-deep-espresso mb-4 tracking-wider">
                Product Gallery
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-terracotta-brown to-deep-red-clay mx-auto md:mx-0 rounded-full"></div>
            </div>
            
            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-3 justify-center md:justify-end">
              <button 
                onClick={() => setSelectedCategory('all')}
                className={`px-6 py-3 rounded-full font-inter text-body font-semibold transition-all duration-300 transform hover:scale-105 ${
                  selectedCategory === 'all' 
                    ? 'bg-gradient-to-r from-terracotta-brown to-deep-red-clay text-white shadow-lg shadow-terracotta-brown/30' 
                    : 'bg-white/80 backdrop-blur-sm text-deep-espresso hover:bg-gradient-to-r hover:from-golden-tan hover:to-terracotta-brown hover:text-white shadow-md border border-golden-tan/20'
                }`}
              >
                All Products
              </button>
              {categories.map((category) => (
                <button 
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-6 py-3 rounded-full font-inter text-body font-semibold transition-all duration-300 transform hover:scale-105 ${
                    selectedCategory === category.id 
                      ? 'bg-gradient-to-r from-terracotta-brown to-deep-red-clay text-white shadow-lg shadow-terracotta-brown/30' 
                      : 'bg-white/80 backdrop-blur-sm text-deep-espresso hover:bg-gradient-to-r hover:from-golden-tan hover:to-terracotta-brown hover:text-white shadow-md border border-golden-tan/20'
                  }`}
                >
                  {category.icon} {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <Link key={product.id} to={`/product/${product.productId}`} className="group bg-white rounded-xl shadow-lg overflow-hidden transform hover:-translate-y-3 transition-all duration-300 hover:shadow-2xl border border-gray-100 block">
                {/* Product Image */}
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    {product.isNew && (
                      <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                        NEW
                      </span>
                    )}
                    <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                      {product.discount}
                    </span>
                  </div>
                </div>
                
                {/* Product Info */}
                <div className="p-6">
                  <h3 className="font-playfair text-xl font-bold text-deep-espresso mb-3 tracking-wide group-hover:text-deep-red-clay transition-colors">
                    {product.name}
                  </h3>
                  
                  {/* Pricing */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span className="font-inter text-xl font-bold text-deep-red-clay">
                        {product.price}
                      </span>
                      <span className="font-inter text-sm text-gray-400 line-through">
                        {product.originalPrice}
                      </span>
                    </div>
                  </div>
                  
                  {/* Action Button */}
                  <button 
                    onClick={(e) => {
                      e.preventDefault();
                      addItem({
                        id: `product-${product.id}`,
                        productId: product.productId,
                        name: product.name,
                        price: product.price,
                        originalPrice: product.originalPrice,
                        image: product.image,
                        category: product.category,
                        inStock: true
                      });
                      openCart();
                    }}
                    className="font-inter w-full bg-deep-red-clay text-white py-3 rounded-lg hover:bg-terracotta-brown transition-all duration-300 font-medium transform hover:scale-105 shadow-md hover:shadow-lg"
                  >
                    Add to Cart
                  </button>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ShopPage;