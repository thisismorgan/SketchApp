// a fancy brush..
function fancy(){
	penTool.call(this);
}

fancy.prototype = new penTool();
fancy.prototype.constructor = fancy;

fancy.prototype.draw = function(current_segment, all_segments, context, color)
{
	for(var i=0; i<current_segment.length; i++){
		color = color || menu.swatch;
		context.strokeStyle = color;
		context.globalAlpha = 0.2;
		context.globalCompositeOperation = 'source-over';
		var radius = Math.floor(50*Math.random());
		context.beginPath();
		context.arc(current_segment[i].x, current_segment[i].y, radius, 0, 2*Math.PI, false);
		context.lineWidth = 1;
		context.stroke();
	}

	return current_segment;
}

fancy = new fancy();
