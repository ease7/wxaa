// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async(event, context) => {
  const db = cloud.database();
  let collectionName = event.name;
  let data = event.data;
  console.log("更新前的值：", data);

  var updateObj = {};
  for (var propertyName in data) {
    let value = data[propertyName];

    if (propertyName !== "_id" && propertyName !== "_openid") {

      updateObj[propertyName] = value;
    }
  }

  console.log("更新的值：", updateObj);

  return db.collection(collectionName).doc(data._id).update({
    data: updateObj
  });



}