import React, { useState } from 'react';
import { 
  UserIcon, 
  ShoppingBagIcon, 
  MapPinIcon, 
  CreditCardIcon, 
  ShieldCheckIcon, 
  PhoneIcon, 
  CogIcon,
  ChevronRightIcon,
  PencilIcon,
  PlusIcon,
  TrashIcon,
  XMarkIcon,
  EyeIcon,
  EyeSlashIcon
} from '@heroicons/react/24/outline';

interface Order {
  id: string;
  date: string;
  status: 'delivered' | 'shipped' | 'processing' | 'cancelled';
  total: number;
  items: number;
  image: string;
  productName: string;
  trackingNumber?: string;
}

interface Address {
  id: string;
  type: 'home' | 'work' | 'other';
  name: string;
  street: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
  isDefault: boolean;
}

interface PaymentMethod {
  id: string;
  type: 'card' | 'upi' | 'netbanking';
  name: string;
  details: string;
  isDefault: boolean;
  expiryDate?: string;
}

interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: string;
  profilePicture?: string;
  emailNotifications: boolean;
  smsNotifications: boolean;
  marketingEmails: boolean;
}

interface SecuritySettings {
  password: string;
  lastPasswordChange: string;
  twoFactorEnabled: boolean;
}

const ProfilePage: React.FC = () => {
  const [activeSection, setActiveSection] = useState('orders');
  
  // Editing states
  const [editingAddress, setEditingAddress] = useState<string | null>(null);
  const [editingPayment, setEditingPayment] = useState<string | null>(null);
  const [editingProfile, setEditingProfile] = useState(false);
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [showAddPayment, setShowAddPayment] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);

  
  // Form states
  const [addressForm, setAddressForm] = useState<Partial<Address>>({});
  const [paymentForm, setPaymentForm] = useState<Partial<PaymentMethod>>({});
  const [profileForm, setProfileForm] = useState<UserProfile>({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+91 9876543210',
    dateOfBirth: '1990-01-01',
    gender: 'male',
    emailNotifications: true,
    smsNotifications: true,
    marketingEmails: false
  });
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  // Validation states
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);
  
  // Data states
   const [orders] = useState<Order[]>([
     {
       id: 'ORD001',
       date: '2024-01-15',
       status: 'delivered',
       total: 3499,
       items: 2,
       image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=100&h=100&fit=crop',
       productName: 'Handcrafted Blue Pottery Vase',
       trackingNumber: 'TRK123456789'
     },
     {
       id: 'ORD002',
       date: '2024-01-10',
       status: 'shipped',
       total: 8999,
       items: 1,
       image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=100&h=100&fit=crop',
       productName: 'Royal Kundan Silver Necklace Set',
       trackingNumber: 'TRK987654321'
     },
     {
       id: 'ORD003',
       date: '2024-01-05',
       status: 'processing',
       total: 15999,
       items: 1,
       image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=100&h=100&fit=crop',
       productName: 'Royal Kanchipuram Silk Saree',
       trackingNumber: 'TRK456789123'
     }
   ]);

   const [addresses, setAddresses] = useState<Address[]>([
     {
       id: 'addr1',
       type: 'home',
       name: 'John Doe',
       street: '123 Main Street, Apartment 4B',
       city: 'Mumbai',
       state: 'Maharashtra',
       pincode: '400001',
       phone: '+91 9876543210',
       isDefault: true
     },
     {
       id: 'addr2',
       type: 'work',
       name: 'John Doe',
       street: '456 Business Park, Floor 5',
       city: 'Mumbai',
       state: 'Maharashtra',
       pincode: '400070',
       phone: '+91 9876543210',
       isDefault: false
     }
   ]);

   const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
     {
       id: 'pay1',
       type: 'card',
       name: 'Credit Card',
       details: '**** **** **** 1234',
       isDefault: true,
       expiryDate: '12/26'
     },
     {
       id: 'pay2',
       type: 'upi',
       name: 'UPI',
       details: 'john.doe@paytm',
       isDefault: false
     }
   ]);

   const [securitySettings, setSecuritySettings] = useState<SecuritySettings>({
    password: '********',
    lastPasswordChange: '2024-01-15',
    twoFactorEnabled: false
  });

  // Contact form state
  const [contactForm, setContactForm] = useState({
    subject: '',
    message: '',
    priority: 'medium',
    category: 'general'
  });
  const [contactSubmitted, setContactSubmitted] = useState(false);

  // Utility functions
   const getStatusColor = (status: string) => {
     switch (status) {
       case 'delivered': return 'text-green-600 bg-green-100';
       case 'shipped': return 'text-blue-600 bg-blue-100';
       case 'processing': return 'text-yellow-600 bg-yellow-100';
       case 'cancelled': return 'text-red-600 bg-red-100';
       default: return 'text-gray-600 bg-gray-100';
     }
   };

   const validateEmail = (email: string) => {
     const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
     return re.test(email);
   };

   const validatePhone = (phone: string) => {
     const re = /^[+]?[1-9][\d]{0,15}$/;
     return re.test(phone.replace(/\s/g, ''));
   };

   const validatePincode = (pincode: string) => {
     const re = /^[1-9][0-9]{5}$/;
     return re.test(pincode);
   };

   // Address CRUD operations
   const handleAddAddress = () => {
     const newErrors: Record<string, string> = {};
     
     if (!addressForm.name?.trim()) newErrors.name = 'Name is required';
     if (!addressForm.street?.trim()) newErrors.street = 'Street address is required';
     if (!addressForm.city?.trim()) newErrors.city = 'City is required';
     if (!addressForm.state?.trim()) newErrors.state = 'State is required';
     if (!addressForm.pincode?.trim()) newErrors.pincode = 'Pincode is required';
     else if (!validatePincode(addressForm.pincode)) newErrors.pincode = 'Invalid pincode';
     if (!addressForm.phone?.trim()) newErrors.phone = 'Phone is required';
     else if (!validatePhone(addressForm.phone)) newErrors.phone = 'Invalid phone number';
     if (!addressForm.type) newErrors.type = 'Address type is required';

     if (Object.keys(newErrors).length > 0) {
       setErrors(newErrors);
       return;
     }

     const newAddress: Address = {
       id: `addr${Date.now()}`,
       name: addressForm.name!,
       street: addressForm.street!,
       city: addressForm.city!,
       state: addressForm.state!,
       pincode: addressForm.pincode!,
       phone: addressForm.phone!,
       type: addressForm.type as 'home' | 'work' | 'other',
       isDefault: addresses.length === 0 || addressForm.isDefault || false
     };

     if (newAddress.isDefault) {
       setAddresses(prev => prev.map(addr => ({ ...addr, isDefault: false })));
     }

     setAddresses(prev => [...prev, newAddress]);
     setAddressForm({});
     setShowAddAddress(false);
     setErrors({});
   };

   const handleEditAddress = (id: string) => {
     const address = addresses.find(addr => addr.id === id);
     if (address) {
       setAddressForm(address);
       setEditingAddress(id);
     }
   };

   const handleUpdateAddress = () => {
     const newErrors: Record<string, string> = {};
     
     if (!addressForm.name?.trim()) newErrors.name = 'Name is required';
     if (!addressForm.street?.trim()) newErrors.street = 'Street address is required';
     if (!addressForm.city?.trim()) newErrors.city = 'City is required';
     if (!addressForm.state?.trim()) newErrors.state = 'State is required';
     if (!addressForm.pincode?.trim()) newErrors.pincode = 'Pincode is required';
     else if (!validatePincode(addressForm.pincode)) newErrors.pincode = 'Invalid pincode';
     if (!addressForm.phone?.trim()) newErrors.phone = 'Phone is required';
     else if (!validatePhone(addressForm.phone)) newErrors.phone = 'Invalid phone number';

     if (Object.keys(newErrors).length > 0) {
       setErrors(newErrors);
       return;
     }

     setAddresses(prev => prev.map(addr => 
       addr.id === editingAddress 
         ? { ...addr, ...addressForm } as Address
         : addr
     ));
     
     setEditingAddress(null);
     setAddressForm({});
     setErrors({});
   };

   const handleDeleteAddress = (id: string) => {
     if (window.confirm('Are you sure you want to delete this address?')) {
       setAddresses(prev => prev.filter(addr => addr.id !== id));
     }
   };

   const handleSetDefaultAddress = (id: string) => {
     setAddresses(prev => prev.map(addr => ({
       ...addr,
       isDefault: addr.id === id
     })));
   };

   // Payment CRUD operations
   const handleAddPayment = () => {
     const newErrors: Record<string, string> = {};
     
     if (!paymentForm.name?.trim()) newErrors.name = 'Payment method name is required';
     if (!paymentForm.details?.trim()) newErrors.details = 'Payment details are required';
     if (!paymentForm.type) newErrors.type = 'Payment type is required';

     if (Object.keys(newErrors).length > 0) {
       setErrors(newErrors);
       return;
     }

     const newPayment: PaymentMethod = {
       id: `pay${Date.now()}`,
       name: paymentForm.name!,
       details: paymentForm.details!,
       type: paymentForm.type as 'card' | 'upi' | 'netbanking',
       isDefault: paymentMethods.length === 0 || paymentForm.isDefault || false,
       expiryDate: paymentForm.expiryDate
     };

     if (newPayment.isDefault) {
       setPaymentMethods(prev => prev.map(payment => ({ ...payment, isDefault: false })));
     }

     setPaymentMethods(prev => [...prev, newPayment]);
     setPaymentForm({});
     setShowAddPayment(false);
     setErrors({});
   };

   const handleEditPayment = (id: string) => {
     const payment = paymentMethods.find(p => p.id === id);
     if (payment) {
       setPaymentForm(payment);
       setEditingPayment(id);
     }
   };

   const handleUpdatePayment = () => {
     const newErrors: Record<string, string> = {};
     
     if (!paymentForm.name?.trim()) newErrors.name = 'Payment method name is required';
     if (!paymentForm.details?.trim()) newErrors.details = 'Payment details are required';

     if (Object.keys(newErrors).length > 0) {
       setErrors(newErrors);
       return;
     }

     setPaymentMethods(prev => prev.map(payment => 
       payment.id === editingPayment 
         ? { ...payment, ...paymentForm } as PaymentMethod
         : payment
     ));
     
     setEditingPayment(null);
     setPaymentForm({});
     setErrors({});
   };

   const handleDeletePayment = (id: string) => {
     if (window.confirm('Are you sure you want to remove this payment method?')) {
       setPaymentMethods(prev => prev.filter(payment => payment.id !== id));
     }
   };

   const handleSetDefaultPayment = (id: string) => {
     setPaymentMethods(prev => prev.map(payment => ({
       ...payment,
       isDefault: payment.id === id
     })));
   };

   // Profile operations
   const handleUpdateProfile = () => {
     const newErrors: Record<string, string> = {};
     
     if (!profileForm.firstName?.trim()) newErrors.firstName = 'First name is required';
     if (!profileForm.lastName?.trim()) newErrors.lastName = 'Last name is required';
     if (!profileForm.email?.trim()) newErrors.email = 'Email is required';
     else if (!validateEmail(profileForm.email)) newErrors.email = 'Invalid email address';
     if (!profileForm.phone?.trim()) newErrors.phone = 'Phone is required';
     else if (!validatePhone(profileForm.phone)) newErrors.phone = 'Invalid phone number';

     if (Object.keys(newErrors).length > 0) {
       setErrors(newErrors);
       return;
     }

     // In a real app, this would make an API call
     setEditingProfile(false);
     setErrors({});
     alert('Profile updated successfully!');
   };

   // Security operations
   const handleChangePassword = () => {
     const newErrors: Record<string, string> = {};
     
     if (!passwordForm.currentPassword) newErrors.currentPassword = 'Current password is required';
     if (!passwordForm.newPassword) newErrors.newPassword = 'New password is required';
     else if (passwordForm.newPassword.length < 8) newErrors.newPassword = 'Password must be at least 8 characters';
     if (!passwordForm.confirmPassword) newErrors.confirmPassword = 'Please confirm your password';
     else if (passwordForm.newPassword !== passwordForm.confirmPassword) {
       newErrors.confirmPassword = 'Passwords do not match';
     }

     if (Object.keys(newErrors).length > 0) {
       setErrors(newErrors);
       return;
     }

     // In a real app, this would make an API call
     setSecuritySettings(prev => ({
       ...prev,
       lastPasswordChange: new Date().toISOString().split('T')[0]
     }));
     setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
     setShowPasswordForm(false);
     setErrors({});
     alert('Password changed successfully!');
   };

   const handleToggle2FA = () => {
     setSecuritySettings(prev => ({
       ...prev,
       twoFactorEnabled: !prev.twoFactorEnabled
     }));
     alert(`Two-factor authentication ${!securitySettings.twoFactorEnabled ? 'enabled' : 'disabled'} successfully!`);
   };

   // Order operations
   const handleReorder = (orderId: string) => {
     alert(`Reordering items from order ${orderId}...`);
   };

   const handleTrackOrder = (orderId: string) => {
    const order = orders.find(o => o.id === orderId);
    if (order?.trackingNumber) {
      alert(`Tracking Number: ${order.trackingNumber}\nStatus: ${order.status}`);
    }
  };

  // Contact operations
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.subject.trim() || !contactForm.message.trim()) {
      setErrors({ ...errors, contact: 'Subject and message are required' });
      return;
    }
    
    // Simulate API call
    setTimeout(() => {
      setContactSubmitted(true);
      setContactForm({ subject: '', message: '', priority: 'medium', category: 'general' });
      setErrors({ ...errors, contact: '' });
      
      // Reset success message after 3 seconds
      setTimeout(() => setContactSubmitted(false), 3000);
    }, 500);
  };

  const handleQuickAction = (action: string) => {
    switch (action) {
      case 'track':
        setActiveSection('orders');
        break;
      case 'return':
        alert('Redirecting to return/exchange portal...');
        break;
      case 'issue':
        setContactForm({ ...contactForm, category: 'issue', subject: 'Report an Issue' });
        break;
      default:
        break;
    }
  };

  const menuItems = [
    { id: 'orders', label: 'Your Orders', icon: ShoppingBagIcon },
    { id: 'addresses', label: 'Your Addresses', icon: MapPinIcon },
    { id: 'payments', label: 'Payment Options', icon: CreditCardIcon },
    { id: 'security', label: 'Login & Security', icon: ShieldCheckIcon },
    { id: 'contact', label: 'Contact Us', icon: PhoneIcon },
    { id: 'settings', label: 'Profile Settings', icon: CogIcon }
  ];

  const renderOrders = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-deep-espresso">Your Orders</h2>
        <div className="flex space-x-2">
          <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm">
            <option>Last 6 months</option>
            <option>Last year</option>
            <option>All orders</option>
          </select>
        </div>
      </div>
      
      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center space-x-4 mb-2">
                  <span className="font-semibold text-deep-espresso">Order #{order.id}</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                </div>
                <p className="text-sm text-gray-600">Placed on {new Date(order.date).toLocaleDateString()}</p>
                <p className="text-sm text-gray-600">{order.items} item(s) • ₹{order.total.toLocaleString()}</p>
                {order.trackingNumber && (
                  <p className="text-sm text-terracotta-brown">Tracking: {order.trackingNumber}</p>
                )}
              </div>
              <button 
                className="text-terracotta-brown hover:text-deep-espresso font-medium text-sm"
              >
                View Details
              </button>
            </div>
            
            <div className="flex items-center space-x-4 mb-4">
              <img src={order.image} alt={order.productName} className="w-16 h-16 object-cover rounded-lg" />
              <div>
                <p className="font-medium text-deep-espresso">{order.productName}</p>
                <p className="text-sm text-gray-600">and {order.items - 1} more item(s)</p>
              </div>
            </div>
            
            <div className="flex justify-between items-center pt-4 border-t border-gray-100">
              <div className="flex space-x-3">
                {order.trackingNumber && (
                  <button 
                    onClick={() => handleTrackOrder(order.id)}
                    className="px-4 py-2 border border-terracotta-brown text-terracotta-brown rounded-lg hover:bg-terracotta-brown hover:text-white transition-colors text-sm"
                  >
                    Track Order
                  </button>
                )}
                <button 
                  onClick={() => handleReorder(order.id)}
                  className="px-4 py-2 bg-terracotta-brown text-white rounded-lg hover:bg-opacity-90 transition-colors text-sm"
                >
                  Buy Again
                </button>
              </div>
              <p className="font-semibold text-deep-espresso">₹{order.total.toLocaleString()}</p>
            </div>
          </div>
        ))}
      </div>
      
      {/* Add Address Modal */}
      {showAddAddress && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-deep-espresso">Add New Address</h3>
              <button onClick={() => setShowAddAddress(false)}>
                <XMarkIcon className="h-5 w-5 text-gray-400" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input 
                  type="text" 
                  value={addressForm.name || ''}
                  onChange={(e) => setAddressForm(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Address Type</label>
                <select 
                  value={addressForm.type || ''}
                  onChange={(e) => setAddressForm(prev => ({ ...prev, type: e.target.value as 'home' | 'work' | 'other' }))}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                >
                  <option value="">Select Type</option>
                  <option value="home">Home</option>
                  <option value="work">Work</option>
                  <option value="other">Other</option>
                </select>
                {errors.type && <p className="text-red-500 text-xs mt-1">{errors.type}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Street Address</label>
                <textarea 
                  value={addressForm.street || ''}
                  onChange={(e) => setAddressForm(prev => ({ ...prev, street: e.target.value }))}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  rows={2}
                />
                {errors.street && <p className="text-red-500 text-xs mt-1">{errors.street}</p>}
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                  <input 
                    type="text" 
                    value={addressForm.city || ''}
                    onChange={(e) => setAddressForm(prev => ({ ...prev, city: e.target.value }))}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  />
                  {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                  <input 
                    type="text" 
                    value={addressForm.state || ''}
                    onChange={(e) => setAddressForm(prev => ({ ...prev, state: e.target.value }))}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  />
                  {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state}</p>}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Pincode</label>
                  <input 
                    type="text" 
                    value={addressForm.pincode || ''}
                    onChange={(e) => setAddressForm(prev => ({ ...prev, pincode: e.target.value }))}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  />
                  {errors.pincode && <p className="text-red-500 text-xs mt-1">{errors.pincode}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input 
                    type="tel" 
                    value={addressForm.phone || ''}
                    onChange={(e) => setAddressForm(prev => ({ ...prev, phone: e.target.value }))}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  />
                  {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                </div>
              </div>
              
              <label className="flex items-center">
                <input 
                  type="checkbox" 
                  checked={addressForm.isDefault || false}
                  onChange={(e) => setAddressForm(prev => ({ ...prev, isDefault: e.target.checked }))}
                  className="rounded border-gray-300 text-terracotta-brown" 
                />
                <span className="ml-2 text-sm text-gray-700">Set as default address</span>
              </label>
            </div>
            
            <div className="flex space-x-4 mt-6">
              <button 
                onClick={handleAddAddress}
                className="flex-1 bg-terracotta-brown text-white py-2 rounded-lg hover:bg-opacity-90"
              >
                Add Address
              </button>
              <button 
                onClick={() => {
                  setShowAddAddress(false);
                  setAddressForm({});
                  setErrors({});
                }}
                className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Edit Address Modal */}
      {editingAddress && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-deep-espresso">Edit Address</h3>
              <button onClick={() => setEditingAddress(null)}>
                <XMarkIcon className="h-5 w-5 text-gray-400" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input 
                  type="text" 
                  value={addressForm.name || ''}
                  onChange={(e) => setAddressForm(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Address Type</label>
                <select 
                  value={addressForm.type || ''}
                  onChange={(e) => setAddressForm(prev => ({ ...prev, type: e.target.value as 'home' | 'work' | 'other' }))}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                >
                  <option value="home">Home</option>
                  <option value="work">Work</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Street Address</label>
                <textarea 
                  value={addressForm.street || ''}
                  onChange={(e) => setAddressForm(prev => ({ ...prev, street: e.target.value }))}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  rows={2}
                />
                {errors.street && <p className="text-red-500 text-xs mt-1">{errors.street}</p>}
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                  <input 
                    type="text" 
                    value={addressForm.city || ''}
                    onChange={(e) => setAddressForm(prev => ({ ...prev, city: e.target.value }))}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  />
                  {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                  <input 
                    type="text" 
                    value={addressForm.state || ''}
                    onChange={(e) => setAddressForm(prev => ({ ...prev, state: e.target.value }))}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  />
                  {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state}</p>}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Pincode</label>
                  <input 
                    type="text" 
                    value={addressForm.pincode || ''}
                    onChange={(e) => setAddressForm(prev => ({ ...prev, pincode: e.target.value }))}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  />
                  {errors.pincode && <p className="text-red-500 text-xs mt-1">{errors.pincode}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input 
                    type="tel" 
                    value={addressForm.phone || ''}
                    onChange={(e) => setAddressForm(prev => ({ ...prev, phone: e.target.value }))}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  />
                  {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                </div>
              </div>
            </div>
            
            <div className="flex space-x-4 mt-6">
              <button 
                onClick={handleUpdateAddress}
                className="flex-1 bg-terracotta-brown text-white py-2 rounded-lg hover:bg-opacity-90"
              >
                Update Address
              </button>
              <button 
                onClick={() => {
                  setEditingAddress(null);
                  setAddressForm({});
                  setErrors({});
                }}
                className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Add Payment Modal */}
      {showAddPayment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-deep-espresso">Add Payment Method</h3>
              <button onClick={() => setShowAddPayment(false)}>
                <XMarkIcon className="h-5 w-5 text-gray-400" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Payment Type</label>
                <select 
                  value={paymentForm.type || ''}
                  onChange={(e) => setPaymentForm(prev => ({ ...prev, type: e.target.value as 'card' | 'upi' | 'netbanking' }))}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                >
                  <option value="">Select Type</option>
                  <option value="card">Credit/Debit Card</option>
                  <option value="upi">UPI</option>
                  <option value="netbanking">Net Banking</option>
                </select>
                {errors.type && <p className="text-red-500 text-xs mt-1">{errors.type}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input 
                  type="text" 
                  value={paymentForm.name || ''}
                  onChange={(e) => setPaymentForm(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="e.g., My Credit Card"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {paymentForm.type === 'card' ? 'Card Number' : 
                   paymentForm.type === 'upi' ? 'UPI ID' : 'Account Details'}
                </label>
                <input 
                  type="text" 
                  value={paymentForm.details || ''}
                  onChange={(e) => setPaymentForm(prev => ({ ...prev, details: e.target.value }))}
                  placeholder={
                    paymentForm.type === 'card' ? '**** **** **** 1234' : 
                    paymentForm.type === 'upi' ? 'yourname@upi' : 'Account details'
                  }
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                />
                {errors.details && <p className="text-red-500 text-xs mt-1">{errors.details}</p>}
              </div>
              
              {paymentForm.type === 'card' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                  <input 
                    type="text" 
                    value={paymentForm.expiryDate || ''}
                    onChange={(e) => setPaymentForm(prev => ({ ...prev, expiryDate: e.target.value }))}
                    placeholder="MM/YY"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  />
                </div>
              )}
              
              <label className="flex items-center">
                <input 
                  type="checkbox" 
                  checked={paymentForm.isDefault || false}
                  onChange={(e) => setPaymentForm(prev => ({ ...prev, isDefault: e.target.checked }))}
                  className="rounded border-gray-300 text-terracotta-brown" 
                />
                <span className="ml-2 text-sm text-gray-700">Set as default payment method</span>
              </label>
            </div>
            
            <div className="flex space-x-4 mt-6">
              <button 
                onClick={handleAddPayment}
                className="flex-1 bg-terracotta-brown text-white py-2 rounded-lg hover:bg-opacity-90"
              >
                Add Payment Method
              </button>
              <button 
                onClick={() => {
                  setShowAddPayment(false);
                  setPaymentForm({});
                  setErrors({});
                }}
                className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Edit Payment Modal */}
      {editingPayment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-deep-espresso">Edit Payment Method</h3>
              <button onClick={() => setEditingPayment(null)}>
                <XMarkIcon className="h-5 w-5 text-gray-400" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Payment Type</label>
                <select 
                  value={paymentForm.type || ''}
                  onChange={(e) => setPaymentForm(prev => ({ ...prev, type: e.target.value as 'card' | 'upi' | 'netbanking' }))}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                >
                  <option value="card">Credit/Debit Card</option>
                  <option value="upi">UPI</option>
                  <option value="netbanking">Net Banking</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input 
                  type="text" 
                  value={paymentForm.name || ''}
                  onChange={(e) => setPaymentForm(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {paymentForm.type === 'card' ? 'Card Number' : 
                   paymentForm.type === 'upi' ? 'UPI ID' : 'Account Details'}
                </label>
                <input 
                  type="text" 
                  value={paymentForm.details || ''}
                  onChange={(e) => setPaymentForm(prev => ({ ...prev, details: e.target.value }))}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                />
                {errors.details && <p className="text-red-500 text-xs mt-1">{errors.details}</p>}
              </div>
              
              {paymentForm.type === 'card' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                  <input 
                    type="text" 
                    value={paymentForm.expiryDate || ''}
                    onChange={(e) => setPaymentForm(prev => ({ ...prev, expiryDate: e.target.value }))}
                    placeholder="MM/YY"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  />
                </div>
              )}
            </div>
            
            <div className="flex space-x-4 mt-6">
              <button 
                onClick={handleUpdatePayment}
                className="flex-1 bg-terracotta-brown text-white py-2 rounded-lg hover:bg-opacity-90"
              >
                Update Payment Method
              </button>
              <button 
                onClick={() => {
                  setEditingPayment(null);
                  setPaymentForm({});
                  setErrors({});
                }}
                className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Change Password Modal */}
      {showPasswordForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-deep-espresso">Change Password</h3>
              <button onClick={() => setShowPasswordForm(false)}>
                <XMarkIcon className="h-5 w-5 text-gray-400" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                <div className="relative">
                  <input 
                    type={showPassword ? 'text' : 'password'}
                    value={passwordForm.currentPassword}
                    onChange={(e) => setPasswordForm(prev => ({ ...prev, currentPassword: e.target.value }))}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 pr-10"
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPassword ? (
                      <EyeSlashIcon className="h-4 w-4 text-gray-400" />
                    ) : (
                      <EyeIcon className="h-4 w-4 text-gray-400" />
                    )}
                  </button>
                </div>
                {errors.currentPassword && <p className="text-red-500 text-xs mt-1">{errors.currentPassword}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                <input 
                  type={showPassword ? 'text' : 'password'}
                  value={passwordForm.newPassword}
                  onChange={(e) => setPasswordForm(prev => ({ ...prev, newPassword: e.target.value }))}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                />
                {errors.newPassword && <p className="text-red-500 text-xs mt-1">{errors.newPassword}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                <input 
                  type={showPassword ? 'text' : 'password'}
                  value={passwordForm.confirmPassword}
                  onChange={(e) => setPasswordForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                />
                {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
              </div>
            </div>
            
            <div className="flex space-x-4 mt-6">
              <button 
                onClick={handleChangePassword}
                className="flex-1 bg-terracotta-brown text-white py-2 rounded-lg hover:bg-opacity-90"
              >
                Change Password
              </button>
              <button 
                onClick={() => {
                  setShowPasswordForm(false);
                  setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
                  setErrors({});
                }}
                className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderAddresses = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-deep-espresso">Your Addresses</h2>
        <button 
          onClick={() => setShowAddAddress(true)}
          className="bg-terracotta-brown text-white px-4 py-2 rounded-lg hover:bg-opacity-90 flex items-center space-x-2"
        >
          <PlusIcon className="h-4 w-4" />
          <span>Add Address</span>
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {addresses.map((address) => (
          <div key={address.id} className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center space-x-2">
                <span className="font-semibold text-deep-espresso capitalize">{address.type}</span>
                {address.isDefault && (
                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Default</span>
                )}
              </div>
              <div className="flex space-x-2">
                <button 
                  onClick={() => handleEditAddress(address.id)}
                  className="text-gray-400 hover:text-terracotta-brown"
                >
                  <PencilIcon className="h-4 w-4" />
                </button>
                <button 
                  onClick={() => handleDeleteAddress(address.id)}
                  className="text-gray-400 hover:text-red-500"
                >
                  <TrashIcon className="h-4 w-4" />
                </button>
              </div>
            </div>
            
            <div className="space-y-1 text-sm text-gray-600 mb-4">
              <p className="font-medium text-deep-espresso">{address.name}</p>
              <p>{address.street}</p>
              <p>{address.city}, {address.state} {address.pincode}</p>
              <p>Phone: {address.phone}</p>
            </div>
            
            {!address.isDefault && (
              <button 
                onClick={() => handleSetDefaultAddress(address.id)}
                className="text-terracotta-brown hover:text-deep-espresso text-sm font-medium"
              >
                Set as Default
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const renderPayments = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-deep-espresso">Payment Options</h2>
        <button 
          onClick={() => setShowAddPayment(true)}
          className="bg-terracotta-brown text-white px-4 py-2 rounded-lg hover:bg-opacity-90 flex items-center space-x-2"
        >
          <PlusIcon className="h-4 w-4" />
          <span>Add Payment Method</span>
        </button>
      </div>
      
      <div className="space-y-4">
        {paymentMethods.map((method) => (
          <div key={method.id} className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-8 bg-gray-100 rounded flex items-center justify-center">
                  <CreditCardIcon className="h-5 w-5 text-gray-600" />
                </div>
                <div>
                  <p className="font-medium text-deep-espresso">{method.name}</p>
                  <p className="text-sm text-gray-600">{method.details}</p>
                  {method.expiryDate && (
                    <p className="text-xs text-gray-500">Expires: {method.expiryDate}</p>
                  )}
                  {method.isDefault && (
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full mt-1 inline-block">Default</span>
                  )}
                </div>
              </div>
              <div className="flex space-x-2">
                <button 
                  onClick={() => handleEditPayment(method.id)}
                  className="text-terracotta-brown hover:text-deep-espresso text-sm font-medium"
                >
                  Edit
                </button>
                <button 
                  onClick={() => handleDeletePayment(method.id)}
                  className="text-red-500 hover:text-red-700 text-sm font-medium"
                >
                  Remove
                </button>
              </div>
            </div>
            {!method.isDefault && (
              <div className="mt-3 pt-3 border-t border-gray-100">
                <button 
                  onClick={() => handleSetDefaultPayment(method.id)}
                  className="text-terracotta-brown hover:text-deep-espresso text-sm font-medium"
                >
                  Set as Default
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const renderSecurity = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-deep-espresso">Login & Security</h2>
      
      <div className="space-y-4">
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-deep-espresso">Password</h3>
              <p className="text-sm text-gray-600">Last changed on {new Date(securitySettings.lastPasswordChange).toLocaleDateString()}</p>
            </div>
            <button 
              onClick={() => setShowPasswordForm(true)}
              className="text-terracotta-brown hover:text-deep-espresso font-medium"
            >
              Change
            </button>
          </div>
        </div>
        
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-deep-espresso">Two-Factor Authentication</h3>
              <p className="text-sm text-gray-600">
                {securitySettings.twoFactorEnabled ? 'Enabled - Your account is protected' : 'Add an extra layer of security'}
              </p>
            </div>
            <button 
              onClick={handleToggle2FA}
              className={`font-medium ${
                securitySettings.twoFactorEnabled 
                  ? 'text-red-500 hover:text-red-700' 
                  : 'text-terracotta-brown hover:text-deep-espresso'
              }`}
            >
              {securitySettings.twoFactorEnabled ? 'Disable' : 'Enable'}
            </button>
          </div>
        </div>
        
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-deep-espresso">Email Address</h3>
              <p className="text-sm text-gray-600">{profileForm.email}</p>
            </div>
            <button 
              onClick={() => setEditingProfile(true)}
              className="text-terracotta-brown hover:text-deep-espresso font-medium"
            >
              Change
            </button>
          </div>
        </div>
        
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-deep-espresso">Phone Number</h3>
              <p className="text-sm text-gray-600">{profileForm.phone}</p>
            </div>
            <button 
              onClick={() => setEditingProfile(true)}
              className="text-terracotta-brown hover:text-deep-espresso font-medium"
            >
              Change
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContact = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-deep-espresso">Contact Us</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="font-semibold text-deep-espresso mb-4">Customer Support</h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <PhoneIcon className="h-5 w-5 text-terracotta-brown" />
              <span className="text-gray-600">+91 1800-123-4567</span>
            </div>
            <div className="flex items-center space-x-3">
              <svg className="h-5 w-5 text-terracotta-brown" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span className="text-gray-600">support@scraft.com</span>
            </div>
            <p className="text-sm text-gray-600">Available 24/7 for your assistance</p>
          </div>
          
          <div className="mt-6">
            <h4 className="font-semibold text-deep-espresso mb-3">Quick Actions</h4>
            <div className="space-y-2">
              <button 
                onClick={() => handleQuickAction('track')}
                className="w-full text-left p-3 rounded-lg hover:bg-gray-50 flex items-center justify-between transition-colors"
              >
                <span>Track Your Order</span>
                <ChevronRightIcon className="h-4 w-4 text-gray-400" />
              </button>
              <button 
                onClick={() => handleQuickAction('return')}
                className="w-full text-left p-3 rounded-lg hover:bg-gray-50 flex items-center justify-between transition-colors"
              >
                <span>Return/Exchange</span>
                <ChevronRightIcon className="h-4 w-4 text-gray-400" />
              </button>
              <button 
                onClick={() => handleQuickAction('issue')}
                className="w-full text-left p-3 rounded-lg hover:bg-gray-50 flex items-center justify-between transition-colors"
              >
                <span>Report an Issue</span>
                <ChevronRightIcon className="h-4 w-4 text-gray-400" />
              </button>
            </div>
          </div>
        </div>
        
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="font-semibold text-deep-espresso mb-4">Send us a Message</h3>
          
          {contactSubmitted && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-800 text-sm">✓ Your message has been sent successfully! We'll get back to you soon.</p>
            </div>
          )}
          
          <form onSubmit={handleContactSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  value={contactForm.category}
                  onChange={(e) => setContactForm({ ...contactForm, category: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-terracotta-brown focus:border-transparent"
                >
                  <option value="general">General Inquiry</option>
                  <option value="order">Order Related</option>
                  <option value="product">Product Question</option>
                  <option value="issue">Report Issue</option>
                  <option value="feedback">Feedback</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                <select
                  value={contactForm.priority}
                  onChange={(e) => setContactForm({ ...contactForm, priority: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-terracotta-brown focus:border-transparent"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="urgent">Urgent</option>
                </select>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
              <input
                type="text"
                value={contactForm.subject}
                onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-terracotta-brown focus:border-transparent"
                placeholder="Brief description of your inquiry"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
              <textarea
                value={contactForm.message}
                onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-terracotta-brown focus:border-transparent"
                placeholder="Please provide details about your inquiry..."
              />
            </div>
            
            {errors.contact && (
              <p className="text-red-600 text-sm">{errors.contact}</p>
            )}
            
            <button
              type="submit"
              className="w-full bg-terracotta-brown text-white py-2 px-4 rounded-lg hover:bg-deep-espresso transition-colors"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-deep-espresso">Profile Settings</h2>
        {!editingProfile && (
          <button 
            onClick={() => setEditingProfile(true)}
            className="text-terracotta-brown hover:text-deep-espresso font-medium flex items-center space-x-2"
          >
            <PencilIcon className="h-4 w-4" />
            <span>Edit Profile</span>
          </button>
        )}
      </div>
      
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex items-center space-x-6 mb-6">
          <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
            <UserIcon className="h-10 w-10 text-gray-400" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-deep-espresso">
              {profileForm.firstName} {profileForm.lastName}
            </h3>
            <p className="text-gray-600">{profileForm.email}</p>
            <button className="text-terracotta-brown hover:text-deep-espresso font-medium text-sm mt-1">
              Change Profile Picture
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
            <input 
              type="text" 
              value={profileForm.firstName}
              onChange={(e) => setProfileForm(prev => ({ ...prev, firstName: e.target.value }))}
              disabled={!editingProfile}
              className={`w-full border border-gray-300 rounded-lg px-3 py-2 ${
                !editingProfile ? 'bg-gray-50 text-gray-500' : ''
              }`}
            />
            {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
            <input 
              type="text" 
              value={profileForm.lastName}
              onChange={(e) => setProfileForm(prev => ({ ...prev, lastName: e.target.value }))}
              disabled={!editingProfile}
              className={`w-full border border-gray-300 rounded-lg px-3 py-2 ${
                !editingProfile ? 'bg-gray-50 text-gray-500' : ''
              }`}
            />
            {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input 
              type="email" 
              value={profileForm.email}
              onChange={(e) => setProfileForm(prev => ({ ...prev, email: e.target.value }))}
              disabled={!editingProfile}
              className={`w-full border border-gray-300 rounded-lg px-3 py-2 ${
                !editingProfile ? 'bg-gray-50 text-gray-500' : ''
              }`}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
            <input 
              type="tel" 
              value={profileForm.phone}
              onChange={(e) => setProfileForm(prev => ({ ...prev, phone: e.target.value }))}
              disabled={!editingProfile}
              className={`w-full border border-gray-300 rounded-lg px-3 py-2 ${
                !editingProfile ? 'bg-gray-50 text-gray-500' : ''
              }`}
            />
            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
            <input 
              type="date" 
              value={profileForm.dateOfBirth}
              onChange={(e) => setProfileForm(prev => ({ ...prev, dateOfBirth: e.target.value }))}
              disabled={!editingProfile}
              className={`w-full border border-gray-300 rounded-lg px-3 py-2 ${
                !editingProfile ? 'bg-gray-50 text-gray-500' : ''
              }`}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
            <select 
              value={profileForm.gender}
              onChange={(e) => setProfileForm(prev => ({ ...prev, gender: e.target.value }))}
              disabled={!editingProfile}
              className={`w-full border border-gray-300 rounded-lg px-3 py-2 ${
                !editingProfile ? 'bg-gray-50 text-gray-500' : ''
              }`}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>
        
        <div className="mt-6">
          <h4 className="font-semibold text-deep-espresso mb-3">Notification Preferences</h4>
          <div className="space-y-3">
            <label className="flex items-center">
              <input 
                type="checkbox" 
                checked={profileForm.emailNotifications}
                onChange={(e) => setProfileForm(prev => ({ ...prev, emailNotifications: e.target.checked }))}
                disabled={!editingProfile}
                className="rounded border-gray-300 text-terracotta-brown" 
              />
              <span className="ml-2 text-sm text-gray-700">Email notifications for orders</span>
            </label>
            <label className="flex items-center">
              <input 
                type="checkbox" 
                checked={profileForm.smsNotifications}
                onChange={(e) => setProfileForm(prev => ({ ...prev, smsNotifications: e.target.checked }))}
                disabled={!editingProfile}
                className="rounded border-gray-300 text-terracotta-brown" 
              />
              <span className="ml-2 text-sm text-gray-700">SMS notifications for delivery updates</span>
            </label>
            <label className="flex items-center">
              <input 
                type="checkbox" 
                checked={profileForm.marketingEmails}
                onChange={(e) => setProfileForm(prev => ({ ...prev, marketingEmails: e.target.checked }))}
                disabled={!editingProfile}
                className="rounded border-gray-300 text-terracotta-brown" 
              />
              <span className="ml-2 text-sm text-gray-700">Marketing emails and offers</span>
            </label>
          </div>
        </div>
        
        {editingProfile && (
          <div className="mt-6 flex space-x-4">
            <button 
              onClick={handleUpdateProfile}
              className="bg-terracotta-brown text-white px-6 py-2 rounded-lg hover:bg-opacity-90"
            >
              Save Changes
            </button>
            <button 
              onClick={() => {
                setEditingProfile(false);
                setErrors({});
              }}
              className="border border-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'orders': return renderOrders();
      case 'addresses': return renderAddresses();
      case 'payments': return renderPayments();
      case 'security': return renderSecurity();
      case 'contact': return renderContact();
      case 'settings': return renderSettings();
      default: return renderOrders();
    }
  };

  return (
    <div className="min-h-screen bg-warm-beige py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-deep-espresso">My Account</h1>
          <p className="text-gray-600 mt-2">Manage your account settings and preferences</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <nav className="space-y-1">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveSection(item.id)}
                      className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                        activeSection === item.id
                          ? 'bg-terracotta-brown text-white'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      <span className="font-medium">{item.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="lg:col-span-3">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;