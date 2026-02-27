interface BlogImage {
  blog_id: number;
  url: string;
}
interface BlogAuthor {
  id: number;
  full_name: string;
}
interface BlogCategory {
  id: number;
  identifier: string;
  name: string;
}
export interface Blog {
  id: number;
  identifier: string;
  title: string;
  description_short: string | null;
  description_long: string;
  active: number;
  created_at: string;
  category: BlogCategory;
  author: BlogAuthor;
  image: BlogImage;
}

export interface CategoryOption {
  id: number;
  identifier: string;
  name: string;
}
export interface BlogPost {
  id: number;
  identifier: string;
  title: string;
  description_long: string;
  created_at: string;

  category: BlogCategory;
  author: BlogAuthor;
  image?: BlogImage;
}

export interface ApiResponse<T> {
  status: string;
  code: number;
  message: string;
  results: T;
}
