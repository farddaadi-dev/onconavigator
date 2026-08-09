export function formatLabel(value: string): string {
  return value
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}