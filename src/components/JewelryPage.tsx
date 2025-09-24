import React from 'react';
import CategoryPage from './CategoryPage';

const JewelryPage: React.FC = () => {
  const products = [
    {
      id: 1,
      name: "Silver Oxidized Necklace",
      price: 1200,
      originalPrice: 1500,
      image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=300&fit=crop",
      rating: 4.8,
      reviews: 167,
      description: "Handcrafted silver oxidized necklace with traditional motifs",
      inStock: true
    },
    {
      id: 2,
      name: "Kundan Earrings",
      price: 850,
      image: "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=400&h=300&fit=crop",
      rating: 4.9,
      reviews: 234,
      description: "Elegant kundan earrings with pearl drops",
      inStock: true
    },
    {
      id: 3,
      name: "Brass Bangles Set",
      price: 450,
      originalPrice: 600,
      image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=300&fit=crop",
      rating: 4.6,
      reviews: 89,
      description: "Set of 6 handcrafted brass bangles with engravings",
      inStock: true
    },
    {
      id: 4,
      name: "Temple Jewelry Set",
      price: 2200,
      originalPrice: 2800,
      image: "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=400&h=300&fit=crop",
      rating: 4.9,
      reviews: 145,
      description: "Complete temple jewelry set with necklace and earrings",
      inStock: true
    },
    {
      id: 5,
      name: "Beaded Bracelet",
      price: 320,
      image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=300&fit=crop",
      rating: 4.5,
      reviews: 76,
      description: "Colorful beaded bracelet with natural stones",
      inStock: true
    },
    {
      id: 6,
      name: "Silver Anklets",
      price: 680,
      originalPrice: 850,
      image: "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=400&h=300&fit=crop",
      rating: 4.7,
      reviews: 123,
      description: "Traditional silver anklets with tiny bells",
      inStock: false
    },
    {
      id: 7,
      name: "Meenakari Ring",
      price: 750,
      image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=300&fit=crop",
      rating: 4.8,
      reviews: 98,
      description: "Beautiful meenakari ring with colorful enamel work",
      inStock: true
    },
    {
      id: 8,
      name: "Pearl Hair Accessories",
      price: 420,
      originalPrice: 520,
      image: "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=400&h=300&fit=crop",
      rating: 4.6,
      reviews: 67,
      description: "Elegant pearl hair accessories for special occasions",
      inStock: true
    }
  ];

  return (
    <CategoryPage
      categoryName="Jewelry & Accessories"
      categoryDescription="Adorn yourself with our exquisite collection of handcrafted jewelry and accessories, featuring traditional designs and precious materials."
      categoryIcon="💍"
      products={products}
    />
  );
};

export default JewelryPage;