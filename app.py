# Jinja2 templating http://bit.ly/flask_walkthrough
from flask import Flask, request, jsonify, render_template, current_app, Response
from tensorflow.python.keras.backend import set_session # needed to ensure weights are loaded
from tensorflow.python.keras.models import load_model # specified instead of vague next line
# from keras.models import load_model
import tensorflow as tf
from numpy import asarray
from PIL import Image as Image_PIL  # PYTHON IMAGING LIBRARY

import base64
import numpy as np
import re  # regular expresions

global graph
global model
global session

def get_model():
	
	model = load_model(model_path)
	print(f'Model from {model_path} is Loaded')
	return model

def convert_canvas(canvas_data):
	'''
	USER INPUT (CANVAS) IMAGE CONVERSION; 
	Canvas will sytem_outputput user entry as Base64 Encoded String;
	This function will Decode the string to binary data to work with;
	'''

	# pinpoint 64 encoded string
	encoded_string = re.search(r'base64,(.*)', canvas_data).group(1)
	decoded_binary_data = base64.b64decode(encoded_string)  # decode
	# print(encoded_string)

	# save canvas output as png file to process prediction;
	sytem_output = open(filepath, 'wb')
	sytem_output.write(decoded_binary_data)

	sytem_output.close()
	return filepath

def preprocess_image(filepath):
	'''
	Argument: Filepath
	- Converts image to grayscale
	- Resizes image to 28 x 28
	- Creates Array from Pixel Data
	- Inverts Array Values;

	Returns Array from pixels & prints to console Image
	'''

	image = Image_PIL.open(filepath)  # create instance of downloaded image;
	# convert to grayscale; remove rgb channel;
	image = image.convert(mode='L')
	image = image.resize((28, 28))  # resize from 280x280 to 28x28;
	image_array = asarray(image)
	image_array = np.invert(image_array)
	# NEXT TWO LINES WERE USED FOR DEBUGGING
	#     plt.imshow(image_array)
	#     plt.show()

	return image_array

def preprocess_array(array):
	'''
	Arguments: Numpy Array
	––––––––––––––––––––––
	- Convert Array Elements to Floats (from Ints)
	- Reshape Array to be 4-D Tensor; (Model Was Trained on (1, 28, 28, 1))
	- Standardize Elements by Dividing Each by 255 (0-256)
	- Return Preprocessed Array
	'''
	array = array.astype('float32')
	array = array.reshape(1, 28, 28, 1)
	array /= 255
	return array

def make_prediction(image_array):
	'''
	Makes a Prediction Using Our Model & Returns it
	'''
	#     Issue w/ model.predict in Flask; using tf.graph instead
	#     prediction = model.predict(image_array).argmax()
	#     print(f'The predicted number is {prediction}')
	accross_columns = 1

	with graph.as_default():
		proability_array = model.predict(image_array) # 10 unique probabilities of integer likelihoods;
		prediction = np.array_str(np.argmax(proability_array, axis=accross_columns)) # Prediction = highest probability
	return prediction

filepath = 'images/image_canvas.png'  # location of file output from canvas
model_path = 'MNIST_CNN.h5'

session = tf.Session()
# session = tf.compat.v1.Session
graph = tf.get_default_graph()
# graph = tf.compat.v1.get_default_graph()

set_session(session) # SESSION MUST BE SET PRIOR TO LOADING MODEL & BEFORE EACH PREDICTION
model = get_model()

#––––––––––––––––––––––––––––––––––––– * FLASK APPLICATION * –––––––––––––––––––––––––––––––––––––– # 

app = Flask(__name__)
app.config["DEBUG"] = True

@app.route('/')
def home():
	return render_template("index.html")

@app.route('/predict/', methods=['GET', 'POST'])
def predict():
	set_session(session)
	canvas_data = request.get_data().decode('utf-8')
	filepath = convert_canvas(canvas_data)
	image_array = preprocess_image(filepath)
	image_array = preprocess_array(image_array)
	prediction = make_prediction(image_array)
	return prediction

if __name__ == "__main__":
	app.run(debug=True)
