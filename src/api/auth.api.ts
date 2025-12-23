import { api } from "@/api/axios";
import {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
} from "@/types/auth";

export const registerUser = async (
  payload: RegisterRequest
): Promise<RegisterResponse> => {
  const response = await api.post<RegisterResponse>(
    "/customer/auth/register",
    payload
  );

  return response.data;
};

export const loginUser = async (
  payload: LoginRequest
): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>(
    "/customer/auth/login",
    payload
  );
  return response.data;
};
