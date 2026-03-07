export function htmlToPlainText(html: string): string {
  if (!html || typeof html !== "string") return "";

  if (typeof document !== "undefined") {
    try {
      const doc = new DOMParser().parseFromString(html, "text/html");
      const body = doc.body;
      return body?.innerText ?? body?.textContent ?? "";
    } catch {
      return fallbackStripHtml(html);
    }
  }

  return fallbackStripHtml(html);
}

function fallbackStripHtml(html: string): string {
  let text = html
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n")
    .replace(/<\/div>/gi, "\n")
    .replace(/<\/li>/gi, "\n")
    .replace(/<hr\s*\/?>/gi, "\n")
    .replace(/<\/tr>/gi, "\n")
    .replace(/<\/h[1-6]>/gi, "\n");
  text = text.replace(/<[^>]*>/g, "");
  text = text
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
  return text.replace(/\n{3,}/g, "\n\n").trim();
}
