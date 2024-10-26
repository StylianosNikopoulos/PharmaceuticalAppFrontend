<template>
    <div>
      <!-- Unordered list generated from all items -->
      <ul>
        <li v-for="(item, index) in allItems" :key="`list-item-${index}`">{{ item }},</li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    props: {
        ingredients: {
        type: String,
        required: true,
        },
    },
    computed: {
        allItems() {
        // Split the string by newlines and then by commas, trim whitespace
        return this.ingredients
            .split('\n')                   // Split by newlines to get rows
            .flatMap(row => row.split(',')) // Split each row by commas
            .map(item => item.trim());      // Trim any extra whitespace
        },
    },
    };

  </script>
  
  <style scoped>
  ul {
    list-style-type: disc;
    padding-left: 10px;
    /* list-style-type: none; */
  }
  li {
    margin-top: 5px; 
    margin-bottom: 5px; 
  }
  </style>
  