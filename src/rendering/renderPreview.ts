import type { Geom3 } from "@jscad/modeling/src/geometries/types";
import { prepareRender, drawCommands, cameras, controls, entitiesFromSolids } from "@jscad/regl-renderer";

export interface InitRenderedParams {
  canvas: HTMLCanvasElement;
  size: {
    width: number;
    height: number;
  },
  models: Geom3[];
}

export const renderPreview = (params: InitRenderedParams) => {

  const options = {
    glOptions: {
      canvas: params.canvas
    },
    camera: initCamera(params.size.width, params.size.height),
      drawCommands: {
      drawAxis: drawCommands.drawAxis,
      drawGrid: drawCommands.drawGrid,
      drawLines: drawCommands.drawLines,
      drawMesh: drawCommands.drawMesh
    },
    entities: [
      { 
        visuals: {
          drawCmd: 'drawGrid',
          show: false
        },
        size: [params.size.width, params.size.height],
        ticks: [25, 5]
      },
      {
        visuals: {
          drawCmd: 'drawAxis',
          show: false
        },
        size: 300
      },
      ...params.models
    ]
  }

  let renderer = prepareRender(options);
  renderer(options);
}

const initCamera = (width: number, height: number) => {
  const perspectiveCamera = cameras.perspective;
  const cameraState = Object.assign({}, perspectiveCamera.defaults);
  perspectiveCamera.setProjection(cameraState, cameraState, {width, height});
  perspectiveCamera.update(cameraState, cameraState);

  return cameraState
}