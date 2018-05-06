function createPage() {
	//read json
	console.log('here');
	// var wishlist = [{"name": "Mewtwo", "set": "Evolutions"},{"name": "Raichu", "moves": ["Electrosmash","Thunder"], "set": "FuriousFists"},{"name": "Bulbasaur", "moves":["Shake Vine","Bullet Seed"], "set": "Team_Magma_vs_Team_Aqua" }];
	// var tradelist = [{"name": "Charizard", "set": "Evolutions"},{"name": "Absol", "moves": ["Mach Claw"], "set": "Roaring_Skies"},{"name": "Latias", "moves": ["Psychic Sphere", "Psychic Prism"], "set": "Holon_Phantoms"}];
	var wishlist = [];
	var tradelist = [];
	for (var i=0;i<cards["cards"].length;i++) {
		var current_card = cards["cards"][i];
		if (current_card["inWishlist"]) {
			wishlist.push(current_card);
		}
		if (current_card["upForTrade"]) {
			tradelist.push(current_card);
		}
	}
	console.log(wishlist);
	//for pokemon in wishlist, create div with attributes and make it a link to the results page
	createSubmenu("wishlist",wishlist);
	createSubmenu("trade",tradelist);
	setTimeout(runSemanticJquery,100);
	//for pokemon in UFT, create div with attributes and make it a link to the results page
}

function createSubmenu(name,data) {
	var wishdiv = document.getElementById(name);
	if (data.length >0) {
		for (var i=0; i<data.length; i++) {
			var newPokemon = document.createElement("div");
			newPokemon.className = "ui item pokemonDiv";
			var outerDiv = document.createElement("div");
			outerDiv.className = "outerDiv";
			var previewImg = document.createElement("img");
			var actualImg = document.createElement("img");
			actualImg.src = data[i].src;
			previewImg.src = data[i].src;
			previewImg.className = "previewImg" + " " + name+"Preview";
			actualImg.className = "pokepic";
			addInfo(data[i],outerDiv);
			var newTooltip = document.createElement("div");
			newTooltip.className = "ui special popup";


			newPokemon.append(previewImg);
			newPokemon.append(outerDiv);
			newTooltip.append(actualImg);

			newPokemon.append(newTooltip);
			var link = document.createElement("a");
			var url = "tradeResults.html?search="+data[i].name;
			link.href = url;
			link.append(newPokemon);
			wishdiv.append(link);

		}
	}
}

function addInfo(data, outerDiv) {
	var nameText = document.createElement("div");
	nameText.className = "text";
	nameText.innerHTML = data.name + " ";

	var setImg = document.createElement("img");
	setImg.src = "icons/" + data.set.replace(" ","") + ".png";
	setImg.className = "setImg";

	var typeText = document.createElement("div");
	typeText.className = "text";
	var type = data.type;
	var type = type.charAt(0).toUpperCase() + type.slice(1);
	typeText.innerHTML = "Type: " + type;

	var healthText = document.createElement("div");
	healthText.className = "text";
	var hp = data.hp;
	healthText.innerHTML = "HP: " + hp;

	nameText.append(setImg);
	outerDiv.append(nameText);
	outerDiv.append(typeText);
	outerDiv.append(healthText);
	// outerDiv.append(setImg);
}

function runSemanticJquery() {
       $('.card')
      .popup({
        inline: true,
        position: "bottom center",
      });
     $('.wishlistPreview')
      .popup({
        inline: true,
        position: "right center"
      });
       $('.tradePreview')
      .popup({
        inline: true,
        position: "left center"
      });
      console.log(document.getElementsByClassName("previewImg"));
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

function searchFunc() {
	var searchTerm = document.getElementById("search").value;
	var url = "tradeResults.html?search="+searchTerm;
	window.location.href = url;
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


