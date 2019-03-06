// miniprogram/pages/list/index.js
import bill from '../../api/bill'
import userbill from '../../api/userbill'

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    openid: "",
    queryResult: "",
    billid: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (app.globalData.openid) {
      this.setData({
        openid: app.globalData.openid
      })
    }

    if (options) {
      this.setData({
        billid: options.id
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    this.getList();

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
  getList: function() {
    var db = wx.cloud.database();

    db.collection('userbill').get({
      success(res) {
        console.log(res.data)
      }
    })
  },
  onAdd: function() {
    // userbill.getMyBills("oRG1c5cUBVn0I2MBjGif073N620E").then(result=>{

    //   console.log(result);
    // });

    userbill.addMyBill('XG5ZG5T75u22E3dc');
  }
})