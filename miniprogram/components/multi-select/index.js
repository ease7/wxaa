import apiTypes from '../../api/types'

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
        let types = this.data.typeList;

        this.setData({
          selectedIndex: index,
          selectedValue: types[index].name
        })
      }
    },
    type: {
      type: String,
      value: "currency"
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    typeList: [],
    selectedIndex: 0,
    selectedValue: "",
  },

  /**
   * 组件的方法列表
   */
  methods: {
    bindTypeChange: function(event) {

      let index = parseInt(event.detail.value);
      let types = this.data.typeList;
      let typeValue = this.data.typeList[index].name;

      this.setData({
        selectedValue: typeValue,
        selectedIndex: index
      });

      this.triggerEvent("valueChange", {
        typeValue: types[index].value,
        typeName: typeValue
      })
    }
  },
  ready() {


    let types = apiTypes.getCurrencyTypes();

    if (this.data.type === "cost") {
      types = apiTypes.getCostTypes();
    }

    console.log("type list:", types);

    let defaultIndex = this.data.value;

    console.log("defaultIndex:", defaultIndex);

    this.setData({
      typeList: types,
      selectedValue: types[defaultIndex].name
    })
  }
})