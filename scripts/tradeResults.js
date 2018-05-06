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
				singleInfoDiv.innerHTML = "<i class='star icon'></i> Wants <a class='pop'><u>1</u></a> of your cards";
				var trade = collection.filter(c => c.upForTrade)[0];
			} else {
				singleInfoDiv.innerHTML = "<i class='star icon'></i> Has <a class='pop'><u>1</u></a> of the cards you want";
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
	runSemanticJquery(searchType);
}

function runSemanticJquery(searchType) {
   $('.pop')
      .popup({
        inline: true,
        position: "bottom center"
      });
$('.ui.dropdown')
  .dropdown({
    values: [
      {
        name: 'Users Who Want',
        value: 'trade',
        selected: (searchType=="trade")
      },
      {
        name     : 'Users Who Have',
        value    : 'wishlist',
        selected : (searchType!="trade")
      }
    ]
  });
}

function searchFunc() {
	var searchTerm = document.getElementById("search").value;
	var searchType = $('.dropdown').dropdown('get value')[0];
	var url = "tradeResults.html?search="+searchTerm+"&type="+searchType;
	window.location.href = url;
}

document.addEventListener("DOMContentLoaded",createPage);