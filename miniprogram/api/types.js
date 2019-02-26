class types {
  static getCostTypes() {
    return [{
      name: "餐饮",
      value: 1
    }, {
      name: "门票",
      value: 2
    }, {
      name: "住宿",
      value: 3
    }, {
      name: "其他",
      value: 0
    }]
  }

  static getCurrencyTypes() {
    return [{
      name: "人民币",
      value: 0
    }, {
      name: "美元",
      value: 1
    }, {
      name: "日元",
      value: 2
    }]
  }
}

export default types;