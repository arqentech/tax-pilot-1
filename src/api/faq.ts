import {
  FaqTopic,
  FaqTopicResponse,
  FaqDetailResponse,
} from "@/types/faq";
import { api } from "./axios";

export const getFaqTopics = async (): Promise<FaqTopic[]> => {
  const response = await api.get<FaqTopic[]>("/faqs/topics");
  return response.data;
};

export const getFaqByTopic = async (
  slug: string,
): Promise<FaqTopicResponse> => {
  const response = await api.get<FaqTopicResponse>(`/faqs/${slug}`);
  return response.data;
};

export const getFaqDetail = async (
  category: string,
  slug: string,
): Promise<FaqDetailResponse> => {
  const response = await api.get<FaqDetailResponse>(
    `/faqs/${category}/${slug}`,
  );
  return response.data;
};
