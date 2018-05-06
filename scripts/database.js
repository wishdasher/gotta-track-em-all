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

	setUpDropDown();


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

	Util.one("#search-icon-input").addEventListener("click", (evt) => {
		reloadResults(evt);
	});

	searchAll = localStorage.getItem("searchAll") === "true" ? true : false;

	if (searchAll) {
		Util.one("#search-all").click();
	} else {
		Util.one("#search-collection").click();
	}
	reloadResults();
	console.log(cards);
}

var setUpDropDown = () => {
	$('.ui.dropdown')
		.dropdown({
		values: [
			{
				name: 'Neo Destiny',
				value: 'Neo Destiny'
			},
			{
				name: 'Rising Rivals',
				value: 'Rising Rivals'
			},
			{
				name: 'Secret Wonders',
				value: 'Secret Wonders'
			},
			{
				name: 'Unleashed',
				value: 'Unleashed'
			},
			{
				name: 'All sets',
				value: 'ALL',
				selected: true
			},
		]});
}

var reloadResults = (evt) => {
	let query = Util.one("#search").value;
	console.log(collection);
	let showCards = collection.filter(c => matchQuery(query, c.name) && (searchAll || c.count));
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

	// let collectionLabel = document.createElement("div");
	// collectionLabel.setAttribute("class", "ui button disabled");
	// collectionLabel.innerHTML = collectionLabelString;

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

	minusButton.addEventListener("click", (evt) => {
		card.count = count - 1;
		localStorage.setItem("collection", JSON.stringify(collection));
		reloadResults();
	});

	plusButton.addEventListener("click", (evt) => {
		card.count = count + 1;
		localStorage.setItem("collection", JSON.stringify(collection));
		reloadResults();
	});

	// countDiv.appendChild(collectionLabel);
	countDiv.appendChild(minusButton);
	countDiv.appendChild(countField);
	countDiv.appendChild(plusButton);

	extraDiv.appendChild(countDiv);

	let spacer = document.createElement("div");
	spacer.setAttribute("class", "small-spacer");
	extraDiv.appendChild(spacer);


	let buttonDiv = document.createElement("div");
	buttonDiv.setAttribute("class", "ui two buttons");

	let tradeButton = document.createElement("button");
	if (trade) {
		tradeButton.setAttribute("class", "ui basic red button");
		tradeButton.innerHTML = removeTradeString;
	} else {
		tradeButton.setAttribute("class", "ui orange button");
		tradeButton.innerHTML = addTradeString;
	}
	tradeButton.addEventListener("click", (evt) => {
		card.upForTrade = !trade
		localStorage.setItem("collection", JSON.stringify(collection));
		reloadResults();
	});

	let wishlistButton = document.createElement("button");
	if (wishlist) {
		wishlistButton.setAttribute("class", "ui basic red button");
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
