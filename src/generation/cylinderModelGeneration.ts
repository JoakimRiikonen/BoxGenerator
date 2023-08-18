import type { GenerationParameters } from "./GenerationParameters";
import { primitives, booleans, transforms } from "@jscad/modeling";
import { isValidSharedParameters } from "./modelGeneration";

export const getCylinderContainerModel = (parameters: GenerationParameters) => {
  if (!isValidCylinderParameters(parameters)) {
    return undefined;
  }
  const cyl = booleans.subtract(
    getOuterCylinder(parameters),
    getInnerCylinder(parameters)
  );

  return cyl;
}

export const getCylinderLidModel = (parameters: GenerationParameters) => {
  if (!isValidCylinderParameters(parameters)) {
    return undefined;
  }
  // TODO
  return primitives.cylinder();
}

export const getCompleteCylinderModel = (parameters: GenerationParameters) => {
  let cyl = getCylinderContainerModel(parameters);
  if (!parameters.generateLid) {
    return cyl;
  }

  let lid = getCylinderLidModel(parameters);
  let movedLid = transforms.translate(
    [parameters.diameter + parameters.wallThickness + 50, 0, parameters.height/2], lid
  );

  let completeModel = booleans.union(cyl, movedLid);

  return completeModel;
}

const getOuterCylinder = (parameters: GenerationParameters) => {
  if (parameters.usingOuterDimensions) {
    return primitives.cylinder({
      height: parameters.height,
      radius: parameters.diameter/2,
      segments: parameters.segments,
    })
  }

  return primitives.cylinder({
    height: parameters.height + parameters.bottomThickness,
    radius: parameters.diameter/2 + parameters.wallThickness,
    segments: parameters.segments,
  })
}

const getInnerCylinder = (parameters: GenerationParameters) => {
  if (parameters.usingOuterDimensions) {
    return primitives.cylinder({
      height: parameters.height - parameters.bottomThickness,
      radius: parameters.diameter/2 - parameters.wallThickness,
      center: [0, 0, parameters.bottomThickness/2],
      segments: parameters.segments,
    })
  }

  return primitives.cylinder({
    height: parameters.height,
    radius: parameters.diameter/2,
    center: [0, 0, parameters.bottomThickness/2],
    segments: parameters.segments,
  })
}

const isValidCylinderParameters = (parameters: GenerationParameters) => {
  return isValidSharedParameters(parameters)
    && parameters.diameter > 0
    && parameters.segments >= 4
    && (parameters.usingOuterDimensions
      ? parameters.wallThickness < parameters.diameter/2
      : true)
}