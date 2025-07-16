import React, { useState, useEffect } from 'react';
import { ShoppingCart, User, Search, Menu, X, Package, Settings, Home, Plus, Edit, Trash2, Wallet, Calendar, Truck, Globe } from 'lucide-react';
import ProductCard from './components/ProductCard';
import Cart from './components/Cart';
import AdminPanel from './components/AdminPanel';
import WalletConnection from './components/WalletConnection';
import HeroBanner from './components/HeroBanner';
import CheckoutForm from './components/CheckoutForm';
import AdminLogin from './components/AdminLogin';
import OrderManagement from './components/OrderManagement';
import AdminSettings from './components/AdminSettings';
import LanguageSelector from './components/LanguageSelector';
import { Product, CartItem, Order, ShippingAddress, AdminSettings as AdminSettingsType, Language } from './types';
import { translations } from './utils/translations';

function App() {
  const [currentView, setCurrentView] = useState<'home' | 'cart' | 'checkout' | 'admin'>('home');
  const [adminView, setAdminView] = useState<'products' | 'orders' | 'settings'>('products');
  const [language, setLanguage] = useState<Language>('tr');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [adminSettings, setAdminSettings] = useState<AdminSettingsType>({
    shippingCost: 25,
    freeShippingThreshold: 500
  });
  
  const t = (key: string) => translations[key]?.[language] || key;
  
  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      name: 'Luxury Hydrating Serum',
      price: 150,
      image: 'https://images.pexels.com/photos/3373736/pexels-photo-3373736.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'skincare',
      description: 'Advanced hydrating serum with hyaluronic acid and vitamin C for radiant skin.',
      stock: 25
    },
    {
      id: 2,
      name: 'Matte Liquid Lipstick',
      price: 45,
      image: 'https://images.pexels.com/photos/2533266/pexels-photo-2533266.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'makeup',
      description: 'Long-lasting matte liquid lipstick in premium shades.',
      stock: 50
    },
    {
      id: 3,
      name: 'Anti-Aging Night Cream',
      price: 220,
      image: 'https://images.pexels.com/photos/3373745/pexels-photo-3373745.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'skincare',
      description: 'Intensive anti-aging night cream with retinol and peptides.',
      stock: 15
    },
    {
      id: 4,
      name: 'Velvet Foundation',
      price: 85,
      image: 'https://images.pexels.com/photos/3373714/pexels-photo-3373714.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'makeup',
      description: 'Full coverage velvet foundation for all skin types.',
      stock: 30
    },
    {
      id: 5,
      name: 'Luxury Perfume',
      price: 320,
      image: 'https://images.pexels.com/photos/1961795/pexels-photo-1961795.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'fragrance',
      description: 'Exclusive luxury perfume with floral and woody notes.',
      stock: 20
    },
    {
      id: 6,
      name: 'Vitamin C Brightening Mask',
      price: 75,
      image: 'https://images.pexels.com/photos/3373736/pexels-photo-3373736.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'skincare',
      description: 'Brightening face mask with vitamin C and natural extracts.',
      stock: 40
    }
  ]);
  
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');

  // Generate sample orders for demo
  useEffect(() => {
    const sampleOrders: Order[] = [
      {
        id: 'ORD-001',
        items: [
          { ...products[0], quantity: 2 },
          { ...products[1], quantity: 1 }
        ],
        shippingAddress: {
          fullName: 'Ayşe Yılmaz',
          email: 'ayse@example.com',
          phone: '+90 555 123 4567',
          address: 'Bağdat Caddesi No: 123 Daire: 5',
          city: 'Istanbul',
          postalCode: '34000',
          country: 'Turkey'
        },
        subtotal: 345,
        shippingCost: 25,
        total: 370,
        status: 'pending',
        walletAddress: 'EXAMPLEphantomWallet1234567890',
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000) // 2 hours ago
      },
      {
        id: 'ORD-002',
        items: [
          { ...products[2], quantity: 1 },
          { ...products[4], quantity: 1 }
        ],
        shippingAddress: {
          fullName: 'Mehmet Demir',
          email: 'mehmet@example.com',
          phone: '+90 555 987 6543',
          address: 'Istiklal Caddesi No: 456',
          city: 'Ankara',
          postalCode: '06000',
          country: 'Turkey'
        },
        subtotal: 540,
        shippingCost: 0,
        total: 540,
        status: 'shipped',
        walletAddress: 'EXAMPLEphantomWallet0987654321',
        createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000) // 1 day ago
      }
    ];
    setOrders(sampleOrders);
  }, []);

  const categories = [
    { id: 'all', name: t('allProducts') },
    { id: 'skincare', name: t('skincare') },
    { id: 'makeup', name: t('makeup') },
    { id: 'fragrance', name: t('fragrance') }
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const addToCart = (product: Product) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === product.id);
      if (existingItem) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems(prev =>
      prev.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const addProduct = (product: Omit<Product, 'id'>) => {
    const newProduct: Product = {
      ...product,
      id: Math.max(...products.map(p => p.id), 0) + 1
    };
    setProducts(prev => [...prev, newProduct]);
  };

  const updateProduct = (id: number, updatedProduct: Omit<Product, 'id'>) => {
    setProducts(prev =>
      prev.map(product =>
        product.id === id ? { ...updatedProduct, id } : product
      )
    );
  };

  const deleteProduct = (id: number) => {
    setProducts(prev => prev.filter(product => product.id !== id));
  };

  const handleAdminLogin = (password: string) => {
    // Simple password check - in production, use proper authentication
    if (password === 'admin123') {
      setIsAdminAuthenticated(true);
      return true;
    }
    return false;
  };

  const handlePlaceOrder = (shippingAddress: ShippingAddress, total: number) => {
    const newOrder: Order = {
      id: `ORD-${Date.now().toString().slice(-6)}`,
      items: [...cartItems],
      shippingAddress,
      subtotal: cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0),
      shippingCost: total - cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0),
      total,
      status: 'pending',
      walletAddress,
      createdAt: new Date()
    };

    setOrders(prev => [newOrder, ...prev]);
    setCartItems([]);
    setCurrentView('home');
    
    alert(`Order placed successfully! Order ID: ${newOrder.id}`);
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders(prev =>
      prev.map(order =>
        order.id === orderId ? { ...order, status } : order
      )
    );
  };

  const cartTotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartItemsCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Admin view without authentication
  if (currentView === 'admin' && !isAdminAuthenticated) {
    return <AdminLogin onLogin={handleAdminLogin} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                  LuxeCosmetics
                </h1>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              <button
                onClick={() => setCurrentView('home')}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  currentView === 'home'
                    ? 'text-pink-600 bg-pink-50'
                    : 'text-gray-700 hover:text-pink-600 hover:bg-pink-50'
                }`}
              >
                <Home size={16} />
                <span>{t('home')}</span>
              </button>
              <button
                onClick={() => setCurrentView('home')}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  currentView === 'home'
                    ? 'text-pink-600 bg-pink-50'
                    : 'text-gray-700 hover:text-pink-600 hover:bg-pink-50'
                }`}
              >
                <Home size={16} />
                <span>Home</span>
              </button>
              <button
                onClick={() => setCurrentView('cart')}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors relative ${
                  currentView === 'cart'
                    ? 'text-pink-600 bg-pink-50'
                    : 'text-gray-700 hover:text-pink-600 hover:bg-pink-50'
                }`}
              >
                <ShoppingCart size={16} />
                <span>{t('cart')}</span>
                {cartItemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-pink-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItemsCount}
                  </span>
                )}
              </button>
              <button
                onClick={() => {
                  setCurrentView('admin');
                  setIsAdminAuthenticated(false);
                }}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  currentView === 'admin'
                    ? 'text-pink-600 bg-pink-50'
                    : 'text-gray-700 hover:text-pink-600 hover:bg-pink-50'
                }`}
              >
                <Settings size={16} />
                <span>{t('admin')}</span>
              </button>
            </nav>

            {/* Right Side - Language & Wallet */}
            <div className="hidden md:flex items-center space-x-4">
              <LanguageSelector 
                currentLanguage={language}
                onLanguageChange={setLanguage}
              />
              <WalletConnection 
                isConnected={isWalletConnected}
                walletAddress={walletAddress}
                onConnect={setIsWalletConnected}
                onAddressChange={setWalletAddress}
              />
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-md text-gray-700 hover:text-pink-600 hover:bg-pink-50"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              <button
                onClick={() => {
                  setCurrentView('home');
                  setIsMenuOpen(false);
                }}
                className={`flex items-center space-x-2 w-full px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  currentView === 'home'
                    ? 'text-pink-600 bg-pink-50'
                    : 'text-gray-700 hover:text-pink-600 hover:bg-pink-50'
                }`}
              >
                <Home size={16} />
                <span>{t('home')}</span>
              </button>
              <button
                onClick={() => {
                  setCurrentView('cart');
                  setIsMenuOpen(false);
                }}
                className={`flex items-center space-x-2 w-full px-3 py-2 rounded-md text-base font-medium transition-colors relative ${
                  currentView === 'cart'
                    ? 'text-pink-600 bg-pink-50'
                    : 'text-gray-700 hover:text-pink-600 hover:bg-pink-50'
                }`}
              >
                <ShoppingCart size={16} />
                <span>{t('cart')}</span>
                {cartItemsCount > 0 && (
                  <span className="bg-pink-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItemsCount}
                  </span>
                )}
              </button>
              <button
                onClick={() => {
                  setCurrentView('admin');
                  setIsAdminAuthenticated(false);
                  setIsMenuOpen(false);
                }}
                className={`flex items-center space-x-2 w-full px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  currentView === 'admin'
                    ? 'text-pink-600 bg-pink-50'
                    : 'text-gray-700 hover:text-pink-600 hover:bg-pink-50'
                }`}
              >
                <Settings size={16} />
                <span>{t('admin')}</span>
              </button>
              <div className="px-3 py-2 space-y-2">
                <LanguageSelector 
                  currentLanguage={language}
                  onLanguageChange={setLanguage}
                />
                <WalletConnection 
                  isConnected={isWalletConnected}
                  walletAddress={walletAddress}
                  onConnect={setIsWalletConnected}
                  onAddressChange={setWalletAddress}
                />
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentView === 'home' && (
          <div>
            {/* Hero Banner */}
            <div className="-mx-4 sm:-mx-6 lg:-mx-8 mb-12">
              <HeroBanner language={language} />
            </div>

            {/* Search and Filter */}
            <div className="mb-8 space-y-4 md:space-y-0 md:flex md:items-center md:justify-between">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder={t('searchProducts')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                />
              </div>
              <div className="flex space-x-2 overflow-x-auto pb-2">
                {categories.map(category => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                      selectedCategory === category.id
                        ? 'bg-pink-600 text-white'
                        : 'bg-white text-gray-700 hover:bg-pink-50 hover:text-pink-600'
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={addToCart}
                />
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <Package className="mx-auto text-gray-400 mb-4" size={48} />
                <h3 className="text-lg font-medium text-gray-900 mb-2">{t('noProductsFound')}</h3>
                <p className="text-gray-600">Try adjusting your search or filter criteria</p>
              </div>
            )}
          </div>
        )}

        {currentView === 'cart' && (
          <Cart
            items={cartItems}
            language={language}
            onUpdateQuantity={updateQuantity}
            onRemoveItem={removeFromCart}
            total={cartTotal}
            isWalletConnected={isWalletConnected}
            walletAddress={walletAddress}
            onCheckout={() => setCurrentView('checkout')}
            adminSettings={adminSettings}
          />
        )}

        {currentView === 'checkout' && (
          <CheckoutForm
            items={cartItems}
            language={language}
            subtotal={cartTotal}
            adminSettings={adminSettings}
            onPlaceOrder={handlePlaceOrder}
            onCancel={() => setCurrentView('cart')}
          />
        )}

        {currentView === 'admin' && isAdminAuthenticated && (
          <div>
            {/* Admin Navigation */}
            <div className="mb-8">
              <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setAdminView('products')}
                  className={`flex-1 flex items-center justify-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    adminView === 'products'
                      ? 'bg-white text-pink-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Package size={16} />
                  <span>{t('products')}</span>
                </button>
                <button
                  onClick={() => setAdminView('orders')}
                  className={`flex-1 flex items-center justify-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    adminView === 'orders'
                      ? 'bg-white text-pink-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Calendar size={16} />
                  <span>{t('orders')}</span>
                </button>
                <button
                  onClick={() => setAdminView('settings')}
                  className={`flex-1 flex items-center justify-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    adminView === 'settings'
                      ? 'bg-white text-pink-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Settings size={16} />
                  <span>{t('settings')}</span>
                </button>
              </div>
            </div>

            {/* Admin Content */}
            {adminView === 'products' && (
              <AdminPanel
                products={products}
                language={language}
                onAddProduct={addProduct}
                onUpdateProduct={updateProduct}
                onDeleteProduct={deleteProduct}
              />
            )}

            {adminView === 'orders' && (
              <OrderManagement
                orders={orders}
                language={language}
                onUpdateOrderStatus={updateOrderStatus}
              />
            )}

            {adminView === 'settings' && (
              <AdminSettings
                settings={adminSettings}
                language={language}
                onUpdateSettings={setAdminSettings}
              />
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;