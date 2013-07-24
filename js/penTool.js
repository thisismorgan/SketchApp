

var canvas = document.getElementById("art");
var context = canvas.getContext("2d");
context.fillStyle = "rbg(255,0,0)";


function getMousePos(canvas, evt) {
	var rect = canvas.getBoundingClientRect();
	return {
		x: evt.clientX - rect.left,
		y: evt.clientY - rect.top - 0.5625
	};
}

function addPosToBuffer(x, y) {
	buffer[x][y] = 1
}


// tracks movements and adds to the buffer
canvas.addEventListener("mousedown", function(evt){
	var mousePos = getMousePos(canvas, evt);
	var x = mousePos.x;
	var y = mousePos.y;
	addPosToBuffer(x, y);
}, false);

canvas.addEventListener("mousemove", function(evt){
	var mousePos = getMousePos(canvas, evt);
	var x = mousePos.x;
	var y = mousePos.y;
	addPosToBuffer(x, y);
}, false);

// Draws what's on the buffer to the canvas
canvas.addEventListener("mouseup", function(){
	for (i=0; i<max_x; i++){
		for (j=0; j<max_y; j++){
			if (buffer[i][j] == 1){
				context.fillStyle = "rgb(139,137,137)";
				context.fillRect(i, j, 2, 2);
			}
		}
	}
}, false);

