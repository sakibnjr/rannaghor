export type OrderMethod = "delivery" | "pickup";
export type PaymentMethodType = "cash" | "bkash" | "nagad" | "card";
export type AddressTag = "home" | "work" | "other";

export interface CustomerDetails {
  name: string;
  phone: string;
  email?: string;
}

export interface DeliveryAddress {
  tag: AddressTag;
  city: string;
  area: string;
  road: string;
  house: string;
  landmark?: string;
  riderNote?: string;
  kitchenNote?: string;
}

export interface PlacedOrderData {
  id: string;
  total: number;
  subtotal: number;
  deliveryCharge: number;
  discount: number;
  orderMethod: OrderMethod;
  customer: CustomerDetails;
  address?: DeliveryAddress;
  payment: PaymentMethodType;
  itemsCount: number;
  noCutlery: boolean;
  createdAt: string;
  estimatedArrival: string;
}
