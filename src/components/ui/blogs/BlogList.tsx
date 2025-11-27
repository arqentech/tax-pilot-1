import { blogData } from "../../../data/BlogData";
import BlogCard from "./BlogCard";

export default function BlogList() {
  return (
    <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 overflow-x-auto scrollbar-hide">
      {blogData.slice(0, 3).map((item, index) => (
        <BlogCard key={index} {...item} slug={item.slug} />
      ))}
    </div>
  );
}
