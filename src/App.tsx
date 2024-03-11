import DeckGLMap from "./components/DeckGLMap";

function App() {
  return (
    // <Map
    //   reuseMaps
    //   style={{ height: "100vh", width: "100vw" }}
    //   mapboxAccessToken={import.meta.env.VITE_MAPBOX_API_KEY}
    //   {...viewState}
    //   onMove={(evt) => setViewState(evt.viewState)}
    //   mapStyle="mapbox://styles/mapbox/streets-v9">
    //   <Layer {...layer3D} />
    //   {/* <Layer {...layerWater} /> */}
    // </Map>
    <DeckGLMap apiKey={import.meta.env.VITE_MAPBOX_API_KEY} />

    // <NewDeckGLMap apiKey={import.meta.env.VITE_MAPBOX_API_KEY} />
  );
}

export default App;
