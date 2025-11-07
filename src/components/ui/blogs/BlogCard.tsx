interface BlogCardProps {
  tag: string;
  image: string;
  title: string;
  description: string;
  readTime: string;
}

export default function BlogCard({
  tag,
  image,
  title,
  description,
  readTime,
}: BlogCardProps) {
  return (
    <div className="w-[400px] h-[465px] lg:w-full lg:h-[535px] border border-[#E6E6E6] rounded-[26px] bg-white overflow-hidden p-2 flex flex-col shadow-sm">
      <div className="relative w-full h-[233px] lg:h-[291px] rounded-[20px] overflow-hidden">
        <img src={image} alt={title} className="w-full h-full object-cover" />

        <div className="absolute bottom-0 left-0 w-full h-[70%] pointer-events-none bg-[linear-gradient(180deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0.14)_14%,rgba(255,255,255,0.88)_88%,rgba(255,255,255,1)_100%)]"></div>

        <span className="absolute top-4 right-4 bg-white text-[14px] font-medium px-3 py-1 rounded-full">
          {tag}
        </span>
      </div>

      <div className="flex flex-col px-4 py-5">
        <h3 className="text-[22px] lg:text-[24px] font-bricolage font-extrabold leading-tight">
          {title}
        </h3>

        <p className="mt-2 text-[#5F6057] text-[15px] lg:text-[17px] leading-[22px] flex-grow">
          {description}
        </p>

        <p className="mt-6 lg:mt-10 text-[16px] lg:text-[18px] leading-[22px] flex items-center gap-2">
          ● {readTime}
        </p>
      </div>
    </div>
  );
}
