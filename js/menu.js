function Menu()
{
	this.init();
}



Menu.prototype =
{
	container: null,
	form: null,
	select: null,
	save: null,
	undo: null,
	clear: null,
	option: null,


	init: function()
	{
		this.container = document.createElement("div");
		this.container.className = "hipster menu";
		this.container.style.background = "#2E2E2E";
		this.container.style.position = "absolute";
		this.container.style.left = "0px";
		this.container.style.height = window.innerHeight;
		this.container.style.width = "200px";
		title = document.createTextNode("hipster draw");
		this.container.appendChild(title);

		space = document.createElement("div");
		this.container.appendChild(space);

		// creates a drop-down menu for brushes
		this.form = document.createElement("form");
		this.select = document.createElement("select");
		this.option = document.createElement("option");
		this.option.id = 1;
		this.option.innerHTML = "pencil";
		this.select.appendChild(this.option);

		this.option = document.createElement("option");
		this.option.id = 2;
		this.option.innerHTML = "pixel";

		
		this.select.appendChild(this.option);
		this.form.appendChild(this.select);
		this.container.appendChild(this.form);

		space = document.createElement("div");
		this.container.appendChild(space);

		// button for saving images
		this.save = document.createElement("button");
		this.save.innerHTML = "Save That Drawing";
		this.container.appendChild(this.save);

		space = document.createElement("div");
		this.container.appendChild(space);

		// undo button
		this.undo = document.createElement("button");
		this.undo.innerHTML = "Undo!";
		this.container.appendChild(this.undo);

		space = document.createElement("div");
		this.container.appendChild(space);

		// clear button
		this.clearImage = document.createElement("button");
		this.clearImage.innerHTML = "Clear!";
		this.container.appendChild(this.clearImage);

		document.body.appendChild(this.container);
	}


}

function menuChanged() {
	if (menu.option.id == 1){
		console.log("You're using the pencil");
	}
	else{
		if (menu.option.id ==2){
			console.log("You're using the pixel");
		}
		else{
			console.log("Something is wrong!");
		}
	}
}


menu = new Menu();
menu.select.onchange = menuChanged;
//menu.select.addEventListener('change', console.log("Hello"), false);