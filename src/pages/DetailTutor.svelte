<script>
  import { ArrowLeft, StarFill } from 'svelte-bootstrap-icons';
  
  import {pop} from 'svelte-spa-router';

  import tutors from '../Tutors';

  export let params ={};

  function findTutor(id) {
    return tutors[id]
      
  }
  $: tutor = findTutor(parseInt(params.id))
  
  </script>

<main id="main">
    <!-- ======= Breadcrumbs Section ======= -->
    <section class="breadcrumbs">
      <div class="container">
        <div class="d-flex justify-content-between align-items-center">
          <h2>Tutors</h2>
          <ol>
            <li><a href="/#">Courses</a></li>
            <li><a href="/#/ourtutors">Tutors</a></li>
            <li>{tutor.name}</li>
          </ol>
        </div>
      </div>
    </section>
    <!-- End Breadcrumbs Section -->
    <!--Section Tutors -->
 <div class="container mt-3">
    <span on:click={pop}  class="fs-5 text-dark backs"><i class="bi bi-arrow-left me-2 fs-4"><ArrowLeft/></i>Back</span>
 </div>
    <section id="detail-tutors" class="tutors-details my-5">

         <div class="container-fluid">
             <div class="container">
                 <div class="row">
                      <div class="col-lg-3 offset-lg-1 text-center" >
                          <img src={tutor.img} alt="img-team" class="img-fluid rounded-circle mb-3" style="width: 14.5rem;">
                      </div>
                      <div class="col-lg-7 " >
                          <h1>{tutor.name}</h1>
                          <p>{tutor.desc}</p>
                          <div class="d-lg-flex  rating">
                              <div class="stars me-4">
                                <span class="fw-bold"><i class="bi bi-star-fill"><StarFill/></i>{tutor.rating}</span>
                                <p>({tutor.review}  reviews )</p>
                              </div>
                          </div>
                      </div>
                 </div>
             </div>

             <div class="container-fluid my-4">
                 <div class="col-lg-9 offset-lg-2 border-top border-bottom border-end border-start rounded-3 px-4 py-3">
                   <h4>About The Tutor</h4>
                   <p class="m-0">{@html tutor.about}</p>
                 </div>
             </div>

             <div class="container-fluid">
                 <div class="col-lg-9 offset-lg-2 border-top border-bottom border-end border-start rounded-3 px-4 py-2">
                  <h4>Tutor Schedule</h4>
                  <!--iframe-->
                  {@html tutor.schedule}
                 </div>
             </div>
         </div>
        </section>
    <!--Section Tutors -->
  </main>
  <!-- End #main -->

<style>
  .backs{
    cursor: pointer;
  }
</style>