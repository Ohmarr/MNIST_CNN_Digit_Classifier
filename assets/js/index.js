(function() {
	var canvas = document.querySelector('#canvas');
	const context = canvas.getContext('2d');
	var lastMouse, Mouse;
	lastMouse = Mouse = { x: 0, y: 0 };

	canvas.height = canvas.width = 280;
	context.fillStyle = 'white';
	context.fillRect(0, 0, canvas.width, canvas.height);
	// context.clearRect(0, 0, canvas.width, canvas.height);
	context.color = 'black';
	context.lineWidth = 10;
	context.lineJoin = context.lineCap = 'round';

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
		context.lineWidth = context.lineWidth;
		context.lineJoin = 'round';
		context.lineCap = 'round';
		context.strokeStyle = context.color;

		context.beginPath();
		context.moveTo(lastMouse.x, lastMouse.y);
		context.lineTo(Mouse.x, Mouse.y);
		context.closePath();
		context.stroke();
	};
	/* CLEAR BUTTON */
	function prepareCanvas() {
		var clearButton = $('#clearButton');

		clearButton.on('click', function() {
			context.clearRect(0, 0, canvas.width, canvas.height);
			context.fillStyle = 'white';
			context.fillRect(0, 0, canvas.width, canvas.height);
		});

		/* COLOR SELECTOR */
		$('#colors').change(function() {
			var color = $('#colors').val();
			context.color = color;
		});

		/* FONT WIDTH ADJUSTER */
		var slider = document.getElementById('myRange');
		var output = document.getElementById('sliderValue');
		output.innerHTML = slider.value;
		slider.oninput = function() {
			output.innerHTML = this.value;
			context.lineWidth = $(this).val();
		};

		// /* LINE WIDTH */
		// $('#lineWidth').change(function() {
		// 	context.lineWidth = $(this).val();
		// });
	}
})();
