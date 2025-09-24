import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import ScraftLogo from './ScraftLogo';
import Footer from './Footer';
import ChatBot from './ChatBot';
import CartIcon from './CartIcon';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isShopDropdownOpen, setIsShopDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const shopCategories = [
    { name: 'Pottery & Ceramics', path: '/shop/pots', icon: '🏺' },
    { name: 'Handwoven Sarees', path: '/shop/sarees', icon: '🥻' },
    { name: 'Traditional Toys', path: '/shop/toys', icon: '🪀' },
    { name: 'Artisan Jewelry', path: '/shop/jewelry', icon: '💍' },
    { name: 'Home Decor', path: '/shop/home-decor', icon: '🏠' },
    { name: 'Handcrafted Bags', path: '/shop/bags', icon: '👜' }
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setIsSearchFocused(false);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsShopDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="min-h-screen bg-warm-cream font-inter">
      <header className="bg-white/30 backdrop-blur-xl border-b border-white/20 shadow-xl sticky top-0 z-50 transition-all duration-300">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="flex justify-between items-center py-3 lg:py-4">
            {/* Logo */}
            <div className="flex items-center">
              <ScraftLogo size="md" />
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              <Link 
                to="/"
                className={`px-4 py-2 rounded-lg font-inter transition-all duration-300 font-medium relative group ${
                  location.pathname === '/' 
                    ? 'text-terracotta-brown bg-terracotta-brown/10' 
                    : 'text-deep-espresso hover:text-terracotta-brown hover:bg-terracotta-brown/5'
                }`}
              >
                Home
                <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-terracotta-brown transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
              </Link>
              
              {/* Shop Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onMouseEnter={() => setIsShopDropdownOpen(true)}
                  className={`px-4 py-2 rounded-lg font-inter transition-all duration-300 font-medium relative group flex items-center space-x-1 ${
                    location.pathname.startsWith('/shop') 
                      ? 'text-terracotta-brown bg-terracotta-brown/10' 
                      : 'text-deep-espresso hover:text-terracotta-brown hover:bg-terracotta-brown/5'
                  }`}
                >
                  <span>Shop</span>
                  <svg className={`w-4 h-4 transition-transform duration-300 ${isShopDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                  <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-terracotta-brown transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
                </button>
                
                {/* Dropdown Menu */}
                <div 
                  className={`absolute top-full left-0 mt-2 w-64 bg-white/95 backdrop-blur-xl rounded-xl shadow-2xl border border-white/20 transition-all duration-300 ${
                    isShopDropdownOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'
                  }`}
                  onMouseEnter={() => setIsShopDropdownOpen(true)}
                  onMouseLeave={() => setIsShopDropdownOpen(false)}
                >
                  <div className="p-2">
                    <Link 
                      to="/shop"
                      className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-terracotta-brown/10 transition-colors duration-200 group"
                    >
                      <span className="text-xl">🛍️</span>
                      <div>
                        <div className="font-medium text-deep-espresso group-hover:text-terracotta-brown">All Products</div>
                        <div className="text-sm text-gray-600">Browse everything</div>
                      </div>
                    </Link>
                    <div className="h-px bg-gray-200 my-2"></div>
                    {shopCategories.map((category) => (
                      <Link 
                        key={category.path}
                        to={category.path}
                        className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-terracotta-brown/10 transition-colors duration-200 group"
                      >
                        <span className="text-lg">{category.icon}</span>
                        <div className="font-medium text-deep-espresso group-hover:text-terracotta-brown">{category.name}</div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              <Link 
                to="/about"
                className={`px-4 py-2 rounded-lg font-inter transition-all duration-300 font-medium relative group ${
                  location.pathname === '/about' 
                    ? 'text-terracotta-brown bg-terracotta-brown/10' 
                    : 'text-deep-espresso hover:text-terracotta-brown hover:bg-terracotta-brown/5'
                }`}
              >
                About
                <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-terracotta-brown transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
              </Link>
              
              <Link 
                to="/contact"
                className={`px-4 py-2 rounded-lg font-inter transition-all duration-300 font-medium relative group ${
                  location.pathname === '/contact' 
                    ? 'text-terracotta-brown bg-terracotta-brown/10' 
                    : 'text-deep-espresso hover:text-terracotta-brown hover:bg-terracotta-brown/5'
                }`}
              >
                Contact
                <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-terracotta-brown transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
              </Link>

              {location.pathname === '/' && (
                <>
                  <button 
                    onClick={() => scrollToSection('festival-sales')}
                    className="px-4 py-2 rounded-lg font-inter text-deep-espresso hover:text-terracotta-brown hover:bg-terracotta-brown/5 transition-all duration-300 font-medium relative group"
                  >
                    Festival Sales
                    <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-terracotta-brown transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
                  </button>
                </>
              )}
            </nav>

            {/* Search Bar */}
            <div className="hidden md:flex items-center">
              <form onSubmit={handleSearch} className="relative">
                <div className={`flex items-center bg-white/40 backdrop-blur-md rounded-full border transition-all duration-300 ${
                  isSearchFocused ? 'border-terracotta-brown/50 shadow-lg' : 'border-white/30'
                }`}>
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setIsSearchFocused(true)}
                    onBlur={() => setIsSearchFocused(false)}
                    className="bg-transparent px-4 py-2 text-deep-espresso placeholder-gray-500 focus:outline-none w-48 lg:w-64"
                  />
                  <button 
                    type="submit"
                    className="p-2 text-terracotta-brown hover:text-deep-espresso transition-colors duration-200"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </button>
                </div>
              </form>
            </div>

            {/* Right side buttons */}
            <div className="flex items-center space-x-2">
              {/* Cart Button */}
              <CartIcon />

              {/* Profile Button */}
              <Link 
                to="/profile" 
                className={`p-2 rounded-lg transition-all duration-300 ${
                  location.pathname === '/profile' 
                    ? 'text-terracotta-brown bg-terracotta-brown/10' 
                    : 'text-deep-espresso hover:text-terracotta-brown hover:bg-terracotta-brown/5'
                }`}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </Link>

              {/* Mobile menu button */}
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 text-deep-espresso hover:text-terracotta-brown hover:bg-terracotta-brown/5 rounded-lg transition-all duration-300"
              >
                <svg className={`w-6 h-6 transition-transform duration-300 ${isMobileMenuOpen ? 'rotate-90' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {isMobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <div className={`lg:hidden transition-all duration-300 overflow-hidden ${
            isMobileMenuOpen ? 'max-h-screen opacity-100 pb-4' : 'max-h-0 opacity-0'
          }`}>
            <div className="bg-white/20 backdrop-blur-md rounded-xl p-4 mt-2 border border-white/20">
              {/* Mobile Search */}
              <form onSubmit={handleSearch} className="mb-4">
                <div className="flex items-center bg-white/40 backdrop-blur-md rounded-full border border-white/30">
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-transparent px-4 py-2 text-deep-espresso placeholder-gray-500 focus:outline-none flex-1"
                  />
                  <button 
                    type="submit"
                    className="p-2 text-terracotta-brown"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </button>
                </div>
              </form>

              {/* Mobile Navigation Links */}
              <nav className="space-y-2">
                <Link 
                  to="/"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-4 py-3 rounded-lg font-medium transition-colors duration-200 ${
                    location.pathname === '/' 
                      ? 'text-terracotta-brown bg-terracotta-brown/10' 
                      : 'text-deep-espresso hover:text-terracotta-brown hover:bg-terracotta-brown/5'
                  }`}
                >
                  🏠 Home
                </Link>
                <Link 
                  to="/shop"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-4 py-3 rounded-lg font-medium transition-colors duration-200 ${
                    location.pathname === '/shop' 
                      ? 'text-terracotta-brown bg-terracotta-brown/10' 
                      : 'text-deep-espresso hover:text-terracotta-brown hover:bg-terracotta-brown/5'
                  }`}
                >
                  🛍️ Shop All
                </Link>
                
                {/* Mobile Shop Categories */}
                <div className="pl-4 space-y-1">
                  {shopCategories.map((category) => (
                    <Link 
                      key={category.path}
                      to={category.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block px-4 py-2 rounded-lg text-sm text-deep-espresso hover:text-terracotta-brown hover:bg-terracotta-brown/5 transition-colors duration-200"
                    >
                      {category.icon} {category.name}
                    </Link>
                  ))}
                </div>

                <Link 
                  to="/about"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-4 py-3 rounded-lg font-medium transition-colors duration-200 ${
                    location.pathname === '/about' 
                      ? 'text-terracotta-brown bg-terracotta-brown/10' 
                      : 'text-deep-espresso hover:text-terracotta-brown hover:bg-terracotta-brown/5'
                  }`}
                >
                  ℹ️ About
                </Link>
                <Link 
                  to="/contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-4 py-3 rounded-lg font-medium transition-colors duration-200 ${
                    location.pathname === '/contact' 
                      ? 'text-terracotta-brown bg-terracotta-brown/10' 
                      : 'text-deep-espresso hover:text-terracotta-brown hover:bg-terracotta-brown/5'
                  }`}
                >
                  📞 Contact
                </Link>

                {location.pathname === '/' && (
                  <button 
                    onClick={() => {
                      scrollToSection('festival-sales');
                      setIsMobileMenuOpen(false);
                    }}
                    className="block w-full text-left px-4 py-3 rounded-lg font-medium text-deep-espresso hover:text-terracotta-brown hover:bg-terracotta-brown/5 transition-colors duration-200"
                  >
                    🎉 Festival Sales
                  </button>
                )}
              </nav>
            </div>
          </div>
        </div>
      </header>

      <main>{children}</main>
      
      <Footer />
      
      {/* Floating ChatBot */}
      <ChatBot />
    </div>
  );
};

export default Layout;
