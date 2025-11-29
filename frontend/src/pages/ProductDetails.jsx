import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  ShoppingCart, 
  Star, 
  Package, 
  Shield, 
  Truck, 
  CheckCircle,
  Plus,
  Minus,
  Heart,
  Share2,
  Sprout,
  Leaf,
  Zap
} from 'lucide-react';
import { productsAPI } from '../services/api';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const { addToCart, isInCart, getItemQuantity } = useCart();

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await productsAPI.getById(id);
      
      if (response.success) {
        setProduct(response.data.product);
      } else {
        toast.error('Product not found');
        navigate('/');
      }
    } catch (error) {
      console.error('Error fetching product:', error);
      toast.error('Failed to load product details');
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleAddToCart = () => {
    if (!product) return;
    
    addToCart(product, quantity);
    setQuantity(1); // Reset quantity after adding
  };

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity < 1) return;
    setQuantity(newQuantity);
  };

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    toast.success(
      isWishlisted 
        ? 'Removed from wishlist' 
        : 'Added to wishlist'
    );
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: product.description,
          url: window.location.href,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      toast.success('Product link copied to clipboard!');
    }
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="loader w-16 h-16 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return null;
  }

  const CategoryIcon = getCategoryIcon(product.category);
  const inCart = isInCart(product.id);
  const cartQuantity = getItemQuantity(product.id);

  // Mock additional images (in a real app, these would come from the product data)
  const productImages = [
    product.image,
    product.image, // In a real app, you'd have multiple unique images
    product.image,
    product.image
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 mb-8 text-sm">
          <Link to="/" className="text-green-600 hover:text-green-500 transition-colors">
            Products
          </Link>
          <span className="text-gray-400">/</span>
          <span className="text-gray-600 capitalize">{product.category}s</span>
          <span className="text-gray-400">/</span>
          <span className="text-gray-900 font-medium truncate">{product.name}</span>
        </nav>

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center text-green-600 hover:text-green-500 transition-colors mb-8"
        >
          <ArrowLeft className="h-5 w-5 mr-1" />
          Back to Products
        </button>

        <div className="lg:grid lg:grid-cols-12 lg:gap-12">
          {/* Product Images */}
          <div className="lg:col-span-6">
            <div className="space-y-4">
              {/* Main Image */}
              <div className="aspect-square bg-white rounded-lg overflow-hidden shadow-md">
                <img
                  src={productImages[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&h=600&fit=crop';
                  }}
                />
              </div>
              
              {/* Thumbnail Images */}
              <div className="grid grid-cols-4 gap-4">
                {productImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square bg-white rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === index 
                        ? 'border-green-500 ring-2 ring-green-200' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} view ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Product Information */}
          <div className="lg:col-span-6 mt-8 lg:mt-0">
            <div className="space-y-6">
              {/* Product Header */}
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(product.category)}`}>
                    <CategoryIcon className="h-4 w-4 mr-1" />
                    <span className="capitalize">{product.category}</span>
                  </span>
                  
                  {product.inStock ? (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      In Stock
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
                      Out of Stock
                    </span>
                  )}
                </div>
                
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
                
                {/* Rating (Mock) */}
                <div className="flex items-center space-x-2 mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">(4.2 out of 5)</span>
                  <span className="text-sm text-gray-400">•</span>
                  <span className="text-sm text-gray-600">127 reviews</span>
                </div>

                <div className="flex items-center space-x-4 mb-6">
                  <span className="text-4xl font-bold text-green-600">
                    {formatPrice(product.price)}
                  </span>
                  {inCart && (
                    <span className="text-sm text-green-600 bg-green-100 px-3 py-1 rounded-full">
                      {cartQuantity} in cart
                    </span>
                  )}
                </div>
              </div>

              {/* Product Description */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Description</h3>
                <p className="text-gray-600 leading-relaxed">{product.description}</p>
              </div>

              {/* Product Features */}
              {product.features && product.features.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Key Features</h3>
                  <ul className="space-y-2">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Quantity and Actions */}
              {product.inStock && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Quantity
                    </label>
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center border border-gray-300 rounded-lg">
                        <button
                          onClick={() => handleQuantityChange(quantity - 1)}
                          className="p-3 hover:bg-gray-100 transition-colors"
                          disabled={quantity <= 1}
                        >
                          <Minus className="h-4 w-4 text-gray-600" />
                        </button>
                        <span className="px-4 py-3 min-w-[4rem] text-center font-medium">
                          {quantity}
                        </span>
                        <button
                          onClick={() => handleQuantityChange(quantity + 1)}
                          className="p-3 hover:bg-gray-100 transition-colors"
                        >
                          <Plus className="h-4 w-4 text-gray-600" />
                        </button>
                      </div>
                      <span className="text-sm text-gray-600">
                        Total: {formatPrice(product.price * quantity)}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <button
                      onClick={handleAddToCart}
                      className="flex-1 btn-primary text-lg py-4 flex items-center justify-center space-x-2"
                    >
                      <ShoppingCart className="h-5 w-5" />
                      <span>
                        {inCart ? 'Add More to Cart' : 'Add to Cart'}
                      </span>
                    </button>
                    
                    <button
                      onClick={handleWishlist}
                      className={`p-4 border-2 rounded-lg transition-all ${
                        isWishlisted
                          ? 'border-red-500 bg-red-50 text-red-600'
                          : 'border-gray-300 hover:border-red-500 hover:bg-red-50 hover:text-red-600'
                      }`}
                      title={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
                    >
                      <Heart className={`h-5 w-5 ${isWishlisted ? 'fill-current' : ''}`} />
                    </button>
                    
                    <button
                      onClick={handleShare}
                      className="p-4 border-2 border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 hover:text-blue-600 transition-all"
                      title="Share product"
                    >
                      <Share2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              )}

              {/* Product Info Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6">
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <div className="flex items-center space-x-2">
                    <Truck className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-800">Free Delivery</p>
                      <p className="text-xs text-gray-600">On all orders</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <div className="flex items-center space-x-2">
                    <Shield className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-800">Quality Assured</p>
                      <p className="text-xs text-gray-600">Genuine products</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <div className="flex items-center space-x-2">
                    <Package className="h-5 w-5 text-purple-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-800">COD Available</p>
                      <p className="text-xs text-gray-600">Pay on delivery</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Information Sections */}
        <div className="mt-16 space-y-8">
          {/* Product Specifications */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Product Specifications</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-800 mb-3">General Information</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Category:</span>
                    <span className="font-medium capitalize">{product.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Brand:</span>
                    <span className="font-medium">Rythu Dipo</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Model:</span>
                    <span className="font-medium">{product.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Availability:</span>
                    <span className={`font-medium ${
                      product.inStock ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {product.inStock ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-800 mb-3">Usage Guidelines</h4>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li>• Follow manufacturer instructions</li>
                  <li>• Store in cool, dry place</li>
                  <li>• Keep away from children</li>
                  <li>• Use appropriate safety equipment</li>
                  <li>• Check expiry date before use</li>
                </ul>
              </div>
            </div>
          </div>
        
         
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
