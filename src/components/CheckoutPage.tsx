import React, { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import { Link } from 'react-router-dom';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  paymentMethod: 'card' | 'upi' | 'cod';
  cardNumber?: string;
  expiryDate?: string;
  cvv?: string;
  upiId?: string;
}

interface FormErrors {
  [key: string]: string;
}

const CheckoutPage: React.FC = () => {
  const { state, clearCart } = useCart();
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    paymentMethod: 'card'
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const formatPrice = (price: number): string => {
    return `₹${price.toLocaleString('en-IN')}`;
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    else if (!/^\d{10}$/.test(formData.phone)) newErrors.phone = 'Phone number must be 10 digits';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.state.trim()) newErrors.state = 'State is required';
    if (!formData.pincode.trim()) newErrors.pincode = 'Pincode is required';
    else if (!/^\d{6}$/.test(formData.pincode)) newErrors.pincode = 'Pincode must be 6 digits';

    if (formData.paymentMethod === 'card') {
      if (!formData.cardNumber?.trim()) newErrors.cardNumber = 'Card number is required';
      else if (!/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, ''))) newErrors.cardNumber = 'Card number must be 16 digits';
      if (!formData.expiryDate?.trim()) newErrors.expiryDate = 'Expiry date is required';
      if (!formData.cvv?.trim()) newErrors.cvv = 'CVV is required';
      else if (!/^\d{3}$/.test(formData.cvv)) newErrors.cvv = 'CVV must be 3 digits';
    }

    if (formData.paymentMethod === 'upi') {
      if (!formData.upiId?.trim()) newErrors.upiId = 'UPI ID is required';
      else if (!/^[\w.-]+@[\w.-]+$/.test(formData.upiId)) newErrors.upiId = 'Invalid UPI ID format';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsProcessing(true);
    
    // Simulate order processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setOrderPlaced(true);
    clearCart();
    setIsProcessing(false);
  };

  if (state.items.length === 0 && !orderPlaced) {
    return (
      <div className="min-h-screen bg-warm-cream flex items-center justify-center">
        <div className="text-center">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">Add some items to your cart before checking out</p>
          <Link
            to="/shop"
            className="bg-amber-600 text-white px-6 py-3 rounded-lg hover:bg-amber-700 transition-colors duration-200"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-warm-cream flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Order Placed Successfully!</h2>
          <p className="text-gray-600 mb-6">Thank you for your purchase. You will receive a confirmation email shortly.</p>
          <div className="space-y-3">
            <Link
              to="/shop"
              className="block w-full bg-amber-600 text-white py-3 px-6 rounded-lg hover:bg-amber-700 transition-colors duration-200"
            >
              Continue Shopping
            </Link>
            <Link
              to="/"
              className="block w-full bg-gray-100 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-200 transition-colors duration-200"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-warm-cream py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
          <nav className="flex mt-2" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2">
              <li><Link to="/" className="text-gray-500 hover:text-gray-700">Home</Link></li>
              <li><span className="text-gray-500">/</span></li>
              <li><Link to="/shop" className="text-gray-500 hover:text-gray-700">Shop</Link></li>
              <li><span className="text-gray-500">/</span></li>
              <li><span className="text-gray-900">Checkout</span></li>
            </ol>
          </nav>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Checkout Form */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-6">Shipping Information</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Personal Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                      errors.firstName ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                      errors.lastName ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                      errors.phone ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                </div>
              </div>

              {/* Address */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  rows={3}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                    errors.address ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                      errors.city ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                      errors.state ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Pincode</label>
                  <input
                    type="text"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                      errors.pincode ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.pincode && <p className="text-red-500 text-xs mt-1">{errors.pincode}</p>}
                </div>
              </div>

              {/* Payment Method */}
              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-4">Payment Method</h3>
                <div className="space-y-3">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="card"
                      checked={formData.paymentMethod === 'card'}
                      onChange={handleInputChange}
                      className="mr-3"
                    />
                    <span>Credit/Debit Card</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="upi"
                      checked={formData.paymentMethod === 'upi'}
                      onChange={handleInputChange}
                      className="mr-3"
                    />
                    <span>UPI</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={formData.paymentMethod === 'cod'}
                      onChange={handleInputChange}
                      className="mr-3"
                    />
                    <span>Cash on Delivery</span>
                  </label>
                </div>

                {/* Card Details */}
                {formData.paymentMethod === 'card' && (
                  <div className="mt-4 space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                      <input
                        type="text"
                        name="cardNumber"
                        value={formData.cardNumber || ''}
                        onChange={handleInputChange}
                        placeholder="1234 5678 9012 3456"
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                          errors.cardNumber ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {errors.cardNumber && <p className="text-red-500 text-xs mt-1">{errors.cardNumber}</p>}
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                        <input
                          type="text"
                          name="expiryDate"
                          value={formData.expiryDate || ''}
                          onChange={handleInputChange}
                          placeholder="MM/YY"
                          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                            errors.expiryDate ? 'border-red-500' : 'border-gray-300'
                          }`}
                        />
                        {errors.expiryDate && <p className="text-red-500 text-xs mt-1">{errors.expiryDate}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                        <input
                          type="text"
                          name="cvv"
                          value={formData.cvv || ''}
                          onChange={handleInputChange}
                          placeholder="123"
                          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                            errors.cvv ? 'border-red-500' : 'border-gray-300'
                          }`}
                        />
                        {errors.cvv && <p className="text-red-500 text-xs mt-1">{errors.cvv}</p>}
                      </div>
                    </div>
                  </div>
                )}

                {/* UPI Details */}
                {formData.paymentMethod === 'upi' && (
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">UPI ID</label>
                    <input
                      type="text"
                      name="upiId"
                      value={formData.upiId || ''}
                      onChange={handleInputChange}
                      placeholder="yourname@upi"
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                        errors.upiId ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.upiId && <p className="text-red-500 text-xs mt-1">{errors.upiId}</p>}
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full bg-amber-600 text-white py-3 px-6 rounded-lg hover:bg-amber-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed mt-6"
              >
                {isProcessing ? 'Processing...' : `Place Order - ${formatPrice(state.totalPrice)}`}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-lg shadow-md p-6 h-fit">
            <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6">
              {state.items.map((item) => (
                <div key={item.id} className="flex items-center space-x-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{item.name}</h4>
                    <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{item.price}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t pt-4 space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{formatPrice(state.totalPrice)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>{formatPrice(state.totalPrice * 0.18)}</span>
              </div>
              <div className="border-t pt-2 flex justify-between text-lg font-semibold">
                <span>Total</span>
                <span>{formatPrice(state.totalPrice + (state.totalPrice * 0.18))}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;