<script lang="ts">
  import type { Geom3 } from "@jscad/modeling/src/geometries/types";
  import { prepareRender, drawCommands, cameras, controls, entitiesFromSolids } from "@jscad/regl-renderer";
  import { onMount } from "svelte";
  import SubTitle from "./SubTitle.svelte";
  export let model: Geom3;

  let mounted = false;
  const width = 500;
  const height = 500;
  let displayElement;

  let models = [];
  $: models = entitiesFromSolids({}, model);
  $: render(models);

  let render = (models) => {
    if (!mounted) return;

    //TODO: clean this mess

    const perspectiveCamera = cameras.perspective;
    const cameraState = Object.assign({}, perspectiveCamera.defaults);
    perspectiveCamera.setProjection(cameraState, cameraState, {width, height});
    perspectiveCamera.update(cameraState, cameraState);

    const options = {
      glOptions: {
        canvas: displayElement
      },
      camera: cameraState,
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
          size: [500, 500],
          ticks: [25, 5]
        },
        {
          visuals: {
            drawCmd: 'drawAxis',
            show: false
          },
          size: 300
        },
        ...models
      ]
    }

    let renderer = prepareRender(options);
    renderer(options);
  }

  onMount(() => {
    mounted = true;
  });
</script>

<div class="container">
  <SubTitle>Preview</SubTitle>
  <canvas width={width} height={height} bind:this={displayElement}></canvas>
</div>

<style>
  .container {
    margin-top: 35px;
  }

  canvas {
    border: 1px solid #A084DC;
    max-width: 80vw;
  }
</style>