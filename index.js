import 'ol/ol.css';
import {Map, View, Feature} from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import {fromLonLat} from 'ol/proj';
import poly from './funcao';

var baseVector = poly(2409407);

var map = new Map({
  target: 'map',
  layers: [
    new TileLayer({
      source: new OSM()
    }),
    baseVector
  ],
  view: new View({
    center: fromLonLat([-50.735334, -13.027708]),
    zoom: 4
  })
});