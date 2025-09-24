import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  description: string;
  inStock: boolean;
}

interface CategoryPageProps {
  categoryName: string;
  categoryDescription: string;
  categoryIcon: string;
  products: Product[];
  heroImage?: string;
}

const CategoryPage: React.FC<CategoryPageProps> = ({
  categoryName,
  categoryDescription,
  categoryIcon,
  products,
  heroImage
}) => {
  const { addItem, openCart } = useCart();
  
  // Function to generate product ID based on category and product ID
  const getProductId = (productId: number, category: string) => {
    const categoryMap: { [key: string]: string } = {
      'Pots & Ceramics': 'ceramic-vase',
      'Sarees': 'silk-saree',
      'Toys': 'wooden-toy',
      'Jewelry': 'silver-jewelry',
      'Home Decor': 'home-decor',
      'Bags': 'leather-bag'
    };
    
    const prefix = categoryMap[category] || 'ceramic-vase';
    return `${prefix}-${productId}`;
  };
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState('all');

  const filteredProducts = products.filter(product => {
    if (priceRange === 'under-500') return product.price < 500;
    if (priceRange === '500-1000') return product.price >= 500 && product.price <= 1000;
    if (priceRange === 'over-1000') return product.price > 1000;
    return true;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low': return a.price - b.price;
      case 'price-high': return b.price - a.price;
      case 'rating': return b.rating - a.rating;
      case 'name': return a.name.localeCompare(b.name);
      default: return 0;
    }
  });

  return (
    <div className="min-h-screen bg-warm-cream">
      {/* Breadcrumb */}
      <div className="bg-deep-espresso bg-opacity-5 py-4">
        <div className="container mx-auto px-4">
          <nav className="flex items-center space-x-2 text-sm text-deep-espresso">
            <Link to="/" className="hover:text-terracotta-brown transition-colors">Home</Link>
            <span>›</span>
            <Link to="/shop" className="hover:text-terracotta-brown transition-colors">Shop</Link>
            <span>›</span>
            <span className="font-medium">{categoryName}</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative h-64 bg-gradient-to-r from-deep-espresso to-terracotta-brown overflow-hidden">
        <div className="absolute inset-0 bg-indian-pattern opacity-10"></div>
        <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
          <div className="text-white">
            <div className="flex items-center mb-4">
              <span className="text-2xl md:text-3xl mr-4">{categoryIcon}</span>
            <h1 className="font-playfair text-2xl md:text-3xl font-bold">{categoryName}</h1>
            </div>
            <p className="font-inter text-lg opacity-90 max-w-2xl">{categoryDescription}</p>
            <div className="mt-4 text-sm opacity-75">
              {products.length} products available
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Sort */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex flex-wrap items-center gap-4">
            <div>
              <label className="block text-sm font-medium text-deep-espresso mb-1">Sort by:</label>
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-deep-espresso border-opacity-20 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-terracotta-brown"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="name">Name A-Z</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-deep-espresso mb-1">Price Range:</label>
              <select 
                value={priceRange} 
                onChange={(e) => setPriceRange(e.target.value)}
                className="border border-deep-espresso border-opacity-20 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-terracotta-brown"
              >
                <option value="all">All Prices</option>
                <option value="under-500">Under ₹500</option>
                <option value="500-1000">₹500 - ₹1000</option>
                <option value="over-1000">Over ₹1000</option>
              </select>
            </div>
          </div>
          <div className="text-sm text-deep-espresso opacity-75">
            Showing {sortedProducts.length} of {products.length} products
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sortedProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 group">
              <Link to={`/product/${getProductId(product.id, categoryName)}`} className="block">
                <div className="relative overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {!product.inStock && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                      <span className="text-white font-bold">Out of Stock</span>
                    </div>
                  )}
                  {product.originalPrice && (
                    <div className="absolute top-2 left-2 bg-terracotta-brown text-white px-2 py-1 rounded text-sm font-bold">
                      {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-playfair text-lg font-semibold text-deep-espresso mb-2 line-clamp-2">
                    {product.name}
                  </h3>
                  <p className="text-sm text-deep-espresso opacity-75 mb-3 line-clamp-2">
                    {product.description}
                  </p>
                  <div className="flex items-center mb-3">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}>
                          ★
                        </span>
                      ))}
                    </div>
                    <span className="text-sm text-deep-espresso opacity-75 ml-2">
                      ({product.reviews})
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-lg text-deep-espresso">₹{product.price}</span>
                      {product.originalPrice && (
                        <span className="text-sm text-deep-espresso opacity-50 line-through">₹{product.originalPrice}</span>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
              <div className="px-4 pb-4 space-y-2">
                <button 
                  className={`w-full px-4 py-2 rounded font-medium transition-all duration-300 ${
                    product.inStock 
                      ? 'bg-terracotta-brown text-white hover:bg-opacity-90 hover:shadow-md' 
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                  disabled={!product.inStock}
                  onClick={(e) => {
                    e.preventDefault();
                    if (product.inStock) {
                      alert(`Proceeding to checkout with ${product.name}`);
                    }
                  }}
                >
                  {product.inStock ? 'Buy Now' : 'Out of Stock'}
                </button>
                <button 
                  className={`w-full px-4 py-2 rounded font-medium transition-all duration-300 border-2 ${
                    product.inStock 
                      ? 'border-terracotta-brown text-terracotta-brown hover:bg-terracotta-brown hover:text-white' 
                      : 'border-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                  disabled={!product.inStock}
                  onClick={(e) => {
                    e.preventDefault();
                    if (product.inStock) {
                      addItem({
                        id: `category-${product.id}`,
                        productId: getProductId(product.id, categoryName),
                        name: product.name,
                        price: `₹${product.price}`,
                        originalPrice: product.originalPrice ? `₹${product.originalPrice}` : undefined,
                        image: product.image,
                        category: categoryName,
                        inStock: product.inStock
                      });
                      openCart();
                    }
                  }}
                >
                  {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {sortedProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-4xl mb-4 opacity-50">🔍</div>
            <h3 className="font-playfair text-2xl font-bold text-deep-espresso mb-2">No products found</h3>
            <p className="text-deep-espresso opacity-75">Try adjusting your filters to see more products.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;