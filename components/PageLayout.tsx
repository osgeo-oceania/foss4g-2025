import { ReactNode } from "react";
import { MapComponent, MapProps } from "./Map";
import cx from "classnames";

export const HeaderImage = (props: {
  url: string;
  positionX?: string;
  positionY?: string;
  height?: string | number;
}) => {
  return (
    <div
      className="bg-gray-100 w-screen -mt-4 mb-4"
      style={{ marginLeft: "calc((-100vw + 100%) / 2)" }}
    >
      <section
        style={{
          backgroundRepeat: "no-repeat",
          backgroundImage: `url('${props.url}')`,
          backgroundSize: "cover",
          backgroundPosition: `${props.positionX ?? "center"} ${
            props.positionY ?? "center"
          }`,
          height: props.height ?? "16rem",
          maxWidth: 1920,
        }}
        className="m-auto relative flex items-center justify-center"
      ></section>
    </div>
  );
};

export const PageBody = (props: { children: ReactNode }) => {
  return (
    <div className="container mx-auto p-6">
      <section
        className="mt-8 prose-base max-w-none"
        // id={pathname.replace("/", "-")}
      >
        {props.children}
      </section>
    </div>
  );
};

export const InlineMap = (
  props: Partial<MapProps> & { className?: string; bottom?: boolean }
) => {
  return (
    <div
      style={{ marginLeft: "calc((-100vw + 100%) / 2)" }}
      className={cx(props.className, {
        "-mb-4": props.bottom,
      })}
    >
      <MapComponent
        width={"100vw"}
        height={400}
        initialViewState={{
          longitude: 147.32031,
          latitude: -42.88898,
          zoom: 12.3,
        }}
        {...props}
      />
    </div>
  );
};
