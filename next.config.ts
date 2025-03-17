import createMDX from "@next/mdx";
import type { NextConfig } from "next";

import rehypeSlug from "rehype-slug";
import remarkFrontmatter from "remark-frontmatter";
import remarkGfm from "remark-gfm";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";

const BASE_PATH = process.env.BASE_PATH ?? "";

if (BASE_PATH) console.log(`Using BASE_PATH: ${BASE_PATH}`);

const nextConfig: NextConfig = {
  basePath: BASE_PATH,
  assetPrefix: BASE_PATH ? `${BASE_PATH}/` : "",

  pageExtensions: ["md", "mdx", "tsx"],

  output: "export",
  distDir: "build",
  images: { unoptimized: true },
  publicRuntimeConfig: {
    baseUrl: BASE_PATH,
  },
  env: {
    baseUrl: BASE_PATH
  }
};

const withMDX = createMDX({
  extension: /\.mdx?$/,

  options: {
    rehypePlugins: [rehypeSlug],
    remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter, remarkGfm],
  },
});

export default withMDX(nextConfig);
