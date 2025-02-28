import { MDXProvider } from "@mdx-js/react";
import cx from "classnames";
import { MDXComponents } from "mdx/types";
import Blockquote from "./Blockquote";
import Button from "./Button";
import Link from "./Link";
import { HeaderImage } from "./PageLayout";
import Table from "./Table";
import Head from "next/head";

const mdxComponents: MDXComponents = {
  Title: (props) => (
    <Head>
      <title>{props.children}</title>
    </Head>
  ),
  HeaderImage: HeaderImage,
  blockquote: Blockquote,
  h1: (props) => (
    <h1
      {...props}
      className={
        "text-3xl font-display font-light text-primary-800 md:text-3xl lg:text-5xl mt-8"
      }
    />
  ),

  h2: (props) => (
    <h2
      {...props}
      className={"text-xl font-bold text-primary-800 md:text-xl lg:text-2xl"}
    />
  ),

  h3: (props) => (
    <h3
      {...props}
      className={
        "text-base font-semibold text-primary-800 md:text-lg lg:text-xl"
      }
    />
  ),
  a: Link,
  button: Button,
  table: Table,
  thead: (props) => <thead {...props} className="bg-primary-800" />,
  th: (props) => (
    <th
      {...props}
      className="px-3 md:px-6 py-2 md:py-3.5 text-xs md:text-sm font-bold text-left rtl:text-right text-primary-800"
    />
  ),
  tbody: (props) => (
    <tbody {...props} className="bg-primary-900 divide-y divide-primary-700" />
  ),
  td: (props) => (
    <td
      {...props}
      className="px-3 md:px-6 py-2 md:py-3.5 text-xs md:text-sm font-normal text-left rtl:text-right text-primary-800"
    />
  ),
  img: (props) => (
    <img
      {...props}
      className={cx({ "popout-image": !props.width && !props.height })}
    />
  ),
  ul: (props) => <ul {...props} className="list-disc list-inside" />,
  wrapper: (props) => (
    <div className="container mx-auto px-4">
      <div className="prose-base max-w-none">{props.children}</div>
    </div>
  ),
};

const MdxComponentsProvider = ({ children }) => {
  return <MDXProvider components={mdxComponents}>{children}</MDXProvider>;
};

export default MdxComponentsProvider;
