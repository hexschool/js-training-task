Vue.component('pagination', {
  // 分頁模板
  template: `<nav aria-label="Page navigation example">
  <ul class="pagination">
    <li
      class="page-item"
      :class="{'disabled': pages.current_page === 1}"
    >
      <a
        class="page-link"
        href="#"
        aria-label="Previous"
        @click.prevent="emitPages(pages.current_page - 1)"
      >
        <span aria-hidden="true">&laquo;</span>
      </a>
    </li>
    <li
      v-for="(item, index) in pages.total_pages"
      :key="index"
      class="page-item"
      :class="{'active': item === pages.current_page}"
    >
      <a
        class="page-link"
        href="#"
        @click.prevent="emitPages(item)"
      >{{ item }}</a>
    </li>
    <li
      class="page-item"
      :class="{'disabled': pages.current_page === pages.total_pages}"
    >
      <a
        class="page-link"
        href="#"
        aria-label="Next"

        @click.prevent="emitPages(pages.current_page + 1)"
      >
        <span aria-hidden="true">&raquo;</span>
      </a>
    </li>
  </ul>
</nav>`,
 /**
  * 元件本身的 data，但這邊不會使用
  */
  data() {
    return {
    };
  },
  /**
   * props 說明
   * 主要接受由外(Products)向內(pagination)傳遞的分頁物件，意指在 getProducts 取得的分頁物件
   */
  props: {
    pages: {},
  },
  methods: {
    /**
     * emitPage
     * @param item 是你點擊的分頁按鈕，當你點第二頁就會傳入二，點第五頁就會傳入五以此類推
     */
    emitPages(item) {
      // 透過 emit 向外傳遞我們點的分頁並觸發外層的 getProducts
      this.$emit('emit-pages', item);
    },
  },
});