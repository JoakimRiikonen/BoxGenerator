<script lang="ts">
  import type { GenerationParameters } from "../generation/GenerationParameters";
  import Button from "./Button.svelte";
  import NumberField from "./NumberField.svelte";
  import SubTitle from "./SubTitle.svelte";

  export let parameters: GenerationParameters;
  export let generate: () => void;
</script>

<div class="container">
  <Button 
    text={"Download STL"}
    onClick={generate}
  />

  <div class="inner-container">
    <SubTitle>Dimensions</SubTitle>

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