import React from 'react';
import CategoryPage from './CategoryPage';

const HomeDecorPage: React.FC = () => {
  const products = [
    {
      id: 1,
      name: "Brass Wall Hanging",
      price: 950,
      originalPrice: 1200,
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
      rating: 4.8,
      reviews: 134,
      description: "Intricate brass wall hanging with traditional patterns",
      inStock: true
    },
    {
      id: 2,
      name: "Wooden Mirror Frame",
      price: 1200,
      image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=300&fit=crop",
      rating: 4.7,
      reviews: 89,
      description: "Hand-carved wooden mirror frame with floral motifs",
      inStock: true
    },
    {
      id: 3,
      name: "Ceramic Table Lamp",
      price: 850,
      originalPrice: 1100,
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
      rating: 4.6,
      reviews: 156,
      description: "Beautiful ceramic table lamp with hand-painted designs",
      inStock: true
    },
    {
      id: 4,
      name: "Jute Wall Art",
      price: 420,
      image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=300&fit=crop",
      rating: 4.5,
      reviews: 67,
      description: "Eco-friendly jute wall art with natural textures",
      inStock: true
    },
    {
      id: 5,
      name: "Copper Decorative Bowl",
      price: 680,
      originalPrice: 850,
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
      rating: 4.8,
      reviews: 123,
      description: "Handcrafted copper bowl with engraved patterns",
      inStock: true
    },
    {
      id: 6,
      name: "Bamboo Wind Chimes",
      price: 320,
      image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=300&fit=crop",
      rating: 4.4,
      reviews: 78,
      description: "Natural bamboo wind chimes with soothing sounds",
      inStock: false
    },
    {
      id: 7,
      name: "Marble Inlay Coasters",
      price: 750,
      originalPrice: 950,
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
      rating: 4.9,
      reviews: 167,
      description: "Set of 6 marble coasters with intricate inlay work",
      inStock: true
    },
    {
      id: 8,
      name: "Handwoven Cushion Covers",
      price: 520,
      image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=300&fit=crop",
      rating: 4.6,
      reviews: 92,
      description: "Set of 4 handwoven cushion covers with ethnic prints",
      inStock: true
    }
  ];

  return (
    <CategoryPage
      categoryName="Home Decor"
      categoryDescription="Transform your living space with our beautiful collection of handcrafted home decor items, blending traditional artistry with modern aesthetics."
      categoryIcon="🏠"
      products={products}
    />
  );
};

export default HomeDecorPage;