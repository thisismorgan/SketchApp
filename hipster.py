from flask import Flask, render_template, redirect, flash, request, session, url_for, g
from flask.ext.login import login_user, logout_user, current_user, login_required, LoginManager
import model
import os

login_manager = LoginManager()
app = Flask(__name__)
login_manager.init_app(app)
login_manager.login_view = "/"

@login_manager.user_loader
def load_user(userid):
	# whatever your query string is would go here
	# return User.get(userid)
	pass

@app.before_request
def before_request():
	g.user = current_user
	pass



@app.route("/")
def home():
	"""HOMEPAGE"""
	return render_template("main.html")


app.secret_key = os.urandom(24)

if __name__ == "__main__":
	app.run(debug=True)