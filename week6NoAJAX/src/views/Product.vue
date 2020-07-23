<template>
  <div class="about">
    <h1>This is 單一產品頁面</h1>
    {{ product.title }}
  </div>
</template>

<script>
export default {
  name: 'Product',
  data() {
    return {
      product: {},
    };
  },
  created() {
    const { id } = this.$route.params;

    const url = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_UUID}/ec/product/${id}`;
    this.$http.get(url)
      .then((res) => {
        console.log(res);
        this.product = res.data.data;
      });
  },
};
</script>
