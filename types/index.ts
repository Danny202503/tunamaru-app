export type OrderType = 'DELIVERY' | 'PICKUP';

export type DeliveryProtocol = 'LOBBY' | 'MEET' | 'UNIT';

export type PaymentChannel = 'EWALLET' | 'QRPH' | 'CARDS' | 'BNPL' | 'COD';

export interface AddOnOption {
  id: string;
  name: string;
  price: number;
}

export interface MenuItem {
  id: string;
  title: string;
  jpTitle: string;
  basePrice: number;
  description: string;
  image: string;
  category: string;
  tag?: string;
  addOns?: AddOnOption[];
}

export interface CartItem {
  cartItemId: string;
  menuItem: MenuItem;
  quantity: number;
  selectedAddOns: AddOnOption[];
  specialInstructions: string;
  itemTotal: number;
}

export interface OrderState {
  orderId: string;
  orderNumber: string;
  orderType: OrderType;
  recipientName: string;
  recipientPhone: string;
  buildingName: string;
  unitFloor: string;
  streetAddress: string;
  dropoffProtocol: DeliveryProtocol;
  paymentChannel: PaymentChannel;
  subtotal: number;
  deliveryFee: number;
  discount: number;
  grandTotal: number;
  items: CartItem[];
  status: 'PENDING' | 'PREPARING' | 'DISPATCHED' | 'DELIVERING' | 'COMPLETED';
}
