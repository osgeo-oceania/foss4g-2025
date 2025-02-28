import getConfig from "next/config";
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  const { publicRuntimeConfig } = getConfig();

  return (
    <Html lang="en">
      <Head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />

        {/* <meta
          property="og:image"
          content="https://foss4g2025.org/og-image.png"
        /> */}
        <meta property="og:title" content="FOSS4G 2025" />
        {/* <script
          defer
          src="https://cloud.umami.is/script.js"
          data-website-id={publicRuntimeConfig.UMAMI_WEBSITE_ID}
        ></script> */}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
