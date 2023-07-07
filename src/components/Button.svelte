<script lang="ts">
  export let onClick: () => void;
  export let text: string;
</script>

<button on:click={() => onClick()}>
  {text}
</button>

<style>
  button {
    padding: 10px 20px;
    font-weight: 600;
    background-color: #A084DC;
    color: white;
    border: none;
    border-radius: 5px;
  }

  button:hover {
    cursor: pointer;
    background-color: #645CBB;
  }
</style>