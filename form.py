from flask.ext.wtf import Form, validators
from flask.ext.wtf import TextAreaField, FloatField, TextField, PasswordField, IntegerField, DateField, BooleanField, SelectField, RadioField, SelectMultipleField
import model



class LoginForm(Form):
	email = TextField('Email',[validators.Email(message= (u'Invalid email address'))], 
										description=(u'Email'), default=(u'email goes here'))
	password = PasswordField('Password', [validators.Required(), validators.length(min=6, max=25)], 
										description=(u'Password'), default=(u'Password'))