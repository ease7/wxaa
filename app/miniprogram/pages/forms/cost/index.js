// miniprogram/pages/forms/cost/index.js
import cost from '../../../api/cost';
import bill from '../../../api/bill';
import CachePool from '../../../api/CachePool.js';

var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    billId: "",
    userInfo: {},
    money: 0,
    moneyType: 0,
    users: [],
    costType: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let billId = options.billid;
    let globalUserInfo = app.globalData.userInfo;
    // billId = "XG-rVt7E7L4wQVwr";

    if (billId) {
      this.setData({
        billId: billId
      });
    }


    this.getBillItem(billId);
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
  /**
   * 获取账单详情
   */
  getBillItem: function(billId) {
    bill.getBillItem(billId).then(info => {
      console.log("当前账单信息:", billId);

      if (info) {
     
        CachePool.setValue(CachePool.BILL, info._id, info);
        let users = info.users;

        let options = [];

        for (let index = 0; index < users.length; index++) {
          const element = users[index];

          options.push({

            avatarUrl: element.avatarUrl,
            nickName: element.nickName,
            openid: element.openid,
            checked: true
          })
        }

        this.setData({
          users: options
        });
      }
    });
  },
  checkboxChange: function(event) {
    // console.log(event);
    let users = this.data.users;
    let checkValues = event.detail.value;
    let options = [];

    for (let index = 0; index < users.length; index++) {
      const element = users[index];


      if (checkValues.indexOf(element.openid) >= 0) {
        options.push({
          avatarUrl: element.avatarUrl,
          nickName: element.nickName,
          openid: element.openid,
          checked: true
        });
      } else {
        options.push({
          avatarUrl: element.avatarUrl,
          nickName: element.nickName,
          openid: element.openid,
          checked: false
        });
      }

    }

    this.setData({
      users: options
    });
  },
  /**
   * 金钱输入值存储
   */
  moneyChange: function(event) {
    console.log(event);

    let data = event.detail;

    this.setData({
      money: data.money,
      moneyType: data.type
    })
  },
  getCosters: function() {
    let users = this.data.users;
    let res = [];

    for (let index = 0; index < users.length; index++) {
      const element = users[index];


      if (element.checked) {
        res.push({
          avatarUrl: element.avatarUrl,
          nickName: element.nickName,
          openid: element.openid
        });
      }
    }

    return res;


  },
  typeChange: function(event) {
    let data = event.detail;

    let value = data.typeValue;

    this.setData({
      costType: value
    })
  },
  /**
   * 保存数据
   */
  saveClick: function() {
    let money = this.data.money;
    let moneyType = this.data.moneyType;
    let costType = this.data.costType;
    let billId = this.data.billId;
    let openid = app.globalData.openid;
    let userInfo = app.globalData.userInfo;
    let costers = this.getCosters(); // 参与AA的用户openid


    cost.saveCostItem({
      billId: billId,
      money: money,
      moneyType: moneyType,
      costType: costType,
      costers: costers
    }).then(res => {
      cost.sumBillCost(billId);
      wx.navigateBack();
    });
  }
})