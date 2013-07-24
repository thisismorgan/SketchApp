function writeMessage(canvas, message) {
	var context = canvas.getContext("2d");
	context.clearRect(0, 0, canvas.width, canvas.height);
	context.font = "12 pt Calibri";
	context.fillStyle = "black";
	context.fillText(message, 10, 25);
}

function getMousePos(canvas, evt) {
	var rect = canvas.getBoundingClientRect();
	return {
		x: evt.clientX - rect.left,
		y: evt.clientY - rect.top - 0.5625
	};
}

var canvas = document.getElementById("art");
var context = canvas.getContext("2d");

canvas.addEventListener("mousemove", function(evt) {
	var mousePos = getMousePos(canvas, evt);
	var message = "Mouse position: " + mousePos.x + " , " + mousePos.y;
	writeMessage(canvas, message);
}, false);