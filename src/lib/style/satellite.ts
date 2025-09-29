import type { StyleSpecification } from 'maplibre-gl';
import StreetsStyle from './streets';

import SatelliteOverview from '$images/map/satellite.png?enhanced';

export default {
  name: 'Satellite',
  image: SatelliteOverview,
  textColor: 'white',
  order: 1,
  style: (config: MapConfig): StyleSpecification => {
    const streets = StreetsStyle.style(config);

    streets.sources['bg'] = {
      type: 'raster',
      tiles: [
        'https://tiles-cdn.koordinates.com/services;key=95fa766262344182bbf4b67d91b59c3c/tiles/v4/layer=121752/EPSG:3857/{z}/{x}/{y}.png'
      ],
      tileSize: 256
    };

    streets.layers = streets.layers
      .map((lyr) => {
        // remove buildings
        if (lyr.id.includes('uilding')) return null;

        // make roads a little transparent
        if (lyr.id.includes('oad')) {
          // @ts-ignore
          lyr.paint['line-opacity'] = 0.7;

          return lyr;
        }
        return lyr;
      })
      .filter((lyr) => lyr !== null);

    streets.layers.splice(
      streets.layers.findIndex((lyr) => lyr.id == 'landuse') + 1,
      0,
      {
        id: 'bg',
        type: 'raster',
        source: 'bg'
      }
    );
    return streets;
  }
};
