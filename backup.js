import 'ol/ol.css';
import {Map, View, Feature} from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import {fromLonLat} from 'ol/proj';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import Polygon from 'ol/geom/Polygon';
import httpGet from './funcao';
import Style from 'ol/style/Style';
import Stroke from 'ol/style/Stroke';
import Fill from 'ol/style/Fill';

var dadosWeb = httpGet('https://servicodados.ibge.gov.br/api/v2/malhas/24?formato=application/vnd.geo+json').features[0].geometry.coordinates;
var vertices = [
  fromLonLat([-38.180366, -6.130701]),
  fromLonLat([-38.254616, -6.135725]),
  fromLonLat([-38.220487, -6.076211])
];
var feature = new Feature({
  geometry: new Polygon([vertices])
});
var vectorSource= new VectorSource({
  features: [feature ]
});

var baseVector = new VectorLayer({
  source: vectorSource,
  style: new Style({
    stroke: new Stroke({
      color: 'rgba(100, 255, 0, 1)',
      width: 2
    }),
    fill: new Fill({
      color: 'rgba(100, 255, 0, 0.3)'
    })
  })
});

var map = new Map({
  target: 'map',
  layers: [
    new TileLayer({
      source: new OSM()
    }),
    baseVector
  ],
  view: new View({
    center: fromLonLat([-38.08983772841201,
      -6.146208668003403]),
    zoom: 11
  })
});