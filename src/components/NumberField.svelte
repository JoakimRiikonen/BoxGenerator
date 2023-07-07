<script>
  export let value = 0;
  export let label;
  export let suffix = "";
</script>
<label>
  {label}
  <span>
    <input type="number" bind:value={value} min="0"/>
    {suffix}
  </span>
</label>

<style>
  label {
    padding: 5px 0;
    display: flex;
    justify-content: space-between;
  }

  input {
    padding: 5px;
    border: 1px solid grey;
    border-radius: 3px;
  }
</style>