(function() {
	var canvas = document.querySelector('#canvas');
	canvas.height = canvas.width = 280;

	const drawingObject = canvas.getContext('2d');
	// drawingObject.fillStyle = '#FF0000';
	drawingObject.color = 'black';
	drawingObject.lineWidth = 10;
	drawingObject.lineJoin = drawingObject.lineCap = 'miter';

	var lastMouse, Mouse;
	lastMouse = Mouse = { x: 0, y: 0 };

	prepareCanvas();

	canvas.addEventListener(
		'mousemove',
		function(e) {
			lastMouse.x = Mouse.x;
			lastMouse.y = Mouse.y;

			Mouse.x = e.pageX - this.offsetLeft;
			Mouse.y = e.pageY - this.offsetTop;
		},
		false
	);
	canvas.addEventListener(
		'mousedown',
		function() {
			canvas.addEventListener('mousemove', onWrite, false);
		},
		false
	);
	canvas.addEventListener(
		'mouseup',
		function() {
			canvas.removeEventListener('mousemove', onWrite, false);
		},
		false
	);

	var onWrite = function() {
		drawingObject.lineWidth = drawingObject.lineWidth;
		drawingObject.lineJoin = 'miter';
		
		drawingObject.lineCap = 'round';
		drawingObject.strokeStyle = drawingObject.color;

		drawingObject.beginPath();
		drawingObject.moveTo(lastMouse.x, lastMouse.y);
		drawingObject.lineTo(Mouse.x, Mouse.y);
		drawingObject.closePath();
		drawingObject.stroke();
	};
	/* CLEAR BUTTON */
	function prepareCanvas() {
		var clearButton = $('#clear-button');

		clearButton.on('click', function() {
			drawingObject.clearRect(0, 0, canvas.width, canvas.height);
			drawingObject.fillStyle = '#E6E6E6';
			// drawingObject.font = '30px Arial';
			// drawingObject.fillText = ('Texsting', canvas.width/2, canvas.height/2);
			// drawingObject.textAlign = 'center';
			drawingObject.fillRect(0, 0, canvas.width, canvas.height);
		});
		// /* COLOR SELECTOR */
		// $('#colors').change(function() {
		// 	var color = $('#colors').val();
		// 	drawingObject.color = color;
		// });

		/* FONT WIDTH ADJUSTER */
		var slider = document.getElementById('slider-range');
		var output = document.getElementById('slider-value');
		output.innerHTML = slider.value;
		slider.oninput = function() {
			output.innerHTML = this.value;
			drawingObject.lineWidth = $(this).val();
		};
	};
})();
