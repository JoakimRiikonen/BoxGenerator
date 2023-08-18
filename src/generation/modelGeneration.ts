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
  return parameters.height > 0
    && parameters.length > 0
    && parameters.width > 0
    && parameters.wallThickness > 0
}

const getOuterBox = (parameters: GenerationParameters) => {
  if (parameters.usingOuterDimensions) {
    return primitives.cuboid({
      size: [
        parameters.length,
        parameters.width,
        parameters.height,
      ]
    });
  }

  return primitives.cuboid({
    size: [
      parameters.wallThickness*2 + parameters.length,
      parameters.wallThickness*2 + parameters.width,
      parameters.wallThickness + parameters.height,
    ]
  });
}

const getInnerBox = (parameters: GenerationParameters) => {
  if (parameters.usingOuterDimensions) {
    return primitives.cuboid({
      size: [
        parameters.length - parameters.wallThickness*2,
        parameters.width - parameters.wallThickness*2,
        parameters.height - parameters.wallThickness,
      ],
      center: [
        0,
        0,
        parameters.wallThickness / 2
      ]
    });
  }

  return primitives.cuboid({
    size: [
      parameters.length,
      parameters.width,
      parameters.height,
    ],
    center: [
      0,
      0,
      parameters.wallThickness / 2
    ]
  });
}