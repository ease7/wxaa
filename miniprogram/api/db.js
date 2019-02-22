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
      success: function(res) {
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

  static update(name, data) {
    return new Promise((resolve, reject) => {
      var _db = wx.cloud.database();
      var handlers = this.getDefaultHandler(resolve, reject);

      console.log(data);

      var updateObj = {};
      for (var propertyName in data) {
        let value = data[propertyName];

        if (propertyName !== "_id") {

          updateObj[propertyName] = value;
        }
      }

      console.log("更新obj", updateObj);

      _db.collection(name).doc(data._id).update({
        data: updateObj,
        ...handlers
      })
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
        let value = where[propertyName];

        if (value && value.type === "_in") {
          queryObj[propertyName] = _db.command.in(value.value);
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