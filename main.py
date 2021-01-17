import requests
from bs4 import BeautifulSoup
import pprint

NUM_ROWS = 5
NUM_COLS = 6

final_object = {}
def build_json(game_type, categories, questions):
  game_obj = []
  for category in categories:
    game_obj.append({"category": category, "questions": []})

  row = 0
  for idx, question in enumerate(questions):
    category_idx = idx % NUM_COLS
    if(category_idx == NUM_COLS - 1): row += 1
    value = "$" + str((row + 1) * 200)
    game_obj[category_idx]["questions"].append({"query": question[0], "response": question[1], "amount": value, "dd": False})

  final_object[game_type] = game_obj




URL = "https://jeopardylabs.com/play/pop-culture-2294"
response = requests.get(url = URL)

soup = BeautifulSoup(response.text, 'html.parser')

grid_rows = soup.find_all("div", class_="grid-row")
categories_row = grid_rows[0]
html_categories = categories_row.text.strip().split('\n')
categories = [category for category in html_categories if category]

question_rows_html = soup.select("div.cell.points")
questions = []

for question in question_rows_html:
  [_, problem, solution] = [pair for pair in question.text.split('\n') if pair]
  questions.append((problem, solution))

build_json("jeopardy", categories, questions)
pprint.pprint(final_object)


