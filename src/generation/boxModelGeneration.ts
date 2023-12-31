import type { GenerationParameters } from "./GenerationParameters"
import { primitives, booleans, transforms } from "@jscad/modeling";
import { isValidSharedParameters } from "./modelGeneration";

export const getBoxContainerModel = (parameters: GenerationParameters) => {
  if (!isValidBoxParameters(parameters)) {
    return undefined;
  }
  const box = booleans.subtract(
    getOuterBox(parameters),
    getInnerBox(parameters)
  );

  return box;
}

export const getBoxLidModel = (parameters: GenerationParameters) => {
  if (!isValidBoxParameters(parameters)) {
    return undefined;
  }
  const lid = booleans.union(
    getOuterLid(parameters),
    getInnerLid(parameters)
  )

  return lid;
}

export const getCompleteBoxModel = (parameters: GenerationParameters) => {
  let box = getBoxContainerModel(parameters);
  if (!parameters.generateLid) {
    return box;
  }

  let lid = getBoxLidModel(parameters);
  let movedLid = transforms.translate(
    [parameters.length + parameters.wallThickness + 50, 0, parameters.height/2], lid);

  let completeModel = booleans.union(box, movedLid);

  return completeModel;
}

const getOuterBox = (parameters: GenerationParameters) => {
  if (parameters.usingOuterDimensions) {
    return primitives.cuboid({
      size: [
        parameters.length,
        parameters.width,
        parameters.height - (parameters.generateLid ? parameters.lidOuterThickness : 0),
      ]
    });
  }

  return primitives.cuboid({
    size: [
      parameters.wallThickness*2 + parameters.length,
      parameters.wallThickness*2 + parameters.width,
      parameters.bottomThickness + parameters.height + (parameters.generateLid ? parameters.lidInnerThickness : 0),
    ]
  });
}

const getInnerBox = (parameters: GenerationParameters) => {
  if (parameters.usingOuterDimensions) {
    return primitives.cuboid({
      size: [
        parameters.length - parameters.wallThickness*2,
        parameters.width - parameters.wallThickness*2,
        parameters.height - parameters.bottomThickness - (parameters.generateLid ? parameters.lidOuterThickness : 0),
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
      parameters.height + (parameters.generateLid ? parameters.lidInnerThickness : 0),
    ],
    center: [
      0,
      0,
      parameters.bottomThickness / 2
    ]
  });
}

const getOuterLid = (parameters: GenerationParameters) => {
  if (parameters.usingOuterDimensions) {
    return primitives.cuboid({
      size: [
        parameters.length, 
        parameters.width,
        parameters.lidOuterThickness
      ]
    })
  }

  return primitives.cuboid({
    size: [
      parameters.length + 2*parameters.wallThickness, 
      parameters.width + 2*parameters.wallThickness,
      parameters.lidOuterThickness
    ]
  })
}

const getInnerLid = (parameters: GenerationParameters) => {
  if (parameters.usingOuterDimensions) {
    return primitives.cuboid({
      size: [
        parameters.length - 2*(parameters.toleranceGap + parameters.wallThickness),
        parameters.width - 2*(parameters.toleranceGap + parameters.wallThickness),
        parameters.lidInnerThickness
      ],
      center: [
        0,
        0,
        parameters.lidOuterThickness/2 + parameters.lidInnerThickness/2
      ]
    })
  }

  return primitives.cuboid({
    size: [
      parameters.length - 2*parameters.toleranceGap,
      parameters.width - 2*parameters.toleranceGap,
      parameters.lidInnerThickness
    ],
    center: [
      0,
      0,
      parameters.lidOuterThickness/2 + parameters.lidInnerThickness/2
    ]
  })
}

const isValidBoxParameters = (parameters: GenerationParameters) => {
  return isValidSharedParameters(parameters)
    && parameters.length > 0
    && parameters.width > 0
    && (parameters.usingOuterDimensions 
      ? parameters.wallThickness < parameters.length/2
        && parameters.wallThickness < parameters.width/2
      : true)
}