function createPage() {
	var collection = localStorage.getItem("collection") ?
		JSON.parse(localStorage.getItem("collection")) : cards.cards;
	console.log(friends);
	var pageOwner = getURLParam("user");
	if (pageOwner == null) {
		pageOwner = "Ben";
	}
	if (pageOwner == "Ben") {
		document.getElementById("addFriend").style.display = "none";
	}
	console.log(pageOwner);
	var fakeInfo = {"Ben": {"Name": "Ben", "Age": "20", "Location": "Cambridge, MA", "fav": "Pikachu"}, "Ash": {"Name": "Ash", "Age": "25", "Location": "Boston, MA", "fav": "Charmander"}}
	var profPic = document.createElement("img");
	profPic.src = "img/" + fakeInfo[pageOwner].Name + ".png";
	profPic.className = "profPic";
	document.getElementById("profilePic").append(profPic);
	var info = document.getElementById("info");
	// var title = document.createElement("div");
	// title.innerHTML = "Personal Information";
	// title.className = "title";
	// info.append(title);
	var keys = Object.keys(fakeInfo[pageOwner]);
	for (var i=0; i<keys.length; i++) {
		var tempDiv = document.createElement("div");
		if (keys[i] == "fav") { 
			tempDiv.innerHTML = "Favorite Pokemon: " + fakeInfo[pageOwner][keys[i]];
		}
		else {
		tempDiv.innerHTML = keys[i] + ": " + fakeInfo[pageOwner][keys[i]];
		}
		tempDiv.className = "infoData";
		info.append(tempDiv);
	}
	if (pageOwner=="Ben") {
	preview("Collection", "count", collection);
	preview("Wishlist", "inWishlist", collection);
	preview("Up For Trade", "upForTrade", collection); }
	else {
		preview("Collection", "inWishlist", collection);
		preview("Wishlist", "count", collection);
		preview("Up For Trade", "inWishlist", collection);
	}

	var friends = localStorage.getItem("friends") ?
		localStorage.getItem("friends") : "yes";
	if (friends=="yes") {
		document.getElementById("friend").style.display = "table-caption";
		document.getElementById("unfriend").style.display = "none";
	} else {
		document.getElementById("unfriend").style.display = "table-caption";
		document.getElementById("friend").style.display = "none";
	}
}

function friend() {
	var friends = localStorage.getItem("friends") ?
		localStorage.getItem("friends") : "yes";
	if (friends=="yes") {
		localStorage.setItem("friends", "no");
		document.getElementById("unfriend").style.display = "table-caption";
		document.getElementById("friend").style.display = "none";
	} else {
		localStorage.setItem("friends", "yes");
		document.getElementById("friend").style.display = "table-caption";
		document.getElementById("unfriend").style.display = "none";
	}
}

function preview(previewName, variableName, collection) {
	var collectionPreview = document.createElement("div");
	collectionPreview.className="collectionPreview";
	var collectionHeader = document.createElement("div");
	collectionHeader.className = "ui header";
	collectionHeader.innerHTML = previewName;
	collectionPreview.append(collectionHeader);

	var collectionDiv = document.createElement("div");
	collectionPreview.append(collectionDiv);
	var usersCollection = collection.filter(c => c[variableName]);
	for (var i=0; i<usersCollection.length; i++) {
		var actualImg = document.createElement("img");
		actualImg.className = "collectionPreviewImg";
		actualImg.src = usersCollection[i].src;
		collectionDiv.append(actualImg);
	}
	document.getElementsByClassName("noscroll")[0].append(collectionPreview);
}


document.addEventListener("DOMContentLoaded",createPage);