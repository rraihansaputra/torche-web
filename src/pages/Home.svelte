<script>

import Hero from "../component/Hero.svelte";
import About from "./About.svelte";
import Client from "./Client.svelte";
import Contact from "./Contact.svelte";
import Service from "./Service.svelte";
import Team from "./Team.svelte";



</script>
<main >
  <Hero/>
  <About/>
  <Service/>
  <Team restoreScrollState={true}/>
  <Client/>
  <Contact/>
</main>

