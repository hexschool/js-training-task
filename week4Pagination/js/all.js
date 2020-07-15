/**
 * Vue 說明
 * 助教在撰寫上習慣不加上 const app，而這邊不加上 const app = new Vue 並沒有任何影響。
 */
new Vue({
  el: '#app', // Vue 綁定在 app。
  /**
   * Vue data 說明
   * @param products 放置 AJAX 回來的產品資料。
   * @param pagination 放置分頁資料用。
   * @param tempProduct 暫存資料用，必須預先定義 imageUrl 並且是一個陣列，否則新增或更新會出現錯誤。
   * @param isNew 用於判斷接下來的行為是新增產品或編輯產品。
   * @param status 用於切換上傳圖片時的小 icon，主要是增加使用者體驗。
   * @param user 底下分別有 token 的放置處，但主要必須注意 uuid 需改成自己的，目前是助教示範用。
   */
  data: {
    products: [],
    pagination: {},
    tempProduct: {
      imageUrl: [],
    },
    isNew: false,
    status: {
      fileUploading: false,
    },
    user: {
      token: '',
      uuid: '8db6e157-f1c7-4688-bf28-c4948d307e8e',
    },
  },
  /**
   * 生命週期 Created
   * 主要用於取得 token 若沒有使用者沒有 token 則返回到登入畫面，若有則執行「取得全部產品」的方法。
   */
  created() {
    // 取得 token 的 cookies
    // 詳情請見：https://developer.mozilla.org/zh-CN/docs/Web/API/Document/cookie
    this.user.token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    // 若無法取得 token 則返回 Login 頁面
    if (this.user.token === '') {
      window.location = 'Login.html';
    }
    // 執行取得全部產品的行為
    this.getProducts();
  },
  methods: {
    /**
     * 取得全部產品
     * @param page 頁碼，預設值是第一頁
     */
    getProducts(page = 1) {
      const api = `https://course-ec-api.hexschool.io/api/${this.user.uuid}/admin/ec/products?page=${page}`;
      //預設帶入 token
      axios.defaults.headers.common.Authorization = `Bearer ${this.user.token}`;

      axios.get(api).then((response) => {
        this.products = response.data.data; // 取得產品列表
        this.pagination = response.data.meta.pagination; // 取得分頁資訊
      });
    },
    /**
     * 開啟 Modal 視窗
     * @param isNew 判斷目前是否為新增(true)或是編輯(false)
     * @param item 物件，主要用於傳入要編輯或刪除的產品資料
     */
    openModal(isNew, item) {
      switch (isNew) {
        case 'new':
          // 新增之前必須先清除原有可能暫存的資料
          this.tempProduct = {
            imageUrl: [],
          };
          // 切換狀態為 true 代表新增
          this.isNew = true;
          // 切換完畢並清空資料後開啟 Modal
          $('#productModal').modal('show');
          break;
        case 'edit':
          // 由於描述欄位是必須透過取得單一產品的方式，因此會執行 AJAX
          this.getProduct(item.id);
          // 切換狀態為 false 代表編輯
          this.isNew = false;
          break;
        case 'delete':
          // 由於目前範本僅有一層物件，因此使用淺拷貝
          this.tempProduct = Object.assign({}, item);
          // 拷貝完畢後開啟 Modal
          $('#delProductModal').modal('show');
          break;
        default:
          break;
      }
    },
    /**
     * 取得單一詳細產品資料
     * @param id 主要是傳入產品的 ID
     */
    getProduct(id) {
      const api = `https://course-ec-api.hexschool.io/api/${this.user.uuid}/admin/ec/product/${id}`;
      axios.get(api).then((res) => {
        // 取得成功後回寫到 tempProduct
        this.tempProduct = res.data.data;
        // 確保資料已經回寫後在打開 Modal
        $('#productModal').modal('show');

      }).catch((error) => {
        console.log(error); // 若出現錯誤則顯示錯誤訊息
      });
    },
    /**
     * 上傳產品資料
     * 透過 this.isNew 的狀態將會切換新增產品或編輯產品。
     * 附註新增為「post」編輯則是「patch」，patch 必須傳入產品 ID
     */
    updateProduct() {
      // 新增商品
      let api = `https://course-ec-api.hexschool.io/api/${this.user.uuid}/admin/ec/product`;
      let httpMethod = 'post';
      // 當不是新增商品時則切換成編輯商品 API
      if (!this.isNew) {
        api = `https://course-ec-api.hexschool.io/api/${this.user.uuid}/admin/ec/product/${this.tempProduct.id}`;
        httpMethod = 'patch';
      }

      // 預設帶入 token
      axios.defaults.headers.common.Authorization = `Bearer ${this.user.token}`;

      axios[httpMethod](api, this.tempProduct).then(() => {
        $('#productModal').modal('hide'); // AJAX 新增成功後關閉 Modal
        this.getProducts(); // 重新取得全部產品資料
      }).catch((error) => {
        console.log(error) // 若出現錯誤則顯示錯誤訊息
      });
    },
    /**
     * 上傳圖片
     * 詳細教學可參考影音。
     */
    uploadFile() {
      const uploadedFile = this.$refs.file.files[0];
      const formData = new FormData();
      formData.append('file', uploadedFile);
      const url = `https://course-ec-api.hexschool.io/api/${this.user.uuid}/admin/storage`;
      this.status.fileUploading = true;
      axios.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }).then((response) => {
        this.status.fileUploading = false;
        if (response.status === 200) {
          this.tempProduct.imageUrl.push(response.data.data.path);
        }
      }).catch(() => {
        console.log('上傳不可超過 2 MB');
        this.status.fileUploading = false;
      });
    },
    /**
     * 刪除產品
     * 透過在 openModal 傳入的 this.tempProduct，並撈取 this.tempProduct.id 來刪除產品。
     * 主要是因為在 delModal 會使用到產品的一些資訊，因此會需要拷貝一整份過來。
     */
    delProduct() {
      const url = `https://course-ec-api.hexschool.io/api/${this.user.uuid}/admin/ec/product/${this.tempProduct.id}`;

      // 預設帶入 token
      axios.defaults.headers.common.Authorization = `Bearer ${this.user.token}`;

      axios.delete(url).then(() => {
        $('#delProductModal').modal('hide'); // 刪除成功後關閉 Modal
        this.getProducts(); // 重新取得全部資料
      });
    },
  },
})