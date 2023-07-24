import { primitives, booleans } from "@jscad/modeling";
import type { GenerationParameters } from "./GenerationParameters";

export const getBoxContainerModel = (parameters: GenerationParameters) => {
  if (!validParameters(parameters)) {
    return undefined;
  }
  const box = booleans.subtract(
    getOuterBox(parameters),
    getInnerBox(parameters)
  );

  return box;
}

const validParameters = (parameters: GenerationParameters) => {
  return parameters.innerHeight > 0
    && parameters.innerLength > 0
    && parameters.innerWidth > 0
    && parameters.wallThickness > 0
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