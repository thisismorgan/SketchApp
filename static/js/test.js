// an instance of the penTool class -- draws lines between points in the path
function test(){
	penTool.call(this);
}

test.prototype = new penTool();
test.prototype.constructor = test;


// draw function helps smooth lines drawn using splines by curving to midpoints between subsequent sample points
test.prototype.draw = function(current_segment, all_segments, context, color)
{
	color = color || menu.swatch;
	context.lineWidth = 0.5;
	context.lineCap = "round";
	context.strokeStyle = color;
	context.globalAlpha = 0.5;
	context.globalCompositeOperation = 'destination-atop';
	for(i=0; i<current_segment.length; i++){
		// var count = Math.floor(1000 *Math.random());
		context.beginPath();
		context.moveTo(current_segment[i].x, current_segment[i].y);
		context.lineTo(current_segment[i].x + 10, current_segment[i].y);
		context.lineTo(current_segment[i].x + 10, current_segment[i].y + 10);
		context.lineTo(current_segment[i].x, current_segment[i].y);
		context.stroke();
	}


	return current_segment;
}

test = new test();
registerBrush("test",test);
