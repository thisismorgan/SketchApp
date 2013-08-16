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
	// this.s = 1;
	this.imgd1 = null;
	this.imgd2 = null;
	this.surface_list = []
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
	
penTool.prototype.draw = function(){

}

penTool.prototype.draw2 = function(){

}


penTool.prototype.redraw = function(){
	for(var i=0; i<this.all_segments.length; i++){
		brush = this.all_segments[i].tool;
		console.log(brush);
		color = this.all_segments[i].color;
		brush.draw(this.all_segments[i].coord_list, this.all_segments, surface.context, color);
		brush.draw2(this.all_segments[i].coord_list, this.all_segments, surface.context, color);
	}
}

penTool.prototype.selectTool = function(current_segment, all_segments, context)
{
	// this.new_surface = "surface" + this.s
	// this.new_surface = new Surface();
	brush.draw(this.current_segment.coord_list, this.all_segments, surface.context);
	brush.draw2(this.current_segment.coord_list, this.all_segments, surface.context);
	// console.log(this.s);
}

// penTool.prototype.redrawCanvas = function(){
// 	var destCtx = surface.context;
// 	for(var i=0; i < this.surface_list.length; i++){
// 		destCtx.drawImage(this.surface_list[i], 0, 0);
// 	}
// }

penTool.prototype.handleEvent = function(event){
	switch(event.type){
		case 'mousedown':
			this.imgd1 = surface.context.getImageData(0, 0, canvas.width, canvas.height);
			var mousePos = this.getMousePos(surface.canvas, event);
			var x = mousePos.x;
			var y = mousePos.y;
			var start = {
				x: x,
				y: y
			};
			brush = eval(menu.select.value)
			this.current_segment = {
				tool: brush,
				color: menu.swatch,
				coord_list:[]
			}
			this.current_segment.coord_list.push(start)
			this.all_segments.push(this.current_segment);
			if (brush == fancy)
			{
				fancy.draw(this.current_segment.coord_list, this.all_segments, surface.context)
			}
			this.line_drawn = true;
			break;
		case 'mousemove':
		    if (this.line_drawn == true){
			var mousePos = this.getMousePos(surface.canvas, event);
			var x = mousePos.x;
			var y = mousePos.y;
			var next = {
				x: x,
				y: y
			};
			this.current_segment.coord_list.push(next)
			// this.redraw();
			this.selectTool(this.current_segment.coord_list, this.all_segments, surface.context);
			}
			break;
		case 'mouseup':
			var mousePos = this.getMousePos(surface.canvas, event);
			var x = mousePos.x;
			var y = mousePos.y;
			var last = {
				x: x,
				y: y
			};
			// this.all_segments.push(this.current_segment);
			this.current_segment = [];
			this.line_drawn = false
			// this.redrawCanvas();
			// this.surface_list.push(this.new_surface);
			// this.s = this.s + 1;
			this.imgd2 = surface.context.getImageData(0, 0, canvas.width, canvas.height);
			break;
	}
}

p = new penTool();

// // selects appropriate draw function for the tool selected
// function selectTool(current_segment, all_segments, context)
// {
// 	brush = eval(menu.select.value);
// 	brush.draw(brush.current_segment.coord_list, brush.all_segments, surface.context);
// 	brush.draw2(brush.current_segment.coord_list, brush.all_segments, surface.context);
// }
