import db from './db';
import userbill from './userbill';
import Users from './users.js';

class bill {


  static addBill(obj) {
    let users = new Users(obj.users);
    // 添加结果
    return db.add(db.BILL, {
      name: obj.name,
      description: obj.description,
      currencyType: obj.currencyType,
      userIds: users.getUserIds(),
      users: users.getUsers(),
      createTime: new Date().getTime(),
      updateTime: new Date().getTime()
    }).then(res => {
      console.log("添加账单结果:", res);
      return userbill.addMyBill(res._id);
    });
  }

  // 保存一个账单
  static saveBill(obj) {
    if (obj) {
      if (obj._id) {
        return db.getResultWhere(db.BILL, {
          _id: obj._id
        }).then(existList => {

          if (existList && existList.length > 0) {
            // id查找存在的记录
            let existItem = existList[0];
            let users = new Users(existItem.users);
            users.setUsers(obj.users);

            console.log(obj.users);

            // 直接更新
            return db.update(db.BILL, {
              _id: existItem._id,
              _openid: existItem._openid,
              copenid: obj.copenid,
              name: obj.name,
              description: obj.description,
              currencyType: obj.currencyType,
              updateTime: new Date().getTime(),
              userIds: users.getUserIds(),
              users: users.getUsers()
            }).then(res => {
              console.log("更新结果：", res)
            });
          } else {
            return this.addBill(obj);
          }
        })


      } else {
        return this.addBill(obj);
      }
    } else {
      return new Promise((resolve, reject) => {
        reject(-4)
      })
    }
  }

  static addToBill(user, billid) {

    if (billid) {
      return db.getResultWhere(db.BILL, {
        _id: billid
      }).then(existList => {

        if (existList && existList.length > 0) {
          // id查找存在的记录
          let existItem = existList[0];
          let users = new Users(existItem.users);
          users.setUsers([user]);
          console.log("[log]:", users.getUserIds());

          // 直接更新
          return db.update(db.BILL, {
            _id: existItem._id,
            _openid: existItem._openid,
            copenid: user.openid,
            updateTime: new Date().getTime(),
            userIds: users.getUserIds(),
            users: users.getUsers()
          }).then(res => {
            console.log("更新结果：", res)
          });
        }
      })
    } else {
      return new Promise((resolve, reject) => {
        reject("无效的billId");
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

  static getMyBillList(openid) {
    return db.getResultWhere(db.BILL, {
      userIds: {
        type: "_in",
        value: [openid]
      }
    });
  }
}

export default bill;