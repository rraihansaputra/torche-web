<script>
    import { slide } from "svelte/transition";
    import { List , XLg, Globe, ChevronDown} from 'svelte-bootstrap-icons'
    let visible = false;
    let current = 'nav-link-home';


    //dropdown
    import Dropdown from 'sv-bootstrap-dropdown';
    let dropdownTrigger;
    let dropdownLanguage;
  
</script>
   
   <div class="navbar">
     <div class="hamburger" on:click={()=>visible=!visible}>
     {#if visible}
      <XLg/>
     {:else}
     <List width={28} height={28}/>
     {/if}
       
     </div>
     <div class="navbar-links" >
     {#if visible}
     <div class="links">
      <li><a class="{current === 'nav-link-home' ? 'activeted' : '' }" on:click="{() => current = 'nav-link-home'}" href="#hero">Home</a></li>
      <li><a class="{current === 'nav-link-about' ? 'activeted' : '' }" on:click="{() => current = 'nav-link-about'}" href="#about">About</a></li>
      <li><a class="{current === 'nav-link-service' ? 'activeted' : '' }" on:click="{() => current = 'nav-link-service'}" href="#services">Services</a></li>
      <li><a class="{current === 'nav-link-team' ? 'activeted' : '' }" on:click="{() => current = 'nav-link-team'}" href="#team">Team</a></li>
      <li><a class="{current === 'nav-link-client' ? 'activeted' : '' }" on:click="{() => current = 'nav-link-client'}" href="#clients">Clients</a></li>
    
      <Dropdown triggerElement={dropdownTrigger} >
        <button
            type="button"
            class="btn dropdown-toggle dropdown-course"
            bind:this={dropdownTrigger}
            
            >
           Courses
        </button>
        <div slot="DropdownMenu" class="drops" >
            <button class="dropdown-item" type="button"><a href="/#/ourcourse">Our Courses</a></button>
            <button class="dropdown-item" type="button"><a href="/#/ourtutors">Our Tutors</a></button>
            <button class="dropdown-item" type="button"><a href="/#/register">Register for Classes</a></button>
            <button class="dropdown-item" type="button"><a href="/#/price">Pricing</a></button>
        </div>
      </Dropdown>

      <li><a class="{current === 'nav-link-contact' ? 'activeted' : '' }" on:click="{() => current = 'nav-link-contact'}" href="#contact">Contact Us</a></li>
      <Dropdown triggerElement={dropdownLanguage} >
        <button
            type="button"
            class="btn dropdown-toggle"
            bind:this={dropdownLanguage}
            >
            <Globe/>
        </button>
        <div slot="DropdownMenu" class="drops">
              <button class="dropdown-item" type="button"><a href="https://torche.app">English</a></button>
              <button class="dropdown-item" type="button"><a href="https://torche.app/id/">Indonesia</a></button>
        </div>
        </Dropdown>
     </div>
     {/if}
     </div>
   </div>
   <style>
     .hamburger{
       color:white;
     }
     .navbar {
       display: flex;
       align-items: center;
       justify-content: space-between;
       padding: 1%;
      font-style: normal;
     }
     .navbar-links {
       position: fixed;
       top: 12%;
       right: 4%;
       width: 90%;
       padding: 1%;
       color: white;
    
     }
     .links{
       height: 75vh;
       background-color: #0b122a;
     }
     li {
       list-style-type: none;
       transition: 0.3s;
       padding-top: 25px;
       
     }
     li:hover {
       display: block;
       padding-top: 3%;
       padding-bottom: 3%;
       transform: scaleY(1);
     }
     .dropdown-toggle {
      background-color: #0b122a;
      color :white;
      margin-left: 20px;
     }
     .dropdown-course{
      background-color: #0b122a;
      color :white;
      margin-left: 18px;
      margin-top: 23px;
      font-size: 0.5em;
      font-weight: lighter;
     } 
     .drops button{
      background-color: #0b122a;
      color :white;
      
     }

     .drops button:hover{
      background-color: #0b122a;
    
     }
  
   </style>