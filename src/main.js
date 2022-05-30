import App from "./App.svelte";
import "aos/dist/aos.css";
import AOS from "aos";

AOS.init();

const app = new App({
  target: document.body,
});

export default app;
