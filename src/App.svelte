<script lang="ts">
  import Info from "./components/Info.svelte";
  import ParameterForm from "./components/ParameterForm.svelte";
  import type { GenerationParameters } from "./generation/GenerationParameters";
  import { generateBoxContainer } from "./generation/generate";
  import { downloadBlob } from "./util/downloadBlob";

  let parameters: GenerationParameters = {
    innerLength: 0,
    innerWidth: 0,
    innerHeight: 0,
    wallThickness: 0
  };

  const generate = () => {
    const blob = generateBoxContainer(parameters);
    downloadBlob(blob, 'Box.stl');
  }
</script>

<main>
  <Info />
  <ParameterForm 
    bind:parameters={parameters}
    generate={generate}
  />
</main>

<style>
  main {
    font-family: Helvetica, sans-serif;
    margin: 30px;
  }
</style>
