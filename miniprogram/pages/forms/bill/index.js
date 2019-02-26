// miniprogram/pages/forms/bill/index.js
import bill from '../../../api/bill'

var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    currencyType: 1,
    currencyTypeName: "",
    name: "",
    description: "",
    descriptionCount: 0,
    overWrite: false,
    editId: "",
    users:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let editId = options.id;

    if (editId) {
      bill.getBillItem(editId).then(result => {
        console.log(result);
        this.setData({
          name: result.name,
          description: result.description,
          descriptionCount: result.description.length,
          currencyType: result.currencyType,
          editId: editId,
          users:result.users
        });
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
    let id = this.data.editId;

    return {
      title: "分享账单给你",
      path: "/pages/share/bill/index?billid=" + id
    }
  },
  valueChange: function(event) {
    
    let value = event.detail;
    console.log(value);
    this.setData({
      currencyType: value.typeValue,
      currencyTypeName: value.typeName
    })
  },
  inputNameBlur: function(event) {
    let value = event.detail.value;

    this.setData({
      name: value
    })
  },
  inputDesBlur: function(event) {
    let value = event.detail.value;

    this.setData({
      description: value,
      descriptionCount: value.length
    })
  },
  saveClick: function() {
    let name = this.data.name;
    let type = this.data.currencyType;
    let description = this.data.description;
    let id = this.data.editId;
    let billUsers = []; // 参与AA的用户
    let currentUserInfo = app.globalData.userInfo;
    let openid = app.globalData.openid;
    let _this = this;

    billUsers.push({
      openid: openid,
      avatarUrl: currentUserInfo.avatarUrl,
      nickName: currentUserInfo.nickName
    })


    wx.showLoading({
      title: '数据保存中',
      mask: true
    })

    if (name) {
      bill.saveBill({
        _id: id,
        copenid: openid,
        name: name,
        description: description,
        users: billUsers,
        currencyType: type
      }).then(res => {
        // 保存成功
        wx.hideLoading();
        wx.navigateBack()
      }).catch(e => {
        wx.hideLoading();
        console.error(e)
      })
    }


  }
})