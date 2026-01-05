export interface CartTokenResponse {
  status: string;
  code: number;
  message: string;
  results: {
    token: string;
  };
}

export interface CartService {
  id: number;
  identifier: string;
  title: string;
  description_short: string;
  description_long: string;
  price: number;
  special_price: number | null;
  active: number;
  created_at: string;
  updated_at: string;
}

export interface CartItemResponse {
  id: number;
  cart_id: number;
  service_id: number;
  price: number;
  metadata: any[];
  created_at: string;
  updated_at: string;
  service: CartService;
}

export interface CartResponse {
  status: string;
  code: number;
  message: string;
  results: {
    id: number;
    customer_id: number | null;
    cart_token: string;
    coupon_code: string | null;
    discount_amount: number;
    total_amount: number;
    paid: boolean;
    created_at: string;
    updated_at: string;
    cart_items: CartItemResponse[];
  };
}
