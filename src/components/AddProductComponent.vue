<template>
  <back-button :urlTo="`/`" :text="`Back to Product List`" />
  <div class="container">
    <div class="card">
      <h2>Add New Product</h2>
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

      <form @submit.prevent="handleSubmit">
        <!-- Product Name -->
        <div class="form-group">
          <label for="name">Product Name<span class="required">*</span></label>
          <input
            type="text"
            id="name"
            v-model="form.name"
            required
            placeholder="Enter product name"
          />
        </div>

        <!-- Category -->
        <div class="form-group">
          <label for="category">Category<span class="required">*</span></label>
          <select id="category" v-model="form.category" required>
            <option value="" disabled>Select category</option>
            <option v-for="category in categoryOptions" :key="category.value" :value="category.value">
              {{ category.name }}
            </option>
          </select>
        </div>

        <!-- Active Ingredients -->
        <div class="form-group">
          <label for="active_ingredients">Active Ingredients<span class="required">*</span></label>
          <textarea
            id="active_ingredients"
            v-model="form.active_ingredients"
            required
            placeholder="List active ingredients"
          ></textarea>
        </div>

        <!-- Batch Number -->
        <div class="form-group">
          <label for="batch_number">Batch Number<span class="required">*</span></label>
          <input
            type="text"
            id="batch_number"
            v-model="form.batch_number"
            required
            placeholder="Enter batch number"
          />
        </div>

        <!-- Status -->
        <div class="form-group">
          <label for="status">Research Status<span class="required">*</span></label>
          <select id="status" v-model="form.status" required>
            <option value="" disabled>Select status</option>
            <option v-for="status in statusOptions" :key="status.value" :value="status.value">
              {{ status.name }}
            </option>
          </select>
        </div>

        <!-- Manufacturing Date -->
        <div class="form-group">
          <label for="manufacturing_date">Manufacturing Date<span class="required">*</span></label>
          <input
            type="date"
            id="manufacturing_date"
            v-model="form.manufacturing_date"
            required
          />
        </div>

        <!-- Expiration Date -->
        <div class="form-group">
          <label for="expiration_date">Expiration Date<span class="required">*</span></label>
          <input
            type="date"
            id="expiration_date"
            v-model="form.expiration_date"
            required
          />
        </div>

        <!-- Submit Button -->
        <button type="submit" :disabled="isSubmitting">
          {{ isSubmitting ? 'Submitting...' : 'Add Product' }}
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import BackButton from './BackButton.vue';

export default {
  components: {
    BackButton
  },
  name: 'AddProductComponent',
  setup() {
    const router = useRouter();

    // Form data
    const form = ref({
      name: '',
      category: '',
      active_ingredients: '',
      batch_number: '',
      status: '',
      manufacturing_date: '',
      expiration_date: '',
    });

    // Options for select fields
    const categoryOptions = [
      {name:'Tablet', value:'tablet'},
      {name:'Injection', value:'injection'},
      {name:'Capsule', value:'capsule'},
    ];

    const statusOptions = [
    {name:'Under Development', value:'under development'},
    {name:'In Clinical Trials', value:'in clinical trials'},
    {name:'Completed', value:'completed'},
    ];

    const isSubmitting = ref(false);

    const errors = ref([]);
    const generalError = ref('');

    const handleSubmit = async () => {
      errors.value = [];
      generalError.value = '';

      // Basic front-end validation
      if (new Date(form.value.expiration_date) <= new Date(form.value.manufacturing_date)) {
        toastr.error('Expiration date must be after manufacturing date.', 'Validation Error');
        return;
      }

      isSubmitting.value = true;

      try {
        const response = await axios.post(
          'http://localhost/api/products', 
          form.value,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        if (response.status === 201) {
          toastr.success('Product added successfully!', 'Success');
          router.push({ name: 'products' }); 
        } else {
          toastr.error('Failed to add product. Please try again.', 'Error');
        }
      } catch (error) {
        console.error('Error adding product:', error);

        if (error.response) {
          if (error.response.status === 422) {
            const backendErrors = error.response.data.errors;
            errors.value = [];

            for (const field in backendErrors) {
              if (backendErrors.hasOwnProperty(field)) {
                backendErrors[field].forEach((msg) => {
                  errors.value.push(msg);
                });
              }
            }
            toastr.error('Please fix the validation errors below.', 'Validation Error');
          } else {
            generalError.value = error.response.data.message || 'An error occurred while adding the product.';
            toastr.error(generalError.value, 'Error');
          }
        } else if (error.request) {
          generalError.value = 'No response from server. Please try again later.';
          toastr.error(generalError.value, 'Error');
        } else {
          generalError.value = 'An unexpected error occurred.';
          toastr.error(generalError.value, 'Error');
        }
      } finally {
        isSubmitting.value = false;
      }
    };

    return {
      form,
      categoryOptions,
      statusOptions,
      isSubmitting,
      handleSubmit,
      errors,
      generalError,
    };
  },
};
</script>

<style scoped>

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  margin-bottom: 54px;
}

.add-product-section {
  padding: 2rem 0;
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

.error-messages {
  background-color: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
  padding: 1rem;
  border-radius: 4px;
  margin-bottom: 1rem;
}

.error-messages ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.general-error {
  background-color: #ffeeba;
  color: #856404;
  border: 1px solid #ffeeba;
  padding: 1rem;
  border-radius: 4px;
  margin-bottom: 1rem;
}

.required {
  color: red;
}
</style>
