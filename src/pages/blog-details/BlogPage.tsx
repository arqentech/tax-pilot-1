import { blogData } from "@/data/BlogData";
import React from "react";
import { useParams, Link } from "react-router-dom";
import Breadcrumbs from "../service-details/BreadCrumb";

export default function BlogPage() {
  const { slug } = useParams<{ slug: string }>();
  const blog = blogData.find((b) => b.slug === slug);

  if (!blog) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold">Blog not found</h1>
      </div>
    );
  }

  return (
    <div className="w-full">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Blogs", href: "/blogs" },
          { label: blog.title, href: null },
        ]}
      />

      <div className="max-w-[985px] mx-auto px-4 py-10 text-center">
        <div className="flex items-center justify-center gap-4 mb-4">
          <span className="bg-[#E9F8D7] text-[#4C6B22] px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2">
            <img src="/svg/calendar.svg" className="w-4" />
            26, Oct, 2025
          </span>

          <span className="bg-[#F3E8FF] text-[#7E3AF2] px-3 py-1 rounded-full text-sm font-medium">
            {blog.tag}
          </span>

          <span className="bg-[#F6F6F6] text-[#555] px-3 py-1 rounded-full text-sm font-medium">
            {blog.readTime}
          </span>
        </div>

        <h1 className="text-[32px] md:text-[48px] font-extrabold leading-tight text-[#1A1A1A]">
          {blog.title}
        </h1>
      </div>

      <div className="w-full px-4">
        <div className="w-full rounded-[25px] overflow-hidden">
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-[350px] md:h-[480px] object-cover"
          />
        </div>
      </div>

      <div className="max-w-[985px] mx-auto px-4 pt-12 pb-20">
        <h2 className="text-[26px] font-bold mb-3">In-depth analysis</h2>
        <p className="text-[17px] text-[#4A4A4A] leading-[28px] whitespace-pre-line">
          {blog.inDepthAnalysis}
        </p>

        <h2 className="mt-10 text-[26px] font-bold">Key Advantages</h2>
        <ul className="mt-3 space-y-2 text-[17px] text-[#555] leading-[28px]">
          {blog.advantages.map((item, index) => (
            <li key={index} className="flex gap-2">
              <span>•</span> {item}
            </li>
          ))}
        </ul>

        <h2 className="mt-10 text-[26px] font-bold">Conclusion</h2>
        <p className="mt-3 text-[17px] text-[#4A4A4A] leading-[28px]">
          {blog.conclusion}
        </p>
      </div>
    </div>
  );
}
