//app.js
import * as wxConfig from './config/wx.js';
import wxuser from './api/wxuser.js';
import user from './api/user.js';

App({
  globalData: {
    myAppKey: "",
    userInfo: null,
    openid: ""
  },
  onLaunch: function() {

    console.log("APP.onLaunch");

    this.globalData.myAppKey = parseInt(Math.random() * 100000);

    console.log(this.globalData.myAppKey);

    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        traceUser: true,
      })
    }

    setTimeout(() => {
      this.getCurrentUser().then(info => {
        this.setUserInfo(info);
      });
    }, 0)
  },
  getCurrentUser() {
    return wxuser.getUserId().then(ids => {
      console.log("[system] 当前用户ID获取成功:", ids);
      let openid = ids.openid;
      this.globalData.openid = openid;
      let userInfo = wxuser.getStorageUser(openid);

      if (userInfo) {
        console.log("缓存中的用户信息:", userInfo);
        return userInfo;
      } else {
        return wxuser.wxGetUserInfo().then(info => {
          info.openid = openid;
          wxuser.saveStorageUser(info);

          return info;
        });
      }
    });
  },
  setUserInfo: function(info) {
    if (info) {
      this.globalData.userInfo = info;

      // 解决异步
      if (this.userInfoReady) {
        this.userInfoReady(info);
      }
    }
  }
})