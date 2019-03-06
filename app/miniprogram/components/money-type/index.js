// components/money-type/index.js
import costType from '../../api/costType'

Component({
  options: {
    addGlobalClass: true,
  },
  /**
   * 组件的属性列表
   */
  properties: {
    value: {
      type: Number,
      value: 0,
      observer: function(newVal, oldVal, changedPath) {
        let index = newVal;
        let types = this.data.currencyTypes;

        this.setData({
          currencyTypeIndex: index,
          currencyTypeValue: types[index].name
        })
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    currencyTypes: [],
    currencyTypeIndex: 0,
    currencyTypeValue: "",
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

      this.triggerEvent("valueChange", {
        type: index,
        typeName: typeValue
      })
    }
  },
  ready() {
    let types = costType.getTypes();
    let defaultIndex = this.data.value;

    console.log("defaultIndex:", defaultIndex);

    this.setData({
      currencyTypes: types,
      currencyTypeValue: types[defaultIndex].name
    })
  }
})