<script lang="ts">
  import NumberField from "./components/NumberField.svelte";
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
  <NumberField
    label={"Inner length"}
    suffix={"mm"}
    bind:value={parameters.innerLength}
  />
  <NumberField
    label={"Inner width"}
    suffix={"mm"}
    bind:value={parameters.innerWidth}
  />
  <NumberField
    label={"Inner height"}
    suffix={"mm"}
    bind:value={parameters.innerHeight}
  />
  <NumberField
    label={"Wall thickness"}
    suffix={"mm"}
    bind:value={parameters.wallThickness}
  />
  <button on:click={() => generate()}>Generate</button>
</main>

<style>
</style>
