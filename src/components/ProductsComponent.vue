<template>
    <section class="products-section">
        <div class="container">
            <div class="products">
                
                <ProductListComponent 
                    :products="products" 
                    :loading="loading" 
                    :errored="errored"
                    :searchTerm="searchTerm"
                    class="product-list"
                />
                <div class="product-options">
                    <h3>Search</h3>
                    <input
                        v-model="searchTerm"
                        type="text"
                        placeholder="Search product by name"
                    />
                   
                </div>
                
            </div>
            
        </div>
    </section>
    
</template>


<script>
import ProductListComponent from '../components/ProductListComponent.vue';
import axios from "axios";

export default {
   
    components:{
        ProductListComponent,
    },
    data() {
        return {
            products: [],
            loading: true,
            errored: false,
            searchTerm: '', // Search term managed in the parent component
        }
    },
    methods: {
        async fetchProducts() {
            this.loading = true;    // Set loading to true while fetching
            
            try {
                // Make the fetch request
                const response = await axios.get('http://localhost/api/products');
                // Update the products array with the fetched data
                this.products = response.data.products
            } catch (error) {
                // If there was an error, set the error message
                this.errored = true;
                console.error('Fetch error:', error);
            } finally {
                // Set loading to false once the request is completed (whether successful or not)
                this.loading = false;
            }
        }
    },
    // Call the fetchProducts method when the component is mounted
    mounted() {
        this.fetchProducts();
    }
}

</script>

<style scoped>
    .products-section {
        padding: 1rem 0;
    }
    .container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 1rem;
    }
    /* Flex layout */
    .products {
        display: flex;
        /* justify-content: space-between; */

    }

    .product-list {
        display: flex;
        /* justify-content: space-between; */
        min-width: 30%;
    }

    .product-options {
        margin-left: calc(8% + 0.75rem);
        width: 30%;
    }
</style>