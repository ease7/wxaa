import db from './db';
import Users from './users';
import bill from './bill';
import CachePool from './CachePool.js';

class cost {


  // 保存消费项
  static saveCostItem(data) {
    if (data) {

      let users = new Users(data.costers);

      let addObj = {
        money: data.money,
        moneyType: data.moneyType,
        costType: data.costType,
        costerIds: users.getUserIds(),
        costers: users.getUsers(),
        billId: data.billId,
        createTime: new Date().getTime(),
        updateTime: new Date().getTime()
      };

      console.log("保存消费信息：", addObj);


      return db.add(db.COST, addObj);

    } else {
      return new Promise((resolve, reject) => {
        reject("无效的存储数据");
      })
    }

  }

  /**
   * 获取账单消费价列表
   * @param {*} billid 
   */
  static getCostList(billid) {

    return db.getResultWhere(db.COST, {
      billId: billid
    });

  }

  /**
   * 计算账单总价
   * @param {*} billId 
   */
  static sumBillCost(billId) {
    let existBill = CachePool.getValue(CachePool.BILL, billId);
    let openid = CachePool.openid;

    this.getCostList(billId).then(list => {
      list = list || [];
      let total = 0;
      for (let index = 0; index < list.length; index++) {
        const element = list[index];

        let price = parseInt(element.money);
        price = isNaN(price) ? 0 : price;
        total += price;
      }

      // 直接更新
      return db.update(db.BILL, {
        _id: existBill._id,
        _openid: existBill._openid,
        copenid: openid,
        total: total,
        updateTime: new Date().getTime()
      }).then(res => {
        console.log("更新结果：", res)
      });
    });



    console.log(existBill);
  }
}

export default cost;