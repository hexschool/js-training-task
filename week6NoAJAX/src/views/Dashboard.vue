<template>
  <div>
    這裡是 Dashboard
    <div id="nav">
      <router-link to="/admin/">後台首頁</router-link> |
      <router-link to="/">回到前台</router-link> |
      <router-link to="/admin/products">產品列表</router-link> |
      <router-link to="/admin/orders">購物車列表</router-link> |
      <a href="#" @click.prevent="signout">登出</a>
    </div>
    <router-view :token="token" v-if="checkSuccess"></router-view>
  </div>
</template>

<script>
// 驗證可以寫這邊
export default {
  name: 'Dashboard',
  data() {
    return {
      token: '',
      checkSuccess: false,
    };
  },
  created() {
    this.checkLogin();
  },
  methods: {
    checkLogin() {
      this.token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');

      // 驗證 token 是否存在，若不存在則返回首頁
      console.log(this.token);
      if (this.token) {
        console.log('token 存在');

        // 當 token 存在時，替 axios 預設載入 headers Authorization
        this.$http.defaults.headers.common.Authorization = `Bearer ${this.token}`;

        this.checkSuccess = true;
      } else {
        console.log('token 不存在');
        this.$router.push('/login');
      }
    },
    signout() {
      document.cookie = 'hexToken=;expires=;';
      console.log('token 已清除');
      this.$router.push('/login');
    },
  },
};
</script>
