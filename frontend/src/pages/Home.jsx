import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowRight, 
  Truck, 
  Shield, 
  Users, 
  Star,
  Sprout,
  Package,
  Leaf,
  Target,
  Award,
  Phone,
  Mail,
  MapPin
} from 'lucide-react';
import { productsAPI } from '../services/api';
import ProductCard from '../components/ProductCard';
import toast from 'react-hot-toast';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  const fetchFeaturedProducts = async () => {
    try {
      const response = await productsAPI.getAll();
      if (response.success) {
        // Get first 8 products as featured
        setFeaturedProducts(response.data.products.slice(0, 8));
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleViewAllProducts = () => {
    navigate('/products');
  };

  const handleViewProduct = (product) => {
    navigate(`/product/${product.id}`);
  };

  const features = [
    {
      icon: Shield,
      title: 'Quality Assured',
      description: 'All products are tested and certified for maximum effectiveness and safety.'
    },
    {
      icon: Truck,
      title: 'Fast Delivery',
      description: 'Quick and reliable delivery to your doorstep across India.'
    },
    {
      icon: Users,
      title: 'Expert Support',
      description: 'Get guidance from agricultural experts for better crop management.'
    },
    {
      icon: Award,
      title: 'Trusted Brand',
      description: 'Over 1000+ satisfied farmers trust our products and services.'
    }
  ];

  const stats = [
    { number: '1000+', label: 'Happy Farmers' },
    { number: '200+', label: 'Products' },
    { number: '800+', label: 'Villages Served' },
    { number: '4+', label: 'Years Experience' }
  ];

  return (
    <div className="min-h-screen bg-white">
      
      {/* Hero Section */}
    <section className="relative bg-gradient-to-br from-green-600 via-green-700 to-green-800 text-white overflow-hidden">
  <div className="absolute inset-0 bg-black opacity-10"></div>

  {/* Background Pattern */}
  <div
    className="absolute inset-0 opacity-10"
    style={{
      backgroundImage: `url("/bg-pattern.svg")`,
      backgroundRepeat: "repeat",
    }}
  ></div>

  <div className="relative max-w-7xl mx-auto px-4 py-16 sm:py-20 lg:py-32">
    <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
      
      {/* Left Column - Text */}
      <div className="text-center lg:text-left">
        <div className="inline-flex items-center bg-green-500 bg-opacity-20 rounded-full px-3 py-2 sm:px-4 sm:py-2 mb-6">
          <Sprout className="h-5 w-5 mr-2" aria-hidden="true" />
          <span className="text-sm font-medium">Trusted by 1000+ Farmers</span>
        </div>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
          Welcome to Rythu Dipo
          <span className="block text-green-200 mt-2">
            🌱
          </span>
        </h1>

        <p className="text-lg lg:text-xl text-green-50 mb-8 max-w-lg mx-auto lg:mx-0">
          Discover the finest selection of fresh fruits, vegetables, and farm products delivered straight from local farmers to your doorstep.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
          <button
            onClick={handleViewAllProducts}
            aria-label="Shop Now"
            className="bg-white text-green-700 px-6 py-3 rounded-lg font-medium text-base 
                       hover:bg-green-50 active:bg-green-100 transition flex items-center justify-center group"
          >
            Shop Now
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Right Column - Features */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-10 lg:mt-0">
        <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
          <Package className="h-8 w-8 mb-3 text-green-200" aria-hidden="true" />
          <h3 className="font-semibold text-lg mb-2">Premium Products</h3>
          <p className="text-green-50 text-sm">High-quality pesticides and fertilizers</p>
        </div>

        <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
          <Leaf className="h-8 w-8 mb-3 text-green-200" aria-hidden="true" />
          <h3 className="font-semibold text-lg mb-2">Organic Solutions</h3>
          <p className="text-green-50 text-sm">Eco-friendly farming solutions</p>
        </div>

        <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
          <Target className="h-8 w-8 mb-3 text-green-200" aria-hidden="true" />
          <h3 className="font-semibold text-lg mb-2">Expert Guidance</h3>
          <p className="text-green-50 text-sm">Agricultural expertise at your service</p>
        </div>

        <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
          <Truck className="h-8 w-8 mb-3 text-green-200" aria-hidden="true" />
          <h3 className="font-semibold text-lg mb-2">Fast Delivery</h3>
          <p className="text-green-50 text-sm">Quick delivery across UttaraAndhra</p>
        </div>
      </div>
    </div>
  </div>
</section>


      {/* Stats Section */} 
      <section className="bg-gray-50 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto mobile-container">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-green-600 mb-1 sm:mb-2">
                  {stat.number}
                </div>
                <div className="text-xs sm:text-sm md:text-base text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="mobile-section bg-white">
        <div className="max-w-7xl mx-auto mobile-container">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="mobile-heading font-bold text-gray-900 mb-3 sm:mb-4">
              Why Choose Rythu Dipo?
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              We're committed to supporting farmers with quality products, expert advice, and reliable service.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {features.map((feature, index) => (
              <div key={index} className="group text-center">
                <div className="bg-green-100 w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 
                               group-hover:bg-green-200 transition-colors duration-300">
                  <feature.icon className="h-6 w-6 sm:h-8 sm:w-8 text-green-600" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">{feature.title}</h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="mobile-section bg-gray-50">
        <div className="max-w-7xl mx-auto mobile-container">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8 sm:mb-12">
            <div className="text-center lg:text-left">
              <h2 className="mobile-heading font-bold text-gray-900 mb-3 sm:mb-4">
                Featured Products
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-gray-600">
                Discover our most popular agricultural products
              </p>
            </div>
            
            <button 
              onClick={handleViewAllProducts}
              className="mt-4 sm:mt-6 lg:mt-0 bg-green-600 hover:bg-green-700 text-white px-4 py-2 sm:px-5 sm:py-3 rounded-lg font-medium text-sm sm:text-base transition-colors duration-300 flex items-center justify-center space-x-2 w-full sm:w-auto"
            >
              <span>View All Products</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          {loading ? (
            <div className="mobile-grid">
              {[...Array(8)].map((_, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md animate-pulse">
                  <div className="h-40 sm:h-48 bg-gray-200 rounded-t-lg"></div>
                  <div className="p-3 sm:p-4">
                    <div className="h-3 sm:h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-2 sm:h-3 bg-gray-200 rounded mb-3 sm:mb-4"></div>
                    <div className="h-5 sm:h-6 bg-gray-200 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="mobile-grid">
              {featuredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onViewDetails={handleViewProduct}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            {/* Left Column - Text */}
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Supporting Indian Agriculture
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                At Rythu Dipo, we understand the challenges faced by modern farmers. Our mission is to 
                provide high-quality agricultural products and expert guidance to help farmers achieve 
                better yields and sustainable farming practices.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                With over 5 years of experience in the agricultural sector, we've built strong 
                relationships with farmers across India, helping them grow better crops and improve 
                their livelihoods.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => navigate('/products')}
                  className="btn-primary"
                >
                  Explore Products
                </button>
              </div>
            </div>

            {/* Right Column - Info Cards */}
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-6 border border-green-200">
                <div className="flex items-start space-x-4">
                  <div className="bg-green-500 rounded-lg p-3">
                    <Sprout className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Premium Quality</h3>
                    <p className="text-gray-600">
                      All products are sourced from trusted manufacturers and undergo strict quality checks.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-500 rounded-lg p-3">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Expert Support</h3>
                    <p className="text-gray-600">
                      Our team of agricultural experts provides personalized guidance for your farming needs.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl p-6 border border-orange-200">
                <div className="flex items-start space-x-4">
                  <div className="bg-orange-500 rounded-lg p-3">
                    <Truck className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Citywide Delivery</h3>
                    <p className="text-gray-600">
                      Fast and reliable delivery service covering all major agricultural regions in Uttara Andhra.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
          </div>
  );
};

export default Home;
