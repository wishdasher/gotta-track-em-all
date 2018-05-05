function createPage() {
	//read json
	console.log('here');
	// var wishlist = [{"name": "Mewtwo", "set": "Evolutions"},{"name": "Raichu", "moves": ["Electrosmash","Thunder"], "set": "FuriousFists"},{"name": "Bulbasaur", "moves":["Shake Vine","Bullet Seed"], "set": "Team_Magma_vs_Team_Aqua" }];
	// var tradelist = [{"name": "Charizard", "set": "Evolutions"},{"name": "Absol", "moves": ["Mach Claw"], "set": "Roaring_Skies"},{"name": "Latias", "moves": ["Psychic Sphere", "Psychic Prism"], "set": "Holon_Phantoms"}];
	var wishlist = [];
	var tradelist = [];
	for (var i=0;i<cards["cards"].length;i++) {
		var current_card = cards["cards"][i];
		if (current_card["in_wishlist"]) {
			wishlist.push(current_card);
		}
		if (current_card["up_for_trade"]) {
			tradelist.push(current_card);
		}
	}
	console.log(wishlist);
	//for pokemon in wishlist, create div with attributes and make it a link to the results page
	createSubmenu("wishlist",wishlist);
	createSubmenu("trade",tradelist);
	runSemanticJquery();
	//for pokemon in UFT, create div with attributes and make it a link to the results page
}

function createSubmenu(name,data) {
	var wishdiv = document.getElementById(name);
	if (data.length >0) {
		for (var i=0; i<data.length; i++) {
			var newPokemon = document.createElement("div");
			newPokemon.className = "ui item";
			var outerDiv = document.createElement("div");
			outerDiv.className = "outerDiv";
			var newText = document.createElement("div");
			newText.className = "text";
			newPokemon.append(outerDiv);
			var img = document.createElement("img");
			img.src = data[i].src;
			img.className = "pokepic";
			newText.innerHTML = data[i].name;
			var setImg = document.createElement("img");
			setImg.src = "icons/" + data[i].set.replace(" ","") + ".png";
			setImg.className = "setImg";
			outerDiv.append(newText);
			outerDiv.append(setImg);
			var newTooltip = document.createElement("div");
			newTooltip.className = "ui special popup";
			newTooltip.append(img);
			wishdiv.append(newPokemon);
			outerDiv.append(newTooltip);
		}
	}
}

function runSemanticJquery() {
       $('.card')
      .popup({
        inline: true,
        position: "bottom center",
      });
     $('.text')
      .popup({
        inline: true,
        position: "left center"
      });
$('.ui.dropdown')
  .dropdown({
    values: [
      {
        name: 'Users Who Want',
        value: 'trade'
      },
      {
        name     : 'Users Who Have',
        value    : 'wishlist',
        selected : true
      }
    ]
  })
;
}

// function createTooltip(div,name) {
// 	var toolTipDiv = document.createElement("div");
// 	document.getElementsByTagName("body")[0].append(toolTipDiv);
// 	var img = document.createElement("img");
// 	toolTipDiv.append(img);
// 	img.src = "pictures/" + name + ".jpg";
// 	img.className = "pokepic";
// 	toolTipDiv.style.display = "none";
// 	toolTipDiv.style.position = "absolute";

// 	//insert actual tooltip function here
// 	div.addEventListener("mouseenter", function() { 
// 		// var offset = div.offset();
// 		toolTipDiv.style.top = div.offsetTop;
// 		toolTipDiv.style.left = div.offsetLeft;
// 		toolTipDiv.style.display = "inline";
// 		})
// 	div.addEventListener("mouseleave", function() {
// 		toolTipDiv.style.display = "none";})
// }

document.addEventListener("DOMContentLoaded",createPage);


