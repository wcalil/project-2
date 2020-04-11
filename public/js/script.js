var map;
var infowindow;
var idRestaurant;
var request;
var requestDetails;
var randomRestaurant;
var currentLocation;
var selectedRestaurant = document.getElementById("selectedRestaurant");
var service;
var slider = document.getElementById("myRange");
var output = document.getElementById("distance");
var sliderPrice = document.getElementById("price");
var outputPrice = document.getElementById("priceIndex");
var userDistance = 16812.4;
var zoom;
var savedRestaurant;
var retrieveRestaurant = JSON.parse(localStorage.getItem("arrayRestaurants"));

if (retrieveRestaurant){
    var arrayRestaurants = retrieveRestaurant;
    retrieveRestaurants()
}

else{
var arrayRestaurants = [];

}

output.innerHTML = slider.value;
slider.oninput = function () {
    output.innerHTML = this.value;
};

outputPrice.innerHTML = sliderPrice.value;
sliderPrice.oninput = function () {
    outputPrice.innerHTML = this.value;
};


// Initialize function
function initMap() {
    navigator.geolocation.getCurrentPosition(function (position) {
        let lat = position.coords.latitude;
        let long = position.coords.longitude;
        var latText = parseFloat(lat);
        var longText = parseFloat(long);
        var currentLocation;
        currentLocation = { lat: latText, lng: longText };
        map = new google.maps.Map(document.getElementById("map"), {
            zoom: 12,
            center: currentLocation
        });

        new google.maps.Marker({
            position: currentLocation,
            map: map
        });
    });
}

// Retrieve restaurants nearby

function initMapPlaces(type) {
    navigator.geolocation.getCurrentPosition(function (position) {

        let lat = position.coords.latitude;
        let long = position.coords.longitude;
        var latText = parseFloat(lat);
        var longText = parseFloat(long);
        currentLocation = { lat: latText, lng: longText };
        
        if (userDistance > 16812.4 ){
            zoom = 12
        }
        else{
            zoom = 13
        }

        map = new google.maps.Map(document.getElementById("map"), {
            zoom: zoom,
            center: currentLocation
        });

        new google.maps.Marker({
            position: currentLocation,
            map: map
        });

        request = {
            location: currentLocation,
            radius: userDistance,
            types: [type],
             maxPriceLevel: sliderPrice.value,

        };

        infowindow = new google.maps.InfoWindow();
        service = new google.maps.places.PlacesService(map);
        service.nearbySearch(request, callback);
    });
}


google.maps.event.addDomListener(window, 'load', initMap)
