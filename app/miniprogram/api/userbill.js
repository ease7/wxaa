import db from './db';

class userbill {
    // 获取我的账单id列表
    static getMyBills() {
        return db.getResult(db.USER_BILL);
    }

    // 添加
    static addMyBill(billid) {

        db.getResultWhere(db.USER_BILL, {
            billid: billid
        }).then(res => {

            if (res && res.length > 0) {
                console.log("数据已经存在");
            } else {
                return db.add(db.USER_BILL, {
                    "billid": billid,
                    "createtime": new Date().getTime()
                }).then(res => {
                    console.log(res);
                })
            }

        })



    }
}

export default userbill;