import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout';
import HomePage from './components/HomePage';
import ShopPage from './components/ShopPage';
import PotsPage from './components/PotsPage';
import SareesPage from './components/SareesPage';
import ToysPage from './components/ToysPage';
import JewelryPage from './components/JewelryPage';
import HomeDecorPage from './components/HomeDecorPage';
import BagsPage from './components/BagsPage';
import ProductRouter from './components/ProductRouter';
import AboutPage from './components/AboutPage';
import ContactPage from './components/ContactPage';
import CheckoutPage from './components/CheckoutPage';
import ProfilePage from './components/ProfilePage';
import ScrollToTop from './components/ScrollToTop';
import { CartProvider } from './contexts/CartContext';
import Cart from './components/Cart';

function App() {
  return (
    <CartProvider>
      <Router>
        <ScrollToTop />
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/shop/pots" element={<PotsPage />} />
            <Route path="/shop/sarees" element={<SareesPage />} />
            <Route path="/shop/toys" element={<ToysPage />} />
            <Route path="/shop/jewelry" element={<JewelryPage />} />
            <Route path="/shop/home-decor" element={<HomeDecorPage />} />
            <Route path="/shop/bags" element={<BagsPage />} />
            <Route path="/product/:productId" element={<ProductRouter />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
          <Cart />
        </Layout>
      </Router>
    </CartProvider>
  );
}

export default App;
