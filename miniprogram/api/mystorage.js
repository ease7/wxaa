class mystorage {

    set(key, value) {

        return new Promise((resolve, reject) => {
            wx.setStorage({
                key: key,
                data: value,
                success: function (res) {
                    resolve(res);
                }
            })
        })

    }

    remove(key) {
        return new Promise((resolve, reject) => {
            wx.removeStorage({
                key: key,
                success(res) {
                    resolve(res);
                },
                fail: function (err) {
                    reject(err);
                }
            })
        })


    }

    get(key) {
        return new Promise((resolve, reject) => {
            wx.getStorage({
                key: key,
                success(res) {
                    resolve(res);
                },
                fail: function (err) {
                    reject(err);
                }
            })
        })
    }
}