<template>
  <div class="products-container" v-if="product">
    <h2 class="product-title">
    Selected Product: <span class="underline"> {{ product.name }} </span>
    </h2>

    <table class="product-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Category</th>
          <th>Active Ingredients</th>
          <th>Batch Number</th>
          <th>Status</th>
          <th>Manufacturing Date</th>
          <th>Expiration Date</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{{ product.name }}</td>
          <td>{{ product.category }}</td>
          <td>{{ product.active_ingredients }}</td>
          <td>{{ product.batch_number }}</td>
          <td>
            <span :class="getStatusClass(product.status)">{{ product.status }}</span>
          </td>
          <td>{{ product.manufacturing_date }}</td>
          <td>{{ product.expiration_date }}</td>
          <td>
            <button class="edit-btn" @click="editProduct(product)">Edit</button>
            <button class="delete-btn" @click="deleteProduct(product.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <div v-else-if="loading">
    <p>Loading product...</p>
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
  data() {
    return {
      product: null,
      loading: true,
    };
  },

  props: {
    productId: {
      type: String,
      required: true,
    },
  },

  mounted() {
    this.fetchProduct(); 
  },

  methods: {
    navigateToAddProduct() {
      this.$emit('navigate', { type: 'add' });
    },
    editProduct(product) {
      this.$emit('navigate', { type: 'edit', product });
    },
    async deleteProduct(productId) {
      const userConfirmed = confirm('Are you sure you want to delete this product?');
      if (userConfirmed) {
        try {
          await axios.delete(`http://localhost/api/products/${productId}`);
          toastr.success('Product deleted successfully!');
          this.fetchProducts(); 
        } catch (error) {
          console.error("Error deleting product:", error);
        }
      } else {
        toastr.info('Product deletion canceled.');
      }
    },

    async fetchProduct() {
      try {
        const response = await axios.get(`http://localhost/api/products/${this.productId}`);
        this.product = response.data.product; 
      } catch (error) {
        console.error('Error fetching product:', error);
        toastr.error('Failed to fetch product. Please try again.');
      } finally {
        this.loading = false;
      }
    },
    getStatusClass(status) {
      return {
        'status-underdevelopment': status === 'under development',
        'status-inclinicaltrials': status === 'in clinical trials',
        'status-completed': status === 'completed',
      };
    },
  },
};
</script>

<style scoped>
.products-container {
  margin: 50px auto; 
  max-width: 900px; 
  text-align: center; 
}

.product-title {
  color: #333;
  font-size: 28px; 
  margin-bottom: 20px;
}

.underline {
  text-decoration: underline;
  font-weight: bold; 
  color: #007bff; 
}

.product-table {
  width: 100%;
  height: auto; 
  min-height: 250px; 
  border-collapse: collapse;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #fff; 
}

th, td {
  padding: 16px; 
  text-align: left;
}

th {
  background-color: #007bff; 
  color: white;
  font-weight: bold;
}

td {
  background-color: #f9f9f9; 
  border-bottom: 1px solid #dee2e6; 
}

tr:hover td {
  background-color: #e9ecef; 
}

.edit-btn, .delete-btn {
  border: none;
  padding: 10px 15px; 
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
  min-width: 90px; 
}

.edit-btn {
  background-color: #007bff; 
  color: white;
  margin-right: 5px;
}

.edit-btn:hover {
  background-color: #0056b3; 
}

.delete-btn {
  background-color: #dc3545; 
  color: white;
}

.delete-btn:hover {
  background-color: #c82333; 
}

/* Status Styles */
.status-underdevelopment {
  color: rgb(255, 0, 0); 
  font-weight: bold;
}

.status-inclinicaltrials {
  color: orange; 
  font-weight: bold;
}

.status-completed {
  color: green; 
  font-weight: bold;
}

</style>
