import db from './db';
import userbill from './userbill';

class bill {

  // 保存一个账单
  static saveBill(obj) {
    if (obj) {
      if (obj._id) {
        // 直接更新
        return db.update(db.BILL, {
          _id: obj._id,
          name: obj.name,
          description: obj.description,
          currencyType: obj.currencyType,
          updateTime: new Date().getTime()
        }).then(res => {
          console.log("更新结果：", res)
        });
      } else if (obj.name) {
        // 查询名称已经存在的记录
        return db.getResultWhere(db.BILL, {
          name: obj.name
        }).then(result => {
          console.log("查询结果", result);

          if (result && result.length > 0) {
            let existObj = result[0];
            let existId = existObj._id;

            obj._id = existId;
            this.saveBill(obj);
          } else {
            // 添加结果
            return db.add(db.BILL, {
              name: obj.name,
              description: obj.description,
              currencyType: obj.currencyType,
              createTime: new Date().getTime(),
              updateTime: new Date().getTime()
            }).then(res => {
              console.log("添加账单结果:", res);
              return userbill.addMyBill(res._id);
            });
          }



        })
      }


    } else {
      return new Promise((resolve, reject) => {
        reject(-4)
      })
    }



  }

  static getBillItem(id) {
    return db.getResultWhere(db.BILL, {
      _id: id
    }).then(list => {

      if (list && list.length > 0) {
        return list[0];
      }
    })
  }

  static getMyBillList() {
    return userbill.getMyBills().then(list => {
      var query = [];

      if (list && list.length > 0) {
        list.forEach(element => {
          query.push(element.billid);
        });
      }

      console.log("我的账单列表:", query)

      if (query.length > 0) {
        return db.getResultWhere(db.BILL, {
          _id: {
            type: "_in",
            value: query
          }
        });
      }
    })
  }
}

export default bill;