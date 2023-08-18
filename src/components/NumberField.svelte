<script>
  export let value = 0;
  export let label;
  export let suffix = "";
  export let disabled = false;
</script>
<label class={disabled && "disabled"}>
  {label}
  <span class="input-container">
    <input type="number" bind:value={value} min="0" disabled={disabled}/>
    <span class="suffix">{suffix}</span>
  </span>
</label>

<style>
  label {
    padding: 5px 0;
    display: flex;
    justify-content: space-between;
    max-width: 90vw;
  }

  .disabled {
    color: #ccc;
  }

  .input-container {
    width: 200px;
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