function createPage() {
	var collection = localStorage.getItem("collection") ?
		JSON.parse(localStorage.getItem("collection")) : cards.cards;
	var matches = document.getElementById("matches");
	var matchData = [{"name": "Ash", "location": "Boston, MA", "want": "Pikachu"}]
	var numMatches = 1;
	var numMatchesDiv = document.createElement("div");
	numMatchesDiv.className = "numMatchesDiv";

	var searchValue = getURLParam("search");
	var searchBar = document.getElementById("search");
	searchBar.value = searchValue;
	var searchType = getURLParam("type");

	var set = getURLParam("set");

	document.getElementById("search").addEventListener("keypress", (evt) => {
		if (evt.keyCode === 13) { // enter key
			searchFunc();
		}
	});

	let showCards = collection.filter(
		c => matchQuery(searchValue, c.name));
	console.log(set);
	var listToCheckSize = (searchType=="trade" ? collection.filter(c => c.inWishlist).length: collection.filter(c => c.upForTrade).length);
	var matchesSet = (set!= "ALL"&&set!=null ? showCards.filter(c => c.set.replace(" ","")==set.replace(" ","")).length>0 : true);
	if (showCards.length>0 && listToCheckSize>0 && matchesSet) {

	if (numMatches==1) {
		numMatchesDiv.innerHTML = "You have " + numMatches + " match!";
	} else {
		numMatchesDiv.innerHTML = "You have " + numMatches + " matches!";
	}
	matches.append(numMatchesDiv);
	var info = ["name", "location", "want"]
	for (var i=0; i<matchData.length; i++) {
		var match = document.createElement("div");
		match.className = "match";
		var image = document.createElement("img");
		image.className = "profilePicPreview";
		image.src = "img/" + matchData[i].name + ".png";
		var infoDiv = document.createElement("div");
		infoDiv.className = "infoDiv";
		infoDiv.append(image);
		for (var j=0; j<info.length; j++) {
			var singleInfoDiv = document.createElement("div");
			singleInfoDiv.className = "singleInfoDiv " + info[j];
			if (info[j]=="location") {
				singleInfoDiv.innerHTML = "<i class='map pin icon'></i> " + matchData[i][info[j]];
			} else if (info[j]=="want") {

				var newTooltip = document.createElement("div");
				newTooltip.className = "ui special popup";

				if (searchType=="wishlist") {
				singleInfoDiv.innerHTML = "<i class='star icon'></i> Wants &nbsp;<a class='pop'> <u> 1 </u> </a> &nbsp; of your cards up for trade";
				var trade = collection.filter(c => c.upForTrade)[0];
			} else {
				singleInfoDiv.innerHTML = "<i class='star icon'></i> Has  &nbsp;<a class='pop'><u> 1 </u></a> &nbsp; of the cards you want";
				var trade = collection.filter(c => c.inWishlist)[0];
			}
				var img = document.createElement("img");
				img.src = trade.src;
				img.className="pokepic";
				newTooltip.append(img);
				singleInfoDiv.append(newTooltip);

				// singleInfoDiv.innerHTML = "<i class='star icon'></i> " + matchData[i][info[j]];
			} else {
				var link = document.createElement("a");
				link.href = "profile.html?user=" + matchData[i][info[j]];
				link.innerHTML = matchData[i][info[j]];
				singleInfoDiv.append(link);
				// singleInfoDiv.innerHTML = matchData[i][info[j]];
		}
			infoDiv.append(singleInfoDiv);
		}
		var outerMessage = document.createElement("div");
		outerMessage.className = "message1";
		var link = document.createElement("a");
		link.href = "messages.html";
		var innerMessage = document.createElement("div");
		innerMessage.className = "ui button";
		innerMessage.innerHTML = "Message";
		link.append(innerMessage);
		outerMessage.append(link);
		infoDiv.append(outerMessage);
		match.append(infoDiv);
		matches.append(match);
	}
} else if (!matchesSet && showCards.length>0) {
	numMatchesDiv.innerHTML = "The pokemon you have searched (" + searchValue + ") does not have a card in the " + set + " set in our database :(";
	matches.append(numMatchesDiv);
}
else if (showCards.length==0) {
	numMatchesDiv.innerHTML = "The pokemon you have searched (" + searchValue + ") is not in our database :(";
	matches.append(numMatchesDiv);
} else {
	if (searchType=="trade") {
		numMatchesDiv.innerHTML = "You do not have any pokemon on your wishlist. Add a card to your wishlist so you can be matched with other trainers!";
		matches.append(numMatchesDiv);
	} else {
		numMatchesDiv.innerHTML = "You do not have any pokemon up for trade. Put cards up for trade so you can be matched with other trainers!";
		matches.append(numMatchesDiv);
	}
}
	runSemanticJquery(searchType,set);
}

function runSemanticJquery(searchType,set) {
   $('.pop')
      .popup({
        inline: true,
        position: "bottom center"
      });
   $('#set-select').dropdown('set selected', set);
   searchType = (searchType ? searchType : "wishlist");
   $('#dropdownText').dropdown('set selected', searchType);
}

function searchFunc() {
	var searchTerm = document.getElementById("search").value;
	var searchType = $('.dropdownText').dropdown('get value');
	var set = $('#set-select').dropdown('get value');
	var url = "tradeResults.html?search="+searchTerm+"&type="+searchType+"&set="+set;
	window.location.href = url;
}

var matchQuery = (query, name) => {
	return name.toLowerCase() == (query.toLowerCase());
}

document.addEventListener("DOMContentLoaded",createPage);