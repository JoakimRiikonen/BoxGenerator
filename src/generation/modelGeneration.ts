import { primitives, booleans } from "@jscad/modeling";
import type { GenerationParameters } from "./GenerationParameters";

export const getBoxContainerModel = (parameters: GenerationParameters) => {
  const box = booleans.subtract(
    getOuterBox(parameters),
    getInnerBox(parameters)
  );

  return box;
}

const getOuterBox = (parameters: GenerationParameters) => {
  return primitives.cuboid({
    size: [
      parameters.wallThickness*2 + parameters.innerLength,
      parameters.wallThickness*2 + parameters.innerWidth,
      parameters.wallThickness + parameters.innerHeight,
    ]
  });
}

const getInnerBox = (parameters: GenerationParameters) => {
  return primitives.cuboid({
    size: [
      parameters.innerLength,
      parameters.innerWidth,
      parameters.innerHeight,
    ],
    center: [
      0,
      0,
      parameters.wallThickness / 2
    ]
  });
}