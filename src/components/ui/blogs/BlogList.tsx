import BlogCard from "./BlogCard";

export interface BlogListItem {
  tag: string;
  image: string;
  title: string;
  description: string;
  readTime: string;
  slug: string;
}

interface BlogListProps {
  blogs: BlogListItem[];
}

export default function BlogList({ blogs }: BlogListProps) {
  if (!blogs?.length) return null;

  return (
    <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 overflow-x-auto scrollbar-hide">
      {blogs.map((item, index) => (
        <BlogCard key={item.slug || index} {...item} slug={item.slug} />
      ))}
    </div>
  );
}
