// miniprogram/pages/forms/bill/index.js
import bill from '../../../api/bill'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    currencyType: 0,
    currencyTypeName: "",
    name: "",
    description: "",
    descriptionCount: 0,
    overWrite: false,
    editId: ""
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
          editId: editId
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

  },
  valueChange: function(event) {
    console.log(event);
    let value = event.detail;

    this.setData({
      currencyType: value.type,
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
    let overWrite = this.data.overWrite;
    let id = this.data.editId;
    let _this = this;

    wx.showLoading({
      title: '数据保存中',
      mask: true
    })

    if (name) {
      bill.saveBill({
        _id: id,
        name: name,
        description: description,
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