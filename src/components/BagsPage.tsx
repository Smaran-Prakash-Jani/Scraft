import React from 'react';
import CategoryPage from './CategoryPage';

const BagsPage: React.FC = () => {
  const products = [
    {
      id: 1,
      name: "Leather Crossbody Bag",
      price: 1200,
      originalPrice: 1500,
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop",
      rating: 4.8,
      reviews: 189,
      description: "Handcrafted leather crossbody bag with traditional embossing",
      inStock: true
    },
    {
      id: 2,
      name: "Jute Tote Bag",
      price: 450,
      image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=300&fit=crop",
      rating: 4.6,
      reviews: 134,
      description: "Eco-friendly jute tote bag with colorful prints",
      inStock: true
    },
    {
      id: 3,
      name: "Embroidered Clutch",
      price: 850,
      originalPrice: 1100,
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop",
      rating: 4.9,
      reviews: 167,
      description: "Elegant embroidered clutch perfect for special occasions",
      inStock: true
    },
    {
      id: 4,
      name: "Canvas Messenger Bag",
      price: 950,
      image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=300&fit=crop",
      rating: 4.7,
      reviews: 98,
      description: "Durable canvas messenger bag with leather accents",
      inStock: true
    },
    {
      id: 5,
      name: "Beaded Evening Purse",
      price: 680,
      originalPrice: 850,
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop",
      rating: 4.5,
      reviews: 76,
      description: "Handbeaded evening purse with intricate patterns",
      inStock: true
    },
    {
      id: 6,
      name: "Woven Basket Bag",
      price: 520,
      image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=300&fit=crop",
      rating: 4.4,
      reviews: 89,
      description: "Natural woven basket bag perfect for beach or market",
      inStock: false
    },
    {
      id: 7,
      name: "Leather Wallet",
      price: 420,
      originalPrice: 550,
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop",
      rating: 4.8,
      reviews: 145,
      description: "Handcrafted leather wallet with multiple compartments",
      inStock: true
    },
    {
      id: 8,
      name: "Silk Potli Bag",
      price: 380,
      image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=300&fit=crop",
      rating: 4.6,
      reviews: 123,
      description: "Traditional silk potli bag with drawstring closure",
      inStock: true
    }
  ];

  return (
    <CategoryPage
      categoryName="Bags & Purses"
      categoryDescription="Carry your essentials in style with our collection of handcrafted bags and purses, featuring traditional techniques and contemporary designs."
      categoryIcon="👜"
      products={products}
    />
  );
};

export default BagsPage;