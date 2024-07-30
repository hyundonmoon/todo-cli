export default function truncateTitle(title: string): string {
  if (title.length <= 50) {
    return title;
  }

  return `${title.slice(0, 47)}...`;
}
