/* @TODO
- get data for all earthquakes in past 7 days
- use URL for pull in the data
- create a Leaflet map plotting all earthquakes by lat/lon
- circle size: magnitude
- circle color: depth (deeper = darker)
- popups with additional information about the earthqUake ON CLICK
- legend showing the depth colors
*/

// API endpoint
const queryURL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

// GET request to url
d3.json(queryURL).then(data => {
  console.log(data.features);
  createFeatures(data.features)
});

function colorDepth(depth) {

}

function createFeatures(earthquakeData) {
  function onEachFeature(feature, layer) {
    layer.bindPopup(`<strong>Location:</strong>${feature.properties.place}<br><strong>Magnitude:</strong>${feature.properties.mag}`)
  }


  // const earthquakes = L.geoJSON(earthquakeData, {
  //   onEachFeature: onEachFeature,
  // });


  const mags = L.geoJSON(earthquakeData, {
    onEachFeature: onEachFeature,
    pointToLayer: (feature, latlng) => {
      return new L.Circle(latlng, {
        radius: feature.properties.mag*25000,
        // valueProperty: 'coordinates',
        // colorScale: {colors: ["red", "green"]},
        // scale: ["green", "red"],
        // steps: 5,
        // mode: "q",
        // style: {
        //   color: "#fff",
        //   weight: 1,
        //   fillOpacity: 0.8
        // },
        // fillColor: "red",
        stroke: false
      });
    }
  });

  createMap(mags)
}

function createMap(mags) {

  // Define streetmap and darkmap layers
  const streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  });

  // const darkmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  //   attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  //   maxZoom: 18,
  //   id: "dark-v10",
  //   accessToken: API_KEY
  // });

  // Define a baseMaps object to hold our base layers
  const baseMaps = {
    "Street Map": streetmap,
    // "Dark Map": darkmap,
  };

  const overlayMaps = {
    // Earthquakes: earthquakes,
    "Magnitudes": mags
  }

  // Create a new map
  const myMap = L.map("map", {
    center: [15.5994, -28.6731],
    zoom: 3,
    layers: [streetmap, mags]
  });

// Create a layer control containing our baseMaps
// Be sure to add an overlay Layer containing the earthquake GeoJSON
L.control.layers(baseMaps, overlayMaps, {
  collapsed: false
}).addTo(myMap);
}

// // Create a map object
// const myMap = L.map("map", {
//   center: [15.5994, -28.6731],
//   zoom: 3
// });

// // Adding tile layer
// L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
//   attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
//   tileSize: 512,
//   maxZoom: 18,
//   zoomOffset: -1,
//   id: "mapbox/streets-v11",
//   accessToken: API_KEY
// }).addTo(myMap);

// function circleColor(mag) {

// }

// Perform an API call to the USGS API to get earthquake information. Call createMarkers when complete
// d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then((data) => {
//     console.log(data)
// });

/* NOTE FOR STEP 2
/  You can use the javascript Promise.all function to make two d3.json calls, 
/  and your then function will not run until all data has been retreived.
/
/ ----------------------------------------
/  Promise.all(
/    [
/        d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"),
/        d3.json("https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json")
/    ]
/  ).then( ([data,platedata]) => {
/
/        console.log("earthquakes", data)
/        console.log("tectonic plates", platedata)
/
/    }).catch(e => console.warn(e));
/
/ ----------------------------------------*/



/*
Terra Notes

variable with queryURL
basic map setup
basic tileLayer
those are not dependent on data


option 1

d3.json(url).then(data => {
  - L.geojson().addTo(myMap)

  - legend setup


})

option 2
function createLayer(data) {
  L.geoJson(data, {
    pointToLayer: key:value,

  }).add
}

function createLegend(data) {
  legend setup
}

d3.json(url).then(data => {
  createLayer(data);
  createLegend(data)

*/