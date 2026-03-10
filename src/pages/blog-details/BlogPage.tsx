import { useParams } from "react-router-dom";
import Breadcrumbs from "../service-details/BreadCrumb";
import Feedback from "@/components/ui/Feedback";
import BlogsFaq from "./BlogsFaq";
import ShareButtons from "@/components/ui/ShareButtons";
import IseeSection from "@/components/ui/ISEESection";
import { Clock } from "lucide-react";
import { getBlogBySlug } from "@/api/blogDetails.api";
import { useQuery } from "@tanstack/react-query";
import { extractBlogFaqs, FAQItem } from "@/utils/extractBlogFaqs";

const apiContentClass =
  "[&_p]:text-[18px] [&_p]:font-normal [&_p]:text-[#5F6057] [&_p]:leading-[25px] [&_p]:mb-4 " +
  "[&_h2]:font-bricolage [&_h2]:text-[28px] [&_h2]:font-extrabold [&_h2]:leading-[30px] [&_h2]:text-[#34352E] [&_h2]:mt-10 [&_h2]:mb-3 " +
  "[&_h3]:font-bricolage [&_h3]:text-[22px] [&_h3]:font-extrabold [&_h3]:leading-[28px] [&_h3]:text-[#34352E] [&_h3]:mt-6 [&_h3]:mb-2 " +
  "[&_ul]:mt-3 [&_ul]:space-y-2 [&_ul]:text-[18px] [&_ul]:text-[#5F6057] [&_ul]:leading-[25px] " +
  "[&_li]:text-[#555] [&_li]:leading-[25px] [&_td]:text-[18px] [&_td]:text-[#5F6057] [&_span]:text-[#5F6057]";

function formatDate(value: string | undefined): string {
  if (!value)
    return new Date().toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  const d = new Date(value);
  if (Number.isNaN(d.getTime()))
    return new Date().toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  return d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function normalizeFaqs(raw: unknown): FAQItem[] {
  if (!Array.isArray(raw)) return [];
  return raw
    .map((item) => {
      if (!item || typeof item !== "object") return null;
      const o = item as Record<string, unknown>;
      const q = (o.question as string) ?? (o.title as string) ?? "";
      const a = (o.answer as string) ?? (o.content as string) ?? "";
      return q || a ? { question: q, answer: a } : null;
    })
    .filter((x): x is FAQItem => x !== null);
}

function fromApi(api: Record<string, unknown>) {
  const text =
    (api.description_long as string) ||
    (api.description_short as string) ||
    (api.description as string) ||
    "";
  const words = text
    .replace(/<[^>]*>/g, " ")
    .split(/\s+/)
    .filter(Boolean).length;
  const cat = api.category as { name?: string; url?: string } | undefined;
  const img = api.image as { url?: string } | undefined;
  const createdAt = api.created_at as string | undefined;
  const faqs = normalizeFaqs(
    api.faqs ?? api.faq ?? api.frequently_asked_questions,
  );
  const advantages = api.advantages as string[] | undefined;
  const conclusion = api.conclusion as string | undefined;
  const advantagesHeading =
    (api.advantages_heading as string) ??
    (api.advantages_title as string) ??
    (api.advantagesHeading as string) ??
    "";
  const conclusionHeading =
    (api.conclusion_heading as string) ??
    (api.conclusion_title as string) ??
    (api.conclusionHeading as string) ??
    "";
  const rawAuthor = api.author as
    | {
        full_name?: string;
        authorname?: string;
        user?: { full_name?: string; name?: string };
      }
    | undefined;
  const author =
    rawAuthor?.full_name ??
    rawAuthor?.authorname ??
    rawAuthor?.user?.full_name ??
    (rawAuthor?.user as { name?: string } | undefined)?.name ??
    "Unknown";

  return {
    title: (api.title as string) ?? "",
    tag: cat?.name ?? cat?.url ?? "",
    author,
    image: img?.url ?? "",
    readTime: `${Math.max(1, Math.ceil(words / 200))} min di lettura`,
    inDepthAnalysis: text,
    advantages: Array.isArray(advantages) ? advantages : undefined,
    conclusion: typeof conclusion === "string" ? conclusion : undefined,
    fromApi: true,
    date: formatDate(createdAt),
    faqs,
    advantagesHeading,
    conclusionHeading,
  };
}

export default function BlogPage() {
  const params = useParams();
  const slug = (params["*"] ?? params["slug"] ?? "").replace(/^\/+|\/+$/g, "");

  const {
    data: apiBlog,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["blog", slug],
    queryFn: () => getBlogBySlug(slug),
    enabled: !!slug,
  });

  const blog =
    apiBlog && typeof apiBlog === "object"
      ? fromApi(apiBlog as Record<string, unknown>)
      : null;

  if (!slug) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <h1 className="text-[58px] font-bricolage font-extrabold">
          Blog not found
        </h1>
      </div>
    );
  }
  if (isLoading && !blog) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <p className="text-[18px] text-[#5F6057]">Loading blog…</p>
      </div>
    );
  }
  if (!blog || isError) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <h1 className="text-[58px] font-bricolage font-extrabold">
          Blog not found
        </h1>
      </div>
    );
  }

  const { faqs: blogFaqs, cleanedHtml } = extractBlogFaqs(blog.inDepthAnalysis);

  return (
    <div className="w-full">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog" },
          { label: blog.title, href: null },
        ]}
      />

      <div className="w-full mx-auto py-10 text-center">
        <div className="w-full flex flex-wrap items-center justify-center gap-4 mb-4">
          <span className="flex items-center gap-x-1 bg-[#FBFBFA] text-[#000000] text-[20px] border border-[#EFEFEB] w-auto px-3 py-1 rounded-full text-sm font-medium">
            <img src="/svg/write.svg" className="w-4 " alt="" /> {blog.author}
          </span>
          <span className="bg-[#EEFCD7] text-[#36500C] border border-[#D9E6C0] px-4 py-1 rounded-full text-sm font-medium flex items-center gap-2">
            <img src="/svg/calendar.svg" className="w-4" alt="" />
            {blog.date}
          </span>
          <span className="flex items-center gap-x-1 bg-[#E7D8FB] text-[#3C0D6D] border border-[#D2BDE9] w-auto px-3 py-1 rounded-full text-sm font-medium">
            <img src="/svg/funnel.svg" className="w-4" alt="" /> {blog.tag}
          </span>
          <span className="flex items-center bg-[#34352E1C] gap-x-1 text-[#34352E] border border-[#34352E2E] w-auto px-4 py-1 rounded-full text-sm font-medium">
            <Clock className="w-3" /> {blog.readTime}
          </span>
        </div>
        <h1 className="font-bricolage sub-heading">{blog.title}</h1>
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
          <div
            className={apiContentClass}
            dangerouslySetInnerHTML={{
              __html: cleanedHtml ?? blog.inDepthAnalysis ?? "",
            }}
          />

          {blog.advantages?.length ? (
            <>
              {blog.advantagesHeading && (
                <h2 className="mt-10 font-bricolage text-[#34352E] text-[28px] font-extrabold leading-[30px]">
                  {blog.advantagesHeading}
                </h2>
              )}
              <ul className="mt-3 space-y-2 font-normal text-[#5F6057] text-[18px] text-[#555] leading-[25px]">
                {blog.advantages.map((item, i) => (
                  <li key={i} className="flex gap-2">
                    <span>•</span> {item}
                  </li>
                ))}
              </ul>
            </>
          ) : null}

          {blog.conclusion && (
            <>
              {blog.conclusionHeading && (
                <h2 className="mt-10 text-[#5F6057] font-bricolage text-[28px] font-extrabold leading-[30px]">
                  {blog.conclusionHeading}
                </h2>
              )}
              <p className="mt-3 text-[18px] font-normal text-[#5F6057] leading-[25px]">
                {blog.conclusion}
              </p>
            </>
          )}

          {blogFaqs.length > 0 && (
            <>
              <h2 className="mt-10 font-bricolage font-extrabold text-[20px] sm:text-[22px] md:text-[26px] lg:text-[30px]">
                Domande frequenti
              </h2>
              <BlogsFaq faqs={blogFaqs} />
            </>
          )}

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
