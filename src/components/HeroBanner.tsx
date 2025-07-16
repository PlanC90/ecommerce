import React from 'react';
import { Sparkles, Star, Heart, ArrowRight, Shield, Truck, Award } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../utils/translations';

interface HeroBannerProps {
  language: Language;
}

const HeroBanner: React.FC<HeroBannerProps> = ({ language }) => {
  const t = (key: string) => translations[key]?.[language] || key;

  return (
    <div className="relative bg-gradient-to-br from-pink-600 via-purple-700 to-indigo-800 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Floating Particles */}
        <div className="absolute top-20 left-10 w-2 h-2 bg-white rounded-full animate-pulse opacity-60"></div>
        <div className="absolute top-40 right-20 w-3 h-3 bg-pink-300 rounded-full animate-bounce delay-300"></div>
        <div className="absolute bottom-32 left-20 w-2 h-2 bg-purple-300 rounded-full animate-pulse delay-700"></div>
        <div className="absolute bottom-20 right-10 w-4 h-4 bg-white rounded-full animate-bounce delay-500"></div>
        
        {/* Gradient Orbs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-400 to-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-1000"></div>
        
        {/* Decorative Icons */}
        <div className="absolute top-16 left-16 animate-float">
          <Sparkles size={28} className="text-yellow-300 opacity-80" />
        </div>
        <div className="absolute top-32 right-24 animate-float delay-300">
          <Star size={24} className="text-pink-300 opacity-70" />
        </div>
        <div className="absolute bottom-40 left-24 animate-float delay-700">
          <Heart size={22} className="text-red-300 opacity-80" />
        </div>
        <div className="absolute bottom-24 right-16 animate-float delay-500">
          <Award size={26} className="text-yellow-300 opacity-70" />
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="text-center lg:text-left space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 bg-white bg-opacity-20 backdrop-blur-sm rounded-full text-white text-sm font-medium">
              <Shield className="mr-2" size={16} />
              Premium Quality Guaranteed
            </div>

            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight">
                {t('heroTitle')}
                <span className="block bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 bg-clip-text text-transparent animate-gradient">
                  {t('heroSubtitle')}
                </span>
              </h1>
              <p className="text-xl sm:text-2xl text-pink-100 max-w-2xl leading-relaxed">
                {t('heroDescription')}
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
              <button className="group bg-white text-pink-600 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-pink-50 transition-all duration-300 transform hover:scale-105 shadow-2xl flex items-center justify-center space-x-2">
                <span>{t('shopCollection')}</span>
                <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-white hover:text-pink-600 transition-all duration-300 backdrop-blur-sm">
                {t('learnMore')}
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap gap-6 justify-center lg:justify-start pt-4">
              <div className="flex items-center space-x-2 text-pink-100">
                <Truck size={20} />
                <span className="text-sm font-medium">{t('freeShipping')}</span>
              </div>
              <div className="flex items-center space-x-2 text-pink-100">
                <Shield size={20} />
                <span className="text-sm font-medium">Secure Payment</span>
              </div>
              <div className="flex items-center space-x-2 text-pink-100">
                <Award size={20} />
                <span className="text-sm font-medium">Premium Quality</span>
              </div>
            </div>
          </div>

          {/* Hero Visual */}
          <div className="relative">
            {/* Main Product Image */}
            <div className="relative z-10 group">
              <div className="relative overflow-hidden rounded-3xl shadow-2xl transform group-hover:scale-105 transition-transform duration-500">
                <img
                  src="https://images.pexels.com/photos/3373736/pexels-photo-3373736.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Premium Cosmetics"
                  className="w-full h-96 sm:h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
            </div>

            {/* Floating Product Cards */}
            <div className="absolute -top-8 -right-8 bg-white rounded-2xl p-4 shadow-xl animate-float z-20">
              <div className="flex items-center space-x-3">
                <img
                  src="https://images.pexels.com/photos/2533266/pexels-photo-2533266.jpeg?auto=compress&cs=tinysrgb&w=100"
                  alt="Product"
                  className="w-12 h-12 object-cover rounded-xl"
                />
                <div>
                  <p className="text-sm font-semibold text-gray-900">Luxury Serum</p>
                  <p className="text-xs text-pink-600 font-bold">150 MEMEXSOL</p>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-8 -left-8 bg-white rounded-2xl p-4 shadow-xl animate-float delay-500 z-20">
              <div className="text-center">
                <div className="text-2xl font-bold text-pink-600">4.9★</div>
                <div className="text-xs text-gray-600">Customer Rating</div>
              </div>
            </div>

            {/* Discount Badge */}
            <div className="absolute top-4 left-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-6 py-3 rounded-2xl font-bold shadow-lg animate-bounce z-20">
              <div className="text-lg">50% OFF</div>
              <div className="text-xs">Limited Time</div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Stats Section */}
      <div className="relative bg-white bg-opacity-10 backdrop-blur-md border-t border-white border-opacity-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center group hover:scale-105 transition-transform duration-300">
              <div className="text-4xl sm:text-5xl font-bold text-white mb-2 group-hover:text-yellow-300 transition-colors">
                15K+
              </div>
              <div className="text-pink-100 font-medium">{t('happyCustomers')}</div>
            </div>
            <div className="text-center group hover:scale-105 transition-transform duration-300">
              <div className="text-4xl sm:text-5xl font-bold text-white mb-2 group-hover:text-yellow-300 transition-colors">
                800+
              </div>
              <div className="text-pink-100 font-medium">{t('premiumProducts')}</div>
            </div>
            <div className="text-center group hover:scale-105 transition-transform duration-300">
              <div className="text-4xl sm:text-5xl font-bold text-white mb-2 group-hover:text-yellow-300 transition-colors">
                24/7
              </div>
              <div className="text-pink-100 font-medium">{t('customerSupport')}</div>
            </div>
            <div className="text-center group hover:scale-105 transition-transform duration-300">
              <div className="text-4xl sm:text-5xl font-bold text-white mb-2 group-hover:text-yellow-300 transition-colors">
                99.5%
              </div>
              <div className="text-pink-100 font-medium">{t('satisfactionRate')}</div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </div>
  );
};

export default HeroBanner;