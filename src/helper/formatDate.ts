/**
 * Why I used Intl.DateTimeFormat instead of toLocaleString
 * Reference: MDN Date.prototype.toLocaleString()
 * When the method is called many times with the same arguments, it
 * is better to create a Intl.DateTimeFormat object and use its format() method,
 * because a DateTimeFormat object remembers the arguments passed to it and may
 * decide to cache a slice of the database, so future format calls can search
 * for localization strings within a more constrained context.
 */

const BASE_DATE_FORMAT_OPTIONS: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: 'short',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: false,
};

export default function formatDate(
  date: Date,
  formatOptions: Intl.DateTimeFormatOptions = BASE_DATE_FORMAT_OPTIONS
): string {
  const dateFormat = new Intl.DateTimeFormat('en-US', BASE_DATE_FORMAT_OPTIONS);
  const dateObj = new Date(date);
  return dateFormat.format(dateObj);
}
