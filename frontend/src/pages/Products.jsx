import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, Package, Sprout, Leaf, Zap, Star, X } from 'lucide-react';
import { productsAPI } from '../services/api';
import ProductCard from '../components/ProductCard';
import toast from 'react-hot-toast';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [categories, setCategories] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const navigate = useNavigate();

  // Fetch products on component mount
  useEffect(() => {
    fetchProducts();
  }, []);

  // Filter products when search term or category changes
  useEffect(() => {
    filterProducts();
  }, [products, searchTerm, selectedCategory]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await productsAPI.getAll();
      
      if (response.success) {
        setProducts(response.data.products);
        setCategories(response.data.categories);
      } else {
        toast.error('Failed to fetch products');
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error('Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  const filterProducts = () => {
    let filtered = [...products];

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => 
        product.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Filter by search term
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(search) ||
        product.description.toLowerCase().includes(search) ||
        product.features?.some(feature => feature.toLowerCase().includes(search))
      );
    }

    setFilteredProducts(filtered);
  };

  const handleViewDetails = (product) => {
    navigate(`/product/${product.id}`);
  };


  const getCategoryIcon = (category) => {
    switch (category.toLowerCase()) {
      case 'tool':
        return Package;
      case 'seed':
        return Sprout;
      case 'fertilizer':
        return Leaf;
      case 'pesticide':
        return Zap;
      default:
        return Star;
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="loader w-16 h-16 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 text-white">
        <div className="max-w-7xl mx-auto mobile-container py-12 sm:py-16">
          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">
              🌱 Rythu Dipo
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl mb-2">
              Your Trusted Agricultural Partner
            </p>
            <p className="text-sm sm:text-base text-green-100 max-w-2xl mx-auto">
              Discover high-quality seeds, pesticides, fertilizers, and farming tools 
              to boost your agricultural productivity
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mobile-container py-6 sm:py-8">
        {/* Search and Filter Section */}
        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-6 sm:mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            {/* Search */}
            <div className="flex-1 max-w-full lg:max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="input-field pl-10 pr-10 text-base"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 touch-target"
                  >
                    <X className="h-4 w-4 sm:h-5 sm:w-5" />
                  </button>
                )}
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="lg:hidden btn-outline flex items-center justify-center space-x-2"
              >
                <Filter className="h-4 w-4" />
                <span>Filter by Category</span>
              </button>

              <div className={`${isFilterOpen ? 'block' : 'hidden lg:block'} lg:flex lg:items-center lg:space-x-2`}>
                <span className="text-sm font-medium text-gray-700 mb-2 lg:mb-0 block lg:inline">
                  Category:
                </span>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedCategory('all')}
                    className={`px-3 py-2 sm:px-4 sm:py-2 rounded-lg text-sm font-medium transition-colors min-h-[40px] ${
                      selectedCategory === 'all'
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 active:bg-gray-300'
                    }`}
                  >
                    All Products
                  </button>
                  {categories.map((category) => {
                    const CategoryIcon = getCategoryIcon(category);
                    return (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`px-3 py-2 sm:px-4 sm:py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-2 min-h-[40px] ${
                          selectedCategory === category
                            ? 'bg-green-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200 active:bg-gray-300'
                        }`}
                      >
                        <CategoryIcon className="h-4 w-4" />
                        <span className="capitalize">{category}s</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t text-xs sm:text-sm text-gray-600">
            Showing {filteredProducts.length} of {products.length} products
            {searchTerm && (
              <span> for "{searchTerm}"</span>
            )}
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="mobile-grid">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onViewDetails={handleViewDetails}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Package className="h-12 w-12 sm:h-16 sm:w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg sm:text-xl font-medium text-gray-900 mb-2">
              No products found
            </h3>
            <p className="text-sm sm:text-base text-gray-600 mb-4 px-4">
              {searchTerm 
                ? `No products match "${searchTerm}"`
                : 'No products in this category'
              }
            </p>
            {(searchTerm || selectedCategory !== 'all') && (
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                }}
                className="btn-primary"
              >
                Clear Filters
              </button>
            )}
          </div>
        )}

      </div>
    </div>
  );
};

export default Products;
