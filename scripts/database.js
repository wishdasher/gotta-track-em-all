var searchAll = false;

var collection;

var setup = () => {

	collection = localStorage.getItem("collection") ?
		JSON.parse(localStorage.getItem("collection")) : cards.cards;


	Util.one("#search-all").addEventListener("click", (evt) => {
		let tab = evt.target;
		if (!tab.classList.contains("active")) {
			tab.classList.add("active");
		}
		searchAll = true;
		Util.one("#search-collection").classList.remove("active");
		reloadResults(evt);
	});

	Util.one("#search-collection").addEventListener("click", (evt) => {
		let tab = evt.target;
		if (!tab.classList.contains("active")) {
			tab.classList.add("active");
		}
		searchAll = false;
		Util.one("#search-all").classList.remove("active");
		reloadResults(evt);
	});

	Util.one("#search").addEventListener("keypress", (evt) => {
		if (evt.keyCode === 13) {
			reloadResults(evt);
		}
	});

	Util.one("#search-icon-input").addEventListener("click", (evt) => {
		reloadResults(evt);
	});

	reloadResults();
	console.log(cards);
}

var reloadResults = (evt) => {
	let query = Util.one("#search").value;
	console.log(collection);
	let showCards = collection.filter(c => matchQuery(query, c.name) && (searchAll || c.inCollection));
	// console.log(showCards);
	let cardResults = Util.one("#card-results");
	removeAllChildren(cardResults);

	for (let i = 0 ; i < showCards.length; i++) {
		let newCard = createCard(showCards[i]);
		cardResults.appendChild(newCard);
	}
}

var createCard = (card) => {
	let wishlist = card.inWishlist;
	let trade = card.upForTrade;

	let cardDiv = document.createElement("div");
	cardDiv.setAttribute("class", "card custom-card");
	cardDiv.setAttribute("id", card.id + "-" + card.name);

	let imgDiv = document.createElement("div");
	imgDiv.setAttribute("class", "image");
	let img = document.createElement("img");
	img.setAttribute("class", "right floated mini ui image tiny");
	img.setAttribute("src", card.src);
	imgDiv.appendChild(img);
	cardDiv.appendChild(imgDiv);

	let extraDiv = document.createElement("div");
	extraDiv.setAttribute("class", "extra content");
	let buttonDiv = document.createElement("div");
	buttonDiv.setAttribute("class", "ui two buttons");

	let tradeButton = document.createElement("div");
	if (trade) {
		tradeButton.setAttribute("class", "ui basic red button");
		tradeButton.innerHTML = "Remove from trade";
	} else {
		tradeButton.setAttribute("class", "ui basic green button");
		tradeButton.innerHTML = "Put up for trade";
	}
	tradeButton.addEventListener("click", (evt) => {
		card.upForTrade = !trade
		localStorage.setItem("collection", JSON.stringify(collection));
		reloadResults();
	});

	let wishlistButton = document.createElement("div");
	if (wishlist) {
		wishlistButton.setAttribute("class", "ui basic red button");
		wishlistButton.innerHTML = "Remove from wishlist";
	} else {
		wishlistButton.setAttribute("class", "ui basic blue button");
		wishlistButton.innerHTML = "Add to wishlist";
	}
	wishlistButton.addEventListener("click", (evt) => {
		card.inWishlist = !wishlist;
		localStorage.setItem("collection", JSON.stringify(collection));
		reloadResults();
	});

	buttonDiv.appendChild(tradeButton);
	buttonDiv.appendChild(wishlistButton);
	extraDiv.appendChild(buttonDiv);
	cardDiv.appendChild(extraDiv);
	// TODO add listeners to make buttons affect data

	return cardDiv;

}


	// 	candyImg.setAttribute("src", getImageForCandy(detail.candy));
	// candyImg.setAttribute("class", "candy-image");
	// candyImg.setAttribute("data-row", row);
	// candyImg.setAttribute("data-col", col);


var matchQuery = (query, name) => {
	return name.toLowerCase().includes(query.toLowerCase());
}

var removeAllChildren = (node) => {
	while (node.firstChild) {
		node.removeChild(node.firstChild);
	}
}

document.addEventListener("DOMContentLoaded", setup);
