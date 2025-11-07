import { blogData } from "../../../data/BlogData";
import Badge from "../Badge";
import BlogCard from "./BlogCard";

export default function BlogSection() {
  return (
    <section className=" py-10">
      <div className="max-w-7xl mx-auto px-4">
        <Badge text="Blog" width="78px" center />

        <h2 className="font-bricolage text-[38px] leading-[38px] lg:text-[58px] lg:leading-[59px] tracking-[-0.03em] font-extrabold text-center py-4">
          Practical reads to help you move faster
        </h2>

        <p className="text-center text-[18px] leading-[25px] lg:text-[20px]">
          Stories from people who turned complicated taxes into peace of mind
        </p>

        <div className="w-full mt-14">
          <div className="flex overflow-x-auto snap-x snap-mandatory lg:grid lg:grid-cols-3 lg:gap-8 lg:overflow-visible">
            {blogData.map((item, index) => (
              <div
                key={index}
                className="min-w-[400px] lg:min-w-0 mr-6 last:mr-0 snap-center"
              >
                <BlogCard {...item} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
