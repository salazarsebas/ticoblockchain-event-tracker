export function isHttpUrl(url: string | undefined | null): url is string {
  if (!url) return false;
  return url.startsWith("https://") || url.startsWith("http://");
}
