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
      onClick={() => navigate(`/blogs/${slug}`)}
      className="
        group cursor-pointer
        h-full
        border border-[#E6E6E6]
        rounded-[26px]
        bg-white
        p-2
        flex flex-col
        transition-shadow
        hover:shadow-md
      "
    >
      <div className="relative w-full aspect-[16/10] rounded-[20px] overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />

        <div className="absolute bottom-0 left-0 w-full h-[70%] bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none" />

        <span className="absolute top-4 text-[#34352E] right-4 bg-white text-[14px] font-medium px-3 py-1 rounded-full">
          {tag}
        </span>
      </div>

      <div className="flex flex-col px-4 py-5 flex-1">
        <h3 className="text-[22px] text-[#34352E] md:text-[24px] font-bricolage font-extrabold leading-tight">
          {title}
        </h3>

        <p className="mt-2 text-[#5F6057] text-[15px] md:text-[17px] leading-[22px] line-clamp-3">
          {description}
        </p>

        <div className="mt-auto pt-6 text-[#34352E] text-[16px] md:text-[18px] flex items-center gap-2">
          ● {readTime}
        </div>
      </div>
    </article>
  );
};

export default BlogCard;
