var brushes = {}

function registerBrush(name, brush){
		brushes[name] = brush
}

function getBrush(name){
		return brushes.name
}


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
	

// penTool.prototype.draw = function(pair, current_segment, all_segments, context)
// {
// 	current_segment.push(pair);
// 	all_segments.push(current_segment);
// 	current_segment = [];
// 	return current_segment;
// }

penTool.prototype.draw = function(){

}

penTool.prototype.draw2 = function(){

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
			if (menu.select.value == "fancy")
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


// var brushes = {
// 	pencil:pencil,
// 	pixel:pixel,
// 	feather:feather,
// 	buzz:buzz,
// 	fancy:fancy,
// 	circles:circles,
// 	mirrorPencil:mirrorPencil,
// 	mirrorPixel:mirrorPixel,
// 	geometric:geometric,
// 	test:test
// }

// var brushes = {"pixel": pixel}

// selects appropriate draw function for the tool selected
function selectTool(current_segment, all_segments, context)
{
	brush = eval(menu.select.value);
	brush.draw(current_segment,all_segments,context);
	brush.draw2(current_segment,all_segments,context);


}
