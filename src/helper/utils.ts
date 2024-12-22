export function truncateTitle(title: string, maxLength = 50): string {
  if (title.length <= maxLength) {
    return title;
  }

  return `${title.slice(0, maxLength - 3)}...`;
}
