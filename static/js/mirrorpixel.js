// an instance of the penTool class -- mirror pixel tool
function mirrorPixel(){
	penTool.call(this);
}

mirrorPixel.prototype = new penTool();
mirrorPixel.prototype.constructor = mirrorPixel;

mirrorPixel.prototype.draw = function(current_segment, all_segments, context, color)
{
	var num = 2;
	for(i=0; i<current_segment.length; i++){
		color = color || menu.swatch;
		context.fillStyle = color;
		context.globalAlpha = 0.2;
		context.globalCompositeOperation = 'source-over';

		if (current_segment[i].x < surface.canvas.width / 2)
		{
			context.fillRect(current_segment[i].x, current_segment[i].y, num, num);
			context.fillRect((surface.canvas.width / 2) + ((surface.canvas.width / 2) - current_segment[i].x), current_segment[i].y, num, num);

		}
		else{
			context.fillRect(current_segment[i].x, current_segment[i].y, num, num);
			context.fillRect(surface.canvas.width - current_segment[i].x, current_segment[i].y, num, num);

		}
	}

	return current_segment;
}

mirrorPixel = new mirrorPixel();
registerBrush("mirrorPixel",mirrorPixel);


