<!--⇧⌘V-To Preview-->
<h1 align='center'>Drawn Digit Predictor</h1>
<hr>

||||
|:---|:---:|---:|
|<img width="1604" alt="keras" src="https://s3.amazonaws.com/keras.io/img/keras-logo-2018-large-1200.png">|<img width="1604" alt="tensorflow" src="https://avatars0.githubusercontent.com/u/15658638?s=200&v=4">|<img width="1604" alt="Flask" src="https://flask.palletsprojects.com/en/1.1.x/_images/flask-logo.png">|

<hr>

**Visit my [Online Portfolio](https://Ohmarr.github.io)**

<h2 align='center'>Overview</h2>

**Project Overview**:
This application was built in four phases, each of which are described in greater detail below:
- **Phase 1**: Build a Convolutional Neural Network (CNN) to detect hand-drawn digits, & prepare it for general use,
- **Phase 2**: Train the model, & save it to make predictions,
- **Phase 3**: Develop remainder of full-stack application to integrate user input & prediction algorithm,
- **Phase 4**: Deploy Completed Application on a Platform as a Service (PaaS). 

<hr>

**Dataset Overview**:
 - '[MNIST Database of handwritten digits](http://yann.lecun.com/exdb/mnist/)' is maintained by [Yann Lecun](http://yann.lecun.com/),
 - Dataset includes 70,000 example images, which were used for this project.

<p align="center">
	<img width="auto" height="auto" src="https://raw.githubusercontent.com/Ohmarr/MNIST_CNN_Digit_Classifier/master/assets/temp/image_canvas.png">
</p>

<hr>

<h2 align='center'>Walkthrough</h2>

**Phase 1** - Backend - _Building the CNN_:
- Written in Python, utilizing keras machine-learning API with tensorflow backend (tf.keras), MatPlotLib, Pandas, NumPy,  
- Developed in Jupyter Notebook File ['Development-CNN_Backend.ipynb'](https://github.com/Ohmarr/MNIST_CNN_Digit_Classifier/blob/master/Development-CNN_Backend.ipynb),
- Model was manually built using keras 'Sequential' method,
- MNIST dataset was split into 60,000 training images & 10,000 validation images,
- Training process _tested_ on single epoch, then prepared for next step (training locally was prohibitive due to processing power).

<hr>

**Phase 2** - _Backend - Training Convolutional Neural Network: Utilising Cloud Processing Power in FloydHub_:
- Jupyter Notebook File ['Development-CNN_Backend.ipynb']('https://github.com/Ohmarr/MNIST_CNN_Digit_Classifier/blob/master/Development-CNN_Backend.ipynb') was converted into Python file '[training_app](https://github.com/Ohmarr/MNIST_CNN_Digit_Classifier/blob/master/training_app.py)',
- Training data & python file uploaded to FloydHub (Machine Learning Platform), where the model was trained with the same data on 20 epochs,
- The model was [saved](https://github.com/Ohmarr/MNIST_CNN_Digit_Classifier/blob/master/MNIST_CNN.h5) to the cloud, then downloaded locally for the next step,
- (Model performance can be seen at the bottom of this section)
- Layers of Model:  

| **Layer** | 1st | 2nd | 3rd | 4th | 5th | 6th | 7th | 8th | 9th | 10th | 11th | 12th | 13th |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| **Type** | Convolutional | Pooling | Dropout | Convolutional | Pooling | Dropout | Convolutional | Pooling | Dropout | Flatten | Dense | Dropout | Dense |  

|Set|Loss|Accuracy| 
|---|:-------------------------:|:-------------------------:|
|Training|<img width="1604" alt="Training Loss" src="https://raw.githubusercontent.com/Ohmarr/MNIST_CNN_Digit_Classifier/master/assets/images/FloydHub-TrainingMetrics1.png"> | <img width="1604" alt="Training Accuracy" src="https://raw.githubusercontent.com/Ohmarr/MNIST_CNN_Digit_Classifier/master/assets/images/FloydHub-TrainingMetrics2.png">|
|Validation|<img width="1604" alt="Validation Loss" src="https://raw.githubusercontent.com/Ohmarr/MNIST_CNN_Digit_Classifier/master/assets/images/FloydHub-ValidationAccuracy2.png">|<img width="1604" alt="Validation Accuracy" src="https://raw.githubusercontent.com/Ohmarr/MNIST_CNN_Digit_Classifier/master/assets/images/FloydHub-ValidationAccuracy1.png">|

<hr>

**Phase 3** - _Full-Stack - Developing Interactive Application_:
- Built with Node.js, node package manager (npm), bootstrap, & the [gulp](https://github.com/Ohmarr/MNIST_CNN_Digit_Classifier/blob/master/gulpfile.js) (JS toolkit) streaming build system,
- Developed in Jupyter Notebook File ['Development-Flask_Frontend.ipynb'](https://github.com/Ohmarr/MNIST_CNN_Digit_Classifier/blob/master/Development-Flask_Frontend.ipynb) & Converted into final python file ['app.py'](https://github.com/Ohmarr/MNIST_CNN_Digit_Classifier/blob/master/app.py),
- Constructed as RESTful API, capturing user input, processing it, then displaying the prediction, 
- Utilized Flask Web Micro-Framework, Werkzeug WSGI (Web Server Gateway Interface), Green Unicorn (Gunicorn) WSGI HTTP Server, Jinja2 templating engine, numPy, regular expressions, Pillow, Ajax, JavaScript, Event Listeners.

<hr>

**Phase 4** - _Deploy to Heroku (PaaS)_:
- Prepare resources, Procfile, debug, finalize styling, 
- perform final npm build, 
- Deploy as standalone [website](https://digit-classifier-mnist.herokuap.com). 

<hr>

<h4 align=center>The Logo in my navbar & the website icon ('favicons') were also created by me,&cannot be copied or reproduced.</h4>

**Technologies**: Machine Learning, tensorflow, keras, matplotlib, pandas, numpy, jupyter notebook, PaaS, FloydHub, Node.js, npm, bootstrap, gulp, RESTful API, WSGI, Gunicorn, Ajax, JavaScript, HTML, CSS, Pillow, Regular Expressions, Jinja2, WerkZeug.
