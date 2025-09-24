import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeftIcon, ChevronRightIcon, HeartIcon, ShareIcon, ShoppingCartIcon, TruckIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';
import { StarIcon as StarSolidIcon, HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';
import { useCart } from '../contexts/CartContext';

const CeramicProductPage: React.FC = () => {
  const { addItem, openCart } = useCart();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [selectedSize, setSelectedSize] = useState('Medium');

  const product = {
    id: 'ceramic-masterpiece-001',
    name: 'Handcrafted Blue Pottery Vase',
    price: 3499,
    originalPrice: 4999,
    description: 'This exquisite blue pottery vase represents centuries of traditional craftsmanship from Jaipur. Each piece is meticulously hand-painted with intricate floral motifs using natural pigments and fired in traditional kilns. The distinctive blue and white patterns are inspired by Mughal art and Persian influences.',
    longDescription: 'Our master artisans spend over 15 days creating each vase, from shaping the clay to the final glazing process. The unique blue pottery technique uses a special mixture of quartz stone powder, powdered glass, and multani mitti (Fuller\'s earth), making each piece not just beautiful but also durable and unique.',
    highlights: [
      'Authentic Jaipur Blue Pottery technique',
      'Hand-painted intricate floral designs',
      'Made from natural quartz and glass powder',
      'Traditional kiln-fired for durability',
      'Each piece is completely unique',
      'Eco-friendly natural materials',
      'Perfect for home decoration or gifting'
    ],
    images: [
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=800&fit=crop'
    ],
    rating: 4.9,
    reviewCount: 247,
    inStock: true,
    category: 'Blue Pottery',
    artisan: 'Master Craftsman Rajesh Sharma',
    artisanExperience: '25+ years',
    materials: ['Quartz stone powder', 'Powdered glass', 'Multani mitti', 'Natural pigments'],
    sizes: ['Small (15cm)', 'Medium (20cm)', 'Large (25cm)'],
    dimensions: {
      'Small (15cm)': '15cm H x 12cm W',
      'Medium (20cm)': '20cm H x 15cm W', 
      'Large (25cm)': '25cm H x 18cm W'
    } as { [key: string]: string },
    weight: '850g',
    careInstructions: [
      'Clean with soft, dry cloth',
      'Avoid harsh chemicals',
      'Handle with care due to handcrafted nature',
      'Display away from direct sunlight'
    ]
  };

  const reviews = [
    {
      id: '1',
      name: 'Priya Mehta',
      rating: 5,
      date: '2024-01-20',
      comment: 'Absolutely stunning! The blue pottery work is incredible and the attention to detail is remarkable. It\'s become the centerpiece of my living room.',
      verified: true,
      images: ['https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=200&h=200&fit=crop']
    },
    {
      id: '2',
      name: 'Arjun Singh',
      rating: 5,
      date: '2024-01-18',
      comment: 'Bought this as a wedding gift and the couple was thrilled! The craftsmanship is exceptional and you can tell it\'s made with love and skill.',
      verified: true
    },
    {
      id: '3',
      name: 'Kavya Patel',
      rating: 4,
      date: '2024-01-15',
      comment: 'Beautiful piece of art. The blue and white patterns are mesmerizing. Only minor issue was the packaging could be better, but the product itself is perfect.',
      verified: true
    },
    {
      id: '4',
      name: 'Rohit Kumar',
      rating: 5,
      date: '2024-01-12',
      comment: 'This vase exceeded my expectations! The traditional Jaipur blue pottery technique is evident in every detail. Highly recommend for art lovers.',
      verified: true
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
            <Link to="/shop/pots" className="text-deep-espresso hover:text-terracotta-brown">Pots & Ceramics</Link>
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
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-200">
              <h3 className="font-semibold text-deep-espresso mb-2">🎨 Crafted by Master Artisan</h3>
              <p className="text-sm text-deep-espresso opacity-75">
                <strong>{product.artisan}</strong> - {product.artisanExperience} of traditional blue pottery expertise
              </p>
            </div>

            {/* Size Selection */}
            <div>
              <h3 className="font-semibold text-deep-espresso mb-3">Size</h3>
              <div className="grid grid-cols-3 gap-3">
                {product.sizes.map((size) => (
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
              <p className="text-sm text-deep-espresso opacity-75 mt-2">
                Dimensions: {product.dimensions[selectedSize]}
              </p>
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
                  onClick={() => alert('Proceeding to checkout with Traditional Clay Pot')}
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
                <span className="text-sm text-deep-espresso">Free shipping on orders over ₹2000</span>
              </div>
              <div className="flex items-center space-x-3">
                <ShieldCheckIcon className="h-5 w-5 text-terracotta-brown" />
                <span className="text-sm text-deep-espresso">30-day return policy</span>
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
                Materials & Care
              </button>
              <button className="border-b-2 border-transparent text-deep-espresso opacity-75 hover:opacity-100 py-4 px-1 text-sm font-medium">
                Artisan Story
              </button>
            </nav>
          </div>
          
          <div className="py-8">
            <div className="prose max-w-none">
              <p className="text-deep-espresso leading-relaxed mb-6">{product.longDescription}</p>
              
              <h3 className="font-playfair text-xl font-semibold text-deep-espresso mb-4">Key Features</h3>
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
                  {review.images && (
                    <div className="mt-4 flex space-x-2">
                      {review.images.map((image, index) => (
                        <img key={index} src={image} alt="Review" className="w-16 h-16 object-cover rounded-lg" />
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CeramicProductPage;