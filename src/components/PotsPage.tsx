import React from 'react';
import CategoryPage from './CategoryPage';

const PotsPage: React.FC = () => {
  const products = [
    {
      id: 1,
      name: "Handcrafted Terracotta Water Pot",
      price: 450,
      originalPrice: 600,
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
      rating: 4.8,
      reviews: 124,
      description: "Traditional terracotta water pot with natural cooling properties",
      inStock: true
    },
    {
      id: 2,
      name: "Blue Pottery Decorative Vase",
      price: 850,
      image: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=400&h=300&fit=crop",
      rating: 4.6,
      reviews: 89,
      description: "Beautiful blue pottery vase with traditional Jaipur designs",
      inStock: true
    },
    {
      id: 3,
      name: "Clay Cooking Pot Set",
      price: 1200,
      originalPrice: 1500,
      image: "https://images.unsplash.com/photo-1610736341350-1c6c6b4b7e8e?w=400&h=300&fit=crop",
      rating: 4.9,
      reviews: 156,
      description: "Set of 3 clay cooking pots for healthy and flavorful cooking",
      inStock: true
    },
    {
      id: 4,
      name: "Ceramic Tea Set",
      price: 950,
      image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&h=300&fit=crop",
      rating: 4.7,
      reviews: 203,
      description: "Elegant ceramic tea set with traditional Indian motifs",
      inStock: true
    },
    {
      id: 5,
      name: "Handmade Pottery Bowls",
      price: 320,
      originalPrice: 400,
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
      rating: 4.5,
      reviews: 78,
      description: "Set of 4 handmade pottery bowls perfect for serving",
      inStock: true
    },
    {
      id: 6,
      name: "Traditional Matka",
      price: 280,
      image: "https://images.unsplash.com/photo-1610736341350-1c6c6b4b7e8e?w=400&h=300&fit=crop",
      rating: 4.8,
      reviews: 145,
      description: "Traditional clay matka for storing and cooling water",
      inStock: false
    },
    {
      id: 7,
      name: "Ceramic Dinner Plates Set",
      price: 1100,
      image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&h=300&fit=crop",
      rating: 4.6,
      reviews: 92,
      description: "Set of 6 ceramic dinner plates with hand-painted designs",
      inStock: true
    },
    {
      id: 8,
      name: "Decorative Ceramic Planters",
      price: 650,
      originalPrice: 800,
      image: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=400&h=300&fit=crop",
      rating: 4.4,
      reviews: 67,
      description: "Beautiful ceramic planters for indoor and outdoor plants",
      inStock: true
    }
  ];

  return (
    <CategoryPage
      categoryName="Pots & Ceramics"
      categoryDescription="Discover our exquisite collection of handcrafted pottery and ceramics, made by skilled artisans using traditional techniques passed down through generations."
      categoryIcon="🏺"
      products={products}
    />
  );
};

export default PotsPage;