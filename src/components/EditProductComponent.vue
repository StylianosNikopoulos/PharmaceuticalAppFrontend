<template>
  <back-button :urlTo="`/products/${productId}`" :text="`Back to product details`"/>
  <div class="container">
    <div v-if="product" class="card">
      <h2>Edit Product: <span class="underline"> {{ productName }} </span></h2>

      <!-- Display Validation Errors -->
      <div v-if="errors.length" class="error-messages">
        <ul>
          <li v-for="error in errors" :key="error">{{ error }}</li>
        </ul>
      </div>

      <!-- Display General Errors -->
      <div v-if="generalError" class="general-error">
        <p>{{ generalError }}</p>
      </div>

      <form @submit.prevent="submitEdit">
        <div class="form-group">
          <label for="name">Name</label>
          <input v-model="product.name" type="text" id="name" required placeholder="Enter product name" />
        </div>

        <div class="form-group">
          <label for="category">Category</label>
          <select v-model="product.category" id="category" required>
            <option value="tablet">Tablet</option>
            <option value="capsule">Capsule</option>
            <option value="injection">Injection</option>
          </select>
        </div>

        <div class="form-group">
          <label for="active_ingredients">Active Ingredients</label>
          <textarea v-model="product.active_ingredients" id="active_ingredients" rows="5" required placeholder="List active ingredients"></textarea>
        </div>

        <div class="form-group">
          <label for="batch_number">Batch Number</label>
          <input v-model="product.batch_number" type="text" id="batch_number" required placeholder="Enter batch number" />
        </div>

        <div class="form-group">
          <label for="status">Status</label>
          <select v-model="product.status" id="status" required>
            <option value="under development">Under Development</option>
            <option value="in clinical trials">In Clinical Trials</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <div class="form-group">
          <label for="manufacturing_date">Manufacturing Date</label>
          <input v-model="product.manufacturing_date" type="date" id="manufacturing_date" required />
        </div>

        <div class="form-group">
          <label for="expiration_date">Expiration Date</label>
          <input v-model="product.expiration_date" type="date" id="expiration_date" required />
        </div>

        <button type="submit" :disabled="isSubmitting">{{ isSubmitting ? 'Saving...' : 'Save Changes' }}</button>
      </form>
    </div>

    <div v-else-if="loading">
      <p>Loading product details...</p>
    </div>

    <div v-else>
      <p>No product found.</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
import BackButton from './BackButton.vue';

export default {
  components: {
    BackButton
  },
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
      productName: "",
      isSubmitting: false,
      errors: [],
      generalError: '',
    };
  },
  mounted() {
    this.fetchProduct(); 
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
      this.errors = [];
      this.generalError = '';

      // Basic front-end validation
      if (new Date(this.product.expiration_date) <= new Date(this.product.manufacturing_date)) {
        this.errors.push('Expiration date must be after manufacturing date.');
      }

      if (this.errors.length > 0) {
        toastr.error('Please fix the validation errors below.', 'Validation Error');
        return;
      }

      this.isSubmitting = true;

      try {
        const response = await axios.put(`http://localhost/api/products/${this.productId}`, this.product);
        toastr.success('Product updated successfully!');
        this.$router.push('/'); // Navigate back to the product list after successful update
      } catch (error) {
        console.error('Error updating product:', error);
        if (error.response) {
          if (error.response.status === 422) {
            const backendErrors = error.response.data.errors;
            this.errors = [];

            for (const field in backendErrors) {
              if (backendErrors.hasOwnProperty(field)) {
                backendErrors[field].forEach((msg) => {
                  this.errors.push(msg);
                });
              }
            }
            toastr.error('Please fix the validation errors below.', 'Validation Error');
          } else {
            this.generalError = error.response.data.message || 'An error occurred while updating the product.';
            toastr.error(this.generalError, 'Error');
          }
        } else if (error.request) {
          this.generalError = 'No response from server. Please try again later.';
          toastr.error(this.generalError, 'Error');
        } else {
          this.generalError = 'An unexpected error occurred.';
          toastr.error(this.generalError, 'Error');
        }
      } finally {
        this.isSubmitting = false;
      }
    },
  },
};
</script>




<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

.card {
  max-width: 500px;
  width: 100%;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  padding: 30px;
  box-sizing: border-box;
  transition: transform 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
}

h2 {
  color: #333;
  font-size: 1.8em;
  margin-bottom: 1.5em;
  font-weight: bold;
  text-align: center;
}

.form-group {
  margin-bottom: 1em;
}

label {
  display: block;
  font-size: 0.9em;
  color: #666;
  margin-bottom: 0.3em;
}

input,
textarea,
select {
  width: 100%;
  padding: 10px;
  height: 40px; 
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1em;
  background-color: #f9f9f9;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
  box-sizing: border-box; 
}

textarea {
  height: 80px; 
  font-family: inherit;
  font-size: inherit;
}

input:focus,
textarea:focus,
select:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
}

button {
  width: 100%;
  padding: 12px;
  margin-top: 1.5em;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1em;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
}

button:hover {
  background-color: #0056b3;
  box-shadow: 0 5px 15px rgba(0, 91, 179, 0.3);
}

p {
  color: #555;
  font-size: 1em;
  text-align: center;
}

.underline {
  text-decoration: underline;
  font-weight: bold; 
  color: #007bff; 
}

.error-messages {
  background-color: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
  padding: 1rem;
  border-radius: 4px;
  margin-bottom: 1rem;
}

.error-messages ul {
  list-style-type: disc;
  padding-left: 1.5rem;
}

.general-error {
  background-color: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
  padding: 1rem;
  border-radius: 4px;
  margin-bottom: 1rem;
}


</style>
