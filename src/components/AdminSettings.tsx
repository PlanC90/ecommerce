import React, { useState } from 'react';
import { Settings, Truck, DollarSign, Save } from 'lucide-react';
import { AdminSettings as AdminSettingsType } from '../types';

interface AdminSettingsProps {
  settings: AdminSettingsType;
  onUpdateSettings: (settings: AdminSettingsType) => void;
}

const AdminSettings: React.FC<AdminSettingsProps> = ({ settings, onUpdateSettings }) => {
  const [formData, setFormData] = useState(settings);
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    setTimeout(() => {
      onUpdateSettings(formData);
      setIsSaving(false);
    }, 1000);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
        <Settings className="mr-3" size={32} />
        Admin Settings
      </h2>

      <div className="bg-white rounded-xl shadow-md p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Truck size={16} className="inline mr-2" />
              Shipping Cost (MEMEXSOL)
            </label>
            <input
              type="number"
              step="0.01"
              value={formData.shippingCost}
              onChange={(e) => setFormData({ ...formData, shippingCost: parseFloat(e.target.value) || 0 })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              placeholder="Enter shipping cost"
            />
            <p className="text-sm text-gray-500 mt-1">
              Standard shipping cost applied to all orders
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <DollarSign size={16} className="inline mr-2" />
              Free Shipping Threshold (MEMEXSOL)
            </label>
            <input
              type="number"
              step="0.01"
              value={formData.freeShippingThreshold}
              onChange={(e) => setFormData({ ...formData, freeShippingThreshold: parseFloat(e.target.value) || 0 })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              placeholder="Enter free shipping threshold"
            />
            <p className="text-sm text-gray-500 mt-1">
              Orders above this amount get free shipping
            </p>
          </div>

          <div className="bg-blue-50 rounded-lg p-4">
            <h4 className="font-medium text-blue-900 mb-2">Current Settings Preview</h4>
            <div className="text-sm text-blue-800 space-y-1">
              <p>• Shipping cost: {formData.shippingCost} MEMEXSOL</p>
              <p>• Free shipping for orders ≥ {formData.freeShippingThreshold} MEMEXSOL</p>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSaving}
            className={`w-full py-3 rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-2 ${
              isSaving
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-pink-600 to-purple-600 text-white hover:from-pink-700 hover:to-purple-700 transform hover:scale-105'
            }`}
          >
            {isSaving ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Saving...</span>
              </>
            ) : (
              <>
                <Save size={20} />
                <span>Save Settings</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminSettings;