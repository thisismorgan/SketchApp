// an instance of the penTool class -- draws lines between points in the path
function buzz(){
	penTool.call(this);
}

buzz.prototype = new penTool();
buzz.prototype.constructor = buzz;


// draw function helps smooth lines drawn using splines by curving to midpoints between subsequent sample points
buzz.prototype.draw = function(current_segment, all_segments, context)
{
	context.lineWidth = 6;
	context.lineCap = "round";
	context.lineJoin = "round";
	context.strokeStyle = menu.swatch;
	for(i=0; i<current_segment.length - 2; i++){
		if (i == 0) {
			var start_point = current_segment[0];
			context.beginPath();
			context.moveTo(start_point.x, start_point.y);
		}
		var xc = (current_segment[i].x + current_segment[i+1].x) / 2;
		var yc = (current_segment[i].y + current_segment[i+1].y) / 2;
		context.quadraticCurveTo(current_segment[i].x,current_segment[i].y, xc, yc);
		context.stroke();
		context.beginPath();
	}
	all_segments.push(current_segment);
	current_segment = [];
	return current_segment;
}

buzz = new buzz();

