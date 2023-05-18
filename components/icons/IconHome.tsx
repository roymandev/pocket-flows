import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
const IconHome = (props: SvgProps) => (
  <Svg width={32} height={32} fill="none" {...props}>
    <Path
      fill="currentColor"
      d="m27.67 13.56-2-1.82L18 4.78a3 3 0 0 0-4 0l-7.65 7-2 1.82A1 1 0 0 0 5 15.3a1 1 0 0 0 .67-.3l.33-.3V25a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3V14.74l.33.3a1 1 0 0 0 .67.26 1 1 0 0 0 .67-1.74Z"
    />
  </Svg>
);
export default IconHome;
