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
    max-width: 90vw;
  }

  input {
    padding: 5px;
    border: 1px solid grey;
    border-radius: 3px;
  }
  
  @media (orientation: portrait){
    label {
      flex-direction: column;
    }

    input {
      margin-top: 5px;
    }
  }
</style>