(function() {
	var canvas = document.querySelector('#canvas');
	canvas.height = canvas.width = 280;

	const drawingObject = canvas.getContext('2d');
	// drawingObject.fillStyle = '#FF0000';
	drawingObject.color = 'black';
	drawingObject.lineWidth = 22;
	drawingObject.lineJoin = drawingObject.lineCap = 'round';

	var lastMouse, Mouse;
	lastMouse = Mouse = { x: 0, y: 0 };

	prepareCanvas();

	canvas.addEventListener(
		'mousemove',
		function(event) {
			lastMouse.x = Mouse.x;
			lastMouse.y = Mouse.y;

			Mouse.x = event.pageX - this.offsetLeft;
			Mouse.y = event.pageY - this.offsetTop;
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
	canvas.addEventListener(
		'touchmove',
		function(event) {
			event.preventDefault(); 
			event.stopPropagation();
			// getPostion(event);	
		var touch = event.touches[0];
		var mouseEvent = new MouseEvent("mousemove", {
			clientX: touch.clientX,
			clientY: touch.clientY
		});
		canvas.dispatchEvent(mouseEvent);	
		},
		false
	); // Detects Move (Mouse) & Captures Coordinates
	
	// canvas.addEventListener("touchmove", function (event) {
	
	// 	}, false);
	canvas.addEventListener(
		'touchstart',
		function() {
			canvas.addEventListener('touchmove', onWrite, false);
		},
		false
	); // Detects downclick (drawing) & calls onWrite
	canvas.addEventListener(
		'touchend',
		function() {
			canvas.removeEventListener('touchmove', onWrite, false);
		},
		false
	); // Detects let go, user input ended/paused & calls onWrite

	var onWrite = function() {
		drawingObject.lineJoin = 'round';
		drawingObject.lineCap = 'round';
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
			drawingObject.fillRect(0, 0, canvas.width, canvas.height);
		});
		/* FONT WIDTH ADJUSTER */
		var slider = document.getElementById('slider-range');
		var output = document.getElementById('slider-value');
		output.innerHTML = slider.value;
		slider.oninput = function() {
			output.innerHTML = this.value;
			drawingObject.lineWidth = $(this).val();
		};
	}
})();
