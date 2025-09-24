import React from 'react';
import { Link } from 'react-router-dom';
import artisanWorkshop from '../assets/artisan-workshop.jpg';
import { useCart } from '../contexts/CartContext';

const ShopNow: React.FC = () => {
  const { addItem, openCart } = useCart();
  
  // 🎯 EDIT THIS SECTION TO CUSTOMIZE YOUR PRODUCTS
  const products = [
    {
      id: 1,
      name: "Handwoven Textiles",
      description: "Beautiful traditional fabrics woven with intricate patterns using age-old techniques passed down through generations.",
      image: artisanWorkshop, // Replace with your image path
      price: "₹2,499",
      originalPrice: "₹3,499",
      category: "Textiles",
      isNew: true,
      discount: "30% OFF",
      productId: "silk-saree-1"
    },
    {
      id: 2,
      name: "Ceramic Pottery", 
      description: "Handcrafted ceramic pieces made by skilled artisans, perfect for home decoration and daily use.",
      image: artisanWorkshop, // Replace with pottery image
      price: "₹1,899",
      originalPrice: "₹2,499", 
      category: "Pottery",
      isNew: false,
      discount: "25% OFF",
      productId: "ceramic-vase-1"
    },
    {
      id: 3,
      name: "Silver Jewelry",
      description: "Exquisite handmade silver jewelry featuring traditional Indian designs and modern aesthetics.",
      image: artisanWorkshop, // Replace with jewelry image
      price: "₹4,999",
      originalPrice: "₹6,999",
      category: "Jewelry", 
      isNew: true,
      discount: "35% OFF",
      productId: "silver-jewelry-1"
    },
    {
      id: 4,
      name: "Home Decor Items",
      description: "Unique decorative pieces that bring warmth and traditional charm to your living spaces.",
      image: artisanWorkshop, // Replace with home decor image
      price: "₹1,599", 
      originalPrice: "₹2,199",
      category: "Home Decor",
      isNew: false,
      discount: "20% OFF",
      productId: "ceramic-vase-2"
    }
  ];

  return (
    <div className="space-y-12">
      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.map((product) => (
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
              <div className="mb-2">
                <span className="text-xs font-medium text-terracotta-brown uppercase tracking-wide">
                  {product.category}
                </span>
              </div>
              <h3 className="font-playfair text-xl font-bold text-deep-espresso mb-3 tracking-wide group-hover:text-deep-red-clay transition-colors">
                {product.name}
              </h3>
              <p className="font-inter text-gray-600 text-sm mb-4 leading-relaxed">
                {product.description}
              </p>
              
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
                    id: `shopnow-${product.id}`,
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
  );
};

export default ShopNow;