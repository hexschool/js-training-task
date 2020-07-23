import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: () => import('../views/Home.vue'),
    children: [
      {
        path: '',
        component: () => import('../views/Index.vue'),
      },
      {
        path: '/products',
        name: '產品列表',
        component: () => import('../views/Products.vue'),
      },
      {
        path: '/product/:id',
        name: '產品頁面',
        component: () => import('../views/Product.vue'),
      },
      {
        path: '/cart',
        name: '購物車',
        component: () => import('../views/Cart.vue'),
      },
    ],
  },
  // 巢狀路由
  {
    path: '/login',
    component: () => import('../views/dashboard/Login.vue'),
  },
  {
    path: '/admin',
    component: () => import('../views/Dashboard.vue'),
    children: [
      {
        path: 'products',
        component: () => import('../views/dashboard/Products.vue'),
      },
      {
        path: 'orders',
        component: () => import('../views/dashboard/Orders.vue'),
      },
    ],
  },
];

const router = new VueRouter({
  routes,
});

export default router;
