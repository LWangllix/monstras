var mymap = L.map("mapid").setView([51.505, -0.09], 13);

L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 18,
  attribution:
    'Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
    'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  id: "mapbox/streets-v11",
  tileSize: 512,
  zoomOffset: -1,
}).addTo(mymap);

L.marker([51.5, -0.09])
  .addTo(mymap)
  .bindPopup("<b>Hello world!</b><br />I am a popup.")
  .openPopup();

L.circle([51.508, -0.11], 500, {
  color: "red",
  fillColor: "#f03",
  fillOpacity: 0.5,
})
  .addTo(mymap)
  .bindPopup("I am a circle.");

L.polygon([
  [51.509, -0.08],
  [51.503, -0.06],
  [51.51, -0.047],
])
  .addTo(mymap)
  .bindPopup("I am a polygon.");

var popup = L.popup();
