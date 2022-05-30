 <script>
     export let name;
     export let subName;
 </script>
 
 <!-- ======= Breadcrumbs Section ======= -->
 <section class="breadcrumbs">
    <div class="container">
      <div class="d-flex justify-content-between align-items-center">
        <h2>{name}</h2>
        <ol>
          <li><a href="/#">Courses</a></li>
          <li>{subName}</li>
        </ol>
      </div>
    </div>
  </section>
  <!-- End Breadcrumbs Section -->