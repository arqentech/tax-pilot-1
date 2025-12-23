

import { useMutation } from "@tanstack/react-query";
import { registerUser } from "@/api/auth.api";
import { RegisterRequest } from "@/types/auth";

export const useRegister = () => {
  return useMutation({
    mutationFn: (payload: RegisterRequest) => registerUser(payload),
  });
};
