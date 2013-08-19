// an instance of the penTool class -- feather tool
function feather(){
	penTool.call(this);
}

feather.prototype = new penTool();
feather.prototype.constructor = feather;

feather.prototype.draw = function(current_segment, all_segments, context, color)
{
	var dx, dy, d;

	color = color || menu.swatch;
	context.lineWidth = 1;
	context.lineCap = "round";
	context.strokeStyle = color;
	context.globalAlpha = 0.5;
	context.globalCompositeOperation = 'destination-atop';
	
	for(var i=0; i<current_segment.length; i++){
		context.lineWidth = 1;
		if (i == 0) {
			var start_point = current_segment[0];
			context.beginPath();
			context.moveTo(start_point.x, start_point.y);
		}
		
		var next_point = current_segment[i];
		context.lineTo(next_point.x, next_point.y);
		context.stroke();

		if (i > 0){
		dx = current_segment[i].x - current_segment[i-1].x;
		dy = current_segment[i].y - current_segment[i-1].y;
		d = dx + dy;

			if (d < 5000)
			{
				context.strokeStyle = color;
				context.lineWidth = 0.1;
				context.beginPath();
				context.moveTo(current_segment[i-1].x + (dx * 0.2), current_segment[i-1].y + (dy * 0.2));
				context.lineTo(current_segment[i].x - (dx * 5), current_segment[i].y - (dy * 5));
				context.stroke();
			}
		}
	}
	
	return current_segment;
}

feather = new feather();
