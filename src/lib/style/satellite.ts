import type { StyleSpecification } from 'maplibre-gl';
import StreetsStyle from './streets';

import SatelliteOverview from '$images/map/satellite.png?enhanced';

export default {
  name: 'Satellite',
  image: SatelliteOverview,
  textColor: 'white',
  style: (config: MapConfig): StyleSpecification => {
    const rami = StreetsStyle.style(config);

    rami.sources['satellite'] = {
      type: 'raster',
      tiles: [
        'https://tiles-cdn.koordinates.com/services;key=95fa766262344182bbf4b67d91b59c3c/tiles/v4/layer=121752/EPSG:3857/{z}/{x}/{y}.png'
      ],
      tileSize: 256
    };

    rami.layers = rami.layers
      .map((lyr) => {
        if (lyr.id.includes('uilding')) return null;
        if (lyr.type == 'symbol' || lyr.type == 'fill-extrusion') return lyr;
        else if (lyr.type == 'line') {
          // @ts-ignore
          lyr.paint['line-opacity'] = 0.6;
          
          return lyr;
        } else return null;
      })
      .filter((lyr) => lyr !== null);

    rami.layers.unshift({
      id: 'satellite',
      type: 'raster',
      source: 'satellite'
    });
    return rami;
  }
};
