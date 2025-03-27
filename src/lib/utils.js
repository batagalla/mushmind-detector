
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines class names with TailwindCSS
 */
export function cn(...classes) {
  return twMerge(clsx(...classes));
}

/**
 * Formats a date string
 * @param {string|Date} date - Date to format
 * @param {Object} options - Intl.DateTimeFormat options
 * @returns {string} Formatted date string
 */
export function formatDate(date, options = {}) {
  const defaultOptions = {
    year: "numeric",
    month: "long",
    day: "numeric"
  };
  
  const dateTimeFormat = new Intl.DateTimeFormat(
    "en-US",
    { ...defaultOptions, ...options }
  );
  
  return dateTimeFormat.format(new Date(date));
}

/**
 * Truncates a string to a specified length
 * @param {string} str - String to truncate
 * @param {number} length - Maximum length
 * @returns {string} Truncated string
 */
export function truncateString(str, length = 100) {
  if (!str) return "";
  if (str.length <= length) return str;
  return str.slice(0, length) + "...";
}

/**
 * Generates a URL slug from a string
 * @param {string} text - String to convert to slug
 * @returns {string} URL-friendly slug
 */
export function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-");
}
