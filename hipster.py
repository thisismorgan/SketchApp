from flask import Flask, render_template, redirect, flash, request, session, url_for, g
from flask.ext.login import login_user, logout_user, current_user, login_required, LoginManager
from form import LoginForm
import bcrypt
import model
import os

login_manager = LoginManager()
app = Flask(__name__)
login_manager.init_app(app)
login_manager.login_view = "/"

@login_manager.user_loader
def load_user(id):
	return model.session.query(model.User).get(id)

@app.before_request
def before_request():
	g.user = current_user
	pass

@app.route("/", methods=['POST', 'GET'])
def home():
	"""HOMEPAGE"""
	# if user hasn't logged out redirect won't reload login page
	if current_user is not None and current_user.is_authenticated():
		return redirect(url_for('user'))

	message = ""
	form = LoginForm()
	if form.validate_on_submit():
		# can rework this segment because you only need to query once!
		#need to recreate hashed password and search for this in the database
		user = model.session.query(model.User).filter_by(email = form.email.data).first()
		salt_unicode = user.salt
		salt = salt_unicode.encode('utf-8');
		password_unicode = form.password.data;
		password = password_unicode.encode('utf-8')
		hashed = bcrypt.hashpw(password, salt)

		user = model.session.query(model.User).filter_by(email=form.email.data, password_hash=hashed).first()

		if user is not None:
			login_user(user)
			flash("Welcome")
		else:
			flash("Invalid login")

		# message = welcome back user.nickname
		return render_template("main.html", message=message)
		# return redirect(request.args.get("next") or url_for('user'))
	return render_template("main.html", form=form)

@app.route('/logout')
@login_required
def logout():
	logout_user()
	return redirect('/')

app.secret_key = os.urandom(24)

if __name__ == "__main__":
	app.run(debug=True)