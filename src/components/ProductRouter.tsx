import React from 'react';
import { useParams } from 'react-router-dom';
import CeramicProductPage from './CeramicProductPage';
import SareeProductPage from './SareeProductPage';
import JewelryProductPage from './JewelryProductPage';
import ProductPage from './ProductPage'; // Fallback for other categories

const ProductRouter: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();

  // Determine which product page to render based on product ID pattern
  const getProductPageComponent = (id: string) => {
    if (id.startsWith('ceramic-vase-')) {
      return <CeramicProductPage />;
    } else if (id.startsWith('silk-saree-')) {
      return <SareeProductPage />;
    } else if (id.startsWith('silver-jewelry-')) {
      return <JewelryProductPage />;
    } else {
      // Fallback to the original ProductPage for other categories
      return <ProductPage />;
    }
  };

  if (!productId) {
    return <ProductPage />; // Fallback if no product ID
  }

  return getProductPageComponent(productId);
};

export default ProductRouter;