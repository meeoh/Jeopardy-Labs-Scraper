<!-- App.svelte -->
<script>
  /* component logic will go here */
  function toNode(html) {
    var doc = document.createElement("html");
    doc.innerHTML = html;
    return doc;
  }
  const fetchImage = (async () => {
    const response = await fetch(
      "https://cors-anywhere.herokuapp.com/https://jeopardylabs.com/play/pop-culture-2294",
      {
        headers: {
          "x-requested-with": "javascript",
        },
      }
    );
    const text = await response.text();
    var document = toNode(text);
  })();
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
