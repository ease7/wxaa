// miniprogram/pages/home/index.js
import bill from '../../api/bill';
import * as utils from '../../js/utils';

const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    shareBillId: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    console.log("home/index onLoad");
    let shareBillId = options.billid || "";

    this.setData({
      shareBillId: shareBillId
    });

    app.userInfoReady = () => {
      this.init();
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
    this.init();
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
  init() {
    let openid = app.globalData.openid;

    if (openid) {
      bill.getMyBillList(openid).then(list => {
        let displayList = [];
        list.forEach(element => {
          displayList.push({
            ...element
          });
        });

        this.setData({
          list: displayList
        });
      });
    }

  },
  editItem: function(event) {
    let index = event.target.dataset.index;
    console.log(index);
    wx.navigateTo({

      url: '../forms/bill/index?id=' + index,
    })

  },
  // 添加按钮点击
  addClick: function(event) {
    wx.navigateTo({
      url: '../forms/bill/index',
    })
  },
  viewCostList: function(event) {
    let index = event.target.dataset.index;
    console.log(index);
    wx.navigateTo({

      url: '../cost/list?id=' + index,
    })
  }
})