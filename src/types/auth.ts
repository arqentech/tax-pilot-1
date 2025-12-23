export interface SignUpForm {
  email: string;
  name: string;
  surname: string;
  mobile: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  phone: string;
  password: string;
  name: string;
  surname: string;
  accepted_terms_of_use: boolean;
  accepted_privacy_policy: boolean;
  accepted_marketing: boolean;
}

export interface RegisterResponse {
  email: string;
  phone: string;
  name: string;
  surname: string;
  accepted_terms_of_use: boolean;
  accepted_privacy_policy: boolean;
  accepted_marketing: boolean;
}

// types/auth.types.ts

export interface LoginRequest {
  email: string;
  password: string;
}

export interface User {
  id: number;
  name: string;
  surname: string;
  phone: string;
  email: string;
  phone_verified_at?: string | null;
  fiscal_code?: string | null;
  gender?: string | null;
  dob_date?: string | null;
  dob_city?: string | null;
  address?: string | null;
  citizenship?: string | null;
  note?: string | null;
  last_logged_at?: string | null;
  stripe_customer_id?: string | null;
  created_at: string;
  updated_at: string;
  full_name: string;
}

export interface LoginResponse {
  status: string;
  code: number;
  message: string;
  results: {
    access_token: string;
    token_type: string;
    user: User;
    first_login: boolean;
  };
}
