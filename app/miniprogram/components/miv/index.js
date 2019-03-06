// components/miv/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    data: {
      type: Object,
      value: undefined,
      observer: function(newVal, oldVal, changedPath) {

      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    /**
     * data 数据是否有效，无效显示错误
     * 0/undefined:显示加载中
     * 1/{...}:显示内容
     * -1/null:显示错误
     */
    status: 0
  },
  observers: {
    'data': function(value) {
      let status = -1;
      if (value === null || typeof value === "undefined") {
        // 数据还未加载，不显示错误消息
        status = 0; // 数据还未加载，显示加载中
      } else if (typeof value === "object") {
        if (value instanceof Array) {
          // 数组，判断长度
          if (value.length > 0) {
            status = 1;
          }
        } else {
          var count = 0;
          // 对象属性个数
          for (var i in value) {
            if (value.hasOwnProperty(i)) {
              // 建议加上判断,如果没有扩展对象属性可以不加
              count++;
            }
          }

          // 属性个数大于0为有效对象
          if (count > 0) {
            status = 1;
          }
        }
      } else if (typeof value === "string") {
        if (value.length === 0) status = 0;

        if (value.length > 0) {
          status = 1;
        }
      } else if (typeof value === "number") {
        if (value === 0) status = 0;

        let value = parseFloat(value);
        value = isNaN(value) ? -1 : value;

        if (value > 0) {
          status = 1;
        }
      }

      console.log("status:", status, ", value:", value);

      this.setData({
        status: status
      });
    }
  },


  /**
   * 组件的方法列表
   */
  methods: {

  }
})