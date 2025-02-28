import type { MetadataRoute } from "next";
import config from "@/config";

const { title, description } = config;

function manifest(): MetadataRoute.Manifest {
  return {
    name: `${title}`,
    short_name: "1chooo.com",
    categories: ["portfolio", "blog", "personal", "web development"],
    description: `${description}`,
    start_url: "/",
    display: "standalone",
    lang: "en-US",
    background_color: "#fff",
    theme_color: "#fff",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
        purpose: "any",
      },
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
        purpose: "maskable",
      },
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
        purpose: "monochrome",
      },
    ],
  };
}

export default manifest;
