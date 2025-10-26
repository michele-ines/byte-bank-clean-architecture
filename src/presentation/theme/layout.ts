import { DimensionValue } from "react-native";
import { Edge } from "react-native-safe-area-context";

export const layout = {
  one: 1,
  row: "row" as const,

  positionAbsolute: "absolute" as const,
  positionRelative: "relative" as const,
  stretch: "stretch" as const,
  barStyle: "dark-content" as const,

  elevation0: 0,
  elevation1: 1,
  elevation: 3,

  zIndex1: 1,
  zIndex2: 2,

  opacity0: 0,
  opacitySm: 0.2,
  opacityMd: 0.6,
  opacityImage: 0.8,
  opacityLg: 0.9,
  opacityPressed: 0.9,

  widthFull: "100%" as DimensionValue,
  width90Percent: "90%" as DimensionValue,
  width220: 220,
  width150: 150,
  width0: 0,
  width12: 12,
  width20: 20,
  height36: 36,
  width36: 36,
  modalTopPosition: "30%" as DimensionValue,
  width45Percent: "45%" as DimensionValue,

  height80: 80,
  height50: 50,
  height2: 2,
  height12: 12,
  minHeight: 220,
  heightModalMax: "85%" as DimensionValue,
  height50Percent: "50%" as DimensionValue,
  height100Percent: "100%" as DimensionValue,
  minHeight600: 600,

  paddingVertical: 44,
  paddingHorizontal: 66,

  gap: 40,

  // 📱 Breakpoints
  breakpointLg: 1024,
  chartHeight: 220,
  maxLenght: 15,

  borderWidth: 1,
  flex1: 1,
  flexRow: "row" as const,
  flexColumn: "column" as const,

  safeEdges: ["top", "bottom"] as Edge[],
};
