<script lang="ts">
  import Info from "./components/Info.svelte";
  import ModelDisplay from "./components/ModelDisplay.svelte";
  import ParameterForm from "./components/ParameterForm.svelte";
    import { ContainerTypes } from "./generation/ContainerTypes";
  import type { GenerationParameters } from "./generation/GenerationParameters";
  import { convertToSTL } from "./generation/convert";
  import { getContainerModel, getLidModel, getCompleteModel } from "./generation/modelGeneration";
  import { downloadBlob } from "./util/downloadBlob";

  let parameters: GenerationParameters = {
    containerType: ContainerTypes.Box,
    length: 50,
    width: 50,
    height: 50,
    diameter: 50,
    segments: 72,
    usingOuterDimensions: false,
    wallThickness: 5,
    bottomThickness: 5,
    generateLid: false,
    lidInnerThickness: 5,
    lidOuterThickness: 5,
    toleranceGap: 0.25
  };

  $: model = getCompleteModel(parameters);

  const generateBox = () => {
    const blob = convertToSTL(getContainerModel(parameters));
    downloadBlob(blob, 'Container.stl');
  }

  const generateLid = () => {
    const blob = convertToSTL(getLidModel(parameters));
    downloadBlob(blob, 'Lid.stl');
  }

</script>

<main>
  <Info />
  <div class="container">
    <ParameterForm 
      bind:parameters={parameters}
      generateBox={generateBox}
      generateLid={generateLid}
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
