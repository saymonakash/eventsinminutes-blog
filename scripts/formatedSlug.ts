export function formatedSlug(text: string): string {
  return text.toLowerCase().replace(/\s+/g, '-')
}
