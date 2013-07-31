// an instance of the penTool class -- draws lines between points in the path
function pencil(){
	penTool.call(this);
}

pencil.prototype = new penTool();
pencil.prototype.constructor = pencil;

pencil.prototype.draw = function(pair, current_segment, all_segments, context)
{
	current_segment.push(pair);
	for(i=0; i<current_segment.length; i++){
		if (i == 0) {
			var start_point = current_segment[0];
			context.beginPath();
			context.moveTo(start_point.x, start_point.y);
		}
		if (i%3 == 0) {
			var next_point = current_segment[i];
			context.lineTo(next_point.x, next_point.y);
		}
		context.lineWidth = 1;
		context.lineCap = "round";
		context.strokeStyle = "rgb(139, 137, 137)";
		context.stroke();
	}
	
	all_segments.push(current_segment);
	current_segment = [];
	return current_segment;
}

pencil1 = new pencil();