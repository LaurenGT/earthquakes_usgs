// API endpoint
const queryURL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

// GET request to url
d3.json(queryURL).then(data => {
  // console.log(data.features);
  // let depthExtent = d3.extent(data.features.map(d => d.geometry.coordinates[2]))
  // console.log(depthExtent)
  createFeatures(data.features)
});

// determine color of circle based on depth ranges
function getColor(depth) {
  switch (true) {
    case depth < 1:
      return "#fc0000"
    case depth < 10:
      return "#ff6200"
    case depth < 30:
      return "#ffae00"
    case depth < 50:
      return "#ffe600"
    case depth < 90:
      return "#c8ff00"
    default:
      return "#37ff00"
  }
}

// create popups for each earthquake
function createFeatures(earthquakeData) {
  function onEachFeature(feature, layer) {
    layer.bindPopup(`<strong>Location:</strong>${feature.properties.place}<br><strong>Magnitude:</strong>${feature.properties.mag}<br><strong>Depth:</strong>${feature.geometry.coordinates[2]}`)
  }

  // create circles with sizes based on magnitude and color from calling the getColor function
  const mags = L.geoJSON(earthquakeData, {
    onEachFeature: onEachFeature,
    pointToLayer: (feature, latlng) => {
      return new L.Circle(latlng, {
        radius: feature.properties.mag * 75000,
        fillColor: getColor(feature.geometry.coordinates[2]),
        stroke: true,
        color: "black",
        weight: .3,
        fillOpacity: .75
      });
    }
  });

  createMap(mags)
}

// create map function
function createMap(mags) {

  // Define streetmap layer
  const streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  });


  // Define a baseMaps object to hold our base layers
  const baseMaps = {
    "Street Map": streetmap,
  };

  // define overlay maps
  const overlayMaps = {
    "Magnitudes": mags
  }

  // Create a new map displaying base (streetmap) and magnitudes on page load
  const myMap = L.map("map", {
    center: [15.5994, -32.6731],
    zoom: 3,
    layers: [streetmap, mags]
  });

  // Create a layer control containing our baseMaps
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);

  // create legend based on the ranges set in the getColor
  var legend = L.control({ position: "bottomright" });
  legend.onAdd = function () {
    const div = L.DomUtil.create("div", "info legend");
    const grades = [-10, 1, 10, 30, 50, 90];
    const colors = ["#fc0000", "#ff6200", "#ffae00", "#ffe600", "#c8ff00", "#37ff00"];

    for (let i = 0; i < grades.length; i++) {
      let legendInfo = `<i style="background: ${(colors[i])}"></i>` + grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
      div.innerHTML += legendInfo;
      // console.log(legendInfo);
    }
    return div;
  }; // console.log(legend)
  legend.addTo(myMap);
};

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
