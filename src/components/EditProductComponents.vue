<template>
    <div v-if="product">
      <h2>Edit Product: {{ productName }}</h2>
      <form @submit.prevent="submitEdit">
        <label for="name">Name</label>
        <input v-model="product.name" type="text" id="name" required>
  
        <label for="category">Category</label>
        <select v-model="product.category" id="category">
          <option value="tablet">Tablet</option>
          <option value="capsule">Capsule</option>
          <option value="injection">Injection</option>
        </select>
  
        <label for="active_ingredients">Active Ingredients</label>
        <input v-model="product.active_ingredients" type="text" id="active_ingredients" required>
  
        <label for="batch_number">Batch Number</label>
        <input v-model="product.batch_number" type="text" id="batch_number" required>
  
        <label for="status">Status</label>
        <select v-model="product.status" id="status">
          <option value="under development">Under Development</option>
          <option value="in clinical trials">In Clinical Trials</option>
          <option value="completed">Completed</option>
        </select>
  
        <label for="manufacturing_date">Manufacturing Date</label>
        <input v-model="product.manufacturing_date" type="date" id="manufacturing_date" required>
  
        <label for="expiration_date">Expiration Date</label>
        <input v-model="product.expiration_date" type="date" id="expiration_date" required>
  
        <button type="submit">Save Changes</button>
      </form>
    </div>
  
    <div v-else-if="loading">
      <p>Loading product details...</p>
    </div>
  
    <div v-else>
      <p>No product found.</p>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import toastr from 'toastr';
  import 'toastr/build/toastr.min.css';
  
  export default {
    props: {
      productId: {
        type: String,
        required: true,
      },
    },
    data() {
      return {
        product: null,
        loading: true,
        productName:""
      };
    },
    mounted() {
      this.fetchProduct();  // Fetch the current product details when the component is mounted
    },
    methods: {
      async fetchProduct() {
        try {
          const response = await axios.get(`http://localhost/api/products/${this.productId}`);
          this.product = response.data.product;
          this.productName = this.product.name;
        } catch (error) {
          toastr.error('Error fetching product. Please try again.');
          console.error('Error fetching product:', error);
        } finally {
          this.loading = false;
        }
      },
      async submitEdit() {
        try {
          await axios.put(`http://localhost/api/products/${this.productId}`, this.product);
          toastr.success('Product updated successfully!');
          this.$router.push('/');  // Navigate back to the product list after successful update
        } catch (error) {
          toastr.error('Failed to update product. Please try again.');
          console.error('Error updating product:', error);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  form {
    display: flex;
    flex-direction: column;
    max-width: 400px;
    margin: 0 auto;
  }
  
  label {
    margin-top: 10px;
  }
  
  input, select {
    padding: 8px;
    margin-top: 5px;
  }
  
  button {
    margin-top: 20px;
    padding: 10px;
    background-color: #007bff;
    color: white;
    border: none;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #0056b3;
  }
  </style>