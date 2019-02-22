/**
 * 格式化一个毫秒日期
 * @param {number} miniseconds 毫秒日期
 * @param {string} fmt 日期格式
 */
export const formatDate = (value, fmt) => {
  let date = parseDate(value)

  if (date) {
    var o = {
      'M+': date.getMonth() + 1, // 月份
      'd+': date.getDate(), // 日
      'h+': date.getHours(), // 小时
      'm+': date.getMinutes(), // 分
      's+': date.getSeconds(), // 秒
      'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
      S: date.getMilliseconds() // 毫秒
    }
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    for (var k in o) {
      if (new RegExp('(' + k + ')').test(fmt)) {
        fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length))
      }
    }

    return fmt
  }
}

/**
 * 转换为日期格式
 * @param {*} value
 */
export const parseDate = value => {
  if (value) {
    var date = new Date();
    if (value instanceof Date) {
      date = value
    } else if (typeof value === 'number') {
      date.setTime(value)
    } else {
      if (value.length === 6) {
        value = value.substr(0, 4) + '/' + value.substr(4, 2) + '/' + '01'
      } else if (value.length === 8) {
        value = value.substr(0, 4) + '/' + value.substr(4, 2) + '/' + value.substr(6, 2)
      } else if (value.length === 12) {
        value = `${value.substr(0, 4)}/${value.substr(4, 2)}/${value.substr(6, 2)} ${value.substr(
          8,
          2
        )}:${value.substr(10, 2)}:00`
      }

      if (value.indexOf('-') > 0) {
        value = value.replace(/-/g, '/').replace('T', ' ')

        if (value.indexOf('.') > 0) {
          value = value.substr(0, value.indexOf('.'))
        }
      }

      if (value.indexOf('/') > 0) {
        date = new Date(value)
      } else {
        date = new Date();
        let time = parseFloat(value)
        date.setTime(time)
      }
    }

    return date;
  }
}