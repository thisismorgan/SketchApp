// an instance of the penTool class -- draws a path of squares
function pixel(){
	penTool.call(this);
}

pixel.prototype = new penTool();
pixel.prototype.constructor = pixel;

pixel.prototype.draw = function(current_segment, all_segments, context, color)
{
	color = color || menu.swatch;
	context.fillStyle = color;
	context.globalAlpha = 0.2;
	context.globalCompositeOperation = 'source-over';

	for(i=0; i<current_segment.length; i++){
		context.fillRect(current_segment[i].x, current_segment[i].y, 2, 2);
	}

	return current_segment;
}

pixel = new pixel();
registerBrush("pixel",pixel);

