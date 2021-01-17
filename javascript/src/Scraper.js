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

  categories.forEach((category) => {
    gameObject.push({
      category,
      questions: [],
    });
  });

  let row = 0;
  questions.forEach(({ query, response }, idx) => {
    const categoryIndex = idx % NUM_COLS;
    if (categoryIndex == NUM_COLS - 1) row = (row + 1) % NUM_ROWS;
    const value = `$${(row + 1) * moneyFactor}`;
    gameObject[categoryIndex].questions.push({
      query,
      response,
      amount: value,
      dd: false,
    });
  });

  return gameObject;
}

const fetchGame = async (url) => {
  const response = await fetch(`https://cors-anywhere.herokuapp.com/${url}`, {
    headers: {
      "x-requested-with": "javascript",
    },
  });
  const text = await response.text();
  const node = toNode(text);

  const categoriesRow = node.getElementsByClassName("grid-row")[0];
  const categories = cleanupText(categoriesRow.textContent);

  const questionsHtml = Array.from(node.getElementsByClassName("cell points"));
  const questions = questionsHtml.reduce((acc, curr) => {
    const cleanedMarkup = cleanupText(curr.textContent);
    acc.push({ query: cleanedMarkup[1], response: cleanedMarkup[0] });
    return acc;
  }, []);

  return buildJson(categories, questions, 200);
};

export const Scrape = async (jeopardyUrl, doubleJeopardyUrl) => {
  const jeopardyGame = {}; //await fetchGame(jeopardyUrl);
  const doubleJeopardyGame = {}; // await fetchGame(doubleJeopardyUrl);

  return {
    jeopardy: jeopardyGame,
    double_jeopardy: doubleJeopardyGame,
  };
};
