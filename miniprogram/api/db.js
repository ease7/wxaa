class db {
  static get USER_BILL() {
    return "userbill"
  }

  static get BILL() {
    return "bill"
  }

  static get COST() {
    return "cost"
  }

  static get USER() {
    return "user"
  }


  static getFailHander(reject) {
    return (err) => {
      wx.showToast({
        icon: 'none',
        title: '数据异常'
      })
      console.error(err);

      reject(err);
    }
  }

  static getSuccessHander(resolve) {
    return (res) => {
      resolve(res);
    }
  }

  static getResultHandler(resolve, reject) {
    return {
      success: function (res) {
        resolve(res.data);
      },
      fail: this.getFailHander(reject),
    };
  }

  static getDefaultHandler(resolve, reject) {
    return {
      success: this.getSuccessHander(resolve),
      fail: this.getFailHander(reject),
    };
  }

  static add(name, data) {
    return new Promise((resolve, reject) => {
      var _db = wx.cloud.database();
      var handlers = this.getDefaultHandler(resolve, reject);

      _db.collection(name).add({
        data: data,
        ...handlers
      })
    })
  }

  /**
   * 更新数据
   * 必须携带当前用户的openid
   */
  static update(name, data) {
    return new Promise((resolve, reject) => {
      var _db = wx.cloud.database();
      var handlers = this.getDefaultHandler(resolve, reject);
      var updateObj = {};
      let copenid = data.copenid || "";
      let dataOpenId = data._openid || "";
      console.log("更新参数：", data);

      if (copenid && dataOpenId) {
        if (copenid === dataOpenId) {
          // 当前用户的id和数据的用户id一致 
          for (var propertyName in data) {
            let value = data[propertyName];

            if (propertyName !== "_id" && propertyName !== "_openid") {

              updateObj[propertyName] = value;
            }
          }

          console.log("更新值", updateObj);

          return _db.collection(name).doc(data._id).update({
            data: updateObj,
            ...handlers
          });
        } else {
          // 数据不属于当前用户时，调用云函数更新数据
          return new Promise((resolve, reject) => {

            wx.cloud.callFunction({
              name: "db",
              data: {
                name: name,
                data: data
              },
              success: (res) => {
                console.log("db function:", res);
                resolve(res);
              },
              fail: (err) => {
                reject(err)
              }
            })
          });
        }
      } else {
        reject("必须指定更新数据的openid和当前用户的openid");
      }



    })
  }

  static getResult(name) {

    return new Promise((resolve, reject) => {

      var _db = wx.cloud.database();
      var handlers = this.getResultHandler(resolve, reject);

      _db.collection(name).get(handlers);
    })

  }

  static getResultWhere(name, where) {
    return new Promise((resolve, reject) => {
      var _db = wx.cloud.database();

      var queryObj = {};
      for (var propertyName in where) {
        let value = where[propertyName] || "";

        if (value.type === "_in") {
          queryObj[propertyName] = _db.command.in(value.value);
        } else if (value.type === "RegExp") {
          queryObj[propertyName] = new RegExp(value.regexp);
        } else {
          queryObj[propertyName] = value;
        }
      }

      var handlers = this.getResultHandler(resolve, reject);

      _db.collection(name).where(queryObj).get(handlers);
    })
  }
}

export default db;