// buffer

//grabs canvas from html file
var canvas = document.getElementById("art");
var context = canvas.getContext("2d");

//pulls canvas width and height
var max_x = canvas.width;
var max_y = canvas.height;


// rgb code for white
var $0 = "(255, 255, 255)";

// rgb code for black
var $1 = "(0, 0, 0)";

// creates a 2d buffer the same size as canvas (coordinates correlate) 
// array filled with representations for "white pixels"
var buffer = Array();
for (i = 0; i < max_x; i++) {
	buffer[i] = Array();{
		for (j=0; j < max_y; j++){
			buffer[i][j] = 0;
		}
	}
}

