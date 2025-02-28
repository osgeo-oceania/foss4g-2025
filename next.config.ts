import type { NextConfig } from "next";
import createMDX from "@next/mdx";

import rehypeSlug from "rehype-slug";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";

const nextConfig: NextConfig = {
  // Configure `pageExtensions` to include markdown and MDX files
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],

  output: "export",
  distDir: "build",
};

const withMDX = createMDX({
  extension: /\.mdx?$/,

  options: {
    rehypePlugins: [rehypeSlug],
    remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter],
  },
});

export default withMDX(nextConfig);
