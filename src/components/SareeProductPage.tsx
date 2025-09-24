import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeftIcon, ChevronRightIcon, HeartIcon, ShareIcon, ShoppingCartIcon, TruckIcon, ShieldCheckIcon, SparklesIcon } from '@heroicons/react/24/outline';
import { StarIcon as StarSolidIcon, HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';
import { useCart } from '../contexts/CartContext';

const SareeProductPage: React.FC = () => {
  const { addItem, openCart } = useCart();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [selectedBlouse, setSelectedBlouse] = useState('Matching');

  const product = {
    id: 'silk-saree-royal-001',
    name: 'Royal Kanchipuram Silk Saree',
    price: 15999,
    originalPrice: 22999,
    description: 'Exquisite handwoven Kanchipuram silk saree featuring traditional temple motifs and intricate zari work. This masterpiece represents the pinnacle of South Indian textile artistry, woven by skilled artisans using pure mulberry silk and genuine gold zari threads.',
    longDescription: 'This magnificent Kanchipuram saree is a testament to India\'s rich textile heritage. Each saree takes approximately 20-25 days to complete, with master weavers working on traditional pit looms. The intricate temple border and pallu feature traditional motifs including peacocks, elephants, and lotus flowers, all woven with pure gold zari threads that have been used in Indian textiles for over 2000 years.',
    highlights: [
      'Pure Kanchipuram silk with gold zari',
      'Traditional temple motifs and designs',
      'Handwoven on traditional pit looms',
      'Genuine gold and silver zari threads',
      'Rich vibrant colors that last generations',
      'Includes matching blouse piece',
      'Perfect for weddings and special occasions',
      'Comes with authenticity certificate'
    ],
    images: [
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=800&h=800&fit=crop'
    ],
    rating: 4.9,
    reviewCount: 189,
    inStock: true,
    category: 'Kanchipuram Silk',
    weaver: 'Master Weaver Lakshmi Devi',
    weaverExperience: '30+ years',
    origin: 'Kanchipuram, Tamil Nadu',
    materials: ['Pure Mulberry Silk', 'Gold Zari', 'Silver Zari', 'Natural Dyes'],
    blouseOptions: ['Matching', 'Contrast', 'Designer'],
    fabric: {
      type: 'Pure Kanchipuram Silk',
      weight: '850 grams',
      length: '6.5 meters',
      blouseLength: '0.8 meters',
      border: 'Traditional Temple Border',
      pallu: 'Heavy Zari Work Pallu'
    },
    careInstructions: [
      'Dry clean only',
      'Store in cotton cloth',
      'Avoid direct sunlight',
      'Handle zari work with care',
      'Iron on low heat with cloth protection'
    ],
    occasions: ['Weddings', 'Festivals', 'Religious Ceremonies', 'Special Occasions']
  };

  const reviews = [
    {
      id: '1',
      name: 'Deepika Sharma',
      rating: 5,
      date: '2024-01-22',
      comment: 'Absolutely gorgeous saree! The silk quality is exceptional and the zari work is breathtaking. Wore it to my sister\'s wedding and received countless compliments. Worth every penny!',
      verified: true,
      occasion: 'Wedding'
    },
    {
      id: '2',
      name: 'Anitha Reddy',
      rating: 5,
      date: '2024-01-20',
      comment: 'This is my third Kanchipuram saree from this collection. The authenticity and quality are unmatched. The colors are vibrant and the silk feels luxurious.',
      verified: true,
      occasion: 'Festival'
    },
    {
      id: '3',
      name: 'Meera Iyer',
      rating: 4,
      date: '2024-01-18',
      comment: 'Beautiful saree with intricate work. The temple motifs are stunning. Only minor issue was the blouse piece was slightly shorter than expected, but overall very satisfied.',
      verified: true,
      occasion: 'Religious Ceremony'
    },
    {
      id: '4',
      name: 'Priya Nair',
      rating: 5,
      date: '2024-01-15',
      comment: 'Heirloom quality saree! The craftsmanship is incredible and you can feel the love and skill that went into making it. Will definitely pass this down to my daughter.',
      verified: true,
      occasion: 'Special Occasion'
    }
  ];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <StarSolidIcon
        key={i}
        className={`h-5 w-5 ${i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-warm-white">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center space-x-2 text-sm">
            <Link to="/" className="text-deep-espresso hover:text-terracotta-brown">Home</Link>
            <span className="text-deep-espresso opacity-50">/</span>
            <Link to="/shop" className="text-deep-espresso hover:text-terracotta-brown">Shop</Link>
            <span className="text-deep-espresso opacity-50">/</span>
            <Link to="/shop/sarees" className="text-deep-espresso hover:text-terracotta-brown">Sarees</Link>
            <span className="text-deep-espresso opacity-50">/</span>
            <span className="text-deep-espresso opacity-75">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-[3/4] bg-white rounded-lg overflow-hidden shadow-lg">
              <img
                src={product.images[currentImageIndex]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 shadow-md transition-all duration-200"
              >
                <ChevronLeftIcon className="h-6 w-6 text-deep-espresso" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 shadow-md transition-all duration-200"
              >
                <ChevronRightIcon className="h-6 w-6 text-deep-espresso" />
              </button>
              
              {/* Authenticity Badge */}
              <div className="absolute top-4 left-4 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center space-x-1">
                <SparklesIcon className="h-4 w-4" />
                <span>Authentic</span>
              </div>
            </div>
            
            {/* Thumbnail Gallery */}
            <div className="grid grid-cols-5 gap-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                    currentImageIndex === index ? 'border-terracotta-brown' : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <img src={image} alt={`${product.name} ${index + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <h1 className="font-playfair text-3xl font-bold text-deep-espresso mb-2">{product.name}</h1>
              <p className="text-deep-espresso opacity-75 mb-4">{product.description}</p>
              
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center">
                  {renderStars(product.rating)}
                  <span className="ml-2 text-sm text-deep-espresso opacity-75">
                    {product.rating} ({product.reviewCount} reviews)
                  </span>
                </div>
              </div>

              <div className="flex items-center space-x-4 mb-6">
                <span className="font-bold text-3xl text-deep-espresso">₹{product.price}</span>
                <span className="text-xl text-deep-espresso opacity-50 line-through">₹{product.originalPrice}</span>
                <span className="bg-terracotta-brown text-white px-3 py-1 rounded-full text-sm font-bold">
                  {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                </span>
              </div>
            </div>

            {/* Weaver Information */}
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg border border-purple-200">
              <h3 className="font-semibold text-deep-espresso mb-2">🧵 Handwoven by Master Artisan</h3>
              <p className="text-sm text-deep-espresso opacity-75">
                <strong>{product.weaver}</strong> - {product.weaverExperience} of traditional Kanchipuram weaving
              </p>
              <p className="text-sm text-deep-espresso opacity-75">Origin: {product.origin}</p>
            </div>

            {/* Fabric Details */}
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <h3 className="font-semibold text-deep-espresso mb-3">Fabric Specifications</h3>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="text-deep-espresso opacity-75">Type:</span>
                  <span className="ml-2 font-medium">{product.fabric.type}</span>
                </div>
                <div>
                  <span className="text-deep-espresso opacity-75">Weight:</span>
                  <span className="ml-2 font-medium">{product.fabric.weight}</span>
                </div>
                <div>
                  <span className="text-deep-espresso opacity-75">Length:</span>
                  <span className="ml-2 font-medium">{product.fabric.length}</span>
                </div>
                <div>
                  <span className="text-deep-espresso opacity-75">Blouse:</span>
                  <span className="ml-2 font-medium">{product.fabric.blouseLength}</span>
                </div>
              </div>
            </div>

            {/* Blouse Selection */}
            <div>
              <h3 className="font-semibold text-deep-espresso mb-3">Blouse Option</h3>
              <div className="grid grid-cols-3 gap-3">
                {product.blouseOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => setSelectedBlouse(option)}
                    className={`p-3 rounded-lg border-2 text-sm font-medium transition-all duration-200 ${
                      selectedBlouse === option
                        ? 'border-terracotta-brown bg-terracotta-brown text-white'
                        : 'border-gray-200 text-deep-espresso hover:border-terracotta-brown'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            {/* Occasions */}
            <div>
              <h3 className="font-semibold text-deep-espresso mb-3">Perfect For</h3>
              <div className="flex flex-wrap gap-2">
                {product.occasions.map((occasion) => (
                  <span
                    key={occasion}
                    className="bg-terracotta-brown bg-opacity-10 text-terracotta-brown px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {occasion}
                  </span>
                ))}
              </div>
            </div>

            {/* Quantity and Actions */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 text-deep-espresso hover:bg-gray-100"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 text-deep-espresso font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 text-deep-espresso hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50"
                >
                  {isWishlisted ? (
                    <HeartSolidIcon className="h-6 w-6 text-red-500" />
                  ) : (
                    <HeartIcon className="h-6 w-6 text-deep-espresso" />
                  )}
                </button>
                <button className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50">
                  <ShareIcon className="h-6 w-6 text-deep-espresso" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button 
                  onClick={() => {
                    for (let i = 0; i < quantity; i++) {
                      addItem({
                        id: `${product.id}-${Date.now()}-${i}`,
                        productId: product.id,
                        name: product.name,
                        price: `₹${product.price}`,
                        originalPrice: product.originalPrice ? `₹${product.originalPrice}` : undefined,
                        image: product.images[0],
                        category: product.category,
                        inStock: product.inStock
                      });
                    }
                    openCart();
                  }}
                  className="bg-terracotta-brown text-white px-6 py-3 rounded-lg font-medium hover:bg-opacity-90 transition-all duration-200 flex items-center justify-center space-x-2"
                >
                  <ShoppingCartIcon className="h-5 w-5" />
                  <span>Add to Cart</span>
                </button>
                <button 
                  onClick={() => alert('Proceeding to checkout with Handwoven Silk Saree')}
                  className="bg-deep-espresso text-white px-6 py-3 rounded-lg font-medium hover:bg-opacity-90 transition-all duration-200"
                >
                  Buy Now
                </button>
              </div>
            </div>

            {/* Shipping & Returns */}
            <div className="space-y-3 pt-6 border-t border-gray-200">
              <div className="flex items-center space-x-3">
                <TruckIcon className="h-5 w-5 text-terracotta-brown" />
                <span className="text-sm text-deep-espresso">Free shipping on orders over ₹10000</span>
              </div>
              <div className="flex items-center space-x-3">
                <ShieldCheckIcon className="h-5 w-5 text-terracotta-brown" />
                <span className="text-sm text-deep-espresso">15-day return policy for unused items</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button className="border-b-2 border-terracotta-brown text-terracotta-brown py-4 px-1 text-sm font-medium">
                Description
              </button>
              <button className="border-b-2 border-transparent text-deep-espresso opacity-75 hover:opacity-100 py-4 px-1 text-sm font-medium">
                Care Instructions
              </button>
              <button className="border-b-2 border-transparent text-deep-espresso opacity-75 hover:opacity-100 py-4 px-1 text-sm font-medium">
                Weaving Tradition
              </button>
            </nav>
          </div>
          
          <div className="py-8">
            <div className="prose max-w-none">
              <p className="text-deep-espresso leading-relaxed mb-6">{product.longDescription}</p>
              
              <h3 className="font-playfair text-xl font-semibold text-deep-espresso mb-4">Saree Features</h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {product.highlights.map((highlight, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <span className="text-terracotta-brown mt-1">✓</span>
                    <span className="text-deep-espresso">{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-16">
          <h2 className="font-playfair text-2xl font-bold text-deep-espresso mb-8">Customer Reviews</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="text-center">
                  <div className="text-4xl font-bold text-deep-espresso mb-2">{product.rating}</div>
                  <div className="flex justify-center mb-2">
                    {renderStars(product.rating)}
                  </div>
                  <div className="text-sm text-deep-espresso opacity-75">Based on {product.reviewCount} reviews</div>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-2 space-y-6">
              {reviews.map((review) => (
                <div key={review.id} className="bg-white p-6 rounded-lg shadow-md">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="font-medium text-deep-espresso">{review.name}</span>
                        {review.verified && (
                          <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Verified Purchase</span>
                        )}
                        <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">{review.occasion}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="flex">
                          {renderStars(review.rating)}
                        </div>
                        <span className="text-sm text-deep-espresso opacity-75">{review.date}</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-deep-espresso leading-relaxed">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SareeProductPage;