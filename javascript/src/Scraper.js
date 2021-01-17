function toNode(html) {
  var doc = document.createElement("html");
  doc.innerHTML = html;
  return doc;
}

function buildJson(categories, questions, moneyFactor) {
  const gameObject = [];

  categories.forEach((category) => {
    gameObject.push({
      category,
      questions: [],
    });
  });

  row = 0;
  questions.forEach((question, idx) => {
    categoryIndex = idx % NUM_COLS;
    if (categoryIndex == NUM_COLS - 1) row = (row + 1) % NUM_ROWS;
    value = `$${(row + 1) * moneyFactor}`;
    gameObject[categoryIndex].questions.push({
      query: question[0],
      response: question[1],
      amount: value,
      dd: false,
    });
  });

  return gameObject;
}

const fetchGame = (async (url) => {
  const response = await fetch(`https://cors-anywhere.herokuapp.com/${url}`, {
    headers: {
      "x-requested-with": "javascript",
    },
  });
  const text = await response.text();
  return toNode(text);
})();

export const Scrape = async (jeopardyUrl, doubleJeopardyUrl) => {
  console.log("scrape!");

  const jeopardyGame = await fetchGame(jeopardyUrl);
};
