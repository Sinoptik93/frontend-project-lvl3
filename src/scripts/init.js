import application from "./application.js";
import initLocale from "../locales/index.js";

export default () => {
  initLocale();
  application();
}
