/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./assets/js/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./assets/js/index.js":
/*!****************************!*\
  !*** ./assets/js/index.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D\nconst canvas = document.querySelector('#canvas');\n// const canvasContainer = document.getElementById('canvas-container');\n// var radius = (canvasContainer.clientWidth + canvasContainer.clientHeight) / 150;\ncanvas.height = canvas.width = 280;\n\nconst drawingObject = canvas.getContext('2d');\n// drawingObject.fillStyle = '#FF0000';\ndrawingObject.color = 'black';\ndrawingObject.lineWidth = 10;\ndrawingObject.lineJoin = drawingObject.lineCap = 'miter';\n\n/* Feature detection */\nvar passive = false;\n// var notPassive = true;\n\nvar currentPosition, previousPosition;\ncurrentPosition = previousPosition = { x: 0, y: 0 };\n\nclearAndPrepCanvas();\n// canvas.addEventListener(\n// \t'touchmove',\n// \tfunction(event) {\n// \t\tif (canvas.classList.contains('disabled')){return}\n// \t\tevent.preventDefault(); event.stopPropagation()\n// \t\treturn false\n// \t},); // Disables Default & Propagation\n\n\nfunction getPostion(event) {\n\tcurrentPosition.x = previousPosition.x;\n\tcurrentPosition.y = previousPosition.y;\n\tpreviousPosition.x = event.pageX - this.offsetLeft;\n\tpreviousPosition.y = event.pageY - this.offsetTop;\n}\n// function mouseDraw() {\n\n// }\n\ncanvas.addEventListener('mousemove', getPostion, passive); // Detects Move (Mouse) & Captures Coordinates\ncanvas.addEventListener(\n\t'mousedown',\n\tfunction() {\n\t\tcanvas.addEventListener('mousemove', invokeDrawing, passive);\n\t},\n\tpassive\n); // Detects downclick (drawing) & calls invokeDrawing\ncanvas.addEventListener(\n\t'mouseup',\n\tfunction() {\n\t\tcanvas.removeEventListener('mousemove', invokeDrawing, passive);\n\t},\n\tpassive\n); // Detects let go, user input ended/paused & calls invokeDrawing\n\n// canvas.addEventListener(\n// \t'touchmove',\n// \tfunction(event) {\n// \t\tif (canvas.classList.contains('disabled')){return}\n// \t\tevent.preventDefault(); event.stopPropagation()\n// \t\treturn false\n// \t},); // Disables Default & Propagation\ncanvas.addEventListener(\n\t'touchmove',\n\tfunction(event) {\n\t\tevent.preventDefault(); \n\t\tevent.stopPropagation();\n\t\tgetPostion(event);\t\n\tvar touch = event.touches[0];\n\tvar mouseEvent = new MouseEvent(\"mousemove\", {\n\t\tclientX: touch.clientX,\n\t\tclientY: touch.clientY\n\t});\n\tcanvas.dispatchEvent(mouseEvent);\t\n\t},\n\tpassive\n); // Detects Move (Mouse) & Captures Coordinates\n\n// canvas.addEventListener(\"touchmove\", function (event) {\n\n// \t}, false);\ncanvas.addEventListener(\n\t'touchstart',\n\tfunction() {\n\t\tcanvas.addEventListener('touchmove', invokeDrawing, passive);\n\t},\n\tpassive\n); // Detects downclick (drawing) & calls invokeDrawing\ncanvas.addEventListener(\n\t'touchend',\n\tfunction() {\n\t\tcanvas.removeEventListener('touchmove', invokeDrawing, passive);\n\t},\n\tpassive\n); // Detects let go, user input ended/paused & calls invokeDrawing\n\n\nconst invokeDrawing = function() {\n\t// drawingObject.lineWidth = drawingObject.lineWidth;\n\tdrawingObject.lineJoin = 'round'; // round, bevel, or miter;\n\tdrawingObject.lineCap = 'round';\n\tdrawingObject.strokeStyle = '#6d0707';\n\n\tdrawingObject.beginPath();\n\tdrawingObject.moveTo(currentPosition.x, currentPosition.y);\n\tdrawingObject.lineTo(previousPosition.x, previousPosition.y);\n\t// drawingObject.stroke();\n\t// drawingObject.lineTo(currentPosition.x, currentPosition.y);\n\tdrawingObject.stroke();\n\tdrawingObject.closePath();\n\t// drawingObject.stroke();\n\n}; // LISTENER Function, which draws on the canvas ONLY when 'mousedown'\n\nfunction clearAndPrepCanvas() {\n\tvar clearButton = $('#clear-button');\n\n\tclearButton.on('click', function() {\n\t\tdrawingObject.clearRect(0, 0, canvas.width, canvas.height);\n\t\tdrawingObject.fillStyle = '#E6E6E6';\n\t});\n\t/* FONT WIDTH ADJUSTER */\n\tvar slider = document.getElementById('slider-range');\n\tvar output = document.getElementById('slider-value');\n\toutput.innerHTML = slider.value;\n\tslider.oninput = function() {\n\t\toutput.innerHTML = this.value;\n\t\tdrawingObject.lineWidth = $(this).val();\n\t\t// /* COLOR SELECTOR */\n\t\t// $('#colors').change(function() {\n\t\t// \tvar color = $('#colors').val();\n\t\t// \tdrawingObject.color = color;\n\t\t// });\n\t};\n} // Clear & Prepare (stroke width) Canvas - ALSO INVOKED BY CLEAR BUTTON CLICK\n\n\n//# sourceURL=webpack:///./assets/js/index.js?");

/***/ })

/******/ });