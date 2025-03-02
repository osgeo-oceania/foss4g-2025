import { MapComponent, MapProps } from "../Map";
import cx from "classnames";

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
      <MapComponent width={"100vw"} height={400} {...props} />
    </div>
  );
};
