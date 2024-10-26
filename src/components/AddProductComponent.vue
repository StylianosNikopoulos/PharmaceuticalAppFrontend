<template>
  <section class="add-product-section">
    <div class="container">
      <h2>Add New Research Drug</h2>

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

      <form @submit.prevent="handleSubmit" class="product-form">
        <!-- Product Name -->
        <div class="form-group">
          <label for="name">
            Product Name<span class="required">*</span>
          </label>
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
          <label for="category">
            Category<span class="required">*</span>
          </label>
          <select id="category" v-model="form.category" required>
            <option value="" disabled>Select category</option>
            <option v-for="category in categoryOptions" :key="category" :value="category">
              {{ category }}
            </option>
          </select>
        </div>

        <!-- Active Ingredients -->
        <div class="form-group">
          <label for="active_ingredients">
            Active Ingredients<span class="required">*</span>
          </label>
          <textarea
            id="active_ingredients"
            v-model="form.active_ingredients"
            required
            placeholder="List active ingredients"
          ></textarea>
        </div>

        <!-- Batch Number -->
        <div class="form-group">
          <label for="batch_number">
            Batch Number<span class="required">*</span>
          </label>
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
          <label for="status">
            Research Status<span class="required">*</span>
          </label>
          <select id="status" v-model="form.status" required>
            <option value="" disabled>Select status</option>
            <option v-for="status in statusOptions" :key="status" :value="status">
              {{ status }}
            </option>
          </select>
        </div>

        <!-- Manufacturing Date -->
        <div class="form-group">
          <label for="manufacturing_date">
            Manufacturing Date<span class="required">*</span>
          </label>
          <input
            type="date"
            id="manufacturing_date"
            v-model="form.manufacturing_date"
            required
          />
        </div>

        <!-- Expiration Date -->
        <div class="form-group">
          <label for="expiration_date">
            Expiration Date<span class="required">*</span>
          </label>
          <input
            type="date"
            id="expiration_date"
            v-model="form.expiration_date"
            required
          />
        </div>

        <!-- Submit Button -->
        <div class="form-group">
          <button type="submit" :disabled="isSubmitting">
            {{ isSubmitting ? 'Submitting...' : 'Add Product' }}
          </button>
        </div>
      </form>
    </div>
  </section>
</template>

<script>
import axios from 'axios';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
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
      'Tablet',
      'Capsule',
      'Injection',
    ];

    const statusOptions = [
      'Under Development',
      'In Clinical Trials',
      'Completed',
    ];

    // Submission state
    const isSubmitting = ref(false);

    // Error messages
    const errors = ref([]);
    const generalError = ref('');

    // Handle form submission
    const handleSubmit = async () => {
      // Reset errors
      errors.value = [];
      generalError.value = '';

      // Basic front-end validation
      if (
        new Date(form.value.expiration_date) <=
        new Date(form.value.manufacturing_date)
      ) {
        toastr.error(
          'Expiration date must be after manufacturing date.',
          'Validation Error'
        );
        return;
      }

      isSubmitting.value = true;

      try {
        const response = await axios.post(
          'http://localhost/api/products', // Ensure this URL matches your Laravel server
          form.value,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        if (response.status === 201) {
          toastr.success('Product added successfully!', 'Success');
          router.push({ name: 'products' }); // Adjust the route name as per your router configuration
        } else {
          toastr.error('Failed to add product. Please try again.', 'Error');
        }
      } catch (error) {
        console.error('Error adding product:', error);

        if (error.response) {
          // Server responded with a status other than 2xx
          if (error.response.status === 422) {
            // Validation errors
            const backendErrors = error.response.data.errors;
            errors.value = [];

            for (const field in backendErrors) {
              if (backendErrors.hasOwnProperty(field)) {
                backendErrors[field].forEach((msg) => {
                  errors.value.push(msg);
                });
              }
            }

            toastr.error(
              'Please fix the validation errors below.',
              'Validation Error'
            );
          } else {
            // Other server errors
            generalError.value =
              error.response.data.message ||
              'An error occurred while adding the product.';
            toastr.error(generalError.value, 'Error');
          }
        } else if (error.request) {
          // No response received from server
          generalError.value =
            'No response from server. Please try again later.';
          toastr.error(generalError.value, 'Error');
        } else {
          // Other errors
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
.add-product-section {
  padding: 2rem 0;
  background-color: #f8f9fa;
}

.container {
  max-width: 600px;
  margin: 0 auto;
  padding: 1.5rem;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  margin-bottom: 1.5rem;
  color: #094ee2;
}

.product-form {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
  color: #333333;
}

.required {
  color: red;
  margin-left: 0.25rem;
}
#category {
width : 556px;
max-width : 556px;
}
#status {
width : 556px;
max-width : 556px;
}
.form-group input[type='text'],
.form-group input[type='date'],
.form-group select,
.form-group textarea {
  width: 90%;
  padding: 0.5rem;
  border: 1px solid #cccccc;
  border-radius: 4px;
  font-size: 1rem;
}

.form-group textarea {
  resize: vertical;
  height: 100px;
}

.form-group button {
  padding: 0.75rem;
  background-color: #094ee2;
  color: #ffffff;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

.form-group button:hover {
  background-color: #072b9b;
}

.form-group button:disabled {
  background-color: #6c757d;
  cursor: not-allowed;
}

/* Error Messages */
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
@media (max-width:611px){

/* Category */
#category{
 width:475px !important;
}

/* Status */
#status{
 width:466px !important;
}

}

@media (max-width:481px){

/* Category */
#category{
 width:313px !important;
}

/* Status */
#status{
 width:311px !important;
}

}
</style>