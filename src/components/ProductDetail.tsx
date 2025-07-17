import React, { useState } from 'react';
import { ArrowLeft, ShoppingCart, Star, Heart, Share2, Truck, Shield, Award, Plus, Minus } from 'lucide-react';
import { Product, Language } from '../types';
import { translations } from '../utils/translations';

interface ProductDetailProps {
  product: Product;
  language: Language;
  onAddToCart: (product: Product, quantity: number) => void;
  onBack: () => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({
  product,
  language,
  onAddToCart,
  onBack
}) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  
  const t = (key: string) => translations[key]?.[language] || key;

  // Mock additional images for the product
  const productImages = [
    product.image,
    'https://images.pexels.com/photos/3373745/pexels-photo-3373745.jpeg?auto=compress&cs=tinysrgb&w=400',
    'https://images.pexels.com/photos/3373714/pexels-photo-3373714.jpeg?auto=compress&cs=tinysrgb&w=400',
    'https://images.pexels.com/photos/2533266/pexels-photo-2533266.jpeg?auto=compress&cs=tinysrgb&w=400'
  ];

  const handleAddToCart = () => {
    onAddToCart(product, quantity);
  };

  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= product.stock) {
      setQuantity(newQuantity);
    }
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
        // Fallback to clipboard if share fails (e.g., user cancels, permission denied)
        if (navigator.clipboard) {
          await navigator.clipboard.writeText(window.location.href);
          alert('Product link copied to clipboard!');
        } else {
          alert('Sharing and clipboard copy not supported in this browser.');
        }
      }
    } else if (navigator.clipboard) {
      await navigator.clipboard.writeText(window.location.href);
      alert('Product link copied to clipboard!');
    } else {
      alert('Sharing and clipboard copy not supported in this browser.');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="flex items-center space-x-2 text-gray-600 hover:text-pink-600 mb-8 transition-colors"
      >
        <ArrowLeft size={20} />
        <span>{t('backToProducts')}</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Images */}
        <div className="space-y-4">
          {/* Main Image */}
          <div className="relative overflow-hidden rounded-2xl shadow-lg">
            <img
              src={productImages[selectedImage]}
              alt={product.name}
              className="w-full h-96 sm:h-[500px] object-cover"
            />
            {product.stock < 10 && (
              <div className="absolute top-4 left-4 bg-red-500 text-white text-sm px-3 py-1 rounded-full">
                {t('lowStock')}
              </div>
            )}
            <button
              onClick={() => setIsFavorite(!isFavorite)}
              className={`absolute top-4 right-4 p-3 rounded-full shadow-lg transition-all ${
                isFavorite ? 'bg-pink-600 text-white' : 'bg-white text-gray-600 hover:text-pink-600'
              }`}
            >
              <Heart size={20} className={isFavorite ? 'fill-current' : ''} />
            </button>
          </div>

          {/* Thumbnail Images */}
          <div className="flex space-x-2 overflow-x-auto">
            {productImages.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                  selectedImage === index ? 'border-pink-600' : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <img
                  src={image}
                  alt={`${product.name} ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          {/* Category & Rating */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-pink-600 font-medium uppercase tracking-wide">
              {t(product.category)}
            </span>
            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="text-yellow-400 fill-current" size={16} />
              ))}
              <span className="text-sm text-gray-600 ml-2">(4.8)</span>
            </div>
          </div>

          {/* Product Name */}
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">{product.name}</h1>

          {/* Price */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span className="text-3xl font-bold text-pink-600">{product.price}</span>
              <span className="text-lg text-gray-500">MEMEXSOL</span>
            </div>
            <div className="text-sm text-gray-500">
              {product.stock} {t('inStock')}
            </div>
          </div>

          {/* Description */}
          <div className="prose prose-gray">
            <p className="text-gray-700 leading-relaxed">{product.description}</p>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Truck className="text-pink-600" size={16} />
              <span>{t('freeShipping')}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Shield className="text-green-600" size={16} />
              <span>Secure Payment</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Award className="text-blue-600" size={16} />
              <span>Premium Quality</span>
            </div>
          </div>

          {/* Quantity Selector */}
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium text-gray-700">{t('quantity')}:</span>
              <div className="flex items-center space-x-3 bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                  className="p-2 rounded-md hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Minus size={16} />
                </button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <button
                  onClick={() => handleQuantityChange(1)}
                  disabled={quantity >= product.stock}
                  className="p-2 rounded-md hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            {/* Total Price */}
            <div className="text-lg font-semibold text-gray-900">
              {t('total')}: <span className="text-pink-600">{product.price * quantity} MEMEXSOL</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-gradient-to-r from-pink-600 to-purple-600 text-white py-4 px-8 rounded-xl hover:from-pink-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 flex items-center justify-center space-x-2 font-medium"
            >
              <ShoppingCart size={20} />
              <span>{t('addToCart')}</span>
            </button>
            <button
              onClick={handleShare}
              className="px-6 py-4 border-2 border-gray-300 text-gray-700 rounded-xl hover:border-pink-600 hover:text-pink-600 transition-all duration-200 flex items-center justify-center space-x-2"
            >
              <Share2 size={20} />
              <span>{t('share')}</span>
            </button>
          </div>

          {/* Product Details */}
          <div className="bg-gray-50 rounded-xl p-6 space-y-4">
            <h3 className="font-semibold text-gray-900">{t('productDetails')}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">{t('category')}:</span>
                <span className="ml-2 font-medium capitalize">{t(product.category)}</span>
              </div>
              <div>
                <span className="text-gray-600">{t('stockQuantity')}:</span>
                <span className="ml-2 font-medium">{product.stock}</span>
              </div>
              <div>
                <span className="text-gray-600">Brand:</span>
                <span className="ml-2 font-medium">LuxeCosmetics</span>
              </div>
              <div>
                <span className="text-gray-600">Origin:</span>
                <span className="ml-2 font-medium">Premium Collection</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
