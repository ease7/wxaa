// miniprogram/pages/cost/list.js
import cost from '../../api/cost';
import types from '../../api/types';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    billId: "XG-rVt7E7L4wQVwr",
    costList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let id = options.id;
    let costTypes = types.getCurrencyTypes();


    if (id) {
      this.setData({
        billId: id
      })
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
    let billId = this.data.billId;

    cost.getCostList(billId).then(res => {

      console.log(res);
      this.setData({
        costList: res
      });
    })
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
  addClick: function() {
    let billId = this.data.billId;

    wx.navigateTo({
      url: '../forms/cost/index?billid=' + billId,
    })
  },
  editClick: function(event) {
    let billId = this.data.id;
    let costId = event.detail.value;

    wx.navigateTo({
      url: '../forms/cost/index?billid=' + billId + "&costid=" + costId,
    })
  }

})