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
    <router-view v-if="checkSuccess"></router-view>
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

      // Axios 預設值
      this.$http.defaults.headers.common.Authorization = `Bearer ${this.token}`;

      const api = `${process.env.VUE_APP_APIPATH}api/auth/check`;

      // eslint-disable-next-line
      this.$http.post(api, { 'api_token': this.token }).then((response) => {
        // 登入沒有問題
        console.log(response);
        if (response.data.success) {
          this.checkSuccess = true;
        }
      }).catch((res) => {
        // 驗證失敗，轉回登入頁
        console.log(res);
        this.$router.push('/login');
      });
    },
    signout() {
      document.cookie = 'hexToken=;expires=;';
      console.log('token 已清除');
      this.$router.push('/login');
    },
  },
};
</script>
