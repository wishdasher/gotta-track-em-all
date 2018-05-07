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
	goToCollection.addEventListener('click', () => {window.location="database.html"})
	goToCollection.className = "ui teal button indexButton";
	goToCollection.innerHTML = "Go to Collection";
	document.getElementsByClassName("collection-stats")[0].append(goToCollection);

	var goToCommunity = document.createElement("div");
	goToCommunity.addEventListener('click', () => {window.location="community.html"})
	goToCommunity.className = "ui teal button indexButton";
	goToCommunity.innerHTML = "Go to Community";
	document.getElementsByClassName("notifications2")[0].append(goToCommunity);

	checkWindowIndex();
               window.addEventListener("resize", (evt) => {
              checkWindowIndex();
       });
}

function checkWindowIndex() {
               if (document.body.clientWidth < 700) {
                       var labels = document.getElementsByClassName("column");
                       for (var i=0;i<labels.length;i++) {
                       labels[i].className = labels[i].className.replace("five","seven");
                       labels[i].className = labels[i].className.replace("six","seven");
               }
               }
       else if (document.body.clientWidth < 840) {
                       var labels = document.getElementsByClassName("column");
                       for (var i=0;i<labels.length;i++) {
                       labels[i].className = labels[i].className.replace("five","six");
                       labels[i].className = labels[i].className.replace("seven","six");
               }
               
       } else if (document.body.clientWidth > 840) {
                       var labels = document.getElementsByClassName("column");
                       for (var i=0;i<labels.length;i++) {
                       labels[i].className = labels[i].className.replace("six","five");
                       labels[i].className = labels[i].className.replace("seven","five");
               }
       }

}

document.addEventListener("DOMContentLoaded", createPage);