function createPage() {
	var matches = document.getElementById("matches");
	var matchData = [{"name": "Ash", "location": "Boston", "want": "Pikachu"}]
	var numMatches = 1;
	var numMatchesDiv = document.createElement("div");
	var searchValue = getURLParam("search");
	var searchBar = document.getElementById("search");
	searchBar.value = searchValue;
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
				singleInfoDiv.innerHTML = "<i class='star icon'></i> " + matchData[i][info[j]];
			} else {
			singleInfoDiv.innerHTML = matchData[i][info[j]];
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
	runSemanticJquery();
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

function searchFunc() {
	var searchTerm = document.getElementById("search").value;
	var url = "tradeResults.html?search="+searchTerm;
	window.location.href = url;
}

document.addEventListener("DOMContentLoaded",createPage);