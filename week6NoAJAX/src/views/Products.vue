<template>
  <div class="about">
    <h1>This is 產品列表頁面</h1>
    <table>
      <tr v-for="item in products" :key="item.id">
        <td>{{ item.title }}</td>
        <td>{{ item.content }}</td>
        <td>
          <router-link :to="`/product/${item.id}`">看產品</router-link>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: 'Products',
  data() {
    return {
      products: [],
    };
  },
  created() {
    const url = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_UUID}/ec/products`;
    this.$http.get(url)
      .then((res) => {
        console.log(res);
        this.products = res.data.data;
      });
  },
};
</script>
