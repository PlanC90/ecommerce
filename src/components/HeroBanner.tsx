import React from 'react';
import { Sparkles, Star, Heart } from 'lucide-react';

const HeroBanner: React.FC = () => {
  return (
    <div className="relative bg-gradient-to-r from-pink-600 via-purple-600 to-pink-700 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 animate-pulse">
          <Sparkles size={24} className="text-white" />
        </div>
        <div className="absolute top-20 right-20 animate-pulse delay-300">
          <Star size={20} className="text-white" />
        </div>
        <div className="absolute bottom-20 left-20 animate-pulse delay-700">
          <Heart size={18} className="text-white" />
        </div>
        <div className="absolute bottom-10 right-10 animate-pulse delay-500">
          <Sparkles size={22} className="text-white" />
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Discover Your
              <span className="block bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text text-transparent">
                Natural Beauty
              </span>
            </h1>
            <p className="text-xl text-pink-100 mb-8 max-w-lg">
              Premium cosmetics and skincare products curated for the modern woman. 
              Pay securely with MEMEXSOL through Phantom Wallet.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button className="bg-white text-pink-600 px-8 py-4 rounded-full font-semibold hover:bg-pink-50 transition-all duration-300 transform hover:scale-105 shadow-lg">
                Shop Collection
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-pink-600 transition-all duration-300">
                Learn More
              </button>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="relative z-10">
              <img
                src="https://images.pexels.com/photos/3373736/pexels-photo-3373736.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Premium Cosmetics"
                className="w-full h-96 object-cover rounded-2xl shadow-2xl"
              />
            </div>
            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 bg-yellow-400 text-gray-900 px-4 py-2 rounded-full font-semibold shadow-lg animate-bounce">
              50% OFF
            </div>
            <div className="absolute -bottom-4 -left-4 bg-white text-pink-600 px-6 py-3 rounded-full font-semibold shadow-lg">
              Free Shipping
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white bg-opacity-10 backdrop-blur-sm border-t border-white border-opacity-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-white mb-2">10K+</div>
              <div className="text-pink-100">Happy Customers</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white mb-2">500+</div>
              <div className="text-pink-100">Premium Products</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white mb-2">24/7</div>
              <div className="text-pink-100">Customer Support</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white mb-2">99%</div>
              <div className="text-pink-100">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;