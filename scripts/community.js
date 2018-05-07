var leagueLocation;
var searchDistance;
var createPage = () => {
  createResults("boston",25);
}
document.addEventListener("DOMContentLoaded", createPage);

function runSemanticJquery() {
  $('.dropdown').dropdown();
}

function createResults(location, distance) {
  var leaguesInLoc;
  if (location == "boston"){leaguesInLoc = leagues.boston;}
  if (location == "sanFrancisco"){leaguesInLoc = leagues.sanFrancisco;}
  console.log(location);
  console.log(leaguesInLoc);
  for(var i=0; i<leaguesInLoc.length;i++){
    var league = leaguesInLoc[i];
      if (league.distance <= distance){
      var newLeague = document.createElement("div");
      newLeague.className = "league";
      newLeague.className = "ui list";

      var leagueItem = document.createElement("div");
      leagueItem.className = "leagueItem";

      var mapIcon = document.createElement("i");
      mapIcon.className = "big map marker alternate icon point";

      var content = document.createElement("div");

      var leagueName = document.createElement("a");
      leagueName.className = "leagueName";
      leagueName.innerHTML = league.name;

      var leagueAddress = document.createElement("div");
      leagueAddress.className = "leagueAddress";
      leagueAddress.innerHTML = league.street + "<br>" + league.cityState + " " + league.zipCode;

      document.getElementById("mapResults").append(newLeague);
      newLeague.append(leagueItem);
      leagueItem.append(mapIcon);
      leagueItem.append(content);
      content.append(leagueName);
      content.append(leagueAddress);
    }
  }
}

function searchFunc() {
  searchTerm = document.getElementById("search").value;
  searchTerm = searchTerm.toLowerCase();
  searchTerm = searchTerm.replace(/ /g,"");
  console.log(searchTerm);
  if (searchTerm!="" && searchTerm!=null) {
    var searchDistance = $('#distance-select').dropdown('get value');
     if (searchTerm == "boston,ma" || searchTerm == "boston,massachusetts"){
       leagueLocation = "boston";
     }
     else if(Number(searchTerm) && 02108 <= Number(searchTerm) &&  Number(searchTerm) <= 02118){
       leagueLocation = "boston";
     }
     else if(searchTerm == "sanfrancisco,ca" || searchTerm == "sanfrancisco,california"){
       leagueLocation = "sanFrancisco";
       moveToLocation(37.772703, -122.43739, searchDistance);
     }
     else if(Number(searchTerm) && 94102 <= Number(searchTerm) &&  Number(searchTerm) <= 94150){
       leagueLocation = "sanFrancisco";
       moveToLocation(37.772703, -122.43739, searchDistance);
     }
     document.getElementById("mapResults").innerHTML = "";
     createResults(leagueLocation,searchDistance);
  }
}

function moveToLocation(lat, lng, distance){
  console.log(distance);
  map = new google.maps.Map(document.getElementById('map'), { zoom: 9, center: mewtwosday });
  var mewtwosday = {lat: 37.772703, lng: -122.43739};
  var marker = new google.maps.Marker({ position: mewtwosday, map: map });
  if (distance > 5){
    var d20 = {lat: 37.766098, lng: -122.241221};
    var marker2 = new google.maps.Marker({ position: d20, map: map });
  }
  if (distance > 10 && distance <=25){
    console.log("hiiii");
    var gamesOfBerk = {lat: 37.867881, lng: -122.258463};
    var marker3 = new google.maps.Marker({ position: gamesOfBerk, map: map });
    var johnny = {lat: 37.595973, lng: -122.3851}
    var marker4 = new google.maps.Marker({ position: johnny, map: map });
    var eudemonia = {lat: 37.872218, lng: -122.267484}
    var marker5 = new google.maps.Marker({ position: eudemonia, map: map });
    var diamond = {lat: 37.973881, lng: -122.044422}
    var marker6 = new google.maps.Marker({ position: diamond, map: map });
    var strike = {lat: 38.108081, lng: -122.572832}
    var marker7 = new google.maps.Marker({ position: strike, map: map });
  }

  // using global variable:
  map.panTo(mewtwosday);
}
