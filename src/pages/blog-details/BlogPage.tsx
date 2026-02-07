import { blogData } from "@/data/BlogData";
import React from "react";
import { useParams } from "react-router-dom";
import Breadcrumbs from "../service-details/BreadCrumb";
import Feedback from "@/components/ui/Feedback";
import BlogsFaq from "./BlogsFaq";
import ShareButtons from "@/components/ui/ShareButtons";
import IseeSection from "@/components/ui/ISEESection";
import { Clock } from "lucide-react";

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

          <span className="flex items-center gap-x-1 bg-[#E7D8FB] text-[#3C0D6D] border border-[#D2BDE9] w-auto px-3 py-1 rounded-full text-sm font-medium">
            <img src="/svg/funnel.svg" className="w-4 " /> {blog.tag}
          </span>

          <span className="flex items-center bg-[#E7D8FB] gap-x-1 text-[#3C0D6D] border border-[#D2BDE9] w-auto px-4 py-1 rounded-full text-sm font-medium">
            <Clock className="w-3 " /> {blog.readTime}
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
          <h2 className="text-[28px] text-[#34352E] font-bricolage font-extrabold mb-3 leading-[30px]">
            In-depth analysis
          </h2>
          <p className="text-[18px] font-normal text-[#5F6057] leading-[25px] whitespace-pre-line">
            {blog.inDepthAnalysis}
          </p>

          <h2 className="mt-10 font-bricolage text-[#34352E] text-[28px] font-extrabold leading-[30px]">
            Advantages
          </h2>
          <ul className="mt-3 space-y-2 font-normal text-[#5F6057] text-[18px] text-[#555] leading-[25px]">
            {blog.advantages.map((item, index) => (
              <li key={index} className="flex gap-2">
                <span>•</span> {item}
              </li>
            ))}
          </ul>

          <h2 className="mt-10 text-[#5F6057] font-bricolage text-[28px] font-extrabold leading-[30px]">
            Conclusion
          </h2>
          <p className="mt-3 text-[18px] font-normal text-[#5F6057] leading-[25px] ">
            {blog.conclusion}
          </p>

          <div>
            <h2 className="mt-10 font-bricolage font-extrabold text-[20px] sm:text-[22px] md:text-[26px] lg:text-[30px]">
              Frequently Asked Questions
            </h2>

            <BlogsFaq />
          </div>

          <div className="flex flex-col">
            <div className="order-2 lg:order-1">
              <IseeSection />
            </div>

            <div className="order-1 lg:order-2">
              <Feedback />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
