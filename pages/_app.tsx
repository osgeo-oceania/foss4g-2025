"use client";
import type { StaticImageData } from "next/image";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import Head from "next/head";
import { Open_Sans, Roboto_Serif } from "next/font/google";
import Footer from "../components/Footer";
import Header from "../components/Header";
import DefaultSocialMediaImage from "../public/imgs/2025/foss4g_2025_logo_interim.png";
import "../styles/global.css";

const robotoSerifFont = Roboto_Serif({
  subsets: ["latin"],
  weight: ["200", "400", "500", "700"],
  style: ["italic", "normal"],
  variable: "--font-roboto-serif",
});

const openSans = Open_Sans({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-open-sans",
});

// Make sure to import the MdxComponentsProvider dynamically to avoid SSR issues
// Otherwise we get hydration issues in dev
// This doesn't matter as we are exporting the app as a static site
const MdxComponentsProvider = dynamic(
  () => import("../components/PageLayout/MdxComponentsProvider"),
  { ssr: false }
);

interface PageMetadata {
  title: string;
  description: string;
  image: StaticImageData;
}

export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  console.log(pageProps);
  const metadata: PageMetadata = {
    ...{
      title: "FOSS4G 2025 Auckland",
      description: "FOSS4G Conference in Auckland, New Zealand",
      image: DefaultSocialMediaImage,
    },
    ...(pageProps?.metadata ?? {}),
  };

  return (
    <>
      <Head>
        <title>{metadata.title}</title>
        <meta property="description" content={metadata.description} />

        {/* og */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={metadata.title} />
        <meta
          property="og:url"
          content={`${process.env.baseUrl}${router.asPath}`}
        />
        <meta
          property="og:image"
          content={`${process.env.baseUrl}${metadata.image.src}`}
        />

        {/* twitter */}
        <meta property="twitter:card" content="summary" />
        <meta property="twitter:title" content={metadata.title} />
        <meta name="twitter:description" content={metadata.description} />
        <meta
          name="twitter:url"
          content={`${process.env.baseUrl}${router.asPath}`}
        />
        <meta
          name="twitter:image"
          content={`${process.env.baseUrl}${metadata.image.src}`}
        />
      </Head>
      <style jsx global>{`
        html {
          font-family: ${openSans.style.fontFamily};
        }

        .font-serif {
          font-family: ${robotoSerifFont.style.fontFamily};
        }
      `}</style>
      <main
        className={`${openSans.variable} ${robotoSerifFont.variable} font-sans bg-slate-50 text-slate-800 w-screen min-h-screen flex flex-col justify-between`}
      >
        <MdxComponentsProvider>
          <Header />
          <div className="container mx-auto px-4 py-4 flex-1">
            <Component {...pageProps} />
          </div>
          <Footer />
        </MdxComponentsProvider>
      </main>
    </>
  );
}
