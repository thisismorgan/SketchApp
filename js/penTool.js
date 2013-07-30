// grabbing the canvas from the html page and assigning it to the JS variable canvas
var canvas = document.getElementById("art");

// creation of the penTool class
function penTool() {
	this.increment = 2
	this.event = event
	this.current_segment = [];
	this.all_segments = [];
	this.line_drawn = false;
	this.buffer = buffer
	this.context = canvas.getContext("2d");

	canvas.addEventListener('mousedown', this, false);
	canvas.addEventListener('mousemove', this, false);
	canvas.addEventListener('mouseup', this, false);
}
	



penTool.prototype.getMousePos = function(canvas, event)
{
	var rect = canvas.getBoundingClientRect();
		return{
			x: event.clientX - rect.left,
			y: event.clientY - rect.top - 0.5625

		};
}
	
penTool.prototype.addPosToBuffer = function(x, y, increment)
{
	buffer[x][y] = this.increment
}
	
penTool.prototype.addStartPosToBuffer = function(x, y)
{
	buffer[x][y] = 1
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
			var mousePos = penTool.prototype.getMousePos(canvas, event);
			var x = mousePos.x;
			var y = mousePos.y;
			var start = {
				x: x,
				y: y
			};
			penTool.prototype.addStartPosToBuffer(x, y);
			this.current_segment.push(start)
			this.line_drawn = true;
			break;
		case 'mousemove':
		    if (this.line_drawn == true){
			var mousePos = penTool.prototype.getMousePos(canvas, event);
			var x = mousePos.x;
			var y = mousePos.y;
			var next = {
				x: x,
				y: y
			};
			penTool.prototype.addPosToBuffer(x, y, this.increment);
			this.current_segment.push(next)
			this.increment = this.increment + 1
			}
			break;
		case 'mouseup':
			var mousePos = penTool.prototype.getMousePos(canvas, event);
			var x = mousePos.x;
			var y = mousePos.y;
			var last = {
				x: x,
				y: y
			};
			penTool.prototype.addPosToBuffer(x, y, this.increment);
			pixel.prototype.draw(last, this.current_segment, this.all_segments, this.context);
			this.current_segment = [];
			this.line_drawn = false
			break;
	}
}
