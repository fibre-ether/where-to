import { MapboxLayer } from "@deck.gl/mapbox";
import { ScatterplotLayer } from "@deck.gl/layers";
import { TripsLayer } from "@deck.gl/geo-layers";
import { MapboxOverlay, MapboxOverlayProps } from "@deck.gl/mapbox/typed";
import {
  FillExtrusionLayer,
  Layer,
  Map,
  useControl,
  useMap,
} from "react-map-gl";

function DeckGLMap({ apiKey }: { apiKey: string }) {
  const INITIAL_VIEW_STATE = {
    longitude: -74.00578,
    latitude: 40.713067,
    // longitude: -74.5,
    // latitude: 40,
    zoom: 17,
    pitch: 60,
    bearing: 0,
  };
  const extrusionLayer: FillExtrusionLayer = {
    id: "3d-buildings",
    source: "composite",
    "source-layer": "building",
    filter: ["==", "extrude", "true"],
    type: "fill-extrusion",
    minzoom: 15,
    paint: {
      "fill-extrusion-color": "#aaa",
      "fill-extrusion-height": 5,
      "fill-extrusion-opacity": 0.6,
    },
  };
  const { myMap: map } = useMap();
  function handleClick(e) {
    console.log(
      map?.queryRenderedFeatures(e.point).map((item) => item.layer.id)
    );
  }
  const pathData = [
    {
      waypoints: [
        { coordinates: [-74.00578, 40.713067], timestamp: 0 },
        { coordinates: [-74.004577, 40.712425], timestamp: 10 },
        { coordinates: [-74.003626, 40.71365], timestamp: 20 },
        { coordinates: [-74.002666, 40.714243], timestamp: 30 },
        { coordinates: [-74.002136, 40.715177], timestamp: 40 },
        { coordinates: [-73.998493, 40.713452], timestamp: 50 },
        { coordinates: [-73.997981, 40.713673], timestamp: 60 },
        { coordinates: [-73.997586, 40.713448], timestamp: 70 },
        { coordinates: [-73.99256, 40.713863], timestamp: 80 },
      ],
    },
  ];
  const tripsLayer = new TripsLayer({
    id: "trips-layer",
    data: pathData,
    getPath: (d) => d.waypoints.map((p) => p.coordinates),
    // deduct start timestamp from each data point to avoid overflow
    getTimestamps: (d) => d.waypoints.map((p) => p.timestamp - 0),
    getColor: [0, 0, 0],
    opacity: 0.8,
    widthMinPixels: 5,
    rounded: true,
    fadeTrail: true,
    trailLength: 200,
    currentTime: 100,
  });

  return (
    <Map
      id="myMap"
      mapboxAccessToken={apiKey}
      style={{ height: "100vh", width: "100vw" }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      initialViewState={INITIAL_VIEW_STATE}
      onClick={handleClick}>
      <Layer {...extrusionLayer} />
      <DeckGLOverlay layers={[tripsLayer]} />
    </Map>
  );
}

function DeckGLOverlay(
  props: MapboxOverlayProps & {
    interleaved?: boolean;
  }
) {
  const overlay = useControl<MapboxOverlay>(() => new MapboxOverlay(props));
  overlay.setProps(props);
  return null;
}

export default DeckGLMap;
