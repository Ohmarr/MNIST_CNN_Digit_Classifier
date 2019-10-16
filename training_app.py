#Omar Abusheikh
# Convolutional Neural Network Training Application
# Utilized Keras Package - Sequential Module --> To Manually Add Layers

# The training of the model used for the MNIST Application was done in this python file ('training_app.py');
# - Running locally was prohibitive (way too long), so was run on FloydHub
# - The CNN Model was saved & imported into 'app.py', where the pre-trained model can be used to make predictions. 
#––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
# DEPENDENCIES
from keras import backend as K
from keras.datasets import mnist
from keras.layers import Dense, Dropout, Flatten, Conv2D, MaxPooling2D
from keras.losses import categorical_crossentropy
from keras.models import Sequential
from keras.optimizers import Adadelta
from keras.utils import to_categorical
#––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
# VARIABLES
batch_size = 128
epochs = 25
image_height, image_width = 28, 28
unit = (1, 1)
square = (2, 2)
cube = (3, 3)
drpout_rt_1 = 0.2
drpout_rt_2 = 0.5
activation = 'relu'
num_classes = 10 # DIGITS: 0 1 2 3 4 5 6 7 8 9
loss = 'categorical_crossentropy'
optimizer = Adadelta(1.0, 0.95)
metrics = ['accuracy']
activation_dense = 'softmax'
hl = '–'*25
#––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
#DATASET; AVAILABLE FROM KERAS
(x_train, y_train), (x_test, y_test) = mnist.load_data()
#––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
# PREPROCESSING DATA
# "channels_last"  shape (R, G, B, channels)
# "channels_first" shape  (channels, R, G, B)
if K.image_data_format() == 'channels_first':
	x_train = x_train.reshape(x_train.shape[0], 1, image_height, image_width)
	x_test = x_test.reshape(x_test.shape[0], 1, image_height, image_width)
	input_shape = (1, image_height, image_width)
	print(hl)
	print('reshaping succesful... ')
	print(f'The shape of x_train is {x_train.shape}')
	print(f'The shape of y_train is {y_train.shape}')
	print(f'The shape of x_test is {x_test.shape}')
	print(f'The shape of y_test is {y_test.shape}')
elif K.image_data_format() == 'channels_last':
	x_train = x_train.reshape(x_train.shape[0], image_height, image_width, 1)
	x_test = x_test.reshape(x_test.shape[0], image_height, image_width, 1)
	input_shape = (image_height, image_width, 1)
	print(hl)
	print('reshaping succesful... ')
	print(hl)
	print(f'The shape of x_train is {x_train.shape}')
	print(f'The shape of y_train is {y_train.shape}')
	print(f'The shape of x_test is {x_test.shape}')
	print(f'The shape of y_test is {y_test.shape}')
else:
    print(f'Invalid Format Submitted\n\n{hl}\n')

x_train = x_train.astype('float32')
x_test = x_test.astype('float32')
x_train /= 255
x_test /= 255

# splitting validation sets into categories; 
y_train = to_categorical(y_train, num_classes)
y_test = to_categorical(y_test, num_classes)
#––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
# MODEL DEFINITION FUNCTION; 
def define_model():
	'''
	Convolutional Neural Network Built via Sequential() Module from Keras:
		* Input Layer - Convolutional<-–+
		* Layer 1 - Max Pooling		|
		* Layer 2 - Dropout  	     <––+
		 
		* Layer 3 - Convolutional    <-–+
		* Layer 4 - Max Pooling 	|
		* Layer 5 - Dropout  	     <––+

		* Layer 6 - Convolutional    <-–+
		* Layer 7 - Max Pooling		|
		* Layer 8 - Dropout  	     <––+ 

		* Layer 9 - Flatten
		* Layer 10 - Dense
		* Layer 11 - Dropout
		* Output Layer 12 - Dense

	'''
	model = Sequential()
# ––– INPUT LAYER # 0 ––––––––––
	model.add(Conv2D(32,
			kernel_size=cube,
			activation='relu',
			kernel_initializer='he_uniform',
			padding='same',
			input_shape=(image_height, image_width, 1)
			)
		)
# ––– LAYER # 1 ––––––––––
	model.add(MaxPooling2D(square))
# ––– LAYER # 2 ––––––––––
	model.add(Dropout(drpout_rt_1))
# ––– LAYER # 3 ––––––––––
	model.add(Conv2D(64,
			cube,
			activation='relu',
			kernel_initializer='he_uniform',
			padding='same'
			)
		)
# ––– LAYER # 4 ––––––––––
	model.add(MaxPooling2D(square))
# ––– LAYER # 5 ––––––––––
	model.add(Dropout(drpout_rt_1))
# ––– LAYER # 6 ––––––––––
	model.add(Conv2D(128,
			cube,
			activation='relu',
			kernel_initializer='he_uniform',
			padding='same'
			)
		)
# ––– LAYER # 7 ––––––––––
	model.add(MaxPooling2D(square))
# ––– LAYER # 8 ––––––––––
	model.add(Dropout(drpout_rt_1))
# ––– LAYER # 9 ––––––––––
	model.add(Flatten())
# ––– LAYER # 10 ––––––––––
	model.add(Dense(128,
			activation='relu',
			kernel_initializer='he_uniform'
			)
		)
# ––– LAYER # 11 ––––––––––
	model.add(Dropout(drpout_rt_2))
# ––– OUTPUT LAYER # 12 - WEIGHTED PREDICTION EQUATION ––––––––––
	model.add(Dense(num_classes, activation=activation_dense))

# ––– Compile CNN model
	model.compile(optimizer=optimizer,
			loss=loss,
			metrics=metrics)
	return model
#––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
#––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
#DEFINE; FIT (LONG PROCESS); SAVE
model = define_model()

model.fit(x_train, y_train,
	batch_size=batch_size,
	epochs=epochs,
	verbose=1,
	validation_data=(x_test, y_test))

model.save('MNIST_CNN.h5')
del model
print('model saved to disk')

# floyd run --gpu "python training_app.py"
#––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––





































#Omar Abusheikh