<script>
import Router from 'svelte-spa-router';
import BackTop from './component/BackTop.svelte';
import Footer from "./component/Footer.svelte";
import Header from "./component/Header.svelte";
import AllTeam from './pages/AllTeam.svelte';
import DetailCourseTutor1 from './pages/DetailCourseTutor1.svelte';
import DetailCourseTutor2 from './pages/DetailCourseTutor2.svelte';
import DetailCourseTutor3 from './pages/DetailCourseTutor3.svelte';
import DetailTutor from './pages/DetailTutor.svelte';
import Home from "./pages/Home.svelte";
import OurCourse from './pages/OurCourse.svelte';
import OurTutor from './pages/OurTutor.svelte';
import Price from './pages/Price.svelte';
import Register from './pages/Register.svelte';


// restoreScrollState={true}

const routes = 
{
	'/':Home,
	'/price': Price,
	'/register':Register,
	'/allteams': AllTeam,
	'/ourtutors':OurTutor,
	'/ourcourse':OurCourse,
	'/detailtutor/:id':DetailTutor,
	'/detailcoursetutor1/:id': DetailCourseTutor1,
	'/detailcoursetutor2/:id': DetailCourseTutor2,
	'/detailcoursetutor3/:id': DetailCourseTutor3,

}

</script>


<Header/>
<main >
	<Router {routes}/>
</main>
<BackTop/>
<Footer/>