import { defineConfig } from "@umijs/max";
import routes from "./routes";
import theme from "./theme";
import proxy from "./proxy";
import defaultSettings from './defaultSettings'
console.log(process.env.NODE_ENV);

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},

  layout: {
  
    ...defaultSettings
  },
  routes,
  theme,
  proxy:proxy.dev,
  npmClient: "pnpm",
  tailwindcss: {},
});
