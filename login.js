new Vue({
    el: '#app',
    data: {
        user: {
            email: '',
            password: '',
        },
    },

    methods: {
        signin() {
            const apiPath = "https://course-ec-api.hexschool.io/";
            const url = `${apiPath}api/auth/login`;

            axios.post(url, this.user)
                .then((res) => {
                    const token = res.data.token;
                    const expiredTime = res.data.expired;

                    document.cookie = `hexHomeworktoken=${token}; expires=${new Date(expiredTime * 1000)}; path=/`
                    //儲存完cookie後就跳轉到產品頁
                    window.location = 'products.html'
                }).catch((err) => { console.log(err) });
        },

    },

});
