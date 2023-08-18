<script lang="ts">
  import Info from "./components/Info.svelte";
  import ModelDisplay from "./components/ModelDisplay.svelte";
  import ParameterForm from "./components/ParameterForm.svelte";
  import type { GenerationParameters } from "./generation/GenerationParameters";
  import { convertToSTL } from "./generation/convert";
  import { getBoxContainerModel } from "./generation/modelGeneration";
  import { downloadBlob } from "./util/downloadBlob";

  let parameters: GenerationParameters = {
    length: 0,
    width: 0,
    height: 0,
    usingOuterDimensions: false,
    wallThickness: 0
  };

  $: model = getBoxContainerModel(parameters);

  const generate = () => {
    const blob = convertToSTL(model);
    downloadBlob(blob, 'Box.stl');
  }
</script>

<main>
  <Info />
  <div class="container">
    <ParameterForm 
      bind:parameters={parameters}
      generate={generate}
    />
    <ModelDisplay 
      model={model}
    />
  </div>
</main>

<style>
  main {
    font-family: Helvetica, sans-serif;
    margin: 30px;
  }

  .container {
    max-width: 100vw;
    display: flex;
    flex-direction: row;
    gap: 200px;
  }

  @media (max-width: 1150px) {
    .container {
      flex-direction: column;
      gap: 0;
    }
  }
</style>
