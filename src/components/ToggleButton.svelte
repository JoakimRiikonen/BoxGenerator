<script lang="ts">
  export let value = false;
</script>

<label class='container'>
    <input type="checkbox" bind:checked={value}>
    <span class="slider"/>
</label>

<style>
  .container {
    display: inline-block;
    position: relative;
    width: 60px;
    height: 34px;
  }

  .container:focus-within {
    border-radius: 20px;
    box-shadow: 0 0 5px black;
  }

  input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  .slider {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    transition: 0.4s;
    cursor: pointer;
    border-radius: 34px;
  }

  .slider:before {
    position: absolute;
    left: 4px;
    bottom: 4px;
    content: "";
    height: 26px;
    width: 26px;
    background-color: white;
    transition: 0.4s;
    border-radius: 50%;
  }

  input:checked + .slider {
    background-color: #A084DC;
  }

  input:checked + .slider:before {
    transform: translateX(26px);
  }
</style>
