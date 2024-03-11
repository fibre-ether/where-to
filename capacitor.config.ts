import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "dev.fibre_ether.where_to",
  appName: "Where To?",
  webDir: "dist",
  server: {
    androidScheme: "https",
  },
};

export default config;
