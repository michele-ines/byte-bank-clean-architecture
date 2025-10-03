import { DonutChartProps } from "@/src/shared/ProfileStyles/profile.styles.types";
import { layout } from "@/src/theme/layout";
import { radius } from "@/src/theme/radius";
import React from "react";
import { View } from "react-native";
import Svg, { Circle, G } from "react-native-svg";
import { styles } from "./DonutChart.styles";

const DIAMETER_MULTIPLIER = 2;
const FULL_CIRCLE_DEGREES = 360;
const START_ANGLE_OFFSET = -90;
const CIRCUMFERENCE_FACTOR = DIAMETER_MULTIPLIER * Math.PI;
const MINIMUM_VALUE_TO_RENDER = 0;
const FULL_PERCENTAGE = 1;

export const DonutChart: React.FC<DonutChartProps> = ({
  data,
  radius: chartRadius = radius.x,
  strokeWidth = layout.width20,
  style,
  ...rest
}) => {
  const circumference = CIRCUMFERENCE_FACTOR * chartRadius;
  const center = chartRadius + strokeWidth / DIAMETER_MULTIPLIER;
  const svgSize = center * DIAMETER_MULTIPLIER;
  const totalValue = data.reduce(
    (sum, item) => sum + item.value,
    MINIMUM_VALUE_TO_RENDER
  );

  let cumulativePercent = MINIMUM_VALUE_TO_RENDER;

  return (
    <View style={[styles.chartContainer, style]} {...rest}>
      <Svg height={svgSize} width={svgSize} viewBox={`0 0 ${svgSize} ${svgSize}`}>
        <G transform={`rotate(${START_ANGLE_OFFSET}, ${center}, ${center})`}>
          {data.map((item, index) => {
            if (item.value <= MINIMUM_VALUE_TO_RENDER) return null;

            const percent = item.value / totalValue;
            const strokeDashoffset = circumference * (FULL_PERCENTAGE - percent);
            const rotation = cumulativePercent * FULL_CIRCLE_DEGREES;
            cumulativePercent += percent;

            return (
              <Circle
                key={index}
                cx={center}
                cy={center}
                r={chartRadius}
                stroke={item.color}
                fill="transparent"
                strokeWidth={strokeWidth}
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                transform={`rotate(${rotation}, ${center}, ${center})`}
                strokeLinecap="round"
              />
            );
          })}
        </G>
      </Svg>
    </View>
  );
};
