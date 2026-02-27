import FAQ, { FAQItem } from "@/components/ui/FAQ";

interface BlogsFaqProps {
  faqs: FAQItem[];
}

function BlogsFaq({ faqs }: BlogsFaqProps) {
  return (
    <div className="w-full">
      <FAQ data={faqs} />
    </div>
  );
}

export default BlogsFaq;
