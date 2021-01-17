<script>
  import { Scrape } from "./Scraper";
  let output = "";
  let jeopardyUrl = "";
  let doubleJeopardyUrl = "";
  async function handleSubmit() {
    if (
      jeopardyUrl.startsWith("https://jeopardylabs.com/play/") &&
      doubleJeopardyUrl.startsWith("https://jeopardylabs.com/play/")
    )
      output = JSON.stringify(
        await Scrape(jeopardyUrl, doubleJeopardyUrl),
        undefined,
        2
      );
  }

  function handleCopy() {
    navigator.clipboard.writeText(output);
  }
</script>

<div class="App">
  <p>Jeopardy URL:</p>
  <input bind:value={jeopardyUrl} />
  <p>Double Jeopardy URL:</p>
  <input bind:value={doubleJeopardyUrl} />
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
