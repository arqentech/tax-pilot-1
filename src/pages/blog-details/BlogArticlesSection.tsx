import Badge from "@/components/ui/Badge";
import BlogList from "@/components/ui/blogs/BlogList";

export default function BlogArticlesSection() {
  return (
    <div className="w-full full-bleed bg-[#FBFBFA] flex flex-col items-center py-16">
      <div className="w-full text-center max-w-[1320px]">
        <Badge text="Blog" width="78px" center />

        <h2 className="heading-base py-4">Related Article</h2>

        <div className="w-full mt-14">
          <BlogList />
        </div>
      </div>
    </div>
  );
}
