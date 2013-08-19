function Surface(){
	
	this.init();
}

Surface.prototype = 
{
	current_tool: null,

	init: function()
	{
	this.canvas = document.getElementById("art");
	this.canvas.style.cursor = "crosshair";
	this.context = this.canvas.getContext("2d");
	
	//to save this image you need to give it a white background (otherwise the default background is transparent..)
	this.context.fillStyle = "white";
	this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
	}

}


surface = new Surface();

