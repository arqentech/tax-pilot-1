export interface FAQItem {
  question: string;
  answer: string;
}

export function extractBlogFaqs(html: string): {
  faqs: FAQItem[];
  cleanedHtml: string;
} {
  if (!html) return { faqs: [], cleanedHtml: "" };

  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");

  const faqHeading = Array.from(doc.querySelectorAll("h2")).find((h) =>
    h.textContent?.toLowerCase().includes("faq"),
  );

  const faqs: FAQItem[] = [];

  if (faqHeading) {
    let current = faqHeading.nextElementSibling;

    while (current && current.tagName.toLowerCase() === "p") {
      const spans = current.querySelectorAll("span");

      if (spans.length >= 2) {
        const question = spans[0].textContent?.trim() || "";
        const answer = spans[1].textContent?.trim() || "";

        faqs.push({
          question: question.replace(/^\d+\.\s*/, ""),
          answer,
        });
      }

      const next = current.nextElementSibling;
      current.remove();
      current = next;
    }

    faqHeading.remove();
  }

  return { faqs, cleanedHtml: doc.body.innerHTML };
}
