<template>
  <div>
    這裡是 Dashboard
    <div id="nav">
      <router-link to="/admin/">後台首頁</router-link> |
      <router-link to="/">回到前台</router-link> |
      <router-link to="/admin/products">產品列表</router-link> |
      <router-link to="/admin/orders">購物車列表</router-link> |
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
// 驗證可以寫這邊
export default {
  name: 'Dashboard',
  data() {
    return {
    };
  },
};
</script>
