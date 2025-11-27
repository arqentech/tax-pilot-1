import IseeSection from "@/components/ui/ISEESection";
import BlogPage from "./BlogPage";
import BlogArticlesSection from "./BlogArticlesSection";

function BlogDetail() {
  return (
    <div className="flex flex-col">
      <BlogPage />
      <BlogArticlesSection/>
    </div>
  );
}

export default BlogDetail;
