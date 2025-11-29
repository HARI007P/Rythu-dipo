import React, { useState } from 'react';
import { ShoppingCart, Star, Package, Sprout, Leaf, Zap } from 'lucide-react';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product, onViewDetails }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { addToCart, isInCart, getItemQuantity } = useCart();

  const handleAddToCart = async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 300)); // Simulate loading
      addToCart(product);
    } catch (error) {
      console.error('Error adding to cart:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewDetails = () => {
    if (onViewDetails) {
      onViewDetails(product);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const getCategoryIcon = (category) => {
    switch (category.toLowerCase()) {
      case 'tool':
        return Package;
      case 'seed':
      case 'seeds':
        return Sprout;
      case 'fertilizer':
        return Leaf;
      case 'pesticide':
        return Zap;
      default:
        return Star;
    }
  };

  const getCategoryColor = (category) => {
    switch (category.toLowerCase()) {
      case 'tool':
        return 'text-blue-600 bg-blue-100';
      case 'seed':
      case 'seeds':
        return 'text-green-600 bg-green-100';
      case 'fertilizer':
        return 'text-emerald-600 bg-emerald-100';
      case 'pesticide':
        return 'text-orange-600 bg-orange-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const CategoryIcon = getCategoryIcon(product.category);
  const inCart = isInCart(product.id);
  const quantity = getItemQuantity(product.id);

  return (
    <div 
      className="card card-hover group relative overflow-hidden cursor-pointer"
      onClick={handleViewDetails}
    >
      {/* Product Image */}
      <div className="relative overflow-hidden h-40 sm:h-48 bg-gray-100">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop';
          }}
        />
        
        {/* Category Badge */}
        <div className={`absolute top-2 left-2 flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(product.category)}`}>
          <CategoryIcon size={10} className="sm:w-3 sm:h-3" />
          <span className="capitalize hidden sm:inline">{product.category}s</span>
          <span className="capitalize sm:hidden">{product.category.slice(0, 3)}</span>
        </div>
        
        {/* Stock Status */}
        {!product.inStock && (
          <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
            <span className="hidden sm:inline">Out of Stock</span>
            <span className="sm:hidden">Out</span>
          </div>
        )}
        
        {/* Quick Actions - Show on Hover (Desktop) / Always visible (Mobile) */}
        <div className="absolute inset-0 bg-black bg-opacity-40 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-2">
          {product.inStock && (
            <button
              onClick={(e) => {
                e.stopPropagation(); // Prevent card click when clicking add to cart
                handleAddToCart();
              }}
              disabled={isLoading}
              className="bg-green-600 text-white p-2 sm:p-2 rounded-full hover:bg-green-700 active:bg-green-800 transition-colors duration-200 sm:transform sm:hover:scale-110 disabled:opacity-50 touch-target"
              title={inCart ? `In Cart (${quantity})` : 'Add to Cart'}
            >
              {isLoading ? (
                <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <ShoppingCart size={14} className="sm:w-4 sm:h-4" />
              )}
            </button>
          )}
        </div>
      </div>

      {/* Product Info */}
      <div className="p-3 sm:p-4">
        {/* Product Name */}
        <h3 className="font-semibold text-sm sm:text-base text-gray-800 mb-2 line-clamp-2 group-hover:text-green-600 transition-colors duration-200">
          {product.name}
        </h3>
        
        {/* Product Description */}
        <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3 line-clamp-2">
          {product.description}
        </p>
        
        {/* Features */}
        {product.features && product.features.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-2 sm:mb-3">
            {product.features.slice(0, 1).map((feature, index) => (
              <span
                key={index}
                className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full"
              >
                {feature.length > 12 ? `${feature.slice(0, 12)}...` : feature}
              </span>
            ))}
            {product.features.length > 1 && (
              <span className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full">
                +{product.features.length - 1} more
              </span>
            )}
          </div>
        )}
        
        {/* Price and Actions */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex-1">
            <p className="text-lg sm:text-xl font-bold text-green-600">
              {formatPrice(product.price)}
            </p>
            {inCart && (
              <p className="text-xs text-green-600">
                {quantity} in cart
              </p>
            )}
          </div>
          
          {product.inStock ? (
            <button
              onClick={(e) => {
                e.stopPropagation(); // Prevent card click when clicking add to cart
                handleAddToCart();
              }}
              disabled={isLoading}
              className="btn-primary text-xs sm:text-sm flex items-center justify-center space-x-1 disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
            >
              {isLoading ? (
                <>
                  <div className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span className="hidden sm:inline">Adding...</span>
                </>
              ) : (
                <>
                  <ShoppingCart size={14} className="sm:w-4 sm:h-4" />
                  <span className="hidden sm:inline">{inCart ? 'Add More' : 'Add to Cart'}</span>
                  <span className="sm:hidden">{inCart ? '+' : 'Add'}</span>
                </>
              )}
            </button>
          ) : (
            <button
              disabled
              className="btn-secondary text-xs sm:text-sm opacity-50 cursor-not-allowed flex-shrink-0"
            >
              <span className="hidden sm:inline">Out of Stock</span>
              <span className="sm:hidden">Out</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
