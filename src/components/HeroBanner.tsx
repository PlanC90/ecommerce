import React, { useState, useEffect } from 'react';
import { Sparkles, Star, Heart, ArrowRight, Shield, Truck, Award, Play, ChevronLeft, ChevronRight } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../utils/translations';
import { supabase } from '../lib/supabase';

interface HeroBannerProps {
  language: Language;
}

interface BannerContent {
  title: string;
  subtitle: string;
  buttonText: string;
  imageUrl: string;
}

const HeroBanner: React.FC<HeroBannerProps> = ({ language }) => {
  const [bannerContent, setBannerContent] = useState<BannerContent>({
    title: language === 'tr' ? 'Doğal Güzelliğinizi' : 'Discover Your',
    subtitle: language === 'tr' ? 'Keşfedin' : 'Natural Beauty',
    buttonText: language === 'tr' ? 'Koleksiyonu İncele' : 'Shop Collection',
    imageUrl: 'https://images.pexels.com/photos/3373736/pexels-photo-3373736.jpeg?auto=compress&cs=tinysrgb&w=800'
  });
  
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  
  const t = (key: string) => translations[key]?.[language] || key;

  // Hero slides data
  const heroSlides = [
    {
      title: language === 'tr' ? 'Doğal Güzelliğinizi' : 'Discover Your',
      subtitle: language === 'tr' ? 'Keşfedin' : 'Natural Beauty',
      description: language === 'tr' ? 'Modern kadın için özenle seçilmiş premium kozmetik ve cilt bakım ürünleri.' : 'Premium cosmetics and skincare products curated for the modern woman.',
      image: 'https://images.pexels.com/photos/3373736/pexels-photo-3373736.jpeg?auto=compress&cs=tinysrgb&w=1200',
      gradient: 'from-pink-600 via-purple-700 to-indigo-800'
    },
    {
      title: language === 'tr' ? 'Lüks Parfüm' : 'Luxury Fragrance',
      subtitle: language === 'tr' ? 'Koleksiyonu' : 'Collection',
      description: language === 'tr' ? 'Eşsiz notalarla hazırlanmış özel parfüm koleksiyonumuz.' : 'Exclusive perfume collection crafted with unique notes.',
      image: 'https://images.pexels.com/photos/1961795/pexels-photo-1961795.jpeg?auto=compress&cs=tinysrgb&w=1200',
      gradient: 'from-purple-600 via-pink-700 to-rose-800'
    },
    {
      title: language === 'tr' ? 'Profesyonel' : 'Professional',
      subtitle: language === 'tr' ? 'Makyaj' : 'Makeup',
      description: language === 'tr' ? 'Uzun süre dayanıklı ve yüksek pigmentli makyaj ürünleri.' : 'Long-lasting and highly pigmented makeup products.',
      image: 'https://images.pexels.com/photos/2533266/pexels-photo-2533266.jpeg?auto=compress&cs=tinysrgb&w=1200',
      gradient: 'from-rose-600 via-pink-700 to-purple-800'
    }
  ];

  useEffect(() => {
    fetchBannerContent();
  }, [language]);

  useEffect(() => {
    if (isAutoPlaying) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isAutoPlaying, heroSlides.length]);

  const fetchBannerContent = async () => {
    try {
      const { data, error } = await supabase
        .from('hero_banner_content')
        .select('*')
        .maybeSingle();

      if (error) throw error;

      if (data) {
        setBannerContent({
          title: language === 'tr' ? data.title_tr : data.title_en,
          subtitle: language === 'tr' ? data.subtitle_tr : data.subtitle_en,
          buttonText: language === 'tr' ? data.button_text_tr : data.button_text_en,
          imageUrl: data.image_url
        });
      }
    } catch (error) {
      console.error('Error fetching banner content:', error);
    }
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
    setIsAutoPlaying(false);
  };

  const currentSlideData = heroSlides[currentSlide];

  return (
    <div className={`relative bg-gradient-to-br ${currentSlideData.gradient} dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 overflow-hidden transition-colors duration-300`}>
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

      {/* Slide Navigation */}
      <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20">
        <button
          onClick={prevSlide}
          className="p-3 bg-white bg-opacity-20 backdrop-blur-sm rounded-full text-white hover:bg-opacity-30 transition-all duration-300"
        >
          <ChevronLeft size={24} />
        </button>
      </div>
      <div className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20">
        <button
          onClick={nextSlide}
          className="p-3 bg-white bg-opacity-20 backdrop-blur-sm rounded-full text-white hover:bg-opacity-30 transition-all duration-300"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setCurrentSlide(index);
              setIsAutoPlaying(false);
            }}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? 'bg-white' : 'bg-white bg-opacity-50'
            }`}
          />
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[50vh]">
          {/* Content */}
          <div className="text-center lg:text-left space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 bg-white bg-opacity-20 backdrop-blur-sm rounded-full text-white text-xs font-medium shadow-lg">
              <Shield className="mr-2" size={16} />
              Premium Quality Guaranteed
            </div>

            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
                {language === 'tr' ? bannerContent.title : bannerContent.title}
                <span className="block bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 bg-clip-text text-transparent animate-gradient">
                  {language === 'tr' ? bannerContent.subtitle : bannerContent.subtitle}
                </span>
              </h1>
              <p className="text-lg sm:text-xl text-pink-100 max-w-2xl leading-relaxed">
                {currentSlideData.description}
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button className="group bg-white text-pink-600 px-8 py-3 rounded-xl font-bold text-lg hover:bg-pink-50 transition-all duration-300 transform hover:scale-105 shadow-2xl flex items-center justify-center space-x-3">
                <span>{language === 'tr' ? bannerContent.buttonText : bannerContent.buttonText}</span>
                <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-xl font-bold text-lg hover:bg-white hover:text-pink-600 transition-all duration-300 backdrop-blur-sm flex items-center justify-center space-x-3">
                <Play size={18} />
                <span>{t('watchVideo')}</span>
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap gap-6 justify-center lg:justify-start pt-4">
              <div className="flex items-center space-x-3 text-pink-100">
                <Truck size={20} />
                <span className="font-medium">{t('freeShipping')}</span>
              </div>
              <div className="flex items-center space-x-3 text-pink-100">
                <Shield size={20} />
                <span className="font-medium">Secure Payment</span>
              </div>
              <div className="flex items-center space-x-3 text-pink-100">
                <Award size={20} />
                <span className="font-medium">Premium Quality</span>
              </div>
            </div>
          </div>

          {/* Hero Visual */}
          <div className="relative">
            {/* Main Product Image */}
            <div className="relative z-10 group">
              <div className="relative overflow-hidden rounded-3xl shadow-2xl transform group-hover:scale-105 transition-transform duration-500">
                <img
                  src={language === 'tr' ? bannerContent.imageUrl : bannerContent.imageUrl}
                  alt="Premium Cosmetics"
                  className="w-full h-64 sm:h-80 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                
                {/* Video Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <button className="w-16 h-16 bg-white bg-opacity-20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-opacity-30 transition-all duration-300 transform hover:scale-110">
                    <Play size={24} className="ml-1" />
                  </button>
                </div>
              </div>
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
