import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Removes HTML tags from a string (e.g. from API responses).
 * Uses DOMParser in the browser (safe, no script execution); falls back to regex elsewhere.
 */
export function stripHtml(html: string): string {
  if (typeof html !== "string") return ""
  const trimmed = html.trim()
  if (!trimmed) return ""

  if (typeof DOMParser !== "undefined") {
    try {
      const doc = new DOMParser().parseFromString(trimmed, "text/html")
      const text = doc.body?.textContent ?? ""
      return text.replace(/\s+/g, " ").trim()
    } catch {
      // fall through to regex
    }
  }

  return trimmed
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim()
}
