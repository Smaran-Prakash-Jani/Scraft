import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeftIcon, ChevronRightIcon, HeartIcon, ShareIcon, ShoppingCartIcon, TruckIcon, ShieldCheckIcon, SparklesIcon, GiftIcon } from '@heroicons/react/24/outline';
import { StarIcon as StarSolidIcon, HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';
import { useCart } from '../contexts/CartContext';

const JewelryProductPage: React.FC = () => {
  const { addItem, openCart } = useCart();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [selectedSize, setSelectedSize] = useState('Medium');

  const product = {
    id: 'silver-jewelry-royal-001',
    name: 'Royal Kundan Silver Necklace Set',
    price: 8999,
    originalPrice: 12999,
    description: 'Exquisite handcrafted silver necklace set featuring authentic Kundan work with semi-precious stones. This stunning piece combines traditional Indian jewelry artistry with contemporary elegance, perfect for special occasions and celebrations.',
    longDescription: 'This magnificent Kundan necklace set represents the pinnacle of traditional Indian jewelry craftsmanship. Each piece is meticulously handcrafted by master artisans using time-honored techniques passed down through generations. The intricate Kundan work features carefully selected semi-precious stones set in pure silver, creating a piece that radiates elegance and sophistication. The set includes a statement necklace and matching earrings, both designed to complement traditional and contemporary attire.',
    highlights: [
      'Pure 925 sterling silver construction',
      'Authentic Kundan work with semi-precious stones',
      'Handcrafted by master jewelry artisans',
      'Anti-tarnish rhodium plating',
      'Includes matching earrings',
      'Adjustable chain length',
      'Comes with authenticity certificate',
      'Perfect for weddings and festivals'
    ],
    images: [
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&h=800&fit=crop'
    ],
    rating: 4.8,
    reviewCount: 156,
    inStock: true,
    category: 'Kundan Jewelry',
    artisan: 'Master Craftsman Rajesh Kumar',
    artisanExperience: '25+ years',
    origin: 'Jaipur, Rajasthan',
    materials: ['925 Sterling Silver', 'Kundan Stones', 'Semi-precious Gems', 'Rhodium Plating'],
    sizeOptions: ['Small', 'Medium', 'Large'],
    specifications: {
      metal: '925 Sterling Silver',
      plating: 'Rhodium Anti-tarnish',
      necklaceLength: '16-18 inches (adjustable)',
      earringLength: '2.5 inches',
      weight: '85 grams',
      stoneType: 'Kundan & Semi-precious',
      closure: 'Secure lobster clasp'
    },
    careInstructions: [
      'Store in provided jewelry box',
      'Clean with soft jewelry cloth',
      'Avoid contact with perfumes and chemicals',
      'Remove before swimming or bathing',
      'Professional cleaning recommended annually'
    ],
    occasions: ['Weddings', 'Festivals', 'Parties', 'Traditional Ceremonies', 'Special Occasions']
  };

  const reviews = [
    {
      id: '1',
      name: 'Kavya Patel',
      rating: 5,
      date: '2024-01-25',
      comment: 'Absolutely stunning necklace set! The Kundan work is exquisite and the silver quality is top-notch. Wore it to my cousin\'s wedding and everyone was asking where I got it from. The craftsmanship is incredible!',
      verified: true,
      occasion: 'Wedding'
    },
    {
      id: '2',
      name: 'Riya Sharma',
      rating: 5,
      date: '2024-01-23',
      comment: 'This is my second purchase from this collection. The attention to detail is remarkable and the stones are beautifully set. The anti-tarnish coating really works - still looks brand new after months of wear.',
      verified: true,
      occasion: 'Festival'
    },
    {
      id: '3',
      name: 'Sneha Gupta',
      rating: 4,
      date: '2024-01-20',
      comment: 'Beautiful jewelry set with traditional appeal. The weight feels substantial and the design is elegant. Only minor issue was the earrings were slightly heavier than expected, but overall very happy with the purchase.',
      verified: true,
      occasion: 'Party'
    },
    {
      id: '4',
      name: 'Anjali Singh',
      rating: 5,
      date: '2024-01-18',
      comment: 'Heirloom quality jewelry! The Kundan work is authentic and the silver is pure. This will definitely be passed down to my daughter. Excellent packaging and fast delivery too.',
      verified: true,
      occasion: 'Traditional Ceremony'
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
            <Link to="/shop/jewelry" className="text-deep-espresso hover:text-terracotta-brown">Jewelry</Link>
            <span className="text-deep-espresso opacity-50">/</span>
            <span className="text-deep-espresso opacity-75">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-square bg-white rounded-lg overflow-hidden shadow-lg">
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
              <div className="absolute top-4 left-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center space-x-1">
                <SparklesIcon className="h-4 w-4" />
                <span>925 Silver</span>
              </div>

              {/* Gift Box Badge */}
              <div className="absolute top-4 right-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center space-x-1">
                <GiftIcon className="h-4 w-4" />
                <span>Gift Box</span>
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

            {/* Artisan Information */}
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg border border-purple-200">
              <h3 className="font-semibold text-deep-espresso mb-2">💎 Handcrafted by Master Artisan</h3>
              <p className="text-sm text-deep-espresso opacity-75">
                <strong>{product.artisan}</strong> - {product.artisanExperience} of traditional Kundan jewelry making
              </p>
              <p className="text-sm text-deep-espresso opacity-75">Origin: {product.origin}</p>
            </div>

            {/* Jewelry Specifications */}
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <h3 className="font-semibold text-deep-espresso mb-3">Jewelry Specifications</h3>
              <div className="grid grid-cols-1 gap-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-deep-espresso opacity-75">Metal:</span>
                  <span className="font-medium">{product.specifications.metal}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-deep-espresso opacity-75">Plating:</span>
                  <span className="font-medium">{product.specifications.plating}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-deep-espresso opacity-75">Necklace Length:</span>
                  <span className="font-medium">{product.specifications.necklaceLength}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-deep-espresso opacity-75">Weight:</span>
                  <span className="font-medium">{product.specifications.weight}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-deep-espresso opacity-75">Stone Type:</span>
                  <span className="font-medium">{product.specifications.stoneType}</span>
                </div>
              </div>
            </div>

            {/* Size Selection */}
            <div>
              <h3 className="font-semibold text-deep-espresso mb-3">Size</h3>
              <div className="grid grid-cols-3 gap-3">
                {product.sizeOptions.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`p-3 rounded-lg border-2 text-sm font-medium transition-all duration-200 ${
                      selectedSize === size
                        ? 'border-terracotta-brown bg-terracotta-brown text-white'
                        : 'border-gray-200 text-deep-espresso hover:border-terracotta-brown'
                    }`}
                  >
                    {size}
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
                    className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium"
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
                  onClick={() => alert('Proceeding to checkout with Silver Temple Jewelry')}
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
                <span className="text-sm text-deep-espresso">Free insured shipping on all jewelry</span>
              </div>
              <div className="flex items-center space-x-3">
                <ShieldCheckIcon className="h-5 w-5 text-terracotta-brown" />
                <span className="text-sm text-deep-espresso">30-day return policy with authenticity guarantee</span>
              </div>
              <div className="flex items-center space-x-3">
                <GiftIcon className="h-5 w-5 text-terracotta-brown" />
                <span className="text-sm text-deep-espresso">Complimentary gift wrapping available</span>
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
                Kundan Tradition
              </button>
            </nav>
          </div>
          
          <div className="py-8">
            <div className="prose max-w-none">
              <p className="text-deep-espresso leading-relaxed mb-6">{product.longDescription}</p>
              
              <h3 className="font-playfair text-xl font-semibold text-deep-espresso mb-4">Jewelry Features</h3>
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

export default JewelryProductPage;