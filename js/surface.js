function Surface(){
	
	this.init();
}

Surface.prototype = 
{
	current_tool: null,

	init: function()
	{
	this.canvas = document.getElementById("art");
	this.context = this.canvas.getContext("2d");
	
	//to save this image you need to give it a white background (otherwise the default background is transparent..)
	this.context.fillStyle = "white";
	this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
	}

}

function selectTool(){
	this.current_tool = menuChanged();
	return this.current_tool;
}




surface = new Surface();
surface.canvas.addEventListener('mouseup', selectTool, false);
