// https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D
const canvas = document.querySelector('#canvas');
// const canvasContainer = document.getElementById('canvas-container');
// var radius = (canvasContainer.clientWidth + canvasContainer.clientHeight) / 150;
canvas.height = canvas.width = 280;

const drawingObject = canvas.getContext('2d');
// drawingObject.fillStyle = '#FF0000';
drawingObject.color = 'black';
drawingObject.lineWidth = 10;
drawingObject.lineJoin = drawingObject.lineCap = 'miter';

/* Feature detection */
var passive = false;
// var notPassive = true;

var currentPosition, previousPosition;
currentPosition = previousPosition = { x: 0, y: 0 };

clearAndPrepCanvas();
// canvas.addEventListener(
// 	'touchmove',
// 	function(event) {
// 		if (canvas.classList.contains('disabled')){return}
// 		event.preventDefault(); event.stopPropagation()
// 		return false
// 	},); // Disables Default & Propagation


function getPostion(event) {
	currentPosition.x = previousPosition.x;
	currentPosition.y = previousPosition.y;
	previousPosition.x = event.pageX - this.offsetLeft;
	previousPosition.y = event.pageY - this.offsetTop;
}
// function mouseDraw() {

// }

canvas.addEventListener('mousemove', getPostion, passive); // Detects Move (Mouse) & Captures Coordinates
canvas.addEventListener(
	'mousedown',
	function() {
		canvas.addEventListener('mousemove', invokeDrawing, passive);
	},
	passive
); // Detects downclick (drawing) & calls invokeDrawing
canvas.addEventListener(
	'mouseup',
	function() {
		canvas.removeEventListener('mousemove', invokeDrawing, passive);
	},
	passive
); // Detects let go, user input ended/paused & calls invokeDrawing

// canvas.addEventListener(
// 	'touchmove',
// 	function(event) {
// 		if (canvas.classList.contains('disabled')){return}
// 		event.preventDefault(); event.stopPropagation()
// 		return false
// 	},); // Disables Default & Propagation
canvas.addEventListener(
	'touchmove',
	function(event) {
		event.preventDefault(); 
		event.stopPropagation();
		getPostion(event);	
	var touch = event.touches[0];
	var mouseEvent = new MouseEvent("mousemove", {
		clientX: touch.clientX,
		clientY: touch.clientY
	});
	canvas.dispatchEvent(mouseEvent);	
	},
	passive
); // Detects Move (Mouse) & Captures Coordinates

// canvas.addEventListener("touchmove", function (event) {

// 	}, false);
canvas.addEventListener(
	'touchstart',
	function() {
		canvas.addEventListener('touchmove', invokeDrawing, passive);
	},
	passive
); // Detects downclick (drawing) & calls invokeDrawing
canvas.addEventListener(
	'touchend',
	function() {
		canvas.removeEventListener('touchmove', invokeDrawing, passive);
	},
	passive
); // Detects let go, user input ended/paused & calls invokeDrawing


const invokeDrawing = function() {
	// drawingObject.lineWidth = drawingObject.lineWidth;
	drawingObject.lineJoin = 'round'; // round, bevel, or miter;
	drawingObject.lineCap = 'round';
	drawingObject.strokeStyle = '#6d0707';

	drawingObject.beginPath();
	drawingObject.moveTo(currentPosition.x, currentPosition.y);
	drawingObject.lineTo(previousPosition.x, previousPosition.y);
	// drawingObject.stroke();
	// drawingObject.lineTo(currentPosition.x, currentPosition.y);
	drawingObject.stroke();
	drawingObject.closePath();
	// drawingObject.stroke();

}; // LISTENER Function, which draws on the canvas ONLY when 'mousedown'

function clearAndPrepCanvas() {
	var clearButton = $('#clear-button');

	clearButton.on('click', function() {
		drawingObject.clearRect(0, 0, canvas.width, canvas.height);
		drawingObject.fillStyle = '#E6E6E6';
	});
	/* FONT WIDTH ADJUSTER */
	var slider = document.getElementById('slider-range');
	var output = document.getElementById('slider-value');
	output.innerHTML = slider.value;
	slider.oninput = function() {
		output.innerHTML = this.value;
		drawingObject.lineWidth = $(this).val();
		// /* COLOR SELECTOR */
		// $('#colors').change(function() {
		// 	var color = $('#colors').val();
		// 	drawingObject.color = color;
		// });
	};
} // Clear & Prepare (stroke width) Canvas - ALSO INVOKED BY CLEAR BUTTON CLICK
