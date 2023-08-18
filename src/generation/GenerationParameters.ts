import type { ContainerTypes } from "./ContainerTypes";

export interface GenerationParameters {
  containerType: ContainerTypes;

  // Box only
  length: number;
  width: number;

  // Cylinder only
  diameter: number;
  segments: number;

  // Shared
  height: number;
  usingOuterDimensions: boolean;
  wallThickness: number;
  bottomThickness: number;

  generateLid: boolean;
  lidOuterThickness: number;
  lidInnerThickness: number;
  toleranceGap: number;
}