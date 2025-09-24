import React from 'react';
import CategoryPage from './CategoryPage';

const SareesPage: React.FC = () => {
  const products = [
    {
      id: 1,
      name: "Banarasi Silk Saree",
      price: 2500,
      originalPrice: 3200,
      image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&h=300&fit=crop",
      rating: 4.9,
      reviews: 234,
      description: "Luxurious Banarasi silk saree with intricate gold zari work",
      inStock: true
    },
    {
      id: 2,
      name: "Handloom Cotton Saree",
      price: 850,
      image: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=400&h=300&fit=crop",
      rating: 4.7,
      reviews: 189,
      description: "Pure handloom cotton saree with traditional block prints",
      inStock: true
    },
    {
      id: 3,
      name: "Kanjivaram Silk Saree",
      price: 3200,
      originalPrice: 4000,
      image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&h=300&fit=crop",
      rating: 4.8,
      reviews: 156,
      description: "Authentic Kanjivaram silk saree with temple border design",
      inStock: true
    },
    {
      id: 4,
      name: "Chanderi Silk Saree",
      price: 1800,
      image: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=400&h=300&fit=crop",
      rating: 4.6,
      reviews: 143,
      description: "Elegant Chanderi silk saree with delicate motifs",
      inStock: true
    },
    {
      id: 5,
      name: "Tussar Silk Saree",
      price: 1200,
      originalPrice: 1500,
      image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&h=300&fit=crop",
      rating: 4.5,
      reviews: 98,
      description: "Natural tussar silk saree with hand-painted designs",
      inStock: true
    },
    {
      id: 6,
      name: "Khadi Cotton Saree",
      price: 650,
      image: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=400&h=300&fit=crop",
      rating: 4.4,
      reviews: 87,
      description: "Eco-friendly khadi cotton saree with natural dyes",
      inStock: false
    },
    {
      id: 7,
      name: "Bandhani Georgette Saree",
      price: 950,
      image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&h=300&fit=crop",
      rating: 4.7,
      reviews: 112,
      description: "Vibrant bandhani georgette saree from Gujarat",
      inStock: true
    },
    {
      id: 8,
      name: "Ikat Silk Saree",
      price: 1600,
      originalPrice: 2000,
      image: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=400&h=300&fit=crop",
      rating: 4.6,
      reviews: 76,
      description: "Traditional ikat silk saree with geometric patterns",
      inStock: true
    }
  ];

  return (
    <CategoryPage
      categoryName="Sarees & Textiles"
      categoryDescription="Explore our stunning collection of handwoven sarees and textiles, showcasing the rich heritage of Indian craftsmanship and timeless elegance."
      categoryIcon="🥻"
      products={products}
    />
  );
};

export default SareesPage;