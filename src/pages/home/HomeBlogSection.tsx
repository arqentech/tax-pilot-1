// <-- import blog section list

import Badge from "@/components/ui/Badge";
import BlogList from "@/components/ui/blogs/BlogList";

export default function HomeBlogSection() {
  return (
    <div className="w-full full-bleed bg-[#FBFBFA] flex flex-col items-center py-16">
      <div className="w-full text-center max-w-[1320px]">
        <Badge text="Blog" width="78px" center />

        <h2 className="heading-base py-4">
          Practical reads to help you move faster
        </h2>

        <p className="text-base">
          Stories from people who turned complicated taxes into peace of mind
        </p>

        <div className="w-full mt-14">
          <BlogList />
        </div>
      </div>
    </div>
  );
}
