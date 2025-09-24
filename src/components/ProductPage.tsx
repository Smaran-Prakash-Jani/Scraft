import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeftIcon, ChevronRightIcon, StarIcon, HeartIcon, ShareIcon, ShoppingCartIcon } from '@heroicons/react/24/outline';
import { StarIcon as StarSolidIcon, HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';
import { useCart } from '../contexts/CartContext';

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  description: string;
  highlights: string[];
  images: string[];
  rating: number;
  reviewCount: number;
  inStock: boolean;
  category: string;
  materials: string[];
  dimensions?: string;
  weight?: string;
}

interface Review {
  id: string;
  name: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
}

// Sample product data - in a real app, this would come from an API
const sampleProducts: { [key: string]: Product } = {
  'ceramic-vase-1': {
    id: 'ceramic-vase-1',
    name: 'Handcrafted Ceramic Vase',
    price: 2499,
    originalPrice: 3199,
    description: 'A beautiful handcrafted ceramic vase made by skilled artisans using traditional techniques passed down through generations. Each piece is unique with subtle variations that make it truly one-of-a-kind.',
    highlights: [
      'Handcrafted by skilled artisans',
      'Made from high-quality ceramic',
      'Unique traditional design patterns',
      'Perfect for home decoration',
      'Eco-friendly and sustainable'
    ],
    images: [
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=600&h=600&fit=crop'
    ],
    rating: 4.8,
    reviewCount: 127,
    inStock: true,
    category: 'Pots & Ceramics',
    materials: ['High-grade ceramic', 'Natural glazes'],
    dimensions: '25cm H x 15cm W',
    weight: '800g'
  },
  'silk-saree-1': {
    id: 'silk-saree-1',
    name: 'Traditional Silk Saree',
    price: 8999,
    originalPrice: 12999,
    description: 'Exquisite handwoven silk saree with intricate traditional patterns. Made by master weavers using pure silk threads and traditional techniques.',
    highlights: [
      'Pure silk fabric',
      'Handwoven by master artisans',
      'Traditional zari work',
      'Rich vibrant colors',
      'Perfect for special occasions'
    ],
    images: [
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=600&h=600&fit=crop'
    ],
    rating: 4.9,
    reviewCount: 89,
    inStock: true,
    category: 'Sarees',
    materials: ['Pure silk', 'Zari threads'],
    dimensions: '6.5 meters length',
    weight: '650g'
  },
  'wooden-toy-1': {
    id: 'wooden-toy-1',
    name: 'Handcrafted Wooden Toy Set',
    price: 1299,
    originalPrice: 1799,
    description: 'Beautiful set of handcrafted wooden toys made from sustainable wood. Safe, non-toxic, and perfect for children\'s development.',
    highlights: [
      'Made from sustainable wood',
      'Non-toxic natural finish',
      'Promotes creativity and learning',
      'Handcrafted with love',
      'Safe for children'
    ],
    images: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=600&h=600&fit=crop'
    ],
    rating: 4.7,
    reviewCount: 156,
    inStock: true,
    category: 'Toys',
    materials: ['Sustainable wood', 'Natural finish'],
    dimensions: '20cm x 15cm x 10cm',
    weight: '500g'
  },
  'silver-jewelry-1': {
    id: 'silver-jewelry-1',
    name: 'Traditional Silver Necklace',
    price: 4599,
    originalPrice: 5999,
    description: 'Elegant traditional silver necklace with intricate filigree work. Handcrafted by skilled silversmiths using pure silver.',
    highlights: [
      'Pure 925 silver',
      'Traditional filigree work',
      'Handcrafted by master artisans',
      'Antique finish',
      'Comes with authenticity certificate'
    ],
    images: [
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=600&h=600&fit=crop'
    ],
    rating: 4.8,
    reviewCount: 73,
    inStock: true,
    category: 'Jewelry',
    materials: ['925 Silver', 'Traditional techniques'],
    dimensions: '45cm length',
    weight: '35g'
  },
  'home-decor-1': {
    id: 'home-decor-1',
    name: 'Handwoven Wall Hanging',
    price: 1899,
    originalPrice: 2499,
    description: 'Beautiful handwoven wall hanging made from natural fibers. Perfect for adding a traditional touch to your home decor.',
    highlights: [
      'Handwoven natural fibers',
      'Traditional patterns',
      'Eco-friendly materials',
      'Unique artistic design',
      'Perfect for wall decoration'
    ],
    images: [
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=600&h=600&fit=crop'
    ],
    rating: 4.6,
    reviewCount: 94,
    inStock: true,
    category: 'Home Decor',
    materials: ['Natural fibers', 'Cotton threads'],
    dimensions: '60cm x 40cm',
    weight: '300g'
  },
  'leather-bag-1': {
    id: 'leather-bag-1',
    name: 'Handcrafted Leather Bag',
    price: 3299,
    originalPrice: 4199,
    description: 'Premium handcrafted leather bag made from genuine leather. Perfect blend of traditional craftsmanship and modern design.',
    highlights: [
      'Genuine leather material',
      'Handcrafted with precision',
      'Durable and long-lasting',
      'Multiple compartments',
      'Traditional stitching techniques'
    ],
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=600&h=600&fit=crop'
    ],
    rating: 4.7,
    reviewCount: 112,
    inStock: true,
    category: 'Bags',
    materials: ['Genuine leather', 'Cotton lining'],
    dimensions: '35cm x 25cm x 15cm',
    weight: '800g'
  }
};

const sampleReviews: Review[] = [
  {
    id: '1',
    name: 'Priya Sharma',
    rating: 5,
    date: '2024-01-15',
    comment: 'Absolutely beautiful! The craftsmanship is exceptional and it looks even better in person. Perfect addition to my living room.',
    verified: true
  },
  {
    id: '2',
    name: 'Rajesh Kumar',
    rating: 5,
    date: '2024-01-10',
    comment: 'Amazing quality and fast delivery. The vase is exactly as described and the packaging was excellent. Highly recommended!',
    verified: true
  },
  {
    id: '3',
    name: 'Anita Patel',
    rating: 4,
    date: '2024-01-08',
    comment: 'Beautiful piece of art. The colors are vibrant and the finish is smooth. Only minor issue was a small chip, but customer service was very helpful.',
    verified: true
  },
  {
    id: '4',
    name: 'Vikram Singh',
    rating: 5,
    date: '2024-01-05',
    comment: 'Bought this as a gift for my mother and she absolutely loves it! The traditional design is stunning and the quality is top-notch.',
    verified: true
  },
  {
    id: '5',
    name: 'Meera Joshi',
    rating: 4,
    date: '2024-01-02',
    comment: 'Great product overall. The vase is well-made and looks elegant. Delivery was on time and packaging was secure.',
    verified: false
  }
];

const ProductPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const { addItem, openCart } = useCart();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  // In a real app, you'd fetch the product data based on productId
  const product = sampleProducts[productId || 'ceramic-vase-1'] || sampleProducts['ceramic-vase-1'];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  const handleBuyNow = () => {
    // In a real app, this would handle the purchase flow
    alert(`Proceeding to checkout with ${quantity} x ${product.name}`);
  };

  const handleAddToCart = () => {
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
  };

  const renderStars = (rating: number, size: 'sm' | 'md' = 'sm') => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const sizeClass = size === 'sm' ? 'w-4 h-4' : 'w-5 h-5';

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <StarSolidIcon key={i} className={`${sizeClass} text-yellow-400`} />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <div key="half" className={`${sizeClass} relative`}>
          <StarIcon className={`${sizeClass} text-yellow-400 absolute`} />
          <StarSolidIcon className={`${sizeClass} text-yellow-400`} style={{ clipPath: 'inset(0 50% 0 0)' }} />
        </div>
      );
    }

    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(
        <StarIcon key={`empty-${i}`} className={`${sizeClass} text-gray-300`} />
      );
    }

    return stars;
  };

  return (
    <div className="min-h-screen bg-cream-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center space-x-2 text-sm">
            <Link to="/" className="text-gray-500 hover:text-espresso-600">Home</Link>
            <span className="text-gray-400">/</span>
            <Link to="/shop" className="text-gray-500 hover:text-espresso-600">Shop</Link>
            <span className="text-gray-400">/</span>
            <Link to={`/shop/${product.category.toLowerCase().replace(/\s+/g, '-').replace('&', '')}`} className="text-gray-500 hover:text-espresso-600">
              {product.category}
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-espresso-600 font-medium">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-square bg-white rounded-lg overflow-hidden shadow-lg">
              <img
                src={product.images[currentImageIndex]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              
              {/* Navigation Arrows */}
              {product.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md transition-all"
                  >
                    <ChevronLeftIcon className="w-6 h-6 text-espresso-600" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md transition-all"
                  >
                    <ChevronRightIcon className="w-6 h-6 text-espresso-600" />
                  </button>
                </>
              )}

              {/* Image Indicators */}
              {product.images.length > 1 && (
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {product.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-3 h-3 rounded-full transition-all ${
                        index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Thumbnail Images */}
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                      index === currentImageIndex ? 'border-terracotta-500' : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} view ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            {/* Title and Rating */}
            <div>
              <h1 className="text-3xl font-bold text-espresso-800 mb-2">{product.name}</h1>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  {renderStars(product.rating, 'md')}
                  <span className="text-lg font-medium text-espresso-700 ml-2">{product.rating}</span>
                </div>
                <span className="text-gray-500">({product.reviewCount} reviews)</span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-center space-x-4">
              <span className="text-3xl font-bold text-terracotta-600">₹{product.price.toLocaleString()}</span>
              {product.originalPrice && (
                <span className="text-xl text-gray-500 line-through">₹{product.originalPrice.toLocaleString()}</span>
              )}
              {product.originalPrice && (
                <span className="bg-terracotta-100 text-terracotta-800 px-2 py-1 rounded-md text-sm font-medium">
                  {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                </span>
              )}
            </div>

            {/* Stock Status */}
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${product.inStock ? 'bg-green-500' : 'bg-red-500'}`} />
              <span className={`font-medium ${product.inStock ? 'text-green-700' : 'text-red-700'}`}>
                {product.inStock ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>

            {/* Highlighted Features */}
            <div className="bg-terracotta-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-espresso-800 mb-3">Key Features</h3>
              <ul className="space-y-2">
                {product.highlights.map((highlight, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <span className="text-terracotta-600 mt-1">•</span>
                    <span className="text-espresso-700">{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quantity and Actions */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <label className="text-sm font-medium text-espresso-700">Quantity:</label>
                <div className="flex items-center border border-gray-300 rounded-md">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 text-espresso-600 hover:bg-gray-50"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 border-x border-gray-300">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 text-espresso-600 hover:bg-gray-50"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={handleBuyNow}
                  disabled={!product.inStock}
                  className="flex-1 bg-terracotta-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-terracotta-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                >
                  Buy Now
                </button>
                <button
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className="flex-1 border-2 border-terracotta-600 text-terracotta-600 py-3 px-6 rounded-lg font-semibold hover:bg-terracotta-50 disabled:border-gray-400 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
                >
                  <ShoppingCartIcon className="w-5 h-5" />
                  <span>Add to Cart</span>
                </button>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className="flex items-center space-x-2 text-espresso-600 hover:text-terracotta-600 transition-colors"
                >
                  {isWishlisted ? (
                    <HeartSolidIcon className="w-5 h-5 text-red-500" />
                  ) : (
                    <HeartIcon className="w-5 h-5" />
                  )}
                  <span>Add to Wishlist</span>
                </button>
                <button className="flex items-center space-x-2 text-espresso-600 hover:text-terracotta-600 transition-colors">
                  <ShareIcon className="w-5 h-5" />
                  <span>Share</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Product Description and Details */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <div>
              <h2 className="text-2xl font-bold text-espresso-800 mb-4">Description</h2>
              <p className="text-espresso-700 leading-relaxed">{product.description}</p>
            </div>

            {/* Product Details */}
            <div>
              <h2 className="text-2xl font-bold text-espresso-800 mb-4">Product Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-espresso-700 mb-2">Materials</h4>
                  <ul className="space-y-1">
                    {product.materials.map((material, index) => (
                      <li key={index} className="text-espresso-600">• {material}</li>
                    ))}
                  </ul>
                </div>
                {product.dimensions && (
                  <div>
                    <h4 className="font-semibold text-espresso-700 mb-2">Dimensions</h4>
                    <p className="text-espresso-600">{product.dimensions}</p>
                  </div>
                )}
                {product.weight && (
                  <div>
                    <h4 className="font-semibold text-espresso-700 mb-2">Weight</h4>
                    <p className="text-espresso-600">{product.weight}</p>
                  </div>
                )}
                <div>
                  <h4 className="font-semibold text-espresso-700 mb-2">Category</h4>
                  <p className="text-espresso-600">{product.category}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Reviews Section */}
          <div>
            <h2 className="text-2xl font-bold text-espresso-800 mb-6">Customer Reviews</h2>
            
            {/* Rating Summary */}
            <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-espresso-800 mb-2">{product.rating}</div>
                <div className="flex justify-center items-center space-x-1 mb-2">
                  {renderStars(product.rating, 'md')}
                </div>
                <div className="text-gray-600">{product.reviewCount} reviews</div>
              </div>
            </div>

            {/* Individual Reviews */}
            <div className="space-y-4">
              {sampleReviews.map((review) => (
                <div key={review.id} className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="font-semibold text-espresso-800">{review.name}</div>
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center space-x-1">
                          {renderStars(review.rating)}
                        </div>
                        {review.verified && (
                          <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Verified</span>
                        )}
                      </div>
                    </div>
                    <div className="text-sm text-gray-500">{review.date}</div>
                  </div>
                  <p className="text-espresso-700 text-sm leading-relaxed">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;