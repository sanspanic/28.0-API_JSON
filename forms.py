"""Form for User Input"""

from flask_wtf import FlaskForm
from wtforms import StringField, FloatField, SelectField, IntegerField
from wtforms.validators import InputRequired, NumberRange


class UserInputForm(FlaskForm):
    """Form for getting user input."""

    name = StringField("Name", 
                        validators=[InputRequired()])
    email = StringField("Email", 
                        validators=[InputRequired()])
    year = IntegerField("Year of Birth", 
                        validators=[InputRequired(), NumberRange(min=1900, max=2000)])
    color = SelectField("Color", 
                        choices=[('red', 'red'), ('blue', 'blue'), ('orange', 'orange'), ('green', 'green')])