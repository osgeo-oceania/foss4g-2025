"use client";
import type { AppProps } from "next/app";
import dynamic from "next/dynamic";
import { Open_Sans, Roboto_Serif } from "next/font/google";
import Footer from "../components/Footer";
import Header from "../components/Header";
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
  () => import("../components/MdxComponentsProvider"),
  { ssr: false }
);

export default function MyApp({ Component, pageProps }: AppProps) {
  console.log(Component.frontmatter);
  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${openSans.style.fontFamily};
        }

        .font-serif {
          font-family: ${robotoSerifFont.style.fontFamily};
        }
      `}</style>
      <main
        className={`${openSans.variable} ${robotoSerifFont.variable} font-sans bg-slate-50 text-slate-800  `}
      >
        <MdxComponentsProvider>
          <Header />
          <div className="container mx-auto px-4 py-4">
            <div className="prose-base max-w-none">
              <Component {...pageProps} />
            </div>
          </div>

          <Footer />
        </MdxComponentsProvider>
      </main>
    </>
  );
}
