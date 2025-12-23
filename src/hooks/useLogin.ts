import { useMutation } from "@tanstack/react-query";
import { loginUser } from "@/api/auth.api";
import { LoginRequest, LoginResponse } from "@/types/auth";

export const useLogin = () => {
  return useMutation<LoginResponse, Error, LoginRequest>({
    mutationFn: (payload) => loginUser(payload),
  });
};
