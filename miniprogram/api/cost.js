import db from './db';

class cost {


  // 保存消费项
  static saveCostItem() {
    db.add(db.COST, {

    })
  }


  static getCostList(billid) {

    return db.getResultWhere(db.COST, {
      billId: billid
    });

  }
}

export default cost;