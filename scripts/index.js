var createPage = () => {
	var collection = localStorage.getItem("collection") ?
		JSON.parse(localStorage.getItem("collection")) : cards.cards;
	var stats = document.getElementById("stats");
	var ownedCards = collection.filter(c => c.count);
	var wishlistSize = collection.filter(c => c.inWishlist).length;
	var sets = [];
	for (var i=0; i<ownedCards.length; i++) {
		if (!sets.includes(ownedCards[i].set)) {
			sets.push(ownedCards[i].set);
		}
	}
	var friendCheck = localStorage.getItem("friend") ? localStorage.getItem("friend") : "friend";
	var friendNum = friendCheck=="friend" ? 1 : 0;
	var statsList = {"Number Of Cards": ownedCards.length, "Wishlist Size": wishlistSize, "Number of Sets": sets.length, "Number of Friends": friendNum};
	var keys = Object.keys(statsList);
	for (let j=0; j<keys.length; j++) {
		var statDiv = document.createElement("div");
		console.log(statDiv);
		statDiv.className = "statDiv";
		statDiv.innerHTML = "<b>" + keys[j] + "</b>: " + statsList[keys[j]];
		stats.append(statDiv);
	}
	var goToCollection = document.createElement("div");
	goToCollection.className = "ui teal button indexButton";
	goToCollection.innerHTML = "Go to Collection";
	document.getElementsByClassName("collection-stats")[0].append(goToCollection);

	var goToCommunity = document.createElement("div");
	goToCommunity.className = "ui teal button indexButton";
	goToCommunity.innerHTML = "Go to Community";
	document.getElementsByClassName("notifications2")[0].append(goToCommunity);
}

document.addEventListener("DOMContentLoaded", createPage);