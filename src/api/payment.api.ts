import { api } from "./axios";

interface ApiError {
  response?: {
    status?: number;
    data?: {
      message?: string;
    };
  };
  message?: string;
}

export interface CreatePaymentIntentRequest {
  cart_token: string;
  customer_info?: {
    first_name?: string;
    last_name?: string;
    email?: string;
    phone?: string;
  };
}

export interface CreatePaymentIntentResponse {
  status: string;
  code: number;
  message: string;
  results: {
    client_secret: string;
    payment_intent_id?: string;
  };
}

export const createPaymentIntent = async (
  data: CreatePaymentIntentRequest
): Promise<CreatePaymentIntentResponse["results"]> => {
  const authToken = localStorage.getItem("authToken");
  const isGoogleOAuth = authToken?.startsWith("ya29.");

  if (isGoogleOAuth) {
    throw new Error(
      "Google OAuth login detected. This payment endpoint requires email/password login. " +
      "Please log out and log in using your email and password to proceed with payment."
    );
  }

  try {
    const userData = localStorage.getItem("userData");
    const customerId = userData ? JSON.parse(userData).id : "guest";
    
    const response = await api.get<CreatePaymentIntentResponse>(
      `/customer/cart/stripe/generate-client-secret`,
      {
        params: { 
          customer_id: customerId,
          cart_token: data.cart_token 
        }
      }
    );

    if (response.data.status === "success" && response.data.results.client_secret) {
      return response.data.results;
    }

    throw new Error(response.data.message || "Failed to initialize payment");
  } catch (error) {
    const apiError = error as ApiError;
    if (apiError.response?.status === 401) {
      throw new Error(
        "Authentication required. Please ensure you're logged in or the cart token is valid."
      );
    }
    throw new Error(
      apiError.response?.data?.message ||
      apiError.message ||
      "Failed to initialize payment. Please check your backend API endpoint."
    );
  }
};

