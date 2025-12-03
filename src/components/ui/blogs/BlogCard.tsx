import React from "react";
import { useNavigate } from "react-router-dom";

interface BlogCardProps {
  tag: string;
  image: string;
  title: string;
  description: string;
  readTime: string;
  slug: string; 
}

export default function BlogCard({
  tag,
  image,
  title,
  description,
  readTime,
  slug,
}: BlogCardProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/blogs/${slug}`);
  };

  return (
    <div
      onClick={handleClick}
      className="cursor-pointer w-full h-[465px] md:max-w-[427px] md:h-[535px] border border-[#E6E6E6] rounded-[26px] bg-white overflow-hidden p-2 flex flex-col shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="relative w-full h-[233px] md:h-[291px] rounded-[20px] overflow-hidden">
        <img src={image} alt={title} className="w-full h-full object-cover" />

        <div className="absolute bottom-0 left-0 w-full h-[70%] pointer-events-none bg-[linear-gradient(180deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0.14)_14%,rgba(255,255,255,0.88)_88%,rgba(255,255,255,1)_100%)]"></div>

        <span className="absolute top-4 right-4 bg-white text-[14px] font-medium px-3 py-1 rounded-full">
          {tag}
        </span>
      </div>

      <div className="flex flex-col px-4 py-5">
        <h3 className="text-[22px] md:text-[24px] font-bricolage font-extrabold leading-tight">
          {title}
        </h3>

        <p className="mt-2 text-[#5F6057] text-[15px] md:text-[17px] leading-[22px] flex-grow">
          {description}
        </p>

        <p className="mt-6 md:mt-10 text-[16px] md:text-[18px] leading-[22px] flex items-center gap-2">
          ● {readTime}
        </p>
      </div>
    </div>
  );
}
