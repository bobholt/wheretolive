define(function(require) {

  'use strict';

  var L = require('leaflet');
  require('stamen');

  // Data
  var airportData = require('airports/airports');

  var gardens = require('nature/gardens');
  var natlparks = require('nature/natlparks');

  var cinemas = require('arts/cinemas');
  var artMuseums = require('arts/museums');

  var democratic = require('schools/democratic');
  var montessori = require('schools/montessori');
  var waldorf = require('schools/waldorf');

  var historyMuseums = require('science-history/museums');

  var trainsData = require('transportation/trains');
  var farmersMarketsData = require('shopping/farmersmarkets');

  var oneHour = require('distances/one-hour');
  var twoHour = require('distances/two-hour');

  var map = null;

  var trainIcon = L.icon({
    iconUrl: 'img/train.svg',
    iconSize: [20, 20]
  });

  var airportIcon = L.icon({
    iconUrl: 'img/airport.svg',
    iconSize: [20, 20]
  });

  var farmersMarketIcon = L.icon({
    iconUrl: 'img/beet.svg',
    iconSize: [30, 30]
  });

  var trainRoute = [];
  var twoHourLine = [];
  var oneHourLine = [];

  function initmap() {

    var airportArr = [];
    var airports = null;
    var artsArr = [];
    var arts = null;
    var farmersMarketsArr = [];
    var farmersMarkets = null;
    var natureArr = [];
    var nature = null;
    var schoolsArr = [];
    var schools = null;
    var scienceHistoryArr = [];
    var scienceHistory = null;
    var trainsArr = [];
    var trains = null;
    var hoursArr = [];
    var hours = null;

    var overlayMaps = {};

    // create the tile layer with correct attribution
    // var osmUrl='http://otile{s}.mqcdn.com/tiles/1.0.0/map/{z}/{x}/{y}.png';
    var osmAttrib='Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://creativecommons.org/licenses/by-sa/3.0">CC BY SA</a>.';
    var osm = new L.StamenTileLayer('terrain', {
      minZoom: 3,
      maxZoom: 18,
      opacity: 0.5,
      attribution: osmAttrib,
      subdomains: '124'
    });

    airportData.forEach(function(elem) {
      airportArr.push(mapCircle(elem, 40, 'transparent', true));
      airportArr.push(L.marker([elem.lat, elem.lng], {icon: airportIcon}).bindPopup('<a href="' + (elem.url || '') + '" target="_blank">' + elem.name + '</a><br />' + elem.location));
    });

    airports = L.layerGroup(airportArr);

    overlayMaps['Airports'] = airports;

    farmersMarketsData.forEach(function(elem) {
      if (elem.lat && elem.lng && elem.lat !== '' && elem.lng !== '') {
        farmersMarketsArr.push(L.marker([elem.lat, elem.lng], {icon: farmersMarketIcon}).bindPopup('<a href="' + (elem.url || '') + '" target="_blank">' + elem.name + '</a><br />' + elem.location));
      }
    });

    farmersMarkets = L.layerGroup(farmersMarketsArr);

    overlayMaps['Farmers\' Markets'] = farmersMarkets;

    trainsData.forEach(function(elem) {
      var latlng = L.latLng(elem.lat, elem.lng);

      trainsArr.push(L.marker(latlng, {icon: trainIcon}).bindPopup('<a href="' + (elem.url || '') + '" target="_blank">' + elem.name + '</a><br />' + elem.location));
      trainRoute.push(latlng);
    });

    trainsArr.push(L.polyline(trainRoute, {
      color: '#000',
      weight: 2
    }));

    trains = L.layerGroup(trainsArr);

    overlayMaps['Amtrak'] = trains;

    twoHour.forEach(function(elem) {
      var latlng = L.latLng(elem.lat, elem.lng);

      twoHourLine.push(latlng);
    });

    oneHour.forEach(function(elem) {
      var latlng = L.latLng(elem.lat, elem.lng);

      oneHourLine.push(latlng);
    });

    hoursArr.push(L.polyline(twoHourLine, {
      color: '#F00',
      weight: 2
    }));

    hoursArr.push(L.polyline(oneHourLine, {
      color: '#00F',
      weight: 2
    }));

    hours = L.layerGroup(hoursArr);

    overlayMaps['DriveTime'] = hours;

    democratic.forEach(function(elem){
      schoolsArr.push(mapCircle(elem, 10, '#377eb8', false));
    });

    montessori.forEach(function(elem){
      schoolsArr.push(mapCircle(elem, 10, '#377eb8', false));
    });

    waldorf.forEach(function(elem){
      schoolsArr.push(mapCircle(elem, 10, '#377eb8', false));
    });

    schools = L.layerGroup(schoolsArr);

    overlayMaps['Schools'] = schools;

    natlparks.forEach(function(elem){
      natureArr.push(mapCircle(elem, 20, '#4daf4a', false));
    });

    gardens.forEach(function(elem){
      natureArr.push(mapCircle(elem, 10, '#4daf4a', false));
    });

    nature = L.layerGroup(natureArr);

    overlayMaps['Nature'] = nature;

    cinemas.forEach(function(elem){
      artsArr.push(mapCircle(elem, 10, '#984ea3', false));
    });

    artMuseums.forEach(function(elem) {
      artsArr.push(mapCircle(elem, 10, '#984ea3', false));
    });

    arts = L.layerGroup(artsArr);

    overlayMaps['Arts'] = arts;

    historyMuseums.forEach(function(elem) {
      scienceHistoryArr.push(mapCircle(elem, 10, '#ff7f00', false));
    });

    scienceHistory = L.layerGroup(scienceHistoryArr);

    overlayMaps['Science &amp; History'] = scienceHistory;

    map = new L.Map('map', {
      center: [43.388, -71.248],
      zoom: 8,
      layers: [osm]
    });

    L.control.layers(null, overlayMaps).addTo(map);

  }

  function miles(n) {
    return 1609.344 * n;
  }

  function mapCircle(elem, radius, fillColor, border) {
    if (elem.lat && elem.lng && elem.lat !== '' && elem.lng !== '') {
      var circle = L.circle([elem.lat, elem.lng], miles(radius), {
        fill: !border,
        fillColor: fillColor,
        fillOpacity: 0.4,
        opacity: 0.75,
        stroke: border,
        weight: 1,
      });

      if (!border) {
        circle.bindPopup('<a href="' + (elem.url || '') + '" target="_blank">' + elem.name + '</a><br />' + elem.location);
      }

      return circle;
    }
  }

  initmap();

});
