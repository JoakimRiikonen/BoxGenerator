<script lang="ts">
  import type { GenerationParameters } from "../generation/GenerationParameters";
  import Button from "./Button.svelte";
  import NumberField from "./NumberField.svelte";

  export let parameters: GenerationParameters;
  export let generate: () => void;
</script>

<div class="container">
  <Button 
    text={"Generate"}
    onClick={generate}
  />

  <div class="inner-container">
    <h2>Dimensions</h2>

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
    <h2>Walls</h2>
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

  h2 {
    color: #A084DC;
    margin: 0;
    margin-top: 30px;
    margin-bottom: 10px;
    font-weight: normal;
  }
</style>