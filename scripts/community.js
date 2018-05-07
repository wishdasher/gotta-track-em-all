var createPage = () => {
  initMap();
}
document.addEventListener("DOMContentLoaded", createPage);

function initMap() {
  var mit = {lat: 42.359184, lng: -71.093544};
  var center = {lat: 42.359184, lng: -71.093544};
  var map = new google.maps.Map(document.getElementById('map'), { zoom: 13, center: center }); var marker = new google.maps.Marker({ position: mit, map: map });
  var pandemonium = {lat: 42.366218, lng: -71.105599};
  var marker2 = new google.maps.Marker({position: pandemonium, map: map});
  var newEnglandComics = {lat: 42.343377, lng: -71.123253};
  var marker3 = new google.maps.Marker({position: newEnglandComics, map: map})
}
