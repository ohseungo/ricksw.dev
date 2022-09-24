import metadata from "constants/metadata.json";
const SEO = {
  titleTemplate: "%s | RickSW.dev",
  defaultTitle: metadata.site_name,
  description: metadata.site_description,
  canonical: metadata.site_url, //"https://ricksw-dev.vercel.app",
  openGraph: {
    title: metadata.site_name,
    description: metadata.site_description,
    type: "website",
    site_name: metadata.site_name,
    url: metadata.site_url, //"https://ricksw-dev.vercel.app",
  },
};

export default SEO;
