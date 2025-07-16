export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: 'skincare' | 'makeup' | 'fragrance';
  description: string;
  stock: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface WalletConnection {
  isConnected: boolean;
  address: string;
  balance?: number;
}

export interface ShippingAddress {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  shippingAddress: ShippingAddress;
  subtotal: number;
  shippingCost: number;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  walletAddress: string;
  createdAt: Date;
  trackingNumber?: string;
}

export interface AdminSettings {
  shippingCost: number;
  freeShippingThreshold: number;
}