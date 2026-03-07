import {
  FaqTopic,
  FaqTopicResponse,
  FaqDetailResponse,
  FaqSearchResult,
  HomepageFaqItem,
} from "@/types/faq";
import { api } from "./axios";

export const getHomepageFaqs = async (): Promise<HomepageFaqItem[]> => {
  const response = await api.get<HomepageFaqItem[] | { results?: HomepageFaqItem[] }>(
    "/faqs/homepage",
  );
  const data = response.data;
  if (Array.isArray(data)) return data;
  if (Array.isArray((data as { results?: HomepageFaqItem[] }).results))
    return (data as { results: HomepageFaqItem[] }).results;
  return [];
};

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

export const searchFaqs = async (query: string): Promise<FaqSearchResult[]> => {
  try {
    // Try backend search first
    const response = await api.get<FaqSearchResult[]>(`/faqs/search?q=${encodeURIComponent(query)}`);
    return response.data;
  } catch (error) {
    // Fallback to client-side search if backend search doesn't exist
    return searchFaqsClientSide(query);
  }
};

const searchFaqsClientSide = async (query: string): Promise<FaqSearchResult[]> => {
  const topics = await getFaqTopics();
  const allFaqs: FaqSearchResult[] = [];
  
  // Fetch all FAQ data from each topic
  for (const topic of topics) {
    try {
      const topicData = await getFaqByTopic(topic.slug_topic);
      
      // For each question, we need to get the full details to access the response
      for (const item of topicData.children) {
        try {
          const detail = await getFaqDetail(item.slug_topic, item.slug);
          allFaqs.push({
            id: detail.faq.id,
            topic: detail.faq.topic,
            slug_topic: detail.faq.slug_topic,
            slug: detail.faq.slug,
            question: detail.faq.question,
            response: detail.faq.response,
          });
        } catch {
          // Skip if individual FAQ fetch fails
        }
      }
    } catch {
      // Skip if topic fetch fails
    }
  }

  // Search through questions and responses
  const searchTerm = query.toLowerCase().trim();
  return allFaqs.filter(faq => 
    faq.question.toLowerCase().includes(searchTerm) ||
    faq.response.toLowerCase().includes(searchTerm) ||
    faq.topic.toLowerCase().includes(searchTerm)
  ).map(faq => ({
    ...faq,
    highlight: highlightSearchTerm(faq.response, searchTerm)
  }));
};

const highlightSearchTerm = (text: string, term: string): string => {
  const plainText = text.replace(/<[^>]*>/g, "");
  const index = plainText.toLowerCase().indexOf(term.toLowerCase());
  
  if (index === -1) return plainText.substring(0, 200) + "...";
  
  const start = Math.max(0, index - 50);
  const end = Math.min(plainText.length, index + term.length + 50);
  const excerpt = plainText.substring(start, end);
  
  return excerpt.replace(
    new RegExp(`(${term})`, 'gi'),
    '<mark class="bg-yellow-200 px-1 rounded">$1</mark>'
  );
};
