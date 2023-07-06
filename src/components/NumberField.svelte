<script>
  export let value = 0;
  export let label;
  export let suffix = "";
</script>
<label>
  {label}
  <input type="number" bind:value={value} min="0"/>
  {suffix}
</label>