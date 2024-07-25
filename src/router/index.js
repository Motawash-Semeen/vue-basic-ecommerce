import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: { name: 'productList' }
    },
    {
      path: '/login',
      name: 'Login',
      component: import('@/components/Login.vue')
    },
    {
      path: '/products',
      name: 'products',
      component: () => import('@/views/Product.vue'),
      children: [
        {
          path: '',
          name: 'productList',
          component: () => import('@/components/ProductList.vue')
        },
        {
          path: 'cart',
          name: 'cart',
          component: () => import('@/components/Cart.vue')
        },
        {
          path: 'checkout',
          name: 'checkout',
          component: () => import('@/components/Checkout.vue')
        },
        {
          path: ':id',
          name: 'productDetails',
          component: () => import('@/components/ProductDetails.vue')
        }
      ]
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: import('@/components/NotFound.vue')
    }
  ]
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem("authUserInfo");
  if (to.name == "checkout" && !isAuthenticated) next({ name: "Login" });
  else next();
});

export default router
