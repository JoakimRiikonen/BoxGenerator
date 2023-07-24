<script lang="ts">
  import type { Geom3 } from "@jscad/modeling/src/geometries/types";
  import { prepareRender, drawCommands, cameras, controls, entitiesFromSolids } from "@jscad/regl-renderer";
  import { onMount } from "svelte";
  import SubTitle from "./SubTitle.svelte";
  import { renderPreview } from "../rendering/renderPreview";
  export let model: Geom3;

  let mounted = false;
  const width = 500;
  const height = 500;
  let displayElement: HTMLCanvasElement;

  let models = [];
  $: models = entitiesFromSolids({}, model);
  $: render(models);

  let render = (models) => {
    if (!mounted) return;

    renderPreview({
      canvas: displayElement,
      size: {
        width: 500,
        height: 500,
      },
      models: models
    });
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