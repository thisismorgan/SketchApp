
// creation of the penTool class
function penTool() {
	this.increment = 2;
	this.event = event;
	this.current_segment = [];
	this.all_segments = [];
	this.line_drawn = false;
	this.buffer = buffer;
	surface.canvas.addEventListener('mousedown', this, false);
	surface.canvas.addEventListener('mousemove', this, false);
	surface.canvas.addEventListener('mouseup', this, false);

}
	

penTool.prototype.getMousePos = function(canvas, event)
{
	var rect = canvas.getBoundingClientRect();
		return{
			x: event.clientX - rect.left,
			y: event.clientY - rect.top

		};
}
	

penTool.prototype.draw = function(pair, current_segment, all_segments, context)
{
	current_segment.push(pair);
	all_segments.push(current_segment);
	current_segment = [];
	return current_segment;
}


penTool.prototype.handleEvent = function(event){
	switch(event.type){
		case 'mousedown':
			var mousePos = penTool.prototype.getMousePos(surface.canvas, event);
			var x = mousePos.x;
			var y = mousePos.y;
			var start = {
				x: x,
				y: y
			};
			this.current_segment.push(start)
			if (menuChanged() == "fancy")
			{
				fancy.draw(this.current_segment, this.all_segments, surface.context)
			}
			this.line_drawn = true;
			break;
		case 'mousemove':
		    if (this.line_drawn == true){
			var mousePos = penTool.prototype.getMousePos(surface.canvas, event);
			var x = mousePos.x;
			var y = mousePos.y;
			var next = {
				x: x,
				y: y
			};
			this.current_segment.push(next)
			selectTool(this.current_segment, this.all_segments, surface.context);
			}
			break;
		case 'mouseup':
			var mousePos = penTool.prototype.getMousePos(surface.canvas, event);
			var x = mousePos.x;
			var y = mousePos.y;
			var last = {
				x: x,
				y: y
			};
			this.current_segment = [];
			this.line_drawn = false
			break;
	}
}


// selects appropriate draw function for the tool selected
function selectTool(current_segment, all_segments, context)
{
	if (menuChanged() == "pixel"){
		pixel.draw(current_segment, all_segments, context);
	}
	else if (menuChanged() == "pencil"){
		pencil.draw(current_segment, all_segments, context, false);
	}
	else if (menuChanged() == "feather") {
		feather.draw(current_segment, all_segments, context)
	}
	else if (menuChanged() == "buzz"){
		buzz.draw(current_segment, all_segments, context)
	}
	else if (menuChanged() == "fancy"){
		// fancy.draw(current_segment, all_segments, context)
	}
	else if (menuChanged() == "circles"){
		circles.draw(current_segment, all_segments, context)
	}
	else if (menuChanged() == "mirror pixel"){
		mirrorPixel.draw(current_segment, all_segments, context)
	}
	else if (menuChanged() == "geometric"){
		geometric.draw(current_segment, all_segments, context)
		geometric.draw2(current_segment, all_segments, context)
	}
	else if (menuChanged() == "mirror pencil"){
		mirrorPencil.draw(current_segment, all_segments, context)
		mirrorPencil.draw2(current_segment, all_segments, context)
	}
	else if (menuChanged() == "test"){
		test.draw(current_segment, all_segments, context)
		test.draw2(current_segment, all_segments, context)
	}
	else{
		console.log(menu.brush);
	}
}
