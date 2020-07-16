Vue.component('productModal', {
  template: `<div id="productModal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
  aria-hidden="true">
  <div class="modal-dialog modal-xl" role="document">
    <div class="modal-content border-0">
      <div class="modal-header bg-dark text-white">
        <h5 id="exampleModalLabel" class="modal-title">
          <span>新增產品</span>
        </h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <div class="row">
          <div class="col-sm-4">
            <div v-for="i in 5" :key="i + 'img'" class="form-group">
              <label :for="'img' + i">輸入圖片網址</label>
              <input :id="'img' + i" v-model="tempProduct.imageUrl[i - 1]" type="text" class="form-control"
                placeholder="請輸入圖片連結">
            </div>
            <div class="form-group">
              <label for="customFile">
                或 上傳圖片
                <i v-if="status.fileUploading" class="fas fa-spinner fa-spin"></i>
              </label>
              <input id="customFile" ref="file" type="file" class="form-control" @change="emitFile">
            </div>
            <img class="img-fluid" :src="tempProduct.imageUrl[0]" alt />
          </div>
          <div class="col-sm-8">
            <div class="form-group">
              <label for="title">標題</label>
              <input id="title" v-model="tempProduct.title" type="text" class="form-control" placeholder="請輸入標題"
                required>
            </div>

            <div class="form-row">
              <div class="form-group col-md-6">
                <label for="category">分類</label>
                <input id="category" v-model="tempProduct.category" type="text" class="form-control"
                  placeholder="請輸入分類" required>
              </div>
              <div class="form-group col-md-6">
                <label for="price">單位</label>
                <input id="unit" v-model="tempProduct.unit" type="unit" class="form-control" placeholder="請輸入單位">
              </div>
            </div>

            <div class="form-row">
              <div class="form-group col-md-6">
                <label for="origin_price">原價</label>
                <input id="origin_price" v-model="tempProduct.origin_price" type="number" class="form-control"
                  placeholder="請輸入原價">
              </div>
              <div class="form-group col-md-6">
                <label for="price">售價</label>
                <input id="price" v-model="tempProduct.price" type="number" class="form-control"
                  placeholder="請輸入售價">
              </div>
            </div>
            <hr>

            <div class="form-group">
              <label for="description">產品說明</label>
              <textarea id="description" v-model="tempProduct.description" type="text" class="form-control"
                placeholder="請輸入產品說明" required>
              </textarea>
            </div>
            <div class="form-group">
              <label for="content">產品描述</label>
              <textarea id="content" v-model="tempProduct.content" type="text" class="form-control"
                placeholder="請輸入產品描述" required>
              </textarea>
            </div>
            <div class="form-group">
              <div class="form-check">
                <input id="enabled" v-model="tempProduct.enabled" class="form-check-input" type="checkbox">
                <label class="form-check-label" for="enabled">是否啟用</label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">
          取消
        </button>
        <button type="button" class="btn btn-primary" @click="emitProduct">
          確認
        </button>
      </div>
    </div>
  </div>
</div>`,
  data() {
    return {
    };
  },
  props: {
    productid: '',
    status: {},
    isNew: true,
    user: {},
    tempProduct: {
      imageUrl: [],
    }
  },
  methods: {
    emitProduct() {
      this.$emit('emit-product', this.tempProduct.id);
    },
    emitFile() {
      this.$emit('emit-file', this.$refs.file.files[0]);
    },
  },
});