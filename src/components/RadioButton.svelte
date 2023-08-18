<script lang="ts">
  export let label = "";
  export let group;
  export let name;
  export let value;
</script>

<label class="container">
  <input type="radio" name={name} bind:group={group} value={value}>
  <span>{label}</span>
</label>

<style>
  .container {
    display: inline-block;
  }

  input {
    position: absolute;
    opacity: 0;
    width: 0;
    height: 0;
  }
  
  span {
    display: inline-block;
    background-color: #BAACD8;
    color: white;
    padding: 10px 20px;
    font-weight: 600;
    font-size: 14px;
    cursor: pointer;
    border-radius: 5px;
  }

  input:checked + span {
    background-color: #A084DC;
  }

  input:focus-visible + span {
    box-shadow: 0 0 5px black;
  }
</style>