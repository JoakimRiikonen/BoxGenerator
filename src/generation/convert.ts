import type { Geom3 } from "@jscad/modeling/src/geometries/types";
import stlSerializer from '@jscad/stl-serializer';

export const convertToSTL = (model: Geom3) => {
  const stlData = stlSerializer.serialize({binary: true}, model);
  const stlBlob = new Blob(stlData);
  return stlBlob;
}