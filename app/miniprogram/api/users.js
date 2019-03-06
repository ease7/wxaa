class Users {
  constructor(list) {
    this._list = list || [];
  }

  getUserIds() {
    let result = [];
    for (var index = 0; index < this._list.length; index++) {
      const element = this._list[index];
      result.push(element.openid);
    }

    return result;
  }

  getUsers(list) {
    let result = [];
    for (var index = 0; index < this._list.length; index++) {
      const element = this._list[index];
      result.push({
        openid: element.openid,
        avatarUrl: element.avatarUrl,
        nickName: element.nickName
      })
    }

    return result;
  }

  setUsers(list) {
    if (list && list.length > 0) {
      for (var index = 0; index < list.length; index++) {
        let element = list[index];

        this.removeUser(element);
        this._list.push(element);
      }

    }
  }

  removeUser(info) {

    if (info && info.openid) {
      let result = [];
      let existId = info.openid;

      for (var index = 0; index < this._list.length; index++) {
        const element = this._list[index];

        if (element.openid === existId) {
          continue;
        } else {
          result.push({
            openid: element.openid,
            avatarUrl: element.avatarUrl,
            nickName: element.nickName
          })
        }

      }

      this._list = result;
    }


  }
}

export default Users;