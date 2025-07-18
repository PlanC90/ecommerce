import React from 'react';
import { Minus, Plus, Trash2, ShoppingBag, Wallet } from 'lucide-react';
import { CartItem, AdminSettings } from '../types';

interface CartProps {
  items: CartItem[];
  onUpdateQuantity: (productId: number, quantity: number) => void;
  onRemoveItem: (productId: number) => void;
  total: number;
  isWalletConnected: boolean;
  walletAddress: string;
  onCheckout: () => void;
  adminSettings: AdminSettings;
}

const Cart: React.FC<CartProps> = ({
  items,
  onUpdateQuantity,
  onRemoveItem,
  total,
  isWalletConnected,
  walletAddress,
  onCheckout,
  adminSettings
}) => {
  const shippingCost = total >= adminSettings.freeShippingThreshold ? 0 : adminSettings.shippingCost;
  const finalTotal = total + shippingCost;

  const handleCheckoutClick = () => {
    if (!isWalletConnected) {
      alert('Please connect your Phantom wallet to proceed with checkout');
      return;
    }
    
    onCheckout();
  };

  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <ShoppingBag className="mx-auto text-gray-400 dark:text-gray-500 mb-4" size={64} />
        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">Your cart is empty</h3>
        <p className="text-gray-600 dark:text-gray-300">Add some beautiful products to get started!</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Shopping Cart</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map(item => (
            <div key={item.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 hover:shadow-lg transition-all duration-300">
              <div className="flex items-center space-x-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 dark:text-white">{item.name}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300 capitalize">{item.category}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-lg font-bold text-pink-600">{item.price}</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">MEMEXSOL</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                    className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="w-8 text-center font-medium">{item.quantity}</span>
                  <button
                    onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                    className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <Plus size={16} />
                  </button>
                </div>
                
                <button
                  onClick={() => onRemoveItem(item.id)}
                  className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
        
        {/* Order Summary */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 h-fit">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Order Summary</h3>
          
          <div className="space-y-3 mb-4">
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-300">Subtotal</span>
              <span className="font-medium">{total} MEMEXSOL</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-300">Shipping</span>
              <span className="font-medium">{shippingCost === 0 ? 'Free' : `${shippingCost} MEMEXSOL`}</span>
            </div>
            {total >= adminSettings.freeShippingThreshold && (
              <div className="text-sm text-green-600">
                🎉 Free shipping applied!
              </div>
            )}
            <div className="border-t pt-3">
              <div className="flex justify-between">
                <span className="text-lg font-semibold dark:text-white">Total</span>
                <span className="text-lg font-bold text-pink-600">{finalTotal} MEMEXSOL</span>
              </div>
            </div>
          </div>
          
          {/* Wallet Status */}
          <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Wallet size={16} className="text-gray-600 dark:text-gray-300" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-200">Phantom Wallet</span>
            </div>
            {isWalletConnected ? (
              <div className="text-xs text-green-600">
                Connected: {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
              </div>
            ) : (
              <div className="text-xs text-red-600">
                Not connected
              </div>
            )}
          </div>
          
          <button
            onClick={handleCheckoutClick}
            className={`w-full py-3 rounded-lg font-medium transition-all duration-200 ${
              isWalletConnected
                ? 'bg-gradient-to-r from-pink-600 to-purple-600 text-white hover:from-pink-700 hover:to-purple-700 transform hover:scale-105'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
            disabled={!isWalletConnected}
          >
            {isWalletConnected ? 'Proceed to Checkout' : 'Connect Wallet to Checkout'}
          </button>
          
          <div className="mt-4 text-center">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Secure payment powered by Phantom Wallet
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
