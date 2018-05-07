var searchAll;

var collection;

let addTradeString = "Put up for trade";
let removeTradeString = "Remove from trade";
let addWishlistString = "Add to wishlist";
let removeWishlistString = "Remove from wishlist";
let collectionLabelString = "#";

var setup = () => {

	collection = localStorage.getItem("collection") ?
		JSON.parse(localStorage.getItem("collection")) : cards.cards;

	Util.one("#search-all").addEventListener("click", (evt) => {
		let tab = evt.target;
		if (!tab.classList.contains("active")) {
			tab.classList.add("active");
		}
		searchAll = true;
		localStorage.setItem("searchAll", "true");
		Util.one("#search-collection").classList.remove("active");
		reloadResults(evt);
	});

	Util.one("#search-collection").addEventListener("click", (evt) => {
		let tab = evt.target;
		if (!tab.classList.contains("active")) {
			tab.classList.add("active");
		}
		searchAll = false;
		localStorage.setItem("searchAll", "false");
		Util.one("#search-all").classList.remove("active");
		reloadResults(evt);
	});

	Util.one("#search").addEventListener("keypress", (evt) => {
		if (evt.keyCode === 13) { // enter key
			reloadResults(evt);
		}
	});

	Util.one("#search-button").addEventListener("click", (evt) => {
		reloadResults(evt);
	});

	searchAll = localStorage.getItem("searchAll") === "true" ? true : false;

	if (searchAll) {
		Util.one("#search-all").click();
	} else {
		Util.one("#search-collection").click();
	}

}

var reloadResults = (evt) => {
	let query = Util.one("#search").value;
	let set = $('#set-select').dropdown('get value');

	let showCards = collection.filter(
		c => matchQuery(query, c.name) &&
		(searchAll || c.count) &&
		(set === "ALL" || set === c.set));

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
	let count = card.count;

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
	extraDiv.setAttribute("class", "extra content extra-wrapper");

	let countDiv = document.createElement("div");
	countDiv.setAttribute("class", "ui three buttons");

	let minusButton = document.createElement("button");
	if (count) {
		minusButton.setAttribute("class", "ui compact icon red button");
	} else {
		minusButton.setAttribute("class", "ui compact icon disabled red button");
	}
	let minusIcon = document.createElement("i");
	minusIcon.setAttribute("class", "minus icon");
	minusButton.appendChild(minusIcon);
	let countField = document.createElement("div");
	countField.setAttribute("class", "ui button disabled");
	countField.innerHTML = count;
	let plusButton = document.createElement("button");
	plusButton.setAttribute("class", "ui compact icon green button");
	let plusIcon = document.createElement("i");
	plusIcon.setAttribute("class", "plus icon");
	plusButton.appendChild(plusIcon);

	let tradeButton = document.createElement("button");

	minusButton.addEventListener("click", (evt) => {
		count--;
		card.count = count;
		localStorage.setItem("collection", JSON.stringify(collection));
		countField.innerHTML = count;
		if (count) {
			minusButton.setAttribute("class", "ui compact icon red button");
			tradeButton.classList.remove("disabled");
		} else {
			minusButton.setAttribute("class", "ui compact icon disabled red button");
			tradeButton.classList.add("disabled");
		}
	});

	plusButton.addEventListener("click", (evt) => {
		card.count = count + 1;
		localStorage.setItem("collection", JSON.stringify(collection));
		reloadResults();
	});

	countDiv.appendChild(minusButton);
	countDiv.appendChild(countField);
	countDiv.appendChild(plusButton);

	extraDiv.appendChild(countDiv);

	let spacer = document.createElement("div");
	spacer.setAttribute("class", "small-spacer");
	extraDiv.appendChild(spacer);


	let buttonDiv = document.createElement("div");
	buttonDiv.setAttribute("class", "ui two buttons");

	// moved up for minus button edge case
	// let tradeButton = document.createElement("button");
	if (trade) {
		if (count) {
			tradeButton.setAttribute("class", "ui basic orange button tradeButton");
		} else {
			tradeButton.setAttribute("class", "ui basic disabled orange button tradeButton");
		}
		tradeButton.innerHTML = removeTradeString;
	} else {
		if (count) {
			tradeButton.setAttribute("class", "ui orange button");
		} else {
			tradeButton.setAttribute("class", "ui disabled orange button");
		}
		tradeButton.innerHTML = addTradeString;
	}
	tradeButton.addEventListener("click", (evt) => {
		card.upForTrade = !trade;
		localStorage.setItem("collection", JSON.stringify(collection));
		reloadResults();
	});

	let wishlistButton = document.createElement("button");
	if (wishlist) {
		wishlistButton.setAttribute("class", "ui basic blue button");
		wishlistButton.innerHTML = removeWishlistString;
	} else {
		wishlistButton.setAttribute("class", "ui blue button");
		wishlistButton.innerHTML = addWishlistString;
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

	return cardDiv;
}

var matchQuery = (query, name) => {
	return name.toLowerCase().includes(query.toLowerCase());
}

var removeAllChildren = (node) => {
	while (node.firstChild) {
		node.removeChild(node.firstChild);
	}
}

document.addEventListener("DOMContentLoaded", setup);
