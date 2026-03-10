import { api } from "./axios";

export interface SendSupportRequestPayload {
  email: string;
  name: string;
  surname: string;
  message: string;
  order_number?: string | null;
}

interface SendSupportResponse {
  status?: string;
  code?: number;
  message?: string;
  results?: unknown;
}

export const sendSupportRequest = async (
  payload: SendSupportRequestPayload,
): Promise<SendSupportResponse> => {
  const response = await api.post<SendSupportResponse>(
    "/send-request-support",
    payload,
  );
  return response.data;
};
