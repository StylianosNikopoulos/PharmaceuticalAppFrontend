<template>
    <section>
      <div class="container">
        <RouterLink :to="`${urlTo}`" class="back-link">
          <i class="pi pi-arrow-circle-left"></i> {{ text }}
        </RouterLink>
      </div>
    </section>
  </template>
  
  <script>
  export default {
    props: {
        urlTo: {
            type: String,
            default:"/"
        },
        text:{
            type: String,
            required:true
        }
    },
  };
  </script>
  
  <style scoped>
  .container {
    max-width: 1200px; 
    margin: auto; 
    padding: 24px 24px; 
  }
  
  .back-link {
    color: #007bff; 
    display: flex; 
    align-items: center; 
    text-decoration: none; 
  }
  
  .back-link:hover {
    color: #2f855a; 
  }
  
  .pi {
    margin-right: 12px; 
  }
  </style>
  