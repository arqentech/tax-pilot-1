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

const BlogCard: React.FC<BlogCardProps> = ({
  tag,
  image,
  title,
  description,
  readTime,
  slug,
}) => {
  const navigate = useNavigate();

  return (
    <article
      onClick={() => navigate(`/blog/${slug}`)}
      className="
        group cursor-pointer
        w-full max-w-[400px] md:max-w-[427px]
        h-[465px] md:h-[535px]
        border border-[#E6E6E6]
        rounded-[26px]
        bg-white
        p-[6px]
        flex flex-col
        transition-all duration-300
        hover:shadow-lg
      "
    >
      <div className="relative w-full max-w-[415px] mx-auto aspect-[16/10] rounded-[20px] overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />

        <div className="absolute bottom-0 left-0 w-full h-[70%] bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none" />

        <span className="absolute top-4 right-4 bg-white text-[#34352E] text-[13px] md:text-[14px] font-medium px-3 py-1 rounded-full">
          {tag}
        </span>
      </div>

      <div className="flex flex-col flex-1 px-4 py-5 min-h-0 gap-3">
        <h3 className="text-[20px] md:text-[24px] text-[#34352E] font-bricolage font-extrabold leading-tight line-clamp-2">
          {title}
        </h3>

        <p className="text-[#5F6057] text-[14px] md:text-[17px] leading-[22px] line-clamp-3">
          {description}
        </p>

        <div className="mt-auto pt-6 text-[#34352E] text-[15px] md:text-[18px] flex items-center gap-2">
          ● {readTime}
        </div>
      </div>
    </article>
  );
};

export default BlogCard;
