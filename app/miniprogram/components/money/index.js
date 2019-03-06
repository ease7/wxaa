// components/money/index.js
import currency from '../../api/currency';

Component({
  options: {
    addGlobalClass: true,
  },
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    currencyTypes: [],
    currencyTypeIndex: 0,
    currencyTypeValue: "",
    money: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    bindTypeChange: function(event) {

      let index = parseInt(event.detail.value);
      let typeValue = this.data.currencyTypes[index].name;

      this.setData({
        currencyTypeValue: typeValue,
        currencyTypeIndex: index
      });

      this.triggerEvent("moneyChange", {
        money: this.data.money,
        type: index,
        typeName: typeValue
      })
    },
    inputChange: function(event) {
      let inputValue = event.detail.value;

      this.setData({
        money: inputValue
      });

      this.triggerEvent("moneyChange", {
        money: inputValue,
        type: this.data.currencyTypeIndex,
        typeName: this.data.currencyTypeValue,
      })


    }
  },
  ready() {
    let types = currency.getTypes();

    console.log(types)

    this.setData({
      currencyTypes: types,
      currencyTypeValue: types[0].name
    })
  }

})