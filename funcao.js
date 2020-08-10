import 'ol/ol.css';
import {Feature} from 'ol';
import {fromLonLat} from 'ol/proj';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import Polygon from 'ol/geom/Polygon';
import MultiPolygon from 'ol/geom/MultiPolygon';
import Style from 'ol/style/Style';
import Stroke from 'ol/style/Stroke';
import Fill from 'ol/style/Fill';

export default function poly(id) {
  var resp = new XMLHttpRequest();
  resp.open( 'GET', 'https://servicodados.ibge.gov.br/api/v2/malhas/' + id.toString() + '?formato=application/vnd.geo+json', false);
  resp.send(null);
  var baseVector;
  var vertices = [];
  var dados = JSON.parse(resp.response).features[0].geometry;
  if (dados.type === 'Polygon') {
    dados = dados.coordinates[0];
    // console.log(dados);    
    for (var pos in dados) {
      vertices.push(fromLonLat(dados[pos]));
    }
    baseVector = new VectorLayer({
      source: new VectorSource({
        features: [new Feature({
          geometry: new Polygon([vertices])
        }) ]
      }),
      style: new Style({
        stroke: new Stroke({
          color: 'rgba(10, 38, 219, 1)',
          width: 2
        }),
        fill: new Fill({
          color: 'rgba(10, 38, 219, 0.2)'
        })
      })
    });
  } else {
    dados = dados.coordinates;
    // console.log(dados);  
    for (var qt in dados) {
      var par = []
      for (var pos in dados[qt][0]) {
        // console.log(pos);
        par.push(fromLonLat(dados[qt][0][pos]));
      }
      vertices.push(par);
    }
    // console.log(vertices);
    baseVector = new VectorLayer({
      source: new VectorSource({
        features: [new Feature({
          geometry: new MultiPolygon([vertices])
        }) ]
      }),
      style: new Style({
        stroke: new Stroke({
          color: 'rgba(10, 38, 219, 1)',
          width: 2
        }),
        fill: new Fill({
          color: 'rgba(10, 38, 219, 0.2)'
        })
      })
    });
  }
  return baseVector;
};