import { blogData } from "@/data/BlogData";
import React from "react";
import { useParams, Link } from "react-router-dom";
import Breadcrumbs from "../service-details/BreadCrumb";
import Feedback from "@/components/ui/Feedback";
import BlogsFaq from "./BlogsFaq";
import ShareButtons from "@/components/ui/ShareButtons";
import IseeSection from "@/components/ui/ISEESection";

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

      <div className="w-full mx-auto py-10 text-center">
        <div className="w-full flex flex-wrap items-center justify-center gap-4 mb-4">
          <span className="bg-[#EEFCD7] text-[#36500C] border border-[#D9E6C0] px-4 py-1 rounded-full text-sm font-medium flex items-center gap-2">
            <img src="/svg/calendar.svg" className="w-4" />
            26, Oct, 2025
          </span>

          <span className="flex items-center bg-[#E7D8FB] text-[#3C0D6D] border border-[#D2BDE9] w-[94px] px-3 py-1 rounded-full text-sm font-medium">
            <img src="/svg/funnel.svg" className="w-4" /> {blog.tag}
          </span>

          <span className="bg-[#34352E1C] w-[109px] border border-[#34352E2E] text-[#3C0D6D]px-3 py-1 rounded-full text-sm font-medium">
            {blog.readTime}
          </span>
        </div>

        <h1 className="sub-heading">{blog.title}</h1>
      </div>

      <div className="w-full">
        <div className="w-full rounded-[25px] overflow-hidden mb-6 md:mb-20">
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full md:h-[500px] object-cover"
          />
        </div>
      </div>

      <div className="w-full md:grid grid-cols-[220px_1fr] gap-16 mx-auto px-4 pt-12 pb-20">
        <div className="hidden md:block">
          <ShareButtons />
        </div>

        <div className="w-full">
          <h2 className="text-[26px] font-bold mb-3">In-depth analysis</h2>
          <p className="text-[17px] text-justify text-[#4A4A4A] leading-[28px] whitespace-pre-line">
            {blog.inDepthAnalysis}
          </p>

          <h2 className="mt-10 font-bricolage text-justify text-[28px] font-extrabold">
            Advantages
          </h2>
          <ul className="mt-3 space-y-2 text-[17px] text-[#555] leading-[28px]">
            {blog.advantages.map((item, index) => (
              <li key={index} className="flex gap-2">
                <span>•</span> {item}
              </li>
            ))}
          </ul>

          <h2 className="mt-10 font-bricolage text-[28px] font-extrabold">
            Conclusion
          </h2>
          <p className="mt-3 text-[17px] text-[#4A4A4A] leading-[28px]">
            {blog.conclusion}
          </p>

          <div>
            <h2 className="mt-10 font-bricolage text-[28px] font-extrabold">
              Frequently Asked Questions
            </h2>
            <BlogsFaq />
          </div>

          <IseeSection />
          <Feedback />
        </div>
      </div>
    </div>
  );
}
