<template>
    
    <RouterLink :to="`/products/${itemId}`"
    >
    <div class="item-container">
      {{ itemName }} 
    </div>
    </RouterLink>
    
 
</template>

<script>
export default {
  props: {
    itemName: {
      type: String,
      required: true,
    },
    itemId: {
      type: Number,
      required: true,
    },
  },
};
</script>

<style scoped>
.item-container {
  padding: 10px;
  background-color: #f4f4f4;
  border-radius: 5px;
  border: 1px solid #ddd;
  margin-bottom: 0.5rem;
  cursor: pointer;
  color:#0000C9;
  text-decoration: none;
  transition: 0.3s ease;
}

.item-container:hover{
  
  color:#010118;
  border: 1px solid #010118;
}
</style>