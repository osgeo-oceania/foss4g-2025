import { MDXProvider } from "@mdx-js/react";
import cx from "classnames";
import { MDXComponents } from "mdx/types";
import Blockquote from "./Blockquote";
import Button from "./Button";
import Link from "./Link";
import Table from "./Table";
import Head from "next/head";
import { HomeHeader } from "../HomeHeader";
import { InlineMap } from "./InlineMap";
import { DividerImage, FooterImage, HeaderImage } from "./Image";

import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();
const baseUrl = publicRuntimeConfig.baseUrl;

const mdxComponents: MDXComponents = {
  InlineMap: InlineMap,
  HomeHeader: HomeHeader,
  Title: (props) => (
    <Head>
      <title>{props.children}</title>
    </Head>
  ),
  HeaderImage: HeaderImage,
  FooterImage: FooterImage,
  DividerImage: DividerImage,
  StyledButton: Button,
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
      className={
        "text-xl font-bold text-primary-800 md:text-xl lg:text-2xl mt-8 mb-4"
      }
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
  table: Table,
  thead: (props) => <thead {...props} className="bg-primary-600" />,
  th: (props) => (
    <th
      {...props}
      className="px-3 md:px-6 py-2 md:py-3.5 text-xs md:text-sm font-bold text-left rtl:text-right text-slate-50"
    />
  ),
  tbody: (props) => (
    <tbody {...props} className="bg-primary-500 divide-y divide-primary-600" />
  ),
  td: (props) => (
    <td
      {...props}
      className="px-3 md:px-6 py-2 md:py-3.5 text-xs md:text-sm font-normal text-left rtl:text-right text-slate-50"
    />
  ),
  img: (props) => (
    <img
      {...props}
      src={props.src?.startsWith("/") ? `${baseUrl}${props.src}` : props.src}
      className={cx({ "popout-image": !props.width && !props.height })}
    />
  ),
  ul: (props) => <ul {...props} className="list-disc list-inside" />,
  wrapper: (props) => (
    <section
      className="container prose-base max-w-none px-4"
      // id={pathname.replace("/", "-")}
    >
      {props.children}
    </section>
  ),
};

const MdxComponentsProvider = ({ children }) => {
  return <MDXProvider components={mdxComponents}>{children}</MDXProvider>;
};

export default MdxComponentsProvider;
