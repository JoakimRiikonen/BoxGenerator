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
    && parameters.bottomThickness > 0
    && (parameters.usingOuterDimensions 
      ? parameters.wallThickness < parameters.length/2
        && parameters.wallThickness < parameters.width/2
        && parameters.bottomThickness < parameters.height
      : true)
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
      parameters.bottomThickness + parameters.height,
    ]
  });
}

const getInnerBox = (parameters: GenerationParameters) => {
  if (parameters.usingOuterDimensions) {
    return primitives.cuboid({
      size: [
        parameters.length - parameters.wallThickness*2,
        parameters.width - parameters.wallThickness*2,
        parameters.height - parameters.bottomThickness,
      ],
      center: [
        0,
        0,
        parameters.bottomThickness / 2
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
      parameters.bottomThickness / 2
    ]
  });
}