// 載入pagination組件
import pagination from './pagination.js';

Vue.component('pagination', pagination);



new Vue({
    el: '#app',
    data: {
        products: [],
        tempProduct: {},
        pagination: {},
        api: {
            uuid: '3802fa0c-830d-47a0-a19f-9616c3fcd8ae',
            path: 'https://course-ec-api.hexschool.io/api/'
        },
        // token: '',
        // isNew: '',
    },
    methods: {

        openModal(isNew, item) {
            switch (isNew) {
                case 'new':
                    this.tempProduct = {};
                    $('#productModal').modal('show');
                    break;
                case 'edit':
                    this.tempProduct = Object.assign({}, item);
                    $('#productModal').modal('show');
                    break;
                case 'delete':
                    $('#delProductModal').modal('show');
                    this.tempProduct = Object.assign({}, item);
                    break;
                default:
                    break;
            }

        },
        updateProduct() {
            if (this.tempProduct.id) {

                this.products.forEach((item, i) => {
                    if (item.id === this.tempProduct.id) {
                        this.products[i] = this.tempProduct;
                    }
                });

            } else {

                const id = new Date().getTime();
                this.tempProduct.id = id;
                this.products.push(this.tempProduct);

            }

            this.tempProduct = {};
            $('#productModal').modal('hide');

        },
        delProduct() {
            if (this.tempProduct.id) {

                this.products.forEach((item, i) => {
                    if (item.id === this.tempProduct.id) {
                        this.products.splice(i, 1);
                        this.tempProduct = {};
                    }
                });
            }
            $('#delProductModal').modal('hide');
        },
        getProducts(num = 1) {
            // if (!num) { num = 1 } // 假設num不存在的話，會帶上1

            const url = `${this.api.path}${this.api.uuid}/admin/ec/products?page=${num}`;
            axios.get(url)
                .then((res) => {
                    this.products = res.data.data;
                    this.pagination = res.data.meta.pagination;
                })
                .catch((err) => console.log(err))

        },
    },
    created() {
        // 寫在created裡，等一下打的所有api都會自動帶入這個token
        this.token = document.cookie.replace(/(?:(?:^|.*;\s*)hexHomeworktoken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        axios.defaults.headers.common['Authorization'] = ` Bearer ${this.token}`;
        this.getProducts();

    },


});