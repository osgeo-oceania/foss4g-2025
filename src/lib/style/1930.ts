import type { StyleSpecification } from 'maplibre-gl';
import RamiStyle from './0rami';
import Pmtiles1930 from '$data/1930.pmtiles';

import SatelliteOverview from '$images/map-overview.png?enhanced';

export default {
  name: '1930',
  image: SatelliteOverview,
  style: (config: MapConfig): StyleSpecification => {
    const rami = RamiStyle.style(config);

    rami.sources['bg'] = {
      type: 'raster',
      url: `pmtiles://${Pmtiles1930}`,
      tileSize: 512
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
      id: 'bg',
      type: 'raster',
      source: 'bg'
    });
    return rami;
  }
};
