import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { MapProvider } from "react-map-gl";

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <MapProvider>
    <App />
  </MapProvider>
  // </React.StrictMode>
);
