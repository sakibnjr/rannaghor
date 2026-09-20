export interface RestaurantBranding {
  primaryColor: string;
  secondaryColor: string;
  backgroundColor: string;
}

export interface RestaurantContact {
  phone: string;
  email?: string;
  whatsapp?: string;
}

export interface RestaurantAddress {
  division?: string;
  city: string;
  area?: string;
  street?: string;
}

export interface OpeningHourItem {
  day: string;
  open: string;
  close: string;
}

export interface RestaurantDeliveryInfo {
  isOpen: boolean;
  closingTime: string;
  averageTime: string;
  deliveryMethod: string;
}

export interface RestaurantRating {
  score: number;
  reviewCount: number;
  displayCount: string;
}

export interface RestaurantConfig {
  id: string;
  name: string;
  tagline: string;
  heroHeadline: {
    line1: string;
    line2: string;
  };
  heroSubtext: string;
  heroBadge: string;
  heroImage: { src: string; alt: string };
  heroNote: string;
  branding: RestaurantBranding;
  contact: RestaurantContact;
  address: RestaurantAddress;
  delivery: RestaurantDeliveryInfo;
  rating: RestaurantRating;
}
