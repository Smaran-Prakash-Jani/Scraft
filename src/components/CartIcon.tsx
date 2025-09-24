import React from 'react';
import { useCart } from '../contexts/CartContext';

const CartIcon: React.FC = () => {
  const { state, toggleCart } = useCart();

  return (
    <button
      onClick={toggleCart}
      className="relative p-2 text-gray-700 hover:text-amber-600 transition-colors duration-200"
      aria-label="Shopping Cart"
    >
      <svg 
        className="w-6 h-6" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" 
        />
      </svg>
      
      {/* Item Count Badge */}
      {state.totalItems > 0 && (
        <span className="absolute -top-1 -right-1 bg-amber-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
          {state.totalItems > 99 ? '99+' : state.totalItems}
        </span>
      )}
    </button>
  );
};

export default CartIcon;