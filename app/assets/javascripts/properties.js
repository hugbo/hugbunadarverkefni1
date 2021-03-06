$(function(){
  $('#property_address, #property_zipcode, #property_city').on("focusout",function(){
    var address = $('#property_address').val();
    var zipcode = $('#property_zipcode').val();
    var city = $('#property_city').val();

    if(!address || !zipcode || !city){
      console.log("Something is empty");
      return;
    }

    var searchAddress = address+','+zipcode+','+city;
    var apikey = "AIzaSyC8qF171O_qBdXdwSLnH07kFDtbCk5M1CY"
    var geolink = 'https://maps.googleapis.com/maps/api/geocode/json?address=' +
                  searchAddress+ '&key='+ apikey;

    console.log(geolink);

    getGeoLocation(geolink);

  })
});

var newPropertyMap;
var newPropertyMarker;

function initNewPropertyMap() {
    console.log("Initializing new property map");
    newPropertyMap = new google.maps.Map($('#map').get(0), {zoom: 11});

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            newPropertyMap.setCenter(pos);
            newPropertyMap.setZoom(16);
        }, function() {
            var center = {
                'lat': 64.139583,
                'lng': -21.951879
            }
            newPropertyMap.setCenter(center);
        });
    } else {
        // Browser doesn't support Geolocation
        // Center defined here as the University of Iceland! :D
        var center = {
            'lat': 64.139583,
            'lng': -21.951879
        }
        newPropertyMap.setCenter(center);
    }

    google.maps.event.addListener(newPropertyMap, 'click', function(event) {
        placeMarker(event.latLng);
    });
}

function placeMarker(location) {
    if (newPropertyMarker !== undefined) {
        newPropertyMarker.setMap(null);
    }

    newPropertyMarker = new google.maps.Marker({position: location, map: newPropertyMap});

    $('#property_lat').val(location.lat().toFixed(10));
    $('#property_lon').val(location.lng().toFixed(10));
}

function getGeoLocation(searchQuery) {
    $.ajax({
        type: "GET",
        url: searchQuery,
        dataType: "JSON" // you want a difference between normal and ajax-calls, and json is standard
    }).success(function(json) {
      newPropertyMap.setCenter(json.results[0].geometry.location);
      newPropertyMap.setZoom(17);
    });
}



function initShowPropertiesMap(){
  var location = {
    lat: parseFloat($('#propertyShowDesc').attr("lat")),
    lng: parseFloat($('#propertyShowDesc').attr("lng"))
  };
  var map = new google.maps.Map($('#map').get(0), {center: location, zoom: 16});
  var marker = new google.maps.Marker({position: location, map: map});
  console.log(location);
  //tmp
}

// Photo gallery logic

$(document).ready(function() {
  $('.imageClick').click(function() {

    var showcasedImageSrc = $('.showcasedImage').attr('src') || "";
    var newImageSrc = $(this).children('img').attr('src') || $(this).attr('src');

    if (showcasedImageSrc === newImageSrc) {
      $('.imageShowcase').toggle(500);
    } else {
      $('.imageShowcase').hide(500, function() {
        $('.showcasedImage').attr('src', newImageSrc);
        $('.imageShowcase').show(500);
      });
    }

    $(document).mouseup(function(e) {
      var imageShowcase = $('.imageShowcase');
      var imageDisplay = $('.imageDisplay');

      if (!imageShowcase.is(e.target)
      && imageShowcase.has(e.target).length === 0
      && !imageDisplay.is(e.target)
      && imageDisplay.has(e.target).length === 0) {
          imageShowcase.hide(500);
        }
    });

  });
});
