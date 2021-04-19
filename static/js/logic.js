/* @TODO
- get data for all earthquakes in past 7 days
- use URL for pull in the data
- create a Leaflet map plotting all earthquakes by lat/lon
- circle size: magnitude
- circle color: depth (deeper = darker)
- popups with additional information about the earthqUake ON CLICK
- legend showing the depth colors
*/


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

