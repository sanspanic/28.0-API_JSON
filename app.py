from flask import Flask, render_template, request, jsonify, Response, redirect
from random import randrange
from forms import UserInputForm
import requests

app = Flask(__name__)

app.config["WTF_CSRF_ENABLED"] = False


@app.route("/")
def homepage():
    """Show homepage."""

    return render_template("index.html")

@app.route('/api/get-lucky-num', methods=['POST'])
def api(): 
    """api endpoint"""

    name = request.json["name"]
    email = request.json["email"]
    year = request.json['year']
    color = request.json['color']


    form = UserInputForm(data = 
                            {"name": name, 
                            "email": email, 
                            "year": year, 
                            "color": color}
                        )

    if form.validate_on_submit(): 

        rand_num = randrange(1, 101)
        num_fact = requests.get(f'http://numbersapi.com/{rand_num}')
        year_fact = requests.get(f'http://numbersapi.com/{int(year)}/year')


        response_dict = {"num": {
                                "fact": num_fact.text,
                                "num": rand_num
                            }, 
                        "year": {
                                "fact": year_fact.text, 
                                "year": year
                            }}

        return (jsonify(response_dict), 200)

    else: 
        response = {
            "errors": form.errors
        }
        return (jsonify(response), 400)

