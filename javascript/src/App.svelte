<!-- App.svelte -->
<script>
  /* component logic will go here */
  import { Scrape } from "./Scraper";
  Scrape();
</script>

<div class="App">
  <p>Jeopardy URL:</p>
  <input />
  <p>Double Jeopardy URL:</p>
  <input />
  <br />
  <br />
  <button>Submit</button>
  <p>Output:</p>
  <textarea />
  <br />
  <button>Copy</button>
</div>

<style>
  /* css goes here */
  textarea {
    width: 500px;
    height: 300px;
  }
</style>
