
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
			// all_strokes = [
			//   {
			//   	tool: pencil,
			//   	coord_list: [{x:1, y:2}, {x:2, y:3}, ...]
			//   }, 
			//   {
			//   	tool: pixel,
			//   	coord_list: [{x:4, y:3}, ...]
			//   }, 
			//   ...
			//   ]
			// for (var i = 0; i < all_strokes.length; i++) {
			// 	current_stroke = all_strokes[i];
			// 	current_stroke.tool... current_stroke.coord_list
			// }
			this.current_segment.push(start)
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
			this.increment = this.increment + 1
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
			current_tool = selectTool();
			
			// selects appropriate draw function for the tool selected
			if (current_tool == "pixel"){
				pixel.draw(last, this.current_segment, this.all_segments, surface.context);
			}
			else if (current_tool == "pencil"){
				pencil.draw(last, this.current_segment, this.all_segments, surface.context, false);
			}
			else if (current_tool == "feather") {
				feather.draw(last, this.current_segment, this.all_segments, surface.context)
			}
			else if (current_tool == "buzz"){
				buzz.draw(last, this.current_segment, this.all_segments, surface.context)
			}
			else if (current_tool == "fancy"){
				fancy.draw(last, this.current_segment, this.all_segments, surface.context)
			}
			else if (current_tool == "circles"){
				circles.draw(last, this.current_segment, this.all_segments, surface.context)
			}
			else if (current_tool == "mirror pixel"){
				mirrorPixel.draw(last, this.current_segment, this.all_segments, surface.context)
			}
			else if (current_tool == "test"){
				test.draw(last, this.current_segment, this.all_segments, surface.context)
				test.draw2(last, this.current_segment, this.all_segments, surface.context)
			}
			else{
				console.log(menu.brush);
			}

			this.current_segment = [];
			this.line_drawn = false
			break;
	}
}
