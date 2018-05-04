function createPage() {
	var fakeInfo = {"Name": "Ben", "Age": "20", "Location": "Cambridge, MA", "fav": "Pikachu"}
	var profPic = document.createElement("img");
	profPic.src = "img/ash.png";
	profPic.className = "profPic";
	document.getElementById("profilePic").append(profPic);
	var info = document.getElementById("info");
	// var title = document.createElement("div");
	// title.innerHTML = "Personal Information";
	// title.className = "title";
	// info.append(title);
	var keys = Object.keys(fakeInfo);
	console.log(keys);
	for (var i=0; i<keys.length; i++) {
		var tempDiv = document.createElement("div");
		if (keys[i] == "fav") { 
			tempDiv.innerHTML = "Favorite Pokemon: " + fakeInfo[keys[i]];
		} else if
		else {
		tempDiv.innerHTML = keys[i] + ": " + fakeInfo[keys[i]];
		}
		tempDiv.className = "infoData";
		info.append(tempDiv);
	}
}


document.addEventListener("DOMContentLoaded",createPage);