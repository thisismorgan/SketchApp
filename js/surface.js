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
	}

}

function selectTool(){
	this.current_tool = menuChanged();
	return this.current_tool;
}




surface = new Surface();
surface.canvas.addEventListener('mouseup', selectTool, false);
