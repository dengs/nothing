/**
 * @cbtak/nothing
 * version: v1.0.2
 * author: dengs
 * mail: cbtak@hotmail.com
 * github: https://github.com/cbtak/nothing.git
 *
 * 说明：平时积累常用的一些系统对象扩展、功能函数集
 */
const nothing = {
  /**
   * 深度拷贝
   * 示例：
   * let a = {name: 'this is a'}
   * let b = deepCopy(a)
   */
  deepCopy: (source) => {
    let result = source instanceof Array ? [] : {};
    // 日期类型直接返回
    if (source instanceof Date) {
      return source;
    }
    for (let key in source) {
      result[key] = source[key] && typeof source[key] === 'object' ? nothing.deepCopy(source[key]) : source[key];
    }
    return result;
  },
  /**
   * 是否为空(等于：null、''、undefined)
   * 示例：
   * let result = isNull(var) ? 'var is null' : 'var not null'
   * @param {*} val
   */
  isNull: (val) => val === null || val === '' || val === undefined,
  /**
   * 是否不为空(不等于：null、''、undefined)
   * 示例：
   * let result = isNotNull(var) ? 'var not null' : 'var is null'
   * @param {*} val
   */
  isNotNull: (val) => val !== null && val !== '' && val !== undefined,
  /**
   * 空值处理(类oracle nvl2)
   * 如果val为空，则返回val1，不为空时，则验证是否传递val2参数，如传递则返回val2，否则返回val
   * @param {*} val
   * @param {*} val1
   * @param {*} val2
   */
  ifNull: (val, val1, val2) => nothing.isNull(val) ? val1 : (val2 === undefined ? val : val2),
  /**
   * 匹配函数，类似 oracle 中的 decode
   * 说明: 取第一个参数与后续偶数位置的参数进行比较，如匹配则返回当前比较的偶数位置下一个参数作为结果
   * 如未找到匹配项目，并且参数个数大于3而且为偶数，则取最后一个参数作为默认值返回
   * 注: 参数为动态参数，参数个数最少为3，否则无意义
   *     偶数位置被比较的参数可以为数组
   *     比较使用 === 及 indexOf() 严格匹配值
   *     多个值包含匹配时，可传入数组(示例4)
   * 示例：
   * 1. caseValue('A', 'A', value1, 'B', value2) // 返回 value1
   * 2. caseValue('A', 'B', value1, 'A', value2) // 返回 value2
   * 3. caseValue('A', 'B', value1, 'C', value2, defaultValue) // 返回 defaultValue
   * 4. caseValue('A', 'B', value1, ['A','C'], value2, defaultValue) // 返回 value2
   * @param {*} args 动态参数
   */
  caseValue: (...args) => {
    if (!args || args.length < 3) return null;
    let caseKey = args[0];
    for (let i = 1; i < args.length; i++) {
      if ((i % 2) && i !== args.length - 1 && (args[i] === caseKey || (Array.isArray(args[i]) && args[i].indexOf(caseKey) !== -1))) {
        return args[i + 1] === undefined ? null : args[i + 1];
      }
    }
    return args.length > 3 && !(args.length % 2) ? args[args.length - 1] : null;
  },
  /**
   * 三元函数
   * expression 表达式成立则返回 result1，否则返回 result2
   * @param {*} expression
   * @param {*} result1
   * @param {*} result2
   */
  ternary: (expression, result1, result2) => expression ? result1 : result2,
  /**
   * 构建树型数据
   * 需要优化(暂不建议使用)
   * @param {*} params
   */
  buildTree: function (params) {
    if (!params.treeArray) {
      params.treeArray = []
    }
    if (params.element === null) {
      params.elementArray.forEach(function (item, index, array) {
        if (item[params.parentKey] === params.rootParentValue) {
          params.treeArray[params.treeArray.length] = item
        } else {
          nothing.buildTree({
            element: item,
            elementArray: params.elementArray,
            treeArray: params.treeArray,
            elementKey: params.elementKey,
            parentKey: params.parentKey,
            childKey: params.childKey,
            rootParentValue: params.rootParentValue
          })
        }
      })
    } else {
      params.elementArray.forEach(function (item, index, array) {
        if (params.element[params.parentKey] === item[params.elementKey]) {
          item[params.childKey] = item[params.childKey] || []
          item[params.childKey][item[params.childKey].length] = params.element
          // params.element.parentElement = item
        }
      })
    }
  },
  /**
   * 验证手机号码
   * @param {*} mobile
   */
  validateMobile: (mobile) => /^[1][3,4,5,7,8][0-9]{9}$/.test(mobile),
  /**
   * 数值型验证
   * @param {*} val
   */
  validateNumber: (val) => /^\d+(\.\d+)?$/.test(val),
  /**
   * 数值舍入处理（可指定小数位数和舍入模式）
   * @param {*} num       要格式化的数值
   * @param {*} precision 小数保留位数
   * @param {*} mode      舍入模式：0:Math.round  1:Math.ceil  -1:Math.floor
   */
  toFixed: (num, precision, mode) => {
    num = Number(num);
    precision = Number(precision || 0);
    mode = [0, 1, -1].contains(mode) ? mode : 0;
    // 舍入处理
    num = nothing.caseValue(mode,
      0, (precision ? Math.round(num * Math.pow(10, precision)) * (1 / Math.pow(10, precision)) : Math.round(num)),
      1, (precision ? Math.ceil(num * Math.pow(10, precision)) * (1 / Math.pow(10, precision)) : Math.ceil(num)),
      -1, (precision ? Math.floor(num * Math.pow(10, precision)) * (1 / Math.pow(10, precision)) : Math.floor(num))
    );
    return Number(num.toFixed(precision));
  },
  /**
   * 数值格式化
   * @param {*} num       要格式化的数值
   * @param {*} params    参数对象
   * params 参数对象说明：
   * {
   *  num              要格式化的数值
   *  params.mode      舍入模式：0:Math.round  1:Math.ceil  -1:Math.floor
   *  params.thousands 是否显示千分位
   *  params.precision 保留小数位数
   *  示例：
   *  numberFormat(12806.123)                                                返回：12806
   *  numberFormat(12806.123, {mode: 0, thousands: true, precision: 2})      返回：12,806.12
   *  numberFormat(12806.123, {mode: 1, precision: 2})                       返回：12806.13
   *  numberFormat(12806.126, {mode: -1, thousands: false, precision: 2})    返回：12806.12
   * }
   */
  numberFormat: (num, params) => {
    if (nothing.isNull(num)) return num;
    num = Number(num);
    params = params || {};
    // 舍入模式
    let mode = [0, 1, -1].contains(params.mode) ? params.mode : 0;
    // 是否显示千分位
    let thousands = nothing.isNull(params.thousands) ? false : params.thousands;
    // 显示小数位数
    let precision = nothing.isNull(params.precision) ? 0 : params.precision;
    // 舍入处理
    num = nothing.caseValue(mode,
      0, (precision ? Math.round(num * Math.pow(10, precision)) * (1 / Math.pow(10, precision)) : Math.round(num)),
      1, (precision ? Math.ceil(num * Math.pow(10, precision)) * (1 / Math.pow(10, precision)) : Math.ceil(num)),
      -1, (precision ? Math.floor(num * Math.pow(10, precision)) * (1 / Math.pow(10, precision)) : Math.floor(num))
    );
    // 按小数点分割为数组
    let tempArr = num.toString().split('.');
    // 小数点后的数值处理
    tempArr[1] = tempArr[1] || '';
    if (precision) {
      // 截去多余位数
      tempArr[1] = tempArr[1].substr(0, precision);
      // 小数位数处理（不够位数补0）
      tempArr[1] = '.' + tempArr[1] + new Array(precision - tempArr[1].length + 1).join('0');
    }
    // 根据是否显示千分位格式化返回
    return (thousands ? Number(tempArr[0]).replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') : tempArr[0]) + (precision ? tempArr[1] : '');
  },
  /**
   * 获取地址栏参数
   * 示例：
   * // http://www.xxx.com/index?userid=123
   * let userid = getParam('userid')
   * @param {*} key
   */
  getParam: (key) => {
    let reg = new RegExp('(^|&)' + key + '=([^&]*)(&|$)', 'i');
    let r = window.location.search.substr(1).match(reg);
    return r ? unescape(r[2]) : null;
  },
  /**
   * 系统对象功能扩展
   */
  initExtend: () => {
    /**
     * String对象扩展：替换全部
     * 示例：
     * let str = ' this is string '
     * let replaceStr = str.replaceAll('i','')
     */
    Object.defineProperty(String.prototype, 'replaceAll', {
      value (substr, replacement = '') {
        return this.replace(new RegExp(substr, 'gm'), replacement);
      }
    });
    Object.defineProperty(String, 'replaceAll', {
      value: (source, substr, replacement = '') => source.replaceAll(substr, replacement)
    });
    /**
     * String对象扩展：是否包含
     * @param {*} str
     */
    Object.defineProperty(String.prototype, 'contains', {
      value (str) {
        return this.indexOf(str) !== -1;
      }
    });
    Object.defineProperty(String, 'contains', {
      value: (source, instr) => source.contains(instr)
    });
    /**
     * String对象扩展：字符串转byte数组
     */
    Object.defineProperty(String.prototype, 'toByte', {
      value () {
        let [bytes, len, c] = [[], this.length, null];
        for (let i = 0; i < len; i++) {
          c = this.charCodeAt(i);
          if (c >= 0x010000 && c <= 0x10FFFF) {
            bytes.push((((c >> 18) & 0x07) | 0xF0), (((c >> 12) & 0x3F) | 0x80), (((c >> 6) & 0x3F) | 0x80), ((c & 0x3F) | 0x80));
          } else if (c >= 0x000800 && c <= 0x00FFFF) {
            bytes.push((((c >> 12) & 0x0F) | 0xE0), (((c >> 6) & 0x3F) | 0x80), ((c & 0x3F) | 0x80));
          } else if (c >= 0x000080 && c <= 0x0007FF) {
            bytes.push((((c >> 6) & 0x1F) | 0xC0), ((c & 0x3F) | 0x80));
          } else {
            bytes.push(c & 0xFF);
          }
        }
        return bytes;
      }
    });
    Object.defineProperty(String, 'toByte', {
      value: (str) => str.toByte()
    });
    /**
     * String对象扩展：byte数组转换字符串
     * @param {*} bytes
     */
    Object.defineProperty(String, 'fromByte', {
      value (bytes) {
        if (!Array.isArray(bytes)) return null;
        let str = '';
        for (let i = 0; i < bytes.length; i++) {
          let one = bytes[i].toString(2);
          let v = one.match(/^1+?(?=0)/);
          if (v && one.length === 8) {
            let bytesLength = v[0].length;
            let store = bytes[i].toString(2).slice(7 - bytesLength);
            for (let st = 1; st < bytesLength; st++) {
              store += bytes[st + i].toString(2).slice(2);
            }
            str += String.fromCharCode(parseInt(store, 2));
            i += bytesLength - 1;
          } else {
            str += String.fromCharCode(bytes[i]);
          }
        }
        return str;
      }
    });
    /**
     * Number对象扩展：数值格式化
     * @param {*} params 参数对象
     */
    Object.defineProperty(Number.prototype, 'format', {
      value (params) {
        return nothing.numberFormat(this, params);
      }
    });
    Object.defineProperty(Number, 'format', {
      value: (num, params) => Number(num).format(params)
    });
    /**
     * Number对象扩展：数值舍入处理（可指定小数位数和舍入模式）
     * @param {*} precision 小数保留位数
     * @param {*} mode      舍入模式：0:Math.round  1:Math.ceil  -1:Math.floor
     */
    Object.defineProperty(Number.prototype, 'toFixed', { value (precision, mode) { return nothing.toFixed(this, precision, mode); }});/**
    * Number对象扩展：数值舍入处理（可指定小数位数和舍入模式）
    * @param {*} num
    * @param {*} precision  小数保留位数
    * @param {*} mode       舍入模式：0:Math.round  1:Math.ceil  -1:Math.floor
    */
    Object.defineProperty(Number, 'toFixed', { value: (num, precision, mode) => Number(num).toFixed(precision, mode) });
    /**
     * Date对象扩展：日期格式化
     * @param {*} fmt   日期格式
     */
    Object.defineProperty(Date.prototype, 'format', {
      value (fmt) {
        if (fmt) fmt = fmt.replace('H', 'h').replace('H', 'h');
        let o = {
          'M+': this.getMonth() + 1, // 月份
          'd+': this.getDate(), // 日
          'h+': this.getHours(), // 小时
          'm+': this.getMinutes(), // 分
          's+': this.getSeconds(), // 秒
          'q+': Math.floor((this.getMonth() + 3) / 3), // 季度
          'S': this.getMilliseconds() // 毫秒
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
        for (let k in o) {
          if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
        }
        return fmt;
      }
    });
    /**
     * Date对象扩展：日期格式化
     * @param {*} date  日期
     * @param {*} fmt   日期格式
     */
    Object.defineProperty(Date, 'format', { value: (date, fmt) => new Date(date).format(fmt) });
    /**
     * Date对象扩展：日期计算
     * @param {*} interval
     * @param {*} number
     */
    Object.defineProperty(Date.prototype, 'add', {
      value (interval, number = 0) {
        let date = new Date(this);
        let k = {
          'y': 'FullYear',
          'q': 'Month',
          'm': 'Month',
          'w': 'Date',
          'd': 'Date',
          'h': 'Hours',
          'n': 'Minutes',
          's': 'Seconds',
          'ms': 'MilliSeconds'
        };
        let n = {'q': 3, 'w': 7};
        interval = (interval || '').toLowerCase();
        date['set' + k[interval]](date['get' + k[interval]]() + ((n[interval] || 1) * number));
        return date;
      }
    });
    /**
     * Date对象扩展：日期计算
     * @param {*} date
     * @param {*} interval
     * @param {*} number
     */
    Object.defineProperty(Date, 'add', { value: (date, interval, number) => nothing.ternary(date instanceof Date, date, new Date(date)).add(interval, number) });
    /**
     * Date对象扩展：日期差异
     * @param {*} diffDate
     * @param {*} interval
     */
    Object.defineProperty(Date.prototype, 'diff', {
      value (diffDate, interval) {
        let [time1, time2] = [this.getTime(), diffDate.getTime()];
        let result = nothing.caseValue(
          interval,
          'y', diffDate.getFullYear() - this.getFullYear(),
          'q', (diffDate.getFullYear() - this.getFullYear()) * 4 + Math.floor(diffDate.getMonth() / 4) - Math.floor(this.getMonth() / 4),
          'm', (diffDate.getFullYear() - this.getFullYear()) * 12 + diffDate.getMonth() - this.getMonth(),
          'ms', diffDate.getTime() - this.getTime(),
          'w', Math.floor((time2 + 345600000) / (604800000)) - Math.floor((time1 + 345600000) / (604800000)),
          'd', Math.floor(time2 / 86400000) - Math.floor(time1 / 86400000),
          'h', Math.floor(time2 / 3600000) - Math.floor(time1 / 3600000),
          'n', Math.floor(time2 / 60000) - Math.floor(time1 / 60000),
          's', Math.floor(time2 / 1000) - Math.floor(time1 / 1000)
        );
        return result;
      }
    });
    /**
     * Date对象扩展：日期差异
     * @param {*} diffDate1
     * @param {*} diffDate2
     * @param {*} interval
     */
    Object.defineProperty(Date, 'diff', { value: (diffDate1 , diffDate2, interval) => new Date(diffDate1).diff(diffDate2, interval) });
    /**
     * Array对象扩展：是否为空
     * @param {*} array
     */
    Object.defineProperty(Array, 'isEmpty', { value: (array) => !array || !array.length });
    /**
     * Array对象扩展：是否为空
     */
    Object.defineProperty(Array.prototype, 'isEmpty', { value () { return Array.isEmpty(this); }});
    /**
     * Array对象扩展：是否不为空
     * @param {*} array
     */
    Object.defineProperty(Array, 'isNotEmpty', { value: (array) => array && array.length });
    /**
     * Array对象扩展：是否不为空
     */
    Object.defineProperty(Array.prototype, 'isNotEmpty', { value () { return Array.isNotEmpty(this); }});
    /**
     * Array对象扩展：是否包含元素
     * @param {*} array
     * @param {*} element
     */
    Object.defineProperty(Array, 'contains', { value: (array, element) => !array && array.indexOf(element) !== -1 });
    /**
     * Array对象扩展：是否包含元素
     * @param {*} element
     */
    Object.defineProperty(Array.prototype, 'contains', { value (element) { return Array.contains(this, element); }});
    /**
     * Array对象扩展：添加元素（可指定位置）
     * @param {*} element   元素
     * @param {*} index     添加位置(可选，为空时添加到数组末尾)
     */
    Object.defineProperty(Array.prototype, 'add', {
      value (element, index) {
        if (nothing.isNotNull(index)) {
          this.splice(index, 0, element);
        } else {
          this.push(element);
        }
        return this;
      }
    });
    /**
     * Array对象扩展：添加元素（可指定位置）
     * @param {*} array     数组
     * @param {*} element   元素
     * @param {*} index     添加位置(可选，为空时添加到数组末尾)
     */
    Object.defineProperty(Array, 'add', { value: (array, element, index) => array.add(element, index) });
    /**
     * Array对象扩展：批量添加元素（可指定位置）
     * @param {*} elements  元素数组
     * @param {*} index     添加位置(可选，为空时添加到数组末尾)
     */
    Object.defineProperty(Array.prototype, 'addAll', { value (elements = [], index) {
      this.splice(nothing.ifNull(index, this.length), 0, ...elements);
      return this;
    }});
    /**
     * Array对象扩展：批量添加元素（可指定位置）
     * @param {*} array     数组
     * @param {*} elements  元素数组
     * @param {*} index     添加位置(可选，为空时添加到数组末尾)
     */
    Object.defineProperty(Array, 'addAll', { value: (array, elements, index) => array.addAll(elements, index) });
    /**
     * Array对象扩展：添加元素到数据第一个位置
     * @param {*} element 元素
     */
    Object.defineProperty(Array.prototype, 'addFirst', { value (element) { return this.add(element, 0); }});
    /**
     * Array对象扩展：添加元素到数据第一个位置
     * @param {*} array   数组
     * @param {*} element 元素
     */
    Object.defineProperty(Array, 'addFirst', { value: (array, element) => array.addFirst(element) });
    /**
     * Array对象扩展：获取数组第一个元素
     */
    Object.defineProperty(Array.prototype, 'first', { value () { return this[0] }});
    /**
     * Array对象扩展：获取数组第一个元素
     * @param {*} array   数组
     */
    Object.defineProperty(Array, 'first', { value: (array) => array.first() });
    /**
     * Array对象扩展：获取数组最后一个元素
     */
    Object.defineProperty(Array.prototype, 'last', { value () { return this[this.length - 1] }});
    /**
     * Array对象扩展：获取数组最后一个元素
     * @param {*} array   数组
     */
    Object.defineProperty(Array, 'last', { value: (array) => array.last() });
    /**
     * Array对象扩展：汇总数组元素（数值型有效）
     * @param {*} params  参数对象
     * params 说明：
     * {
     *  begin    开始位置
     *  end      结束位置
     * }
     */
    Object.defineProperty(Array.prototype, 'sum', { value ({begin, end} = {}) {
      let total = 0;
      begin = nothing.ifNull(begin, 0);
      end = nothing.ifNull(end, this.length);
      for (let i = 0; i < this.length; i++) {
        if (i >= begin && i < end) {
          total += Number(this[i] || 0);
        }
      }
      return total;
    }});
    /**
     * Array对象扩展：汇总数组元素（数值型有效）
     * @param {*} array   数组
     * @param {*} params  参数对象
     * params 说明：
     * {
     *  begin    开始位置
     *  end      结束位置
     * }
     */
    Object.defineProperty(Array, 'sum', { value: (array, params = {}) => array.sum(params) });
    /**
     * Array对象扩展：汇总数组元素对象指定属性
     * @param {*} params      参数对象
     * @param {*} attribute   汇总属性
     * params 说明：
     * {
     *  begin     开始位置
     *  end       结束位置
     * }
     */
    Object.defineProperty(Array.prototype, 'sumAttribute', { value (attribute, {begin, end} = {}) {
      let total = 0;
      begin = nothing.ifNull(begin, 0);
      end = nothing.ifNull(end, this.length);
      for (let i = 0; i < this.length; i++) {
        if (i >= begin && i < end) {
          total += Number(this[i][attribute] || 0);
        }
      }
      return total;
    }});
    /**
     * Array对象扩展：汇总数组元素对象指定属性
     * @param {*} array       数组
     * @param {*} attribute   汇总属性
     * @param {*} params      参数对象
     * params 说明：
     * {
     *  begin     开始位置
     *  end       结束位置
     * }
     */
    Object.defineProperty(Array, 'sumAttribute', { value: (array, attribute, params = {}) => array.sumAttribute(attribute, params) });
    /**
     * Array对象扩展：移除元素
     * @param {*} element
     */
    Object.defineProperty(Array.prototype, 'remove', { value (element) { this.splice(this.findIndex(item => item === element), 1); return this; }});
    /**
     * Array对象扩展：移除元素
     * @param {*} array
     * @param {*} element
     */
    Object.defineProperty(Array, 'remove', { value: (array, element) => array.remove(element) });
    /**
     * Array对象扩展：批量获取对象指定属性值
     * @param {*} attribute   属性
     * @param {*} params      参数对象
     * params 说明：
     * {
     *  begin     开始位置
     *  end       结束位置
     * }
     */
    Object.defineProperty(Array.prototype, 'getAttribute', { value (attribute, {begin, end} = {}) {
      let valArray = [];
      begin = nothing.ifNull(begin, 0);
      end = nothing.ifNull(end, this.length);
      for (let i = 0; i < this.length; i++) {
        if (i >= begin && i < end) {
          let val = (typeof this[i][attribute] === 'object' && !(this[i][attribute] instanceof Date) ? nothing.deepCopy(this[i][attribute]) : this[i][attribute]) || null;
          valArray.push(val);
        }
      }
      return valArray;
    }});
    /**
     * Array对象扩展：批量获取对象指定属性值
     * @param {*} array       数组
     * @param {*} attribute   属性
     * @param {*} params      参数对象
     * params 说明：
     * {
     *  begin     开始位置
     *  end       结束位置
     * }
     */
    Object.defineProperty(Array, 'getAttribute', { value: (array, attribute, params = {}) => array.getAttribute(attribute, params) });
    /**
     * Array对象扩展：批量设置指定属性值
     * @param {*} attribute   属性
     * @param {*} value       设置的值
     * @param {*} params      参数对象
     * params 说明：
     * {
     *  begin     开始位置
     *  end       结束位置
     * }
     */
    Object.defineProperty(Array.prototype, 'setAttribute', { value (attribute, value, {begin, end} = {}) {
      begin = nothing.ifNull(begin, 0);
      end = nothing.ifNull(end, this.length);
      for (let i = 0; i < this.length; i++) {
        if (i >= begin && i < end && typeof this[i] === 'object' && !(this[i] instanceof Date)) {
          this[i][attribute] = value;
        }
      }
      return this;
    }});
    /**
     * Array对象扩展：批量设置指定属性值
     * @param {*} array       数组
     * @param {*} attribute   属性
     * @param {*} value       设置的值
     * @param {*} params      参数对象
     * params 说明：
     * {
     *  begin     开始位置
     *  end       结束位置
     * }
     */
    Object.defineProperty(Array, 'setAttribute', { value: (array, attribute, value, params = {}) => array.setAttribute(attribute, value, params) });
    /**
     * Array对象扩展：批量删除指定属性
     * @param {*} attribute   属性(支持多个以数组形式)
     * @param {*} params      参数对象
     * params 说明：
     * {
     *  begin     开始位置
     *  end       结束位置
     * }
     */
    Object.defineProperty(Array.prototype, 'deleteAttribute', { value (attribute, {begin, end} = {}) {
      begin = nothing.ifNull(begin, 0);
      end = nothing.ifNull(end, this.length);
      let deleteAttributes = Array.isArray(attribute) ? attribute : [attribute];
      for (let i = 0; i < this.length; i++) {
        if (i >= begin && i < end && typeof this[i] === 'object' && !(this[i] instanceof Date)) {
          deleteAttributes.forEach(attr => delete this[i][attr]);
        }
      }
      return this;
    }});
    /**
     * Array对象扩展：批量删除指定属性
     * @param {*} array       数组
     * @param {*} attribute   属性(支持多个以数组形式)
     * @param {*} params      参数对象
     * params 说明：
     * {
     *  begin     开始位置
     *  end       结束位置
     * }
     */
    Object.defineProperty(Array, 'deleteAttribute', { value: (array, attribute, params = {}) => array.deleteAttribute(attribute, params) });
    /**
     * Array对象扩展：批量设置对象本身属性到指定属性
     * @param {*} sourceAttribute   源属性
     * @param {*} targetAttribute   目标属性
     * @param {*} params            参数对象
     * params 说明：
     * {
     *  begin     开始位置
     *  end       结束位置
     * }
     */
    Object.defineProperty(Array.prototype, 'setAttributeToAttribute', { value (sourceAttribute, targetAttribute, {begin, end} = {}) {
      begin = nothing.ifNull(begin, 0);
      end = nothing.ifNull(end, this.length);
      for (let i = 0; i < this.length; i++) {
        if (i >= begin && i < end && typeof this[i] === 'object' && !(this[i] instanceof Date)) {
          this[i][targetAttribute] = this[i][sourceAttribute];
        }
      }
      return this;
    }});
    /**
     * Array对象扩展：批量设置对象本身属性到指定属性
     * @param {*} array             数组
     * @param {*} sourceAttribute   源属性
     * @param {*} targetAttribute   目标属性
     * @param {*} params            参数对象
     * params 说明：
     * {
     *  begin     开始位置
     *  end       结束位置
     * }
     */
    Object.defineProperty(Array, 'setAttributeToAttribute', { value: (array, sourceAttribute, targetAttribute, params = {}) => array.setAttributeToAttribute(sourceAttribute, targetAttribute, params) });
  }
}
/**
 * 执行系统对象功能扩展
 */
nothing.initExtend();

module.exports = nothing;