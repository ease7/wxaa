// miniprogram/pages/share/bill/index.js
import bill from '../../../api/bill.js';

var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    shareBillId: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log("分享后的参数:", options);
    // options.billid = "XG-rVt7E7L4wQVwr";
    let shareBillId = options.billid || "";


    this.setData({
      shareBillId: shareBillId
    });

    this.join();
    app.userInfoReady = (info) => {
      this.join();
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  join() {
    let billId = this.data.shareBillId;
    let info = app.globalData.userInfo;
    console.log("join:", info, ", billId:", billId);
    if (info && billId) {
      bill.addToBill(info, billId).then(res => {
        wx.switchTab({
          url: '../../home/index',
        });
      });
    }
  }
})