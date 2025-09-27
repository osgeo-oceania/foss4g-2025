import type { StyleSpecification } from 'maplibre-gl';
import StreetsStyle from './streets';
import Pmtiles1920s from '$data/1920s.pmtiles';

import Nineteen20sOverview from '$images/map/1920s.png?enhanced';

export default {
  name: '1920s',
  image: Nineteen20sOverview,
  textColor: 'black',
  order: 2,
  style: (config: MapConfig): StyleSpecification => {
    const rami = StreetsStyle.style(config);

    rami.sources['bg'] = {
      type: 'raster',
      url: `pmtiles://${Pmtiles1920s}`,
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
