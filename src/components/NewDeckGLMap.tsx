import Map, { NavigationControl } from "react-map-gl";
import DeckGL, { GeoJsonLayer, ArcLayer } from "deck.gl";
import { ScatterplotLayer } from "@deck.gl/layers";

// source: Natural Earth http://www.naturalearthdata.com/ via geojson.xyz
const AIR_PORTS =
  "https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_10m_airports.geojson";

const INITIAL_VIEW_STATE = {
  latitude: 51.47,
  longitude: 0.45,
  zoom: 4,
  bearing: 0,
  pitch: 30,
};

const MAP_STYLE =
  "https://basemaps.cartocdn.com/gl/positron-nolabels-gl-style/style.json";
const NAV_CONTROL_STYLE = {
  position: "absolute",
  top: 10,
  left: 10,
};

export default function NewDeckGLMap({ apiKey }) {
  const layers = [
    new ScatterplotLayer({
      id: "bart-stations",
      data: [
        {
          name: "Colma",
          passengers: 4214,
          coordinates: [-122.466233, 37.684638],
        },
        {
          name: "Civic Center",
          passengers: 24798,
          coordinates: [-122.413756, 37.779528],
        },
      ],
      stroked: false,
      filled: true,
      getPosition: (d) => d.coordinates,
      getRadius: (d) => Math.sqrt(d.passengers),
      getFillColor: [255, 200, 0],
    }),
  ];

  return (
    <DeckGL
      initialViewState={INITIAL_VIEW_STATE}
      controller={true}
      layers={layers}>
      <Map
        mapboxAccessToken={apiKey}
        style={{ height: "100vh", width: "100vw" }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        // mapStyle={MAP_STYLE}
        initialViewState={{
          longitude: 72.98464863612915,
          latitude: 19.248696288698028,
          zoom: 17,
          pitch: 60,
        }}
        onClick={(e) => console.log("clicked:", e)}></Map>
    </DeckGL>
  );
}

// export default function Root
