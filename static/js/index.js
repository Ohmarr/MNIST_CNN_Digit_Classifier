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

eval("(function() {\n\tvar canvas = document.querySelector('#canvas');\n\tcanvas.height = canvas.width = 280;\n\n\tconst drawingObject = canvas.getContext('2d');\n\t// drawingObject.fillStyle = '#FF0000';\n\tdrawingObject.color = 'black';\n\tdrawingObject.lineWidth = 10;\n\tdrawingObject.lineJoin = drawingObject.lineCap = 'round';\n\n\tvar lastMouse, Mouse;\n\tlastMouse = Mouse = { x: 0, y: 0 };\n\n\tprepareCanvas();\n\n\tcanvas.addEventListener(\n\t\t'mousemove',\n\t\tfunction(event) {\n\t\t\tlastMouse.x = Mouse.x;\n\t\t\tlastMouse.y = Mouse.y;\n\n\t\t\tMouse.x = event.pageX - this.offsetLeft;\n\t\t\tMouse.y = event.pageY - this.offsetTop;\n\t\t},\n\t\tfalse\n\t);\n\tcanvas.addEventListener(\n\t\t'mousedown',\n\t\tfunction() {\n\t\t\tcanvas.addEventListener('mousemove', onWrite, false);\n\t\t},\n\t\tfalse\n\t);\n\tcanvas.addEventListener(\n\t\t'mouseup',\n\t\tfunction() {\n\t\t\tcanvas.removeEventListener('mousemove', onWrite, false);\n\t\t},\n\t\tfalse\n\t);\n\tcanvas.addEventListener(\n\t\t'touchmove',\n\t\tfunction(event) {\n\t\t\tevent.preventDefault(); \n\t\t\tevent.stopPropagation();\n\t\t\t// getPostion(event);\t\n\t\tvar touch = event.touches[0];\n\t\tvar mouseEvent = new MouseEvent(\"mousemove\", {\n\t\t\tclientX: touch.clientX,\n\t\t\tclientY: touch.clientY\n\t\t});\n\t\tcanvas.dispatchEvent(mouseEvent);\t\n\t\t},\n\t\tfalse\n\t); // Detects Move (Mouse) & Captures Coordinates\n\t\n\t// canvas.addEventListener(\"touchmove\", function (event) {\n\t\n\t// \t}, false);\n\tcanvas.addEventListener(\n\t\t'touchstart',\n\t\tfunction() {\n\t\t\tcanvas.addEventListener('touchmove', onWrite, false);\n\t\t},\n\t\tfalse\n\t); // Detects downclick (drawing) & calls onWrite\n\tcanvas.addEventListener(\n\t\t'touchend',\n\t\tfunction() {\n\t\t\tcanvas.removeEventListener('touchmove', onWrite, false);\n\t\t},\n\t\tfalse\n\t); // Detects let go, user input ended/paused & calls onWrite\n\n\tvar onWrite = function() {\n\t\tdrawingObject.lineJoin = 'round';\n\t\tdrawingObject.lineCap = 'round';\n\t\tdrawingObject.beginPath();\n\t\tdrawingObject.moveTo(lastMouse.x, lastMouse.y);\n\t\tdrawingObject.lineTo(Mouse.x, Mouse.y);\n\t\tdrawingObject.closePath();\n\t\tdrawingObject.stroke();\n\t};\n\t/* CLEAR BUTTON */\n\tfunction prepareCanvas() {\n\t\tvar clearButton = $('#clear-button');\n\n\t\tclearButton.on('click', function() {\n\t\t\tdrawingObject.clearRect(0, 0, canvas.width, canvas.height);\n\t\t\tdrawingObject.fillStyle = '#E6E6E6';\n\t\t\tdrawingObject.fillRect(0, 0, canvas.width, canvas.height);\n\t\t});\n\t\t/* FONT WIDTH ADJUSTER */\n\t\tvar slider = document.getElementById('slider-range');\n\t\tvar output = document.getElementById('slider-value');\n\t\toutput.innerHTML = slider.value;\n\t\tslider.oninput = function() {\n\t\t\toutput.innerHTML = this.value;\n\t\t\tdrawingObject.lineWidth = $(this).val();\n\t\t};\n\t}\n})();\n\n\n//# sourceURL=webpack:///./assets/js/index.js?");

/***/ })

/******/ });