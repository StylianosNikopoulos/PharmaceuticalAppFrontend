import { createRouter, createWebHistory } from 'vue-router';
import ProductsComponent from '../components/ProductsComponent.vue'
import ProductComponent from '../components/ProductComponent.vue'
import AddProductComponent from '../components/AddProductComponent.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
      {
        path: '/',
        name: 'products',
        component: ProductsComponent,
      },
      {
        path: '/products/:id',
        name: 'product-details',
        component: ProductComponent,
        props: route => ({ productId: route.params.id })
      },
     
      {
        path: '/products/add',
        name: 'add-product',
        component: AddProductComponent,
      }
  ],
});

export default router;