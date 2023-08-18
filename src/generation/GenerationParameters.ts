export interface GenerationParameters {
  length: number;
  width: number;
  height: number;
  usingOuterDimensions: boolean;
  wallThickness: number;
  bottomThickness: number;

  generateLid: boolean;
  lidOuterThickness: number;
  lidInnerThickness: number;
  toleranceGap: number;
}