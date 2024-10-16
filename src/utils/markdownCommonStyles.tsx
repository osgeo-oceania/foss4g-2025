import { MarkdownToJSX } from "markdown-to-jsx";
import Blockquote from "../components/Blockquote";
import Button from "../components/Button";
import Table from "../components/Table";
import Link from "../components/Link";

export const markdownCommonStyles: MarkdownToJSX.Overrides = {
  blockquote: {
    component: Blockquote,
  },
  a: {
    component: Link,
  },
  button: {
    component: Button,
  },
  table: {
    component: Table,
  },
  thead: {
    props: {
      className: "bg-gray-800",
    },
  },
  th: {
    props: {
      className:
        "px-3 md:px-6 py-2 md:py-3.5 text-xs md:text-sm font-bold text-left rtl:text-right text-gray-200",
    },
  },
  tbody: {
    props: {
      className: "bg-gray-900 divide-y divide-gray-700",
    },
  },
  td: {
    props: {
      className:
        "px-3 md:px-6 py-2 md:py-3.5 text-xs md:text-sm font-normal text-left rtl:text-right text-gray-200",
    },
  },
  img: {
    props: {
      className: "popout-image",
    },
  },
  ul: {
    props: {
      className: "list-disc list-inside",
    },
  },
};
