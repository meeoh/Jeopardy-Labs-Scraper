<script>
  import { Scrape } from "./Scraper";
  let output = "";
  let jeopardyUrl = "";
  let doubleJeopardyUrl = "";
  let finalCategory = "";
  let finalQuery = "";
  let finalResponse = "";
  let name = "";
  async function handleSubmit() {
    if (
      jeopardyUrl.startsWith("https://jeopardylabs.com/play/") &&
      doubleJeopardyUrl.startsWith("https://jeopardylabs.com/play/")
    ) {
      const finalObject = await Scrape(jeopardyUrl, doubleJeopardyUrl);
      finalObject.final_jeopardy = {
        category: finalCategory,
        questions: [
          {
            amount: "FJ",
            query: finalQuery,
            response: finalResponse,
          },
        ],
      };

      finalObject.status = {
        author: `JeopardyLabsScraper - ${name}`,
        date: new Date().toLocaleDateString(),
        export_version: "1.00",
        show_number: 0,
        unix_timestamp: Date.now(),
      };
      output = JSON.stringify(finalObject, undefined, 2);
    }
  }

  function handleCopy() {
    navigator.clipboard.writeText(output);
  }
</script>

<div class="App">
  <p>Author name:</p>
  <input bind:value={name} />
  <p>Jeopardy URL:</p>
  <input bind:value={jeopardyUrl} />
  <p>Double Jeopardy URL:</p>
  <input bind:value={doubleJeopardyUrl} />
  <br />
  <p>Final Jeopardy Category:</p>
  <input bind:value={finalCategory} />
  <p>Final Jeopardy Query:</p>
  <input bind:value={finalQuery} />
  <p>Final Jeopardy Response:</p>
  <input bind:value={finalResponse} />
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
