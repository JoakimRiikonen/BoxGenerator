import type { GenerationParameters } from "./GenerationParameters";
import { getBoxContainerModel } from "./modelGeneration";
import stlSerializer from '@jscad/stl-serializer';

export const generateBoxContainer = (parameters: GenerationParameters) => {
  const model = getBoxContainerModel(parameters);
  const stlData = stlSerializer.serialize({binary: true}, model);
  const stlBlob = new Blob(stlData);
  return stlBlob;
}