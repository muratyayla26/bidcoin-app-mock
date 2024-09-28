import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type APIResponse<T = object> =
  | { success: true; data: T }
  | { success: false; error: string };
