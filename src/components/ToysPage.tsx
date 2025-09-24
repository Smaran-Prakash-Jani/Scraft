import React from 'react';
import CategoryPage from './CategoryPage';

const ToysPage: React.FC = () => {
  const products = [
    {
      id: 1,
      name: "Wooden Elephant Toy",
      price: 320,
      originalPrice: 400,
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
      rating: 4.8,
      reviews: 145,
      description: "Handcrafted wooden elephant toy with intricate carvings",
      inStock: true
    },
    {
      id: 2,
      name: "Traditional Puppet Set",
      price: 650,
      image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=300&fit=crop",
      rating: 4.7,
      reviews: 89,
      description: "Colorful Rajasthani puppet set for storytelling and play",
      inStock: true
    },
    {
      id: 3,
      name: "Wooden Building Blocks",
      price: 450,
      originalPrice: 550,
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
      rating: 4.9,
      reviews: 203,
      description: "Natural wooden building blocks for creative play",
      inStock: true
    },
    {
      id: 4,
      name: "Clay Animal Figurines",
      price: 280,
      image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=300&fit=crop",
      rating: 4.6,
      reviews: 67,
      description: "Set of handmade clay animal figurines",
      inStock: true
    },
    {
      id: 5,
      name: "Wooden Train Set",
      price: 850,
      originalPrice: 1000,
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
      rating: 4.8,
      reviews: 156,
      description: "Eco-friendly wooden train set with multiple cars",
      inStock: true
    },
    {
      id: 6,
      name: "Traditional Board Game",
      price: 380,
      image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=300&fit=crop",
      rating: 4.5,
      reviews: 92,
      description: "Classic Indian board game carved from wood",
      inStock: false
    },
    {
      id: 7,
      name: "Fabric Doll Set",
      price: 520,
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
      rating: 4.7,
      reviews: 78,
      description: "Handmade fabric dolls in traditional Indian attire",
      inStock: true
    },
    {
      id: 8,
      name: "Wooden Puzzle Box",
      price: 420,
      originalPrice: 500,
      image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=300&fit=crop",
      rating: 4.6,
      reviews: 134,
      description: "Intricate wooden puzzle box with hidden compartments",
      inStock: true
    }
  ];

  return (
    <CategoryPage
      categoryName="Toys & Games"
      categoryDescription="Discover our delightful collection of traditional toys and games, handcrafted to inspire creativity and bring joy to children of all ages."
      categoryIcon="🪀"
      products={products}
    />
  );
};

export default ToysPage;