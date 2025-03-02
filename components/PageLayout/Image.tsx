import cx from "classnames";

interface ImageProps {
  url: string;
  positionX?: string;
  positionY?: string;
  height?: string | number;
  alt?: string;
  className?: string;
}

const ImageBase = (props: ImageProps) => (
  <img
    src={props.url}
    alt={props.alt}
    style={{
      objectPosition: `${props.positionX ?? "center"} ${
        props.positionY ?? "center"
      }`,
      height: props.height ?? "16rem",
    }}
    className={cx(
      "m-auto relative flex items-center justify-center object-cover w-full",
      props.className
    )}
  />
);

export const HeaderImage = (props: ImageProps) => {
  return (
    <div
      className={cx("bg-slate-200 w-screen", "-mt-4 mb-4")}
      style={{ marginLeft: "calc((-100vw + 100%) / 2)" }}
    >
      <ImageBase {...props} className="max-w-[1920px]" />
    </div>
  );
};

export const DividerImage = (props: ImageProps) => {
  return (
    <div
      className={cx("bg-slate-100 w-screen my-8")}
      style={{ marginLeft: "calc((-100vw + 100%) / 2)" }}
    >
      <ImageBase {...props} className="max-w-7xl" />
    </div>
  );
};

export const FooterImage = (props: ImageProps) => {
  return (
    <div
      className={cx("bg-slate-200 w-screen", "mt-8 -mb-4")}
      style={{ marginLeft: "calc((-100vw + 100%) / 2)" }}
    >
      <ImageBase {...props} className="max-w-[1920px]" />
    </div>
  );
};
