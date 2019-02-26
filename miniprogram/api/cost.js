import db from './db';
import Users from './users';

class cost {


  // 保存消费项
  static saveCostItem(data) {
    if (data) {
      console.log("保存消费信息：", data);
      let users = new Users(data.costers);


      return db.add(db.COST, {
        money: data.money,
        moneyType: data.moneyType,
        costType: data.costType,
        costerIds: users.getUserIds(),
        costers: users.getUsers(),
        billId:data.billId,
        createTime: new Date().getTime(),
        updateTime: new Date().getTime()
      });

    }else{
      return new Promise((resolve,reject)=>{
        reject("无效的存储数据");
      })
    }

  }


  static getCostList(billid) {

    return db.getResultWhere(db.COST, {
      billId: billid
    });

  }
}

export default cost;