export default function sitemap() {
  const baseUrl = "http://localhost:3000";
  const lastModified = new Date();
  return [
    { url: `${baseUrl}/`, lastModified },
    { url: `${baseUrl}/cv`, lastModified },
    { url: `${baseUrl}/blog`, lastModified },
    { url: `${baseUrl}/iletisim`, lastModified }
  ];
}
