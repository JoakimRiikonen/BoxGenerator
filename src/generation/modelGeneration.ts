import type { GenerationParameters } from "./GenerationParameters";
import { ContainerTypes } from "./ContainerTypes";
import { getBoxContainerModel, getBoxLidModel, getCompleteBoxModel } from "./boxModelGeneration";
import { getCompleteCylinderModel, getCylinderContainerModel, getCylinderLidModel } from "./cylinderModelGeneration";

export const getContainerModel = (parameters: GenerationParameters) => {
  if (parameters.containerType === ContainerTypes.Box) {
    return getBoxContainerModel(parameters);
  }
  if (parameters.containerType === ContainerTypes.Cylinder) {
    return getCylinderContainerModel(parameters);
  }
}

export const getLidModel = (parameters: GenerationParameters) => {
  if (parameters.containerType === ContainerTypes.Box) {
    return getBoxLidModel(parameters);
  }
  if (parameters.containerType === ContainerTypes.Cylinder) {
    return getCylinderLidModel(parameters);
  }
}

export const getCompleteModel = (parameters: GenerationParameters) => {
  if (parameters.containerType === ContainerTypes.Box) {
    return getCompleteBoxModel(parameters);
  }
  if (parameters.containerType === ContainerTypes.Cylinder) {
    return getCompleteCylinderModel(parameters);
  }
}

export const isValidSharedParameters = (parameters: GenerationParameters) => {
  return parameters.height > 0
    && parameters.wallThickness > 0
    && parameters.bottomThickness > 0
    && (parameters.usingOuterDimensions 
      ? parameters.bottomThickness < parameters.height
      : true)
    && (parameters.generateLid
      ? parameters.lidOuterThickness > 0
        && parameters.lidInnerThickness > 0
        && parameters.toleranceGap >= 0
        && (parameters.usingOuterDimensions
        ? parameters.lidOuterThickness < parameters.height
        : true)
      : true)
}