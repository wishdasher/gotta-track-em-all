var createPage = () => {
  createResults("boston");
}
document.addEventListener("DOMContentLoaded", createPage);

function createResults(location) {
  var leaguesInLoc;
  if (location == "boston"){leaguesInLoc = leagues.boston;}
  if (location == "sanFrancisco"){leaguesInLoc = leagues.sanFrancisco;}
  for(var i=0; i<leaguesInLoc.length;i++){
    var league = leaguesInLoc[i];
    var newLeague = document.createElement("div");
    newLeague.className = "league";

    var leagueName = document.createElement("div");
    leagueName.className = "leagueName";
    leagueName.innerHTML = league.name;

    var leagueAddress = document.createElement("div");
    leagueAddress.className = "leagueAddress";
    leagueAddress.innerHTML = league.street;

    newLeague.append(leagueName);
    newLeague.append(leagueAddress);
    document.getElementById("mapResults").append(newLeague);


  }

}
