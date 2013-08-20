from flask import Flask, render_template, redirect, flash, request, session, url_for, g
from flask.ext.login import login_user, logout_user, current_user, login_required, LoginManager
from form import LoginForm
import base64
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


@app.route("/", methods=['POST', 'GET'])
def home():
	"""HOMEPAGE"""
	# if user hasn't logged out redirect won't reload login page
	if current_user is not None and current_user.is_authenticated():
		return render_template("main.html")

	message = ""
	message3 = ""
	form = LoginForm()
	
	# following occurs if form conditions are met
	if form.validate_on_submit():
		# query for the user in the database by email. If the user exists then the hashed password
		# is verified. If this password matches the email the user is logged in
		user = model.session.query(model.User).filter_by(email = form.email.data).first()
		if user:
			salt_unicode = user.salt
			salt = salt_unicode.encode('utf-8')
			password_unicode = form.password.data
			password = password_unicode.encode('utf-8')
			hashed = bcrypt.hashpw(password, salt)

			if hashed == user.password_hash:
				login_user(user)
			else:
				message3 = "Incorrect password"
				return render_template("main.html", form=form, message3=message3)

			message = "welcome back %s" % current_user.nickname
			return render_template("main.html", message=message)
		message3 = "It appears we don't have that account on file"
	return render_template("main.html", form=form, message3=message3)

@app.route('/create', methods=['POST', 'GET'])
def create():
	"""CREATE A NEW APP USER"""
	message = ""
	message2 = ""
	nickname = request.form.get("nickname")
	email = request.form.get("email")
	password_unicode = request.form.get("password")

	# can only create an account if the password length lies within below stated range
	if 6 < len(password_unicode) < 25:
		salt_unicode = bcrypt.gensalt()
		salt = salt_unicode.encode('utf-8')
		password = password_unicode.encode('utf-8')
		hashed = bcrypt.hashpw(password, salt)

		# creating a user object from the given data
		user = model.User(nickname=nickname, email=email, password_hash=hashed, salt=salt)

		# checking for a duplicate entry in database
		# if the query fails, then there's no duplicate, and the new account is created and logged in
		try:
			p = model.session.query(model.User).filter_by(email=user.email).one()
			form = LoginForm()
			message2 = "It appears this account already exists"
			return render_template("main.html", message2 = message2, form=form)

		except model.NoResultFound:
			model.session.add(user)
			model.session.commit()
			u = model.session.query(model.User).filter_by(id = user.id).one()
			if u is not None:
				login_user(u)
			message = "welcome %s" % user.nickname
			return render_template("main.html", message=message)
	else:
		message2 = "Password field must be between 6 and 25 characters long."
		form = LoginForm()
		return render_template("main.html", form=form, message2=message2)

# this is the route image data is sent in order to add it to the database
@app.route('/add_gallery', methods=['POST', 'GET'])
@login_required
def add_gallery():
	""" ADD AN IMAGE TO THE USER'S GALLERY"""
	message = ""
	
	# image data (base64 png/image) is decoded into a binary data structure before placing into the database
	screenshot_unicode = request.form.get("image");
	screenshot= screenshot_unicode.encode('utf-8')
	new = screenshot.partition(',')

	screenshot_decode = base64.b64decode(new[2])
	image = model.Image(user_id=current_user.id, url=screenshot_decode)
	model.session.add(image)
	model.session.commit()

	return render_template("main.html", message=message)

@app.route('/gallery')
@login_required
def gallery():
	"""QUERY DATABASE TO ADD ALL OF USER'S SAVED IMAGES TO THEIR GALLERY VIEW"""
	# sending reconstructed image url and image id to the appropriate html template
	image_list = model.session.query(model.Image).filter_by(user_id=current_user.id).all()
	new_image_list = []
	for image in image_list:
		new_image = base64.b64encode(image.url)
		new_image_list.append((new_image, image.id))

	return render_template("gallery.html",images=new_image_list)

@app.route('/logout')
@login_required
def logout():
	logout_user()
	return redirect('/')

app.secret_key = os.urandom(24)

if __name__ == "__main__":
	app.run(debug=True)