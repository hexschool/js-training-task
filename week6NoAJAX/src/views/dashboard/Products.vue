<template>
  <div>
    這裡是 後台 產品列表
  </div>
</template>

<script>
export default {
  name: 'Products',
  props: ['token'],
  data() {
    return {
      products: [],
      pagination: {},
    };
  },
  methods: {
    getProducts() {
      // API
      const api = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_UUID}/admin/ec/products`;
      this.$http.get(api).then((response) => {
        console.log(response);
        this.products = response.data.data;
        this.pagination = response.data.meta.pagination;
      });
    },
  },
  created() {
    this.getProducts();
  },
};
</script>
