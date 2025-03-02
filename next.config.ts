import type { NextConfig } from "next";
import createMDX from "@next/mdx";

import rehypeSlug from "rehype-slug";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import remarkGfm from "remark-gfm";

const BASE_PATH = process.env.BASE_PATH ?? "";

const nextConfig: NextConfig = {
  basePath: BASE_PATH,
  assetPrefix: BASE_PATH ? `${BASE_PATH}/` : "/",

  // Configure `pageExtensions` to include markdown and MDX files
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],

  output: "export",
  distDir: "build",
};

const withMDX = createMDX({
  extension: /\.mdx?$/,

  options: {
    rehypePlugins: [rehypeSlug],
    remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter, remarkGfm],
  },
});

export default withMDX(nextConfig);
