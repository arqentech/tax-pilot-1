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
          <div className="flex overflow-x-auto snap-x snap-mandatory lg:grid lg:grid-cols-3 lg:gap-8 lg:overflow-visible">
            {blogData.slice(0, 3).map((item, index) => (
              <div
                key={index}
                className="min-w-[400px] lg:min-w-0 mr-6 last:mr-0 snap-center"
              >
                <BlogCard {...item} slug={item.slug} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
