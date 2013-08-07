// an instance of the penTool class -- draws lines between points in the path
function mirrorPencil(){
	penTool.call(this);
}

mirrorPencil.prototype = new penTool();
mirrorPencil.prototype.constructor = mirrorPencil;


// draw function helps smooth lines drawn using splines by curving to midpoints between subsequent sample points
mirrorPencil.prototype.draw = function(current_segment, all_segments, context)
{
	context.lineWidth = 0.5;
	context.lineCap = "round";
	context.strokeStyle = menu.swatch;
	context.globalAlpha = 0.5;
	context.globalCompositeOperation = 'destination-atop';
	for(i=0; i<current_segment.length - 2; i++){
		if (i == 0) {
			context.beginPath();
			context.moveTo(current_segment[i].x, current_segment[i].y);
		}
		var xc = (current_segment[i].x + current_segment[i+1].x) / 2;
		var yc = (current_segment[i].y + current_segment[i+1].y) / 2;
		context.quadraticCurveTo(current_segment[i].x,current_segment[i].y, xc, yc);
		context.stroke();
	}


	return current_segment;
}

mirrorPencil.prototype.draw2 = function(current_segment, all_segments, context)
{
	context.lineWidth = 0.5;
	context.lineCap = "round";
	// context.lineJoin = "round";
	context.strokeStyle = menu.swatch;
	for(i=0; i<current_segment.length - 2; i++){
		if (current_segment[i].x < surface.canvas.width / 2)
		{
			if (i == 0)
			{
			context.beginPath();
			context.moveTo((surface.canvas.width / 2) + ((surface.canvas.width / 2) - current_segment[i].x), current_segment[i].y);
			}
		var xc = (((surface.canvas.width / 2) + ((surface.canvas.width / 2) - current_segment[i].x) + (surface.canvas.width / 2) + ((surface.canvas.width / 2) - current_segment[i+1].x))) / 2;
		var yc = (current_segment[i].y + current_segment[i+1].y) / 2;
		context.quadraticCurveTo((surface.canvas.width / 2) + ((surface.canvas.width / 2) - current_segment[i].x),current_segment[i].y, xc, yc);
		context.stroke();

		}
		else{
			if (i == 0)
			{
			context.beginPath();
			context.moveTo(surface.canvas.width - current_segment[i].x, current_segment[i].y);
			}
		var xc = ((surface.canvas.width - current_segment[i].x) + (surface.canvas.width - current_segment[i+1].x)) / 2;
		var yc = (current_segment[i].y + current_segment[i+1].y) / 2;
		context.quadraticCurveTo((surface.canvas.width - current_segment[i].x),current_segment[i].y, xc, yc);
		context.stroke();
		}
	}	

	all_segments.push(current_segment);
	current_segment = [];
	return current_segment;
}

mirrorPencil = new mirrorPencil();