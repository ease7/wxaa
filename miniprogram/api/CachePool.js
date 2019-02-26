import wxuser from "./wxuser";

/**
 * 缓存池
 */
class CachePool {

  static get BILL() {
    return "cache_pool_bill";
  }

  static get openid() {
    return this.getValue("system", "openid");
  }

  static set openid(value) {
    this.setValue("system", "openid", value);
  }

  static setValue(name, key, value) {
    wx.getStorage({
      key: name,
      success: res => {
        if (res) {
          var obj = res.data || {};

          obj[key] = value;

          wx.setStorage({
            key: name,
            data: obj
          });

          console.log("Success");
        }

      },
      fail: err => {
        var obj = {};

        obj[key] = value;

        wx.setStorage({
          key: name,
          data: obj
        });

        console.log("Success");
      }
    });
  }

  static getValue(name, key) {

    var res = wx.getStorageSync(name);

    console.log(res);
    var obj = res || {};

    return obj[key];

  }
}

export default CachePool;