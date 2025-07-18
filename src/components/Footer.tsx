import React from 'react';
import { Heart, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube, CreditCard, Shield, Truck, Award } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../utils/translations';

interface FooterProps {
  language: Language;
}

const Footer: React.FC<FooterProps> = ({ language }) => {
  const t = (key: string) => translations[key]?.[language] || key;

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-black dark:from-gray-950 dark:via-gray-900 dark:to-black text-white transition-colors duration-300">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <img
                src="https://apricot-rational-booby-281.mypinata.cloud/ipfs/bafkreic3xn3bc43ziabhzdqjj3v5e6f7w6r2yl64fuezsz3frkowa2e3di"
                alt="Shop Memex Logo"
                className="h-10 w-auto"
              />
              <h3 className="text-2xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                Shop Memex
              </h3>
            </div>
            <p className="text-gray-300 leading-relaxed">
              {language === 'tr' 
                ? 'Modern kadın için özenle seçilmiş premium kozmetik ve cilt bakım ürünleri. Phantom Wallet ile güvenli MEMEXSOL ödemesi.'
                : 'Premium cosmetics and skincare products curated for the modern woman. Pay securely with MEMEXSOL through Phantom Wallet.'
              }
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-gradient-to-r from-pink-600 to-purple-600 rounded-full flex items-center justify-center hover:from-pink-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-110">
                <Facebook size={20} />
              </a>
              <a href="#" className="w-10 h-10 bg-gradient-to-r from-pink-600 to-purple-600 rounded-full flex items-center justify-center hover:from-pink-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-110">
                <Twitter size={20} />
              </a>
              <a href="#" className="w-10 h-10 bg-gradient-to-r from-pink-600 to-purple-600 rounded-full flex items-center justify-center hover:from-pink-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-110">
                <Instagram size={20} />
              </a>
              <a href="#" className="w-10 h-10 bg-gradient-to-r from-pink-600 to-purple-600 rounded-full flex items-center justify-center hover:from-pink-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-110">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-white">
              {language === 'tr' ? 'Hızlı Linkler' : 'Quick Links'}
            </h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-300 hover:text-pink-400 transition-colors duration-300 flex items-center space-x-2">
                  <span>{t('home')}</span>
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-pink-400 transition-colors duration-300 flex items-center space-x-2">
                  <span>{t('products')}</span>
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-pink-400 transition-colors duration-300 flex items-center space-x-2">
                  <span>{language === 'tr' ? 'Hakkımızda' : 'About Us'}</span>
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-pink-400 transition-colors duration-300 flex items-center space-x-2">
                  <span>{language === 'tr' ? 'İletişim' : 'Contact'}</span>
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-pink-400 transition-colors duration-300 flex items-center space-x-2">
                  <span>{language === 'tr' ? 'Blog' : 'Blog'}</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-white">
              {language === 'tr' ? 'Kategoriler' : 'Categories'}
            </h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-300 hover:text-pink-400 transition-colors duration-300">
                  {t('skincare')}
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-pink-400 transition-colors duration-300">
                  {t('makeup')}
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-pink-400 transition-colors duration-300">
                  {t('fragrance')}
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-pink-400 transition-colors duration-300">
                  {language === 'tr' ? 'Yeni Ürünler' : 'New Arrivals'}
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-pink-400 transition-colors duration-300">
                  {language === 'tr' ? 'İndirimli Ürünler' : 'Sale Items'}
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-white">
              {language === 'tr' ? 'İletişim' : 'Contact Info'}
            </h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="text-pink-400 mt-1 flex-shrink-0" size={18} />
                <div className="text-gray-300">
                  <p>123 Beauty Street</p>
                  <p>Istanbul, Turkey 34000</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="text-pink-400 flex-shrink-0" size={18} />
                <span className="text-gray-300">+90 555 123 4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="text-pink-400 flex-shrink-0" size={18} />
                <span className="text-gray-300">info@shopmemex.com</span>
              </div>
            </div>

            {/* Newsletter */}
            <div className="space-y-3">
              <h5 className="font-medium text-white">
                {language === 'tr' ? 'Bülten' : 'Newsletter'}
              </h5>
              <div className="flex">
                <input
                  type="email"
                  placeholder={language === 'tr' ? 'E-posta adresiniz' : 'Your email address'}
                  className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent text-white placeholder-gray-400"
                />
                <button className="px-4 py-2 bg-gradient-to-r from-pink-600 to-purple-600 rounded-r-lg hover:from-pink-700 hover:to-purple-700 transition-all duration-300">
                  <Mail size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="border-t border-gray-800 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex items-center space-x-3 text-gray-300">
              <Truck className="text-green-400" size={24} />
              <div>
                <p className="font-medium text-white">{t('freeShipping')}</p>
                <p className="text-sm text-gray-400">
                  {language === 'tr' ? '500+ MEMEXSOL üzeri' : 'Orders over 500 MEMEXSOL'}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3 text-gray-300">
              <Shield className="text-blue-400" size={24} />
              <div>
                <p className="font-medium text-white">
                  {language === 'tr' ? 'Güvenli Ödeme' : 'Secure Payment'}
                </p>
                <p className="text-sm text-gray-400">Phantom Wallet</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 text-gray-300">
              <Award className="text-yellow-400" size={24} />
              <div>
                <p className="font-medium text-white">
                  {language === 'tr' ? 'Premium Kalite' : 'Premium Quality'}
                </p>
                <p className="text-sm text-gray-400">
                  {language === 'tr' ? 'Garantili ürünler' : 'Guaranteed products'}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3 text-gray-300">
              <CreditCard className="text-purple-400" size={24} />
              <div>
                <p className="font-medium text-white">MEMEXSOL</p>
                <p className="text-sm text-gray-400">
                  {language === 'tr' ? 'Kripto ödeme' : 'Crypto payments'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 dark:border-gray-700 bg-black dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2 text-gray-400">
              <span>© 2024 Shop Memex.</span>
              <span>{language === 'tr' ? 'Tüm hakları saklıdır.' : 'All rights reserved.'}</span>
              <Heart className="text-pink-400" size={16} />
            </div>
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <a href="#" className="hover:text-pink-400 transition-colors">
                {language === 'tr' ? 'Gizlilik Politikası' : 'Privacy Policy'}
              </a>
              <a href="#" className="hover:text-pink-400 transition-colors">
                {language === 'tr' ? 'Kullanım Şartları' : 'Terms of Service'}
              </a>
              <a href="#" className="hover:text-pink-400 transition-colors">
                {language === 'tr' ? 'Çerezler' : 'Cookies'}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
