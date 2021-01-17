<script>
  import { Scrape } from "./Scraper";
  let output = "";
  let jeopardyUrl = "";
  let doubleJeopardyUrl = "";
  let finalCategory = "";
  let finalQuery = "";
  let finalResponse = "";
  let name = "";
  let warnings = [];
  async function handleSubmit() {
    if (
      jeopardyUrl.startsWith("https://jeopardylabs.com/play/") &&
      doubleJeopardyUrl.startsWith("https://jeopardylabs.com/play/")
    ) {
      const finalObject = await Scrape(jeopardyUrl, doubleJeopardyUrl);
      finalObject.final_jeopardy = [
        {
          category: finalCategory,
          questions: [
            {
              amount: "FJ",
              query: finalQuery,
              response: finalResponse,
            },
          ],
        },
      ];

      finalObject.status = {
        author: `JeopardyLabsScraper - ${name}`,
        date: new Date().toLocaleDateString(),
        export_version: "1.00",
        show_number: 0,
        unix_timestamp: Date.now(),
      };
      warnings = [];
      if (finalObject.jeopardy.length < 6) {
        warnings.push(
          `${
            6 - finalObject.jeopardy.length
          } categories must be added manually to jeopardy\n`
        );
      }

      if (finalObject.double_jeopardy.length < 6) {
        warnings.push(
          `${
            6 - finalObject.double_jeopardy.length
          } categories must be added manually to double_jeopardy\n`
        );
      }

      finalObject.jeopardy.forEach((category) => {
        if (category.questions.length < 5) {
          warnings.push(
            `${
              5 - category.questions.length
            } questions must be added to category ${category.category}`
          );
        }
      });

      finalObject.double_jeopardy.forEach((category) => {
        if (category.questions.length < 5) {
          warnings.push(
            `${
              5 - category.questions.length
            } questions must be added to category ${category.category}`
          );
        }
      });

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
  <p>Jeopardy URL (https://jeopardylabs.com/play/title):</p>
  <input bind:value={jeopardyUrl} />
  <p>Double Jeopardy URL (https://jeopardylabs.com/play/title):</p>
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
  {#each warnings as warning}
    <li>{warning}</li>
  {/each}
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
