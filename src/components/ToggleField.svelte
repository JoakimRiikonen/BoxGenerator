<script lang="ts">
    import ToggleButton from "./ToggleButton.svelte";

  export let value = false;
  export let label = "";
</script>

<!-- The associated control is inside ToggleButton -->
<!-- svelte-ignore a11y-label-has-associated-control -->
<label class="container">
  <span class="label-text">
    {label}
  </span>
  <ToggleButton bind:value={value} />
</label>  

<style>
  .container {
    display: flex;
    justify-content: space-between;
  }

  .label-text {
    margin-top: 5px;
  }
</style>
