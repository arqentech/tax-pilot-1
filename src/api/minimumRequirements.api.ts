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

/** No-op result when minimum requirement endpoint is missing (e.g. 404) so add-to-cart can proceed. */
const NO_REQUIREMENT_RESULT: StartResponse["results"] = {
  step_id: 0,
  form: null,
  last_step_id: 0,
};

export const startMinimumRequirement = async (
  serviceId: number
): Promise<StartResponse["results"]> => {
  const paths = [
    `/services/${serviceId}/minimum_requirement/start`,
    `/services/id/${serviceId}/minimum_requirement/start`,
  ];
  for (const path of paths) {
    try {
      const response = await api.get<StartResponse>(path);
      if (response.data.status === "success") {
        return response.data.results;
      }
    } catch (err) {
      const status = (err as { response?: { status?: number } })?.response?.status;
      if (status === 404) {
        return NO_REQUIREMENT_RESULT;
      }
      throw err instanceof Error ? err : new Error("Failed to start wizard");
    }
  }
  return NO_REQUIREMENT_RESULT;
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
