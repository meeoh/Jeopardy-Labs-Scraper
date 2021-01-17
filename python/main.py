import requests
import json
from bs4 import BeautifulSoup

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
    if(category_idx == NUM_COLS - 1): row = (row + 1) % NUM_ROWS
    value = "$" + str((row + 1) * 200)
    game_obj[category_idx]["questions"].append({"query": question[0], "response": question[1], "amount": value, "dd": False})

  final_object[game_type] = game_obj


jeopardy_url = input("Enter url for jeopardy: ")
double_jeopardy_url = input("Enter url for double jeopardy: ")

games = [(jeopardy_url, 'jeopardy'), (double_jeopardy_url, 'double_jeopardy')]

for game in games:
  [URL, game_type] = game
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

  build_json(game_type, categories, questions)
  pprint.pprint(final_object)

with open('output.json', 'w', encoding='utf-8') as output_file:
  json.dump(final_object, output_file, ensure_ascii=False, indent=2)