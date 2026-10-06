export interface MenuItem {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  image?: string;
  isVeg: boolean;
  isPopular?: boolean;
  available: boolean;
  badge?: string;
  calories?: string;
}

export interface CartItem {
  item: MenuItem;
  quantity: number;
}

export type OrderStep = 'received' | 'accepted' | 'preparing' | 'ready' | 'served';

export interface PlacedOrder {
  id: string;
  tokenNumber: string;
  tableNumber: string;
  createdAt: string;
  items: CartItem[];
  subtotal: number;
  gst: number;
  total: number;
  specialInstructions?: string;
  status: OrderStep;
  estimatedMinutes: number;
  paymentMethod: 'counter' | 'upi' | 'cash';
  isPaid: boolean;
  placedAtTimestamp?: number;
}
