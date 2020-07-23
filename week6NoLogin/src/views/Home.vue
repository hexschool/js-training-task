<template>
  <div class="home">
    <div id="nav">
      <router-link to="/">前台頁面</router-link> |
      <router-link to="/products">產品列表</router-link> |
      <!-- <router-link to="/product">產品頁面</router-link> | -->
      <router-link to="/cart">購物車</router-link> |
      <router-link to="/admin/products">後台購物車列表</router-link>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
    };
  },
};
</script>
