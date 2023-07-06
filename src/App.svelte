<script lang="ts">
  import NumberField from "./components/NumberField.svelte";
    import type { GenerationParameters } from "./generation/GenerationParameters";
    import { generateBox } from "./generation/generate";

  let parameters: GenerationParameters = {
    innerLength: 0,
    innerWidth: 0,
    innerHeight: 0,
    wallThickness: 0
  };

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
  <button on:click={() => generateBox(parameters)}>Generate</button>
</main>
<p>
  {parameters.innerLength}
  {parameters.innerWidth}
  {parameters.innerHeight}
  {parameters.wallThickness}
</p>

<style>
</style>
