import { faker } from '@faker-js/faker';
import { supabase } from '../lib/supabase';
import { Product, ShippingAddress, Order } from '../types';

// Function to generate a random shipping address
const generateShippingAddress = (): ShippingAddress => {
  return {
    fullName: faker.person.fullName(),
    email: faker.internet.email(),
    phone: faker.phone.number(),
    address: faker.location.streetAddress(),
    city: faker.location.city(),
    postalCode: faker.location.zipCode(),
    country: faker.location.country(),
  };
};

// Function to generate a random cart item
const generateCartItem = (products: Product[]): { product: Product; quantity: number } => {
  const product = faker.helpers.arrayElement(products);
  const quantity = faker.number.int({ min: 1, max: 5 });
  return { product, quantity };
};

// Function to generate a demo order
export const generateDemoOrder = (products: Product[], walletAddress: string): Omit<Order, 'id'> => {
  const numberOfItems = faker.number.int({ min: 1, max: 5 });
  const cartItems = Array.from({ length: numberOfItems }, () => generateCartItem(products));
  const shippingAddress = generateShippingAddress();
  const subtotal = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const shippingCost = subtotal > 500 ? 0 : 25;
  const total = subtotal + shippingCost;

  return {
    items: cartItems.map(item => ({ ...item.product, quantity: item.quantity })),
    shippingAddress: shippingAddress,
    subtotal: subtotal,
    shippingCost: shippingCost,
    total: total,
    status: faker.helpers.arrayElement(['pending', 'processing', 'shipped', 'delivered']),
    walletAddress: walletAddress,
    createdAt: faker.date.recent(),
    trackingNumber: faker.string.alphanumeric(10),
  };
};

// Function to seed demo orders into Supabase
export const seedDemoOrders = async (numberOfOrders: number = 5, walletAddress: string, products: Product[]) => {
  try {
    const demoOrders = Array.from({ length: numberOfOrders }, () => generateDemoOrder(products, walletAddress));

    for (const order of demoOrders) {
      const { error } = await supabase
        .from('orders')
        .insert({
          user_wallet: order.walletAddress,
          items: order.items,
          shipping_address: order.shippingAddress,
          subtotal: order.subtotal,
          shipping_cost: order.shippingCost,
          total: order.total,
          status: order.status,
          created_at: order.createdAt,
          tracking_number: order.trackingNumber,
        });

      if (error) {
        console.error('Error seeding order:', error);
      } else {
        console.log('Demo order seeded successfully');
      }
    }
    return demoOrders;
  } catch (error) {
    console.error('Error seeding demo orders:', error);
    return [];
  }
};

export default generateDemoOrder;
