import BlogPage from "./BlogPage";
import HomeBlogSection from "../home/HomeBlogSection";

function BlogDetail() {
  return (
    <div className="flex flex-col">
      <BlogPage />
      <HomeBlogSection />
    </div>
  );
}

export default BlogDetail;
