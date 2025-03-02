import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { Protocol } from "pmtiles";
import { ComponentProps, ReactNode, useEffect, useRef, useState } from "react";
import Map, {
  AttributionControl,
  NavigationControl,
  MapRef,
  Source,
  Layer,
  GeolocateControl,
  FullscreenControl,
} from "react-map-gl/maplibre";

const markersGeoJson = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: {
        description: "Conference Venue",
        name: "Auckland University of Technology",
        link: "https://maps.app.goo.gl/9hSV9H8Ts9PeESF69",
        minZoom: 0,
        maxZoom: 24,
        id: "0",
      },
      geometry: {
        coordinates: [174.76578, -36.85381],
        type: "Point",
      },
    },
    // {
    //   type: "Feature",
    //   properties: {
    //     description: "Conference Dinner",
    //     name: "Frogmore Creek Wine Bar",
    //     link: "https://maps.app.goo.gl/hnhztSTp7nrhqT8e6",
    //     minZoom: 11.1,
    //     maxZoom: 24,
    //     id: "1",
    //   },
    //   geometry: {
    //     coordinates: [147.3358, -42.88206],
    //     type: "Point",
    //   },
    // },
    // {
    //   type: "Feature",
    //   properties: {
    //     link: "https://maps.app.goo.gl/NRZsP7jjzYcashz99",
    //     name: "Deep South Brewing Co.",
    //     description: "Icebreaker",
    //     minZoom: 11.1,
    //     maxZoom: 24,
    //     id: "2",
    //   },
    //   geometry: {
    //     coordinates: [147.3211, -42.87504],
    //     type: "Point",
    //   },
    // },
    // {
    //   type: "Feature",
    //   properties: {
    //     link: "https://maps.app.goo.gl/whjGxnh8oxksVVq18",
    //     name: "Hamlet Cafe",
    //     description: "Women in Geo Breakfast",
    //     minZoom: 11.1,
    //     maxZoom: 24,
    //     id: "6",
    //   },
    //   geometry: {
    //     coordinates: [147.32131, -42.88831],
    //     type: "Point",
    //   },
    // },
    // {
    //   type: "Feature",
    //   properties: {
    //     link: "https://maps.app.goo.gl/imqmKmN97BQx191M8",
    //     name: "Bear with Me Cafe",
    //     description: "Travel Grant Breakfast",
    //     minZoom: 11.1,
    //     maxZoom: 24,
    //     id: "7",
    //   },
    //   geometry: {
    //     coordinates: [147.31425, -42.89288],
    //     type: "Point",
    //   },
    // },

    // {
    //   type: "Feature",
    //   properties: {
    //     link: "https://maps.utas.edu.au/?zLevel=1&center=147.32609084788146,-42.90434824160919&zoom=17.68769237106732&sharepoi=1001841&sharepoitype=poi",
    //     name: "University of Tasmania",
    //     description: "Workshops Venue",
    //     minZoom: 11,
    //     maxZoom: 16,
    //     id: "3",
    //   },
    //   geometry: {
    //     coordinates: [147.32586, -42.90399],
    //     type: "Point",
    //   },
    // },

    // {
    //   type: "Feature",
    //   properties: {
    //     link: "https://maps.utas.edu.au/?zLevel=1&center=147.32585363952626,-42.90403271359523&zoom=20.72553237782959&sharepoi=1001841&sharepoitype=poi",
    //     name: "UTAS: Studio Theatre",
    //     description: "Workshops: Reception",
    //     minZoom: 16,
    //     maxZoom: 24,
    //     id: "4",
    //   },
    //   geometry: {
    //     coordinates: [147.32586, -42.90399],
    //     type: "Point",
    //   },
    // },
    // {
    //   type: "Feature",
    //   properties: {
    //     link: "https://maps.utas.edu.au/?zLevel=1&center=147.3263352998809,-42.9042736496823&zoom=18.354417938065513&sharepoi=1000552568&sharepoitype=poi",
    //     name: "UTAS: Social Sciences",
    //     description: "Workshops: Classrooms",
    //     minZoom: 16,
    //     maxZoom: 24,
    //     id: "5",
    //   },
    //   geometry: {
    //     coordinates: [147.32674, -42.90411],
    //     type: "Point",
    //   },
    // },
    // {
    //   type: "Feature",
    //   properties: {
    //     link: "https://maps.app.goo.gl/tSkMntQrcBxrg8mL9",
    //     name: "MONA",
    //     description: "Community Day: Tour",
    //     minZoom: 9,
    //     maxZoom: 24,
    //     id: "8",
    //   },
    //   geometry: {
    //     coordinates: [147.2612, -42.81267],
    //     type: "Point",
    //   },
    // },
    // {
    //   type: "Feature",
    //   properties: {
    //     link: "https://maps.app.goo.gl/W3XCa7BvfHVuLefM9",
    //     name: "kunanyi-Mt Wellington",
    //     description: "Community Day: Tour",
    //     minZoom: 9,
    //     maxZoom: 24,
    //     id: "9",
    //   },
    //   geometry: {
    //     coordinates: [147.23744, -42.89612],
    //     type: "Point",
    //   },
    // },
  ],
};

export type MapProps = {
  width: number | string;
  height: number | string;
  children?: ReactNode;
} & ComponentProps<typeof Map>;

export const MapComponent = (props: MapProps) => {
  const mapRef = useRef<MapRef>(null);
  const { width, height, children, ...mapProps } = props;

  const [visibleIds, setVisibleIds] = useState<string[]>([]);

  useEffect(() => {
    const protocol = new Protocol();
    maplibregl.addProtocol("pmtiles", protocol.tile);
    return () => {
      maplibregl.removeProtocol("pmtiles");
    };
  }, []);

  return (
    <Map
      ref={mapRef}
      style={{ width: props.width, height: props.height }}
      initialViewState={{
        longitude: 174.7628,
        latitude: -36.8504,
        zoom: 11,
      }}
      cooperativeGestures={true}
      onLoad={async (e) => {
        const map = e.target;
        map.touchZoomRotate.disableRotation();

        const image = await map.loadImage("imgs/marker.png");
        map.addImage("marker", image.data, { pixelRatio: 3.5 });
      }}
      mapStyle="https://api.protomaps.com/styles/v5/light/en.json?key=51cf1275231eb004"
      maplibreLogo
      dragRotate={false}
      touchPitch={false}
      pitchWithRotate={false}
      maxPitch={0}
      minPitch={0}
      keyboard={false}
      attributionControl={false}
      onClick={(e) => {
        // Open link on event marker click
        const feature = e.features?.[0];
        if (feature?.source === "events") {
          window.open(feature.properties.link, "_blank");
        }
      }}
      onMouseEnter={(e) => {
        // Add hover pointer on event markers
        const feature = e.features?.[0];
        if (feature?.source === "events") {
          e.target.getCanvas().style.cursor = "pointer";
        } else {
          e.target.getCanvas().style.cursor = "";
        }
      }}
      onMouseLeave={(e) => {
        // Remove hover pointer
        e.target.getCanvas().style.cursor = "";
      }}
      onRender={(e) => {
        // Find visible event markers and update their visibility
        const map = e.target;

        if (map.getLayer("events-name") === undefined) return;

        // Get visible event marker ids
        // This is used to filter the description labels
        const ids = map
          .queryRenderedFeatures({ layers: ["events-name"] })
          .map((f) => f.properties?.id?.toString() ?? "");

        // Only update if the ids have changed
        if (JSON.stringify(ids) !== JSON.stringify(visibleIds)) {
          setVisibleIds(ids);
        }
      }}
      interactiveLayerIds={["events-name", "events-description"]}
      {...mapProps}
    >
      <FullscreenControl />
      <GeolocateControl />
      <AttributionControl compact={false} />
      <NavigationControl showCompass={false} />

      <Source id="events-small-marker" type="geojson" data={markersGeoJson}>
        <Layer
          id="events-circle"
          type="circle"
          paint={{
            "circle-color": "#444",
            "circle-radius": 3,
            "circle-translate": [0, -7],
          }}
        />
        <Layer
          id="events-description"
          type="symbol"
          layout={{
            "text-field": ["get", "description"],
            "text-font": ["Noto Sans Italic"],
            "text-size": 13,
            "text-anchor": "top",
            "text-offset": [0, 1.3],
            "text-max-width": 16,
            "text-padding": 0,
            "text-ignore-placement": true,
            "icon-ignore-placement": true,
          }}
          paint={{
            "text-color": "#555",
            "text-halo-color": "#fff",
            "text-halo-width": 2,
          }}
          filter={["in", "id", ...visibleIds]}
        />
      </Source>

      <Source id="events" type="geojson" data={markersGeoJson}>
        <Layer
          id="events-name"
          type="symbol"
          layout={{
            "icon-image": "marker",
            "icon-anchor": "bottom",
            "text-field": ["get", "name"],
            "text-font": ["Noto Sans Medium"],
            "text-size": 14,
            "text-anchor": "top",
            "text-offset": [0, 0],
            "text-max-width": 16,
            "text-padding": 0,
            "icon-padding": 0,
            "symbol-sort-key": ["get", "minZoom"],
          }}
          paint={{
            "text-color": "#333",
            "text-halo-color": "#fff",
            "text-halo-width": 2,
          }}
          filter={[
            "all",
            [">=", ["zoom"], ["get", "minZoom"]],
            ["<", ["zoom"], ["get", "maxZoom"]],
          ]}
        />
        <Layer
          id="events-description"
          type="symbol"
          layout={{
            "text-field": ["get", "description"],
            "text-font": ["Noto Sans Italic"],
            "text-size": 13,
            "text-anchor": "top",
            "text-offset": [0, 1.3],
            "text-max-width": 16,
            "text-padding": 0,
            "text-ignore-placement": true,
            "icon-ignore-placement": true,
          }}
          paint={{
            "text-color": "#555",
            "text-halo-color": "#fff",
            "text-halo-width": 2,
          }}
          filter={["in", "id", ...visibleIds]}
        />
      </Source>
      {props.children}
    </Map>
  );
};
