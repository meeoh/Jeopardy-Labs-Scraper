const NUM_ROWS = 5;
const NUM_COLS = 6;

function toNode(html) {
  var doc = document.createElement("html");
  doc.innerHTML = html;
  return doc;
}

function cleanupText(text) {
  return text.split("\n").reduce((acc, curr) => {
    const trimmed = curr.trim();
    if (trimmed.length) acc.push(trimmed);
    return acc;
  }, []);
}

function buildJson(categories, questions, moneyFactor) {
  const gameObject = [];
  const columnCount = Math.min(categories.length, NUM_COLS);

  categories.forEach((category) => {
    gameObject.push({
      category,
      questions: [],
    });
  });

  let row = 0;
  questions.forEach(({ query, response }, idx) => {
    const categoryIndex = idx % columnCount;
    const value = `$${(row + 1) * moneyFactor}`;
    gameObject[categoryIndex].questions.push({
      query,
      response,
      amount: value,
      dd: false,
    });
    if (categoryIndex == columnCount - 1) row += 1;
  });

  return gameObject;
}

const CORS_PROXY_URL = "https://cors-anywhere.herokuapp.com/";
// const CORS_PROXY_URL = "https://blooming-ridge-64659.herokuapp.com/";

const fetchGame = async (url, moneyFactor) => {
  const response = await fetch(`${CORS_PROXY_URL}${url}`, {
    headers: {
      "x-requested-with": "javascript",
    },
  });
  const text = await response.text();
  const node = toNode(text);

  const categoriesRow = node.getElementsByClassName("grid-row")[0];
  const categories = cleanupText(categoriesRow.textContent).slice(0, NUM_COLS);

  const gridRows = Array.from(
    node.getElementsByClassName("grid-row-questions")
  ).slice(0, NUM_ROWS);

  const questions = [];
  gridRows.forEach((gridrow) => {
    const cells = Array.from(
      gridrow.getElementsByClassName("cell points")
    ).slice(0, NUM_COLS);

    cells.forEach((cell) => {
      const cleanedMarkup = cleanupText(cell.textContent);
      questions.push({
        query: cleanedMarkup[1],
        response: cleanedMarkup[2],
      });
    });
  });

  return buildJson(categories, questions, moneyFactor);
};

export const Scrape = async (jeopardyUrl, doubleJeopardyUrl) => {
  const jeopardyGame = await fetchGame(jeopardyUrl, 200);
  const doubleJeopardyGame = await fetchGame(doubleJeopardyUrl, 400);

  return {
    jeopardy: jeopardyGame,
    double_jeopardy: doubleJeopardyGame,
  };
};
