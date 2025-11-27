import Badge from "@/components/ui/Badge";
import BlogCard from "@/components/ui/blogs/BlogCard";
import { blogData } from "@/data/BlogData";

export default function HomeBlogSection() {
  const visibleBlogs = 3; 

  return (
    <section className="w-full full-bleed bg-[#FBFBFA] flex flex-col items-center py-16">
      <div className="w-full text-center max-w-[1320px] px-4">
        <Badge text="Blog" width="78px" center />

        <h2 className="heading-base py-4">
          Practical reads to help you move faster
        </h2>

        <p className="text-base max-w-[660px] mx-auto">
          Stories from people who turned complicated taxes into peace of mind
        </p>

        <div className="block sm:hidden overflow-x-auto mt-14">
          <div className="flex gap-4">
            {blogData.slice(0, visibleBlogs).map((blog, index) => (
              <div key={index} className="min-w-[300px]">
                <BlogCard {...blog} />
              </div>
            ))}
          </div>
        </div>

        <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-14">
          {blogData.slice(0, 3).map((blog, index) => (
            <BlogCard key={index} {...blog} />
          ))}
        </div>
      </div>
    </section>
  );
}
