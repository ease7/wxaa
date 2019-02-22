// components/value/value.js

import * as utils from '../../js/utils';

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    type: {
      type: String,
      value: ""
    },
    value: {
      type: String,
      value: ""
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    displayValue: ""
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 转换日期
    parseIntToDate(value) {

    }
  },
  ready() {
    if (this.data.type === 'date') {
      let displayValue = utils.formatDate(this.data.value,"MM-dd hh:mm:ss") ;

      this.setData({
        displayValue: displayValue
      })
    } else {
      this.setData({
        displayValue: "sdfsdfs2"
      })
    }

  }
})