import { createRouter, createWebHistory } from 'vue-router';
import ProductsComponent from '../components/ProductsComponent.vue'
import ProductComponent from '../components/ProductComponent.vue'
import AddProductComponent from '../components/AddProductComponent.vue'
import EditProductComponents from '../components/EditProductComponents.vue'

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
      },

      {
        path: '/products/edit/:id',
        name: 'edit-product',
        component: EditProductComponents,
        props: route => ({ productId: route.params.id })
      }
  ],
});

export default router;