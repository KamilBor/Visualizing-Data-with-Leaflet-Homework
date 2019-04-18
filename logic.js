var API_quakes = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

console.log (API_quakes)



function markerSize(magnitude) {

    return magnitude * 4;

};


var earthquakes = new L.LayerGroup();



d3.json(API_quakes, function (geoJson) {

    // console.log(geoJson)

    L.geoJSON(geoJson.features, {

        pointToLayer: function (geoJsonPoint, latlng) { 

            return L.circleMarker(latlng, { radius: markerSize(geoJsonPoint.properties.mag)

            });

        },



        style: function (geoJsonFeature) {

            return {

                fillColor: Color(geoJsonFeature.properties.mag),

                fillOpacity: 0.7,

                weight: 0.1,

                color: 'black'



            }

        },



        onEachFeature: function (feature, layer) {

            layer.bindPopup(

                "<h4 style='text-align:center;'>" + new Date(feature.properties.time) +

                "</h4> <hr> <h5 style='text-align:center;'>" + feature.properties.title + "</h5>");

        }

    }).addTo(earthquakes);

    createMap(earthquakes);

});







function Color(magnitude) {

    if (magnitude > 5) {

        return 'red'

    } else if (magnitude > 4) {

        return 'darkorange'

    } else if (magnitude > 3) {

        return 'tan'

    } else if (magnitude > 2) {

        return 'yellow'

    } else if (magnitude > 1) {

        return 'darkgreen'

    } else {

        return 'lightgreen'

    }

};



function createMap() {



    var highContrastMap = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {

        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',

        maxZoom: 18,

        id: 'mapbox.high-contrast',

        accessToken: 'pk.eyJ1Ijoib2xhd3JlbmNlNzk5IiwiYSI6ImNqZXZvcTBmdDBuY3oycXFqZThzbjc5djYifQ.-ChNrBxEIvInNJWiHX5pXg'

    });



    var streetMap = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {

        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',

        maxZoom: 18,

        id: 'mapbox.streets',

        accessToken: 'pk.eyJ1Ijoib2xhd3JlbmNlNzk5IiwiYSI6ImNqZXZvcTBmdDBuY3oycXFqZThzbjc5djYifQ.-ChNrBxEIvInNJWiHX5pXg'

    });



    var darkMap = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {

        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',

        maxZoom: 18,

        id: 'mapbox.dark',

        accessToken: 'pk.eyJ1Ijoib2xhd3JlbmNlNzk5IiwiYSI6ImNqZXZvcTBmdDBuY3oycXFqZThzbjc5djYifQ.-ChNrBxEIvInNJWiHX5pXg'

    });





    var satellite = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {

        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',

        maxZoom: 18,

        id: 'mapbox.satellite',

        accessToken: 'pk.eyJ1Ijoib2xhd3JlbmNlNzk5IiwiYSI6ImNqZXZvcTBmdDBuY3oycXFqZThzbjc5djYifQ.-ChNrBxEIvInNJWiHX5pXg'

    });





    var baseLayers = {

        "High Contrast": highContrastMap,

        "Street": streetMap,

        "Dark": darkMap,

        "Satellite": satellite

    };



    var overlays = {

        "Earthquakes": earthquakes,

    };



    var mymap = L.map('mymap', {

        center: [40, -99],

        zoom: 4.3,

        // timeDimension: true,

        // timeDimensionOptions: {

        //     timeInterval: "2018-04-01/2018-04-05",

        //     period: "PT1H"

        // },

        // timeDimensionControl: true,

        layers: [streetMap, earthquakes]

    });



    L.control.layers(baseLayers, overlays).addTo(mymap);

 



    var legend = L.control({ position: 'bottomright' });



    legend.onAdd = function (map) {



        var div = L.DomUtil.create('div', 'info legend'),

            magnitude = [0, 1, 2, 3, 4, 5],

            labels = [];



        div.innerHTML += "<h4 style='margin:4px'>Magnitude</h4>"



        for (var i = 0; i < magnitude.length; i++) {

            div.innerHTML +=

                '<i style="background:' + Color(magnitude[i] + 1) + '"></i> ' +

                magnitude[i] + (magnitude[i + 1] ? '&ndash;' + magnitude[i + 1] + '<br>' : '+');

        }



        return div;

    };

    legend.addTo(mymap);

};



// // Create Map

// function createMap(Earthquakes) {



//     var lightmap = L.tileLayer("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojson")

//     attribution: "Map data &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors, <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"http://mapbox.com\">Mapbox</a>",

//     maxZoom 18

//     id: "mapbox.light"

//     };









//     var map = L.map('map').setView([51.505, -0.09], 13);



//     L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {

//         attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'

//     }).addTo(map);



//     L.marker([51.5, -0.09]).addTo(map)

//         .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')

//         .openPopup();