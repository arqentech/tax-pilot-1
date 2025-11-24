import React from "react";
import BlogPage from "./BlogPage";
import Feedback from "@/components/ui/Feedback";

function BlogDetail() {
  return (
    <div className="flex flex-col">
      <BlogPage />
      <Feedback />
    </div>
  );
}

export default BlogDetail;
