import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
const IconPieChart = (props: SvgProps) => (
  <Svg width={32} height={32} fill="none" {...props}>
    <Path fill="currentColor" d="M28 15H17V4a12 12 0 0 1 11 11Z" />
    <Path
      fill="currentColor"
      d="M28 17A12 12 0 1 1 15 4v12a1 1 0 0 0 1 1h12Z"
    />
  </Svg>
);
export default IconPieChart;
