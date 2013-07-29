// grabbing the canvas from the html page and assigning it to the JS variable canvas
var canvas = document.getElementById("art");

// creation of the penTool class
function penTool(canvas, event, buffer){
	this.increment = 2
	this.buffer = buffer;
	this.canvas = canvas;
	this.context = this.canvas.getContext("2d");
	this.event = event;
	this.current_segment = [];
	this.all_segments = [];
	this.line_drawn = false;
	
	var getMousePos = function(canvas, event)
	{
		var rect = canvas.getBoundingClientRect();
		return{
			x: event.clientX - rect.left,
			y: event.clientY - rect.top - 0.5625

		};
	}
	
	var addPosToBuffer = function(x, y, increment)
	{
		buffer[x][y] = this.increment
	}

	var addStartPosToBuffer = function (x, y)
	{
		buffer[x][y] = 1

	}

	var draw = function(pair, current_segment, all_segments, context)
	{
		current_segment.push(pair);
		for(i=0; i<current_segment.length; i++){
			if (i == 0) {
				var start_point = current_segment[0];
				context.beginPath();
				context.moveTo(start_point.x, start_point.y);
			}
			if (i%3 == 0) {
				var next_point = current_segment[i];
				context.lineTo(next_point.x, next_point.y);
			}
			context.lineWidth = 1;
			context.lineCap = "round";
			context.strokeStyle = "rgb(139, 137, 137)";
			context.stroke();
		}
		
		all_segments.push(current_segment);
		current_segment = [];
		return current_segment;
	}

	this.handleEvent = function(event){
		switch(event.type){
			case 'mousedown':
				var mousePos = getMousePos(canvas, event);
				var x = mousePos.x;
				var y = mousePos.y;
				var start = {
					x: x,
					y: y
				};
				addStartPosToBuffer(x, y);
				this.current_segment.push(start)
				this.line_drawn = true;
				break;
			case 'mousemove':
			    if (this.line_drawn == true){
				var mousePos = getMousePos(canvas, event);
				var x = mousePos.x;
				var y = mousePos.y;
				var next = {
					x: x,
					y: y
				};
				addPosToBuffer(x, y, this.increment);
				this.current_segment.push(next)
				this.increment = this.increment + 1
				}
				break;
			case 'mouseup':
				var mousePos = getMousePos(canvas, event);
				var x = mousePos.x;
				var y = mousePos.y;
				var last = {
					x: x,
					y: y
				};
				addPosToBuffer(x, y, this.increment);
				draw(last, this.current_segment, this.all_segments, this.context);
				this.current_segment = [];
				this.line_drawn = false
				break;
		}
	};


	canvas.addEventListener('mousedown', this, false);
	canvas.addEventListener('mousemove', this, false);
	canvas.addEventListener('mouseup', this, false);


}

// an instance of the penTool class
var brush = new penTool(canvas, event, buffer);
