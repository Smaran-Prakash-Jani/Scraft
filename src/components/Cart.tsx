import React from 'react';
import { useCart } from '../contexts/CartContext';
import { Link } from 'react-router-dom';

const Cart: React.FC = () => {
  const { state, removeItem, updateQuantity, clearCart, closeCart } = useCart();

  const formatPrice = (price: number): string => {
    return `₹${price.toLocaleString('en-IN')}`;
  };

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity < 1) {
      removeItem(id);
    } else {
      updateQuantity(id, newQuantity);
    }
  };

  const handleCheckout = () => {
    // Navigate to checkout page
    closeCart();
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${
          state.isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={closeCart}
      />
      
      {/* Cart Sidebar */}
      <div 
        className={`fixed right-0 top-0 h-full w-96 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
          state.isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">
              Shopping Cart ({state.totalItems})
            </h2>
            <button
              onClick={closeCart}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
            >
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-6">
            {state.items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Your cart is empty</h3>
                <p className="text-gray-500 mb-6">Add some beautiful handcrafted items to get started!</p>
                <button
                  onClick={closeCart}
                  className="bg-amber-600 text-white px-6 py-2 rounded-lg hover:bg-amber-700 transition-colors duration-200"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {state.items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-gray-900 truncate">{item.name}</h4>
                      <p className="text-sm text-gray-500 capitalize">{item.category}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-sm font-semibold text-gray-900">{item.price}</span>
                        {item.originalPrice && (
                          <span className="text-xs text-gray-500 line-through">{item.originalPrice}</span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                        className="w-8 h-8 flex items-center justify-center bg-white border border-gray-300 rounded-full hover:bg-gray-50 transition-colors duration-200"
                      >
                        <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                        </svg>
                      </button>
                      <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                      <button
                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center bg-white border border-gray-300 rounded-full hover:bg-gray-50 transition-colors duration-200"
                      >
                        <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                      </button>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors duration-200"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {state.items.length > 0 && (
            <div className="border-t border-gray-200 p-6 space-y-4">
              {/* Clear Cart Button */}
              <button
                onClick={clearCart}
                className="w-full text-sm text-red-600 hover:text-red-700 transition-colors duration-200"
              >
                Clear Cart
              </button>
              
              {/* Total */}
              <div className="flex justify-between items-center text-lg font-semibold">
                <span>Total:</span>
                <span>{formatPrice(state.totalPrice)}</span>
              </div>
              
              {/* Action Buttons */}
              <div className="space-y-3">
                <Link
                  to="/checkout"
                  onClick={handleCheckout}
                  className="w-full bg-amber-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-amber-700 transition-colors duration-200 text-center block"
                >
                  Proceed to Checkout
                </Link>
                <button
                  onClick={closeCart}
                  className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors duration-200"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;