import Markdown from "markdown-to-jsx";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { MapComponent } from "../components/Map";
import { markdownCommonStyles } from "../utils/markdownCommonStyles";

export const MarkdownPage = (props: {
  markdownUrl: string;
  headerImg: {
    url: string;
    positionX?: string;
    positionY?: string;
    height?: string | number;
  };
  showMap?: boolean;
}) => {
  // Get current page from react router
  const location = useLocation();
  const pathname = location.pathname.slice(1);

  const [mddText, setMddText] = useState("");

  useEffect(() => {
    setMddText("");
    fetch(props.markdownUrl)
      .then((res) => res.text())
      .then((text) => setMddText(text));
  }, [props.markdownUrl]);

  return (
    <>
      <div className="bg-gray-100">
        <section
          style={{
            backgroundRepeat: "no-repeat",
            backgroundImage: `url('${props.headerImg.url}')`,
            backgroundSize: "cover",
            backgroundPosition: `${props.headerImg.positionX ?? "center"} ${
              props.headerImg.positionY ?? "center"
            }`,
            height: props.headerImg.height ?? "16rem",
            maxWidth: 1920,
          }}
          className="m-auto relative flex items-center justify-center"
        ></section>
      </div>
      <div className="container mx-auto p-6">
        <section
          className="mt-8 prose-base max-w-none"
          id={pathname.replace("/", "-")}
        >
          <Markdown
            options={{
              overrides: markdownCommonStyles,
            }}
            children={mddText}
          />
        </section>
      </div>
      {props.showMap && (
        <div
          style={{ marginLeft: "calc((-100vw + 100%) / 2)" }}
          className="-mb-6 mt-6"
        >
          <MapComponent
            width={"100vw"}
            height={400}
            initialViewState={{
              longitude: 147.32031,
              latitude: -42.88898,
              zoom: 12.3,
            }}
          />
        </div>
      )}
    </>
  );
};
