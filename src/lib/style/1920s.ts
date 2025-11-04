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
    const streets = StreetsStyle.style(config);

    streets.sources['bg'] = {
      type: 'raster',
      url: `pmtiles://${Pmtiles1920s}`,
      tileSize: 512
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
