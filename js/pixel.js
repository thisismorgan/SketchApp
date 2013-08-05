// an instance of the penTool class -- draws a path of squares
function pixel(){
	penTool.call(this);
}

pixel.prototype = new penTool();
pixel.prototype.constructor = pixel;

pixel.prototype.draw = function(pair, current_segment, all_segments, context)
{
	current_segment.push(pair);
	for (i=0; i<max_x; i++){
		for (j=0; j<max_y; j++){
			if (buffer[i][j] != 0){
				context.fillStyle = menu.swatch;
				context.fillRect(i, j, 2, 2);
			}
		}
	}
	all_segments.push(current_segment);
	current_segment = [];
	return current_segment;
}

pixel = new pixel();
