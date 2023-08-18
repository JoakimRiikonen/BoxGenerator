<script lang="ts">
    import { ContainerTypes } from "../generation/ContainerTypes";
  import type { GenerationParameters } from "../generation/GenerationParameters";
  import Button from "./Button.svelte";
  import NumberField from "./NumberField.svelte";
    import RadioButton from "./RadioButton.svelte";
  import Spacer from "./Spacer.svelte";
  import SubTitle from "./SubTitle.svelte";
  import ToggleField from "./ToggleField.svelte";

  export let parameters: GenerationParameters;
  export let generateBox: () => void;
  export let generateLid: () => void;

  $: labelPrefix = parameters.usingOuterDimensions ? 'Outer' : 'Inner';

</script>

<div class="container">
  {#if parameters.generateLid}
    <div>
      <Button 
        text={"Download box STL"}
        onClick={generateBox}
      />
      <Button 
        text={"Download lid STL"}
        onClick={generateLid}
      />
    </div>
  {:else}
    <Button 
      text={"Download STL"}
      onClick={generateBox}
    />
  {/if}

  <div class="inner-container">
    <SubTitle>Container type</SubTitle>
    <div role="radiogroup">
      <RadioButton label="Box" bind:group={parameters.containerType} name={"Type"} value={ContainerTypes.Box}/>
      <RadioButton label="Cylinder" bind:group={parameters.containerType} name={"Type"} value={ContainerTypes.Cylinder}/>
    </div>
  </div>

  <div class="inner-container">
    <SubTitle>Dimensions</SubTitle>

    <ToggleField
      label="Use outer dimensions"
      bind:value={parameters.usingOuterDimensions}
    />

    <Spacer />

    {#if parameters.containerType === ContainerTypes.Box}
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
    {:else if parameters.containerType === ContainerTypes.Cylinder}
      <NumberField
        label={`${labelPrefix} diameter`}
        suffix={"mm"}
        bind:value={parameters.diameter}
      />
    {/if}
    <NumberField
      label={`${labelPrefix} height`}
      suffix={"mm"}
      bind:value={parameters.height}
    />
  </div>
  <div class="inner-container">
    <SubTitle>Walls and bottom</SubTitle>
    {#if parameters.containerType === ContainerTypes.Cylinder}
      <NumberField
        label={`Segments`}
        suffix={""}
        bind:value={parameters.segments}
      />
    {/if}
    <NumberField
      label={"Wall thickness (mm)"}
      suffix={"mm"}
      bind:value={parameters.wallThickness}
    />
    <NumberField
      label={"Bottom thickness"}
      suffix={"mm"}
      bind:value={parameters.bottomThickness}
    />
  </div>

  <div class="inner-container">
    <SubTitle>Lid</SubTitle>

    <ToggleField 
      label={"Generate lid"}
      bind:value={parameters.generateLid}
    />

    <Spacer />

    <NumberField
      label={"Lid outer height"}
      suffix={"mm"}
      bind:value={parameters.lidOuterThickness}
      disabled={!parameters.generateLid}
    />
    <NumberField
      label={"Lid inner height"}
      suffix={"mm"}
      bind:value={parameters.lidInnerThickness}
      disabled={!parameters.generateLid}
    />
    <NumberField
      label={"Tolerance gap"}
      suffix={"mm"}
      bind:value={parameters.toleranceGap}
      disabled={!parameters.generateLid}
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