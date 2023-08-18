<script lang="ts">
  import type { GenerationParameters } from "../generation/GenerationParameters";
  import Button from "./Button.svelte";
  import NumberField from "./NumberField.svelte";
    import Spacer from "./Spacer.svelte";
  import SubTitle from "./SubTitle.svelte";
  import ToggleField from "./ToggleField.svelte";

  export let parameters: GenerationParameters;
  export let generate: () => void;

  $: labelPrefix = parameters.usingOuterDimensions ? 'Outer' : 'Inner';

</script>

<div class="container">
  <Button 
    text={"Download STL"}
    onClick={generate}
  />

  <div class="inner-container">
    <SubTitle>Dimensions</SubTitle>

    <ToggleField
      label="Use outer dimensions"
      bind:value={parameters.usingOuterDimensions}
    />

    <Spacer />

    <NumberField
      label={`${labelPrefix} length`}
      suffix={"mm"}
      bind:value={parameters.length}
    />
    <NumberField
      label={`${labelPrefix} width`}
      suffix={"mm"}
      bind:value={parameters.width}
    />
    <NumberField
      label={`${labelPrefix} height`}
      suffix={"mm"}
      bind:value={parameters.height}
    />
  </div>
  <div class="inner-container">
    <SubTitle>Walls</SubTitle>
    <NumberField
      label={"Wall thickness"}
      suffix={"mm"}
      bind:value={parameters.wallThickness}
    />
  </div>
</div>

<style>
  .container {
    display: flex;
    flex-direction: column;
    align-items: start;
  }

  .inner-container {
    width: 400px;
    display: flex;
    flex-direction: column;
  }
</style>