<template>
    <section class="product-list">
        <h3>Product List Component</h3>

        <section v-if="errored">
            <p>We're sorry, we're not able to retrieve this information at the moment, please try back later</p>
        </section>

        <section v-else>
            <div v-if="loading">Loading...</div>

            <div class="" v-else-if="filteredProducts.length === 0">
                <p>We're sorry, there are no available products</p>
            </div>

            <div  v-else class="scrollable-list">
                <div
                    v-for="(product ,index) in filteredProducts"
                    :key="index" 
                >
                    <ListItemComponent :itemName="product.name" :itemId="product.id" />
                </div>
            </div>
           
        </section>
    </section>
</template>

<script>
    import ListItemComponent from './ListItemComponent.vue';
    
    export default {
        //This is to prevent "Extraneous non-emits event listeners" Warning
        inheritAttrs: false,
        components:{
            ListItemComponent
        },
        props: {
            products: {
                type: Array,
                required: true
            },
            loading: {
                type:Boolean,
                required:true
            },
            errored: {
                type:Boolean,
                required:true
            },
            searchTerm: {
                type: String,
                default:""
            },
        },
        computed: {
            filteredProducts() {
                // Filter products based on the search term (case-insensitive)
                if (!this.searchTerm) {
                    return this.products; // If no search term, show all products
                }
                return this.products.filter((product) =>
                    product.name.toLowerCase().includes(this.searchTerm.toLowerCase())
                );
            },
        }
    };
</script>

<style scoped>
    .product-list {
        display: flex;
        flex-direction: column;
    }

    .scrollable-list {
        height: 400px;
        overflow-y: scroll;
        border: 1px solid #ccc;
        padding: 10px;
    }
</style>