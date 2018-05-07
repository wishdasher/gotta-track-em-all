function createPage() {
	//read json
	var collection = localStorage.getItem("collection") ?
		JSON.parse(localStorage.getItem("collection")) : cards.cards;
	// var wishlist = [{"name": "Mewtwo", "set": "Evolutions"},{"name": "Raichu", "moves": ["Electrosmash","Thunder"], "set": "FuriousFists"},{"name": "Bulbasaur", "moves":["Shake Vine","Bullet Seed"], "set": "Team_Magma_vs_Team_Aqua" }];
	// var tradelist = [{"name": "Charizard", "set": "Evolutions"},{"name": "Absol", "moves": ["Mach Claw"], "set": "Roaring_Skies"},{"name": "Latias", "moves": ["Psychic Sphere", "Psychic Prism"], "set": "Holon_Phantoms"}];
	var searchType = getURLParam("type");
	var wishlist = collection.filter(c => c.inWishlist);
	var tradelist = collection.filter(c => c.upForTrade);
	setListeners();
	//for pokemon in wishlist, create div with attributes and make it a link to the results page
	createSubmenu("wishlist",wishlist,collection);
	createSubmenu("trade",tradelist,collection);
	runSemanticJquery(searchType);
	//for pokemon in UFT, create div with attributes and make it a link to the results page
}

function createSubmenu(name,data,collection) {
	var wishdiv = document.getElementById(name);
	if (data.length >0) {
		for (let i=0; i<data.length; i++) {
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
			addInfo(data[i],name, outerDiv,collection);
			var newTooltip = document.createElement("div");
			newTooltip.className = "ui special popup";


			newPokemon.append(previewImg);
			newPokemon.append(outerDiv);
			newTooltip.append(actualImg);

			newPokemon.append(newTooltip);
			var link = document.createElement("a");
			// link.href = url;


			link.addEventListener("click", (evt) => {
				if (evt.path[0].className!='red window close outline icon') {
					var url = "tradeResults.html?search="+data[i].name+"&type="+name+"&set="+data[i].set;
					window.location = url;
				}
			});

			link.append(newPokemon);
			wishdiv.append(link);

		}
	}
}

function addInfo(data, name,outerDiv,collection) {
	var nameText = document.createElement("div");
	nameText.className = "text cardName";
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

	var closeDiv = document.createElement("div");
	closeDiv.title = "Remove";
	closeDiv.innerHTML = "<i class='red window close outline icon'></i>";
	closeDiv.className = "close";
	closeDiv.addEventListener("click", (evt) => {
		if (name=="wishlist") {
			data.inWishlist = !data.inWishlist;
		} else {
			data.upForTrade = !data.upForTrade;
		}
		localStorage.setItem("collection", JSON.stringify(collection));
		var wishdiv = document.getElementById(name);
		wishdiv.innerHTML = "";
		if (name=="wishlist") {
			var wishlist = collection.filter(c => c.inWishlist);
		} else {
			var wishlist = collection.filter(c => c.upForTrade);
		}
		createSubmenu(name,wishlist,collection);
	});
	outerDiv.append(closeDiv);
	outerDiv.append(nameText);
	outerDiv.append(typeText);
	outerDiv.append(healthText);
	// outerDiv.append(setImg);
}

function runSemanticJquery() {
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
}

function searchFunc() {
	var searchTerm = document.getElementById("search").value;
	if (searchTerm!="" && searchTerm!=null) {
	var searchType = $('.ui.dropdown').dropdown('get value')[0];
	var set = $('#set-select').dropdown('get value');
	var url = "tradeResults.html?search="+searchTerm+"&type="+searchType+"&set="+set;
	window.location.href = url; }
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


