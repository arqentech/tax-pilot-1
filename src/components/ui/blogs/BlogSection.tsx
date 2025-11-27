import { blogData } from "../../../data/BlogData";
import Badge from "../Badge";
import BlogCard from "./BlogCard";

export default function BlogSection() {
  return (
    <section className="py-10">
      <div className="max-w-7xl mx-auto px-4">
        <Badge text="Blog" width="78px" center />

        <h2 className="heading-base text-center py-4">
          Practical reads to help you move faster
        </h2>

        <p className="text-center text-base">
          Stories from people who turned complicated taxes into peace of mind
        </p>

        <div className="w-full mt-14">
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 overflow-x-auto scrollbar-hide">
            {blogData.slice(0, 3).map((item, index) => (
              <BlogCard key={index} {...item} slug={item.slug} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
