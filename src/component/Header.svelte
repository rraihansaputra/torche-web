<script>
import { List, Globe, ChevronDown } from "svelte-bootstrap-icons";
import Burger from "./Burger.svelte";
// import {link} from 'svelte-spa-router';
// import active from 'svelte-spa-router/active';
// use:link use:active
let current = 'nav-link-home';



</script>

<!-- ======= Header ======= -->
<header id="header" class="fixed-top d-flex align-items-center">
    <div class="container d-flex justify-content-between">
      <div class="logo">
        <a href="/#/"><img src="assets/img/logo.png" alt="" class="img-fluid" /></a>
      </div>

      <nav id="navbar" class="navbar">
        <ul>
          <li><a  class="{current === 'nav-link-home' ? 'activeted' : '' }" on:click="{() => current = 'nav-link-home'}"  href="#hero">Home</a></li>
          <li><a class="{current === 'nav-link-about' ? 'activeted' : '' }" on:click="{() => current = 'nav-link-about'}" href="#about">About</a></li>
          <li><a  class="{current === 'nav-link-service' ? 'activeted' : '' }" on:click="{() => current = 'nav-link-service'}"  href="#services">Services</a></li>
          <li><a  class="{current === 'nav-link-team' ? 'activeted' : '' }" on:click="{() => current = 'nav-link-team'}"  href="#team">Team</a></li>
          <li><a  class="{current === 'nav-link-client' ? 'activeted' : '' }" on:click="{() => current = 'nav-link-client'}"  href="#clients">Clients</a></li>
          <li class="dropdown">
            <a href="/#" class="{current === 'nav-link-course' ? 'activeted' : '' }" on:click="{() => current = 'nav-link-course'}"
            ><span>Courses</span> <i class="bi bi-chevron-down"><ChevronDown/></i></a>
            <ul>
              <li><a href="/#/ourcourse" >Our Courses</a></li>
              <li><a href="/#/ourtutors">Our Tutors</a></li>
              <li><a href="/#/register" >Register for Classes</a></li>
              <li><a href="/#/price">Pricing</a></li>
            </ul>
          </li>
          <li><a class="{current === 'nav-link-contact' ? 'activeted' : '' }" on:click="{() => current = 'nav-link-contact'}" href="#contact">Contact Us</a></li>
          <li class="dropdown">
            <a class="{current === 'nav-link-language' ? 'activeted' : '' }" on:click="{() => current = 'nav-link-language'}" href="/#"><i class="bi bi-globe"><Globe/></i></a>
            <ul>
              <li><a href="https://torche.app">English</a></li>
              <li><a href="https://torche.app/id/">Indonesia</a></li>
            </ul>
          </li>
        </ul>
        <i class="bi bi-list mobile-nav-toggle" ><Burger/></i>
      </nav>
      <!-- .navbar -->
    </div>
  </header>
  <!-- #header -->

<style>

  .activeted{
    color: #0b6bd3;
    font-weight: bold;
  }
</style>