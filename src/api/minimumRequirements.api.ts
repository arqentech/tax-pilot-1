import { api } from "./axios";

export interface MinimumRequirementForm {
  id: number;
  service_id: number;
  label: string;
  type: "yes_or_no" | "text" | "select" | string;
  options: string[] | { label: string; value: string }[];
  step_order: number;
  is_required: number;
  is_terminal: number;
  created_at: string;
  updated_at: string;
}

interface StartResponse {
  status: string;
  code: number;
  message: string;
  results: {
    step_id: number;
    form: MinimumRequirementForm | null;
    last_step_id: number;
  };
}

interface ValidateResponse {
  status: string;
  code: number;
  message: string;
  results: {
    step_id: string;
    prev_step_id: number | false;
    next_step: MinimumRequirementForm | false;
    last_step_id: number;
  };
}

export const startMinimumRequirement = async (
  serviceId: number
): Promise<StartResponse["results"]> => {
  const response = await api.get<StartResponse>(
    `/services/id/${serviceId}/minimum_requirement/start`
  );
  if (response.data.status === "success") {
    return response.data.results;
  }
  throw new Error(response.data.message || "Failed to start wizard");
};

export const validateMinimumRequirementStep = async (
  stepId: number,
  answers: string
): Promise<ValidateResponse["results"]> => {
  const response = await api.post<ValidateResponse>(
    `/services/validate/minimum_requirement/step/${stepId}`,
    { answers }
  );
  if (response.data.status === "success") {
    return response.data.results;
  }
  throw new Error(response.data.message || "Minimum requirements not met");
};
