import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { Protocol } from "pmtiles";
import { ComponentProps, ReactNode, useEffect, useRef } from "react";
import Map, {
  AttributionControl,
  NavigationControl,
  MapRef,
  Source,
  Layer,
  GeolocateControl,
} from "react-map-gl/maplibre";

const eventGeoJSON = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: {
        description: "Conference Venue",
        name: "C3 Convention Centre",
        link: "https://maps.app.goo.gl/6bB4R83NHtof8ssM9",
        minZoom: 1,
      },
      geometry: {
        coordinates: [147.30767, -42.89312],
        type: "Point",
      },
      id: 0,
    },
    {
      type: "Feature",
      properties: {
        description: "Conference Dinner",
        name: "Frogmore Creek Wine Bar",
        link: "https://maps.app.goo.gl/hnhztSTp7nrhqT8e6",
        minZoom: 11,
      },
      geometry: {
        coordinates: [147.3358, -42.88206],
        type: "Point",
      },
      id: 1,
    },
    {
      type: "Feature",
      properties: {
        link: "https://maps.app.goo.gl/NRZsP7jjzYcashz99",
        name: "Deep South Brewing Co.",
        description: "Icebreaker",
        minZoom: 11,
      },
      geometry: {
        coordinates: [147.3211, -42.87504],
        type: "Point",
      },
      id: 2,
    },
  ],
};

type MapProps = {
  width: number | string;
  height: number | string;
  children?: ReactNode;
} & ComponentProps<typeof Map>;

export const MapComponent = (props: MapProps) => {
  const mapRef = useRef<MapRef>(null);
  const { width, height, children, ...mapProps } = props;

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
        longitude: 147.3365,
        latitude: -42.8832,
        zoom: 11,
      }}
      cooperativeGestures={true}
      onLoad={async (e) => {
        const map = e.target;
        map.touchZoomRotate.disableRotation();

        const image = await map.loadImage("/imgs/marker.png");
        map.addImage("marker", image.data, { pixelRatio: 3.5 });
      }}
      mapStyle="https://api.protomaps.com/styles/v2/light.json?key=51cf1275231eb004"
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
      interactiveLayerIds={["events-name", "events-description"]}
      {...mapProps}
    >
      <GeolocateControl />
      <AttributionControl compact={false} />
      <NavigationControl showCompass={false} />
      <Source id="events" type="geojson" data={eventGeoJSON}>
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
            "icon-allow-overlap": true,
          }}
          paint={{
            "text-color": "#333",
            "text-halo-color": "#fff",
            "text-halo-width": 2,
          }}
          filter={[">", ["zoom"], ["get", "minZoom"]]}
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
          }}
          paint={{
            "text-color": "#555",
            "text-halo-color": "#fff",
            "text-halo-width": 2,
          }}
          filter={[">", ["zoom"], ["get", "minZoom"]]}
        />
      </Source>
      {props.children}
    </Map>
  );
};
