<!-- App.svelte -->
<script>
  /* component logic will go here */
  import { Scrape } from "./Scraper";

  let output = "";
  async function handleSubmit() {
    output = JSON.stringify(
      await Scrape(
        "https://jeopardylabs.com/play/movies-movies-movies-736",
        "https://jeopardylabs.com/play/movies-movies-movies-736"
      )
    );
  }

  function handleCopy() {
    navigator.clipboard.writeText(output);
  }
</script>

<div class="App">
  <p>Jeopardy URL:</p>
  <input />
  <p>Double Jeopardy URL:</p>
  <input />
  <br />
  <br />
  <button on:click={handleSubmit}>Submit</button>
  <p>Output:</p>
  <textarea value={output} />
  <br />
  <button on:click={handleCopy}>Copy</button>
</div>

<style>
  /* css goes here */
  textarea {
    width: 500px;
    height: 300px;
  }
</style>
