function createPage() {
	//read json
	console.log('here');
	var wishlist = [{"name": "Mewtwo", "moves": ["Psychic", "Barrier"]},{"name": "Raichu", "moves": ["Electrosmash","Thunder"]},{"name": "Bulbasaur", "moves":["Shake Vine","Bullet Seed"] }];
	var tradelist = [{"name": "Charizard", "moves": ["Fire Spin"]},{"name": "Absol", "moves": ["Mach Claw"]},{"name": "Latias", "moves": ["Psychic Sphere", "Psychic Prism"]}];
	//for pokemon in wishlist, create div with attributes and make it a link to the results page
	createSubmenu("wishlist",wishlist);
	createSubmenu("trade",tradelist)
	//for pokemon in UFT, create div with attributes and make it a link to the results page
}

function createSubmenu(name,data) {
	var wishdiv = document.getElementById(name);
	if (data.length >0) {
		for (var i=0; i<data.length; i++) {
			var newPokemon = document.createElement("div");
			newPokemon.className = "pokemon";
			// var moveString = "Moves: ";
			// for (var j=0; j<data[i].moves.length; j++) {
			// 	moveString = moveString + data[i].moves[j] + "<br>";
			// }
			// var newDiv = document.createElement("div");
			// newDiv.className = "info";
			// picDiv = document.createElement("div");
			// picDiv.className = "picdiv";
			var img = document.createElement("img");
			// picDiv.append(img);
			// img.src = "pictures/" + data[i].name + ".jpg";
			img.className = "pokepic";
			newPokemon.innerHTML = data[i].name;
			createTooltip(newPokemon,data[i].name);
			// newDiv.innerHTML = data[i].name + "<br>" + moveString;
			// newPokemon.append(picDiv);
			// newPokemon.append(newDiv);
			wishdiv.append(newPokemon);
		}
	}
}

function createTooltip(div,name) {
	var toolTipDiv = document.createElement("div");
	document.getElementsByTagName("body")[0].append(toolTipDiv);
	var img = document.createElement("img");
	toolTipDiv.append(img);
	img.src = "pictures/" + name + ".jpg";
	img.className = "pokepic";
	toolTipDiv.style.display = "none";
	toolTipDiv.style.position = "absolute";

	//insert actual tooltip function here
	div.addEventListener("mouseenter", function() { 
		// var offset = div.offset();
		toolTipDiv.style.top = div.offsetTop;
		toolTipDiv.style.left = div.offsetLeft;
		toolTipDiv.style.display = "inline";
		})
	div.addEventListener("mouseleave", function() {
		toolTipDiv.style.display = "none";})
}

document.addEventListener("DOMContentLoaded",createPage);