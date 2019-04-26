/**
 * @cbtak/nothing
 * author: dengs
 * email: cbtak@hotmail.com
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
  deepCopy: (source, ignoreFunction = false) => {
    // 非对象类型直接返回
    if (!(source instanceof Object)) return source;
    // 日期类型直接返回
    if (source instanceof Date) return new Date(source);
    let result = source instanceof Array ? [] : {};
    for (let key in source) {
      // 为函数属性根据 ignoreFunction 处理是否忽略
      if (typeof source[key] === "function" && ignoreFunction) continue;
      result[key] = source[key] && typeof source[key] === 'object' ? nothing.deepCopy(source[key], ignoreFunction) : source[key];
    }
    return result;
  },
  /**
   * 是否为空(等于：null、undefined、'')
   * 示例：
   * let result = isNull(var) ? 'var is null' : 'var not null'
   * @param {*} val
   */
  isNull: (val) => val === null || val === undefined || val === '',
  /**
   * 是否不为空(不等于：null、undefined、'')
   * 示例：
   * let result = isNotNull(var) ? 'var not null' : 'var is null'
   * @param {*} val
   */
  isNotNull: (val) => val !== null && val !== undefined && val !== '',
  /**
   * 是否为空字符串(等于：null、undefined、''、'  ')
   * 示例：
   * let result = isBlank(var) ? 'var is blank' : 'var not blank'
   * @param {*} val
   */
  isBlank: (val) => val === null || val === undefined || val === '' || String(val) === '',
  /**
   * 是否不为空字符串(不等于：null、undefined、''、'  ')
   * 示例：
   * let result = isNotBlank(var) ? 'var not blank' : 'var is blank'
   * @param {*} val
   */
  isNotBlank: (val) => val !== null && val !== undefined && val !== '' && String(val) !== '',
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
   * @param {*} treeDataArray   树节点数据集合(一维)
   * @param {*} options         参数项(可选)
   * options 说明：
   * {
   *  nodeKey     节点唯一标识(默认：id)
   *  parentKey   父节点唯一标识(默认：parentId)
   *  childrenKey 子节点集合标识(默认：children)
   *  root        指定作为根节点的项目唯一标识(指定多个时用数组表示)
   * }
   */
  buildTree: (treeDataArray = [], {nodeKey = 'id', parentKey = 'parentId', childrenKey = 'children', root = null} = {}) => {
    let [tree, nodeSet] = [[], {}];
    treeDataArray.forEach(node => {
      nodeSet[node[nodeKey]] = node;
    });
    for (let key in nodeSet) {
      let node = nodeSet[key];
      if(nothing.isNotNull(node[parentKey]) && nodeSet[node[parentKey]] && !(Array.isArray(root) ? root : [root]).contains(node[parentKey])) {
        if(!nodeSet[node[parentKey]][childrenKey]) {
          nodeSet[node[parentKey]][childrenKey] = [];
        }
        nodeSet[node[parentKey]][childrenKey].push(node);
      } else {
        tree.push(node);
      }
    }
    return tree;
  },
  /**
   * 数值型的舍入处理(可指定舍入模式)
   * 作为Number(num).toFixed(2) 的增强版本
   * @param {*} num       要舍入处理的数值
   * @param {*} options   参数值
   * options 说明：
   * {
   *  precision   保留小数位数
   *  mode        舍入模式：0:Math.round  1:Math.ceil  -1:Math.floor
   * }
   */
  toFixed: (num, {precision, mode} = {}) => {
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
   * @param {*} options    参数对象
   * params 参数对象说明：
   * {
   *  mode      舍入模式：0:Math.round  1:Math.ceil  -1:Math.floor
   *  thousands 是否显示千分位
   *  precision 保留小数位数
   * }
   *  示例：
   *  numberFormat(12806.123)                                                返回：12806
   *  numberFormat(12806.123, {mode: 0, thousands: true, precision: 2})      返回：12,806.12
   *  numberFormat(12806.123, {mode: 1, precision: 2})                       返回：12806.13
   *  numberFormat(12806.126, {mode: -1, thousands: false, precision: 2})    返回：12806.12
   */
  numberFormat: (num, options) => {
    if (nothing.isNull(num)) return num;
    num = Number(num);
    options = options || {};
    // 舍入模式
    let mode = [0, 1, -1].contains(options.mode) ? options.mode : 0;
    // 是否显示千分位
    let thousands = nothing.isNull(options.thousands) ? false : options.thousands;
    // 显示小数位数
    let precision = nothing.isNull(options.precision) ? 0 : options.precision;
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
   * 数值舍入处理（可指定小数位数和舍入模式）
   * @param {*} num       要格式化的数值
   * @param {*} precision 小数保留位数
   * @param {*} mode      舍入模式：0:Math.round  1:Math.ceil  -1:Math.floor
   */
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
   * 检查对象是否具有指定属性
   * @param {*} object    检查的对象
   * @param {*} property  检查的属性(支持多级属性，以"."分隔)
   */
  hasOwnProperty: (object, property) => {
    if (object && nothing.isNotNull(property)) {
      let attrs = property.split('.');
      for (let i = 0; i < attrs.length - 1; i++) {
        object = object[attrs[i]];
        if (nothing.isNull(object)) return false;
      }
      if (object.hasOwnProperty && object.hasOwnProperty(attrs[attrs.length - 1])) {
        return true;
      }
    }
    return false;
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
   * 系统对象功能扩展定义
   */
  extend: {
    /**
     * Object 对象扩展
     */
    Object: () => {
      if (!nothing.hasOwnProperty(Object, 'clone')) {
        /**
         * 对象克隆(深拷贝)
         * @param {*} source 要克隆的对象
         * @param {*} ignoreFunction
         */
        Object.defineProperty(Object, 'clone', { value :(source, ignoreFunction) => nothing.deepCopy(source, ignoreFunction) });
      }
      if (!nothing.hasOwnProperty(Object.prototype, 'clone')) {
        // 需要排除微信小程序环境(不想依赖jssdk，临时校验是否有wx对象及wx.login函数)
        if (typeof wx !== 'undefined' && !wx.login) {
          console.warn("## nothing.js warning ## : 当前环境不支持 Object.prototype 原型方式扩展clone函数. ");
        } else {
          /**
           * 对象实例克隆(深拷贝)
           */
          Object.defineProperty(Object.prototype, 'clone', {
            value (ignoreFunction) {
              return nothing.deepCopy(this, ignoreFunction);
            }
          });
        }
      }
    },
    String: () => {
      if (!nothing.hasOwnProperty(String, 'replaceAll')) {
        /**
         * String对象扩展：替换全部
         * @param {*} source
         * @param {*} substr
         * @param {*} replacement
         * 示例：
         * let str = ' this is string '
         * let replaceStr = String.replaceAll(str, 'i','')
         */
        Object.defineProperty(String, 'replaceAll', {
          value: (source, substr, replacement = '') => source.replace(new RegExp(substr, 'gm'), replacement)
        });
      }
      if (!nothing.hasOwnProperty(String.prototype, 'replaceAll')) {
        /**
         * String对象实例扩展：替换全部
         * @param {*} substr
         * @param {*} replacement
         * 示例：
         * let str = ' this is string '
         * let replaceStr = str.replaceAll('i','')
         */
        Object.defineProperty(String.prototype, 'replaceAll', {
          value (substr, replacement = '') {
            return String.replaceAll(this, substr, replacement);
          }
        });
      }
      if (!nothing.hasOwnProperty(String, 'contains')) {
        /**
         * String对象扩展：是否包含
         * @param {*} source
         * @param {*} instr
         */
        Object.defineProperty(String, 'contains', {
          value: (source, instr) => source.indexOf(instr) !== -1
        });
      }
      if (!nothing.hasOwnProperty(String.prototype, 'contains')) {
        /**
         * String对象实例扩展：是否包含
         * @param {*} instr
         */
        Object.defineProperty(String.prototype, 'contains', {
          value (instr) {
            return String.contains(this, instr);
          }
        });
      }
      if (!nothing.hasOwnProperty(String, 'toByte')) {
        Object.defineProperty(String, 'toByte', {
          value: (str) => {
            let [bytes, len, c] = [[], str.length, null];
            for (let i = 0; i < len; i++) {
              c = str.charCodeAt(i);
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
      }
      if (!nothing.hasOwnProperty(String.prototype, 'toByte')) {
        /**
         * String对象扩展：字符串转byte数组
         */
        Object.defineProperty(String.prototype, 'toByte', {
          value () {
            return String.toByte(this);
          }
        });
      }
      if (!nothing.hasOwnProperty(String, 'fromByte')) {
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
      }
      if (!nothing.hasOwnProperty(String, 'from')) {
        /**
         * String对象扩展：将对象转换为字符串(日期型可指定格式)
         * @param {*} object
         * @param {*} format  格式(可选，对日期类型有效)
         */
        Object.defineProperty(String, 'from', {
          value (object, format) {
            if (nothing.isNull(object) || typeof object === 'string') return object;
            // if (Array.isArray(object)) return String(object);
            if (object instanceof Date) return object.format(format || 'yyyy-MM-dd hh:mm:ss');
            return JSON.stringify(object);
          }
        });
      }
      if (!nothing.hasOwnProperty(String, 'isString')) {
        /**
         * String对象扩展：校验对象是否为字符串
         * @param {*} object
         */
        Object.defineProperty(String, 'isString', { value: (object) => typeof object === 'string' });
      }
    },
    Number: () => {
      if (!nothing.hasOwnProperty(Number, 'format')) {
        /**
         * Number对象扩展：数值格式化
         * @param {*} options 参数项
         */
        Object.defineProperty(Number, 'format', {
          value: (num, options) => nothing.numberFormat(num, options)
        });
      }
      if (!nothing.hasOwnProperty(Number.prototype, 'format')) {
        /**
         * Number对象实例扩展：数值格式化
         * @param {*} options 参数项
         */
        Object.defineProperty(Number.prototype, 'format', {
          value (options) {
            return nothing.numberFormat(this, options);
          }
        });
      }
      if (!nothing.hasOwnProperty(Number, 'toFixed2')) {
        /**
         * Number对象扩展：数值舍入处理（可指定小数位数和舍入模式）
         * @param {*} num
         * @param {*} options   参数项
         * options 说明：
         * {
         *  precision   保留小数位数
         *  mode        舍入模式：0:Math.round  1:Math.ceil  -1:Math.floor
         */
        Object.defineProperty(Number, 'toFixed2', { value: (num, options = {}) => nothing.toFixed(num, options) });
      }
      if (!nothing.hasOwnProperty(Number.prototype, 'toFixed2')) {
        /**
         * Number对象实例扩展：数值舍入处理（可指定小数位数和舍入模式）
         * @param {*} options   参数项
         * options 说明：
         * {
         *  precision   保留小数位数
         *  mode        舍入模式：0:Math.round  1:Math.ceil  -1:Math.floor
         * }
         */
        Object.defineProperty(Number.prototype, 'toFixed2', {
          value (options = {}) {
            return nothing.toFixed(this, options); 
          }
        });
      }
    },
    Date: () => {
      if (!nothing.hasOwnProperty(Date, 'format')) {
        /**
         * Date对象扩展：日期格式化
         * @param {*} date  日期
         * @param {*} fmt   日期格式
         */
        Object.defineProperty(Date, 'format', {
          value: (date, fmt) => {
            if (fmt) fmt = fmt.replace('H', 'h').replace('H', 'h');
            let o = {
              'M+': date.getMonth() + 1, // 月份
              'd+': date.getDate(), // 日
              'h+': date.getHours(), // 小时
              'm+': date.getMinutes(), // 分
              's+': date.getSeconds(), // 秒
              'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
              'S': date.getMilliseconds() // 毫秒
            };
            if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
            for (let k in o) {
              if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
            }
            return fmt;
          } 
        });
      }
      if (!nothing.hasOwnProperty(Date.prototype, 'format')) {
        /**
         * Date对象实例扩展：日期格式化
         * @param {*} fmt   日期格式
         */
        Object.defineProperty(Date.prototype, 'format', {
          value (fmt) {
            return Date.format(this, fmt);
          }
        });
      }
      if (!nothing.hasOwnProperty(Date, 'add')) {
        /**
         * Date对象扩展：日期计算
         * @param {*} date
         * @param {*} interval
         * @param {*} number
         */
        Object.defineProperty(Date, 'add', {
          value: (date, interval, number) => {
            date = new Date(date);
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
      }
      if (!nothing.hasOwnProperty(Date.prototype, 'add')) {
        /**
         * Date对象实例扩展：日期计算
         * @param {*} interval
         * @param {*} number
         */
        Object.defineProperty(Date.prototype, 'add', {
          value (interval, number = 0) {
            return Date.add(this, interval, number);
          }
        });
      }
      if (!nothing.hasOwnProperty(Date, 'diff')) {
        /**
         * Date对象扩展：日期差异
         * @param {*} diffDate1
         * @param {*} diffDate2
         * @param {*} interval
         */
        Object.defineProperty(Date, 'diff', {
          value: (diffDate1 , diffDate2, interval = 'd') => {
            let [time1, time2] = [diffDate1.getTime(), diffDate2.getTime()];
            let result = nothing.caseValue(
              interval,
              'y', diffDate2.getFullYear() - diffDate1.getFullYear(),
              'q', (diffDate2.getFullYear() - diffDate1.getFullYear()) * 4 + Math.floor(diffDate2.getMonth() / 4) - Math.floor(diffDate1.getMonth() / 4),
              'm', (diffDate2.getFullYear() - diffDate1.getFullYear()) * 12 + diffDate2.getMonth() - diffDate1.getMonth(),
              'ms', diffDate2.getTime() - diffDate1.getTime(),
              'w', Math.floor((time2 + 345600000) / (604800000)) - Math.floor((time1 + 345600000) / (604800000)),
              'd', Math.floor(time2 / 86400000) - Math.floor(time1 / 86400000),
              'h', Math.floor(time2 / 3600000) - Math.floor(time1 / 3600000),
              'n', Math.floor(time2 / 60000) - Math.floor(time1 / 60000),
              's', Math.floor(time2 / 1000) - Math.floor(time1 / 1000)
            );
            return result;
          }
        });
      }
      if (!nothing.hasOwnProperty(Date.prototype, 'diff')) {
        /**
         * Date对象实例扩展：日期差异
         * @param {*} diffDate
         * @param {*} interval  默认：d 天
         */
        Object.defineProperty(Date.prototype, 'diff', {
          value (diffDate, interval = 'd') {
            return new Date.diff(this, diffDate, interval);
          }
        });
      }
    },
    JSON: () => {
      if (!nothing.hasOwnProperty(JSON, 'new')) {
        /**
         * JSON对象扩展：传入JSON对象，创建新JSON对象（args动态指定属性集）
         * @param {*} json 要构建的对象
         * @param {*} args 动态指定属性集
         */
        Object.defineProperty(JSON, 'new', {
          value :(json, ...args) => {
            if (!json) return null;
            let newJson = {};
            let tempJson = nothing.deepCopy(json);
            if (!args || !args.length) return newJson;
            for (let i = 0; i < args.length; i++) {
              if (nothing.isNull(args[i])) continue;
              if (args[i].contains('.')) {
                let attrs = args[i].split('.');
                let childJson = newJson[attrs[0]] = newJson[attrs[0]] || {};
                let tempChildJson = tempJson[attrs[0]] || {};
                for (let ii = 1; ii < attrs.length; ii++) {
                  if (ii === attrs.length - 1) {
                    childJson[attrs[ii]] = nothing.isNotNull(tempChildJson) ? tempChildJson[attrs[ii]] : null;
                  } else {
                    childJson = childJson[attrs[ii]] = childJson[attrs[ii]] || {};
                    tempChildJson = nothing.isNotNull(tempChildJson) ? tempChildJson[attrs[ii]] : null;
                  }
                }
              } else {
                newJson[args[i]] = tempJson[args[i]];
              }
            }
            tempJson = null;
            return newJson;
          }
        });
      }
      if (!nothing.hasOwnProperty(JSON, 'toFormSerializeArray')) {
        Object.defineProperty(JSON, 'toFormSerializeArray', {
          value :(json) => {
            let _arr = []
            let _toArray = function (json, jsonArray, prefix) {
              for (let key in json) {
                if (typeof json[key] === 'function') {
                  continue;
                }
                let newKey = (prefix ? prefix + '.' : '') + key
                if (typeof json[key] === 'object' && !(json[key] instanceof Array)) {
                  _toArray(json[key], jsonArray, newKey)
                } else {
                  jsonArray[jsonArray.length] = {
                    name: newKey,
                    value: json[key]
                  }
                }
              }
            }
            _toArray(json, _arr)
            return _arr;
          }
        });
      }
      if (!nothing.hasOwnProperty(JSON, 'formSerializeArrayToJson')) {
        Object.defineProperty(JSON, 'formSerializeArrayToJson', {
          value :(formSerializeArray = []) => {
            let json = {};
            formSerializeArray.forEach((item) => {
                let tempAttrs = item.name.split(".");
                let tempParent = json;
                tempAttrs.forEach((attr, attrIndex) => {
                    if(attr.indexOf("[") != -1) {
                        let key = attr.substr(0, attr.indexOf("["));
                        let index = attr.substr(key.length + 1, attr.indexOf("]") - key.length - 1);
                        tempParent[key] = tempParent[key] || [];
                        tempParent[key][index] = tempParent[key][index] || {};
                        tempParent = tempParent[key][index];
                    } else {
                        tempParent[attr] = attrIndex === tempAttrs.length - 1 ? item.value : {};
                        tempParent = tempParent[attr];
                    }
                });
            });
            return json;
          }
        });
      }
      if (!nothing.hasOwnProperty(JSON, 'keys')) {
        Object.defineProperty(JSON, 'keys', {
          value :(json) => {
            return Object.keys(json);
          }
        });
      }
      if (!nothing.hasOwnProperty(JSON, 'clear')) {
        Object.defineProperty(JSON, 'clear', {
          value :(json) => {
            if(json) {
              JSON.keys(json).forEach(key => {
                delete json[key];
              })
            }
            return json;
          }
        });
      }
      if (!nothing.hasOwnProperty(JSON, 'remove')) {
        Object.defineProperty(JSON, 'remove', {
          value :(json, ...keys) => {
            if(json && keys && keys.length) {
              keys.forEach(key => {
                delete json[key];
              })
            }
            return json;
          }
        });
      }
      if (!nothing.hasOwnProperty(JSON, 'getAttribute')) {
        Object.defineProperty(JSON, 'getAttribute', {
          value :(json, attribute) => {
            if (attribute.contains('.')) {
              let attrs = attribute.split('.');
              let child = json;
              for (let i = 0; i < attrs.length; i++) {
                if (i === attrs.length - 1) {
                  return child[attrs[i]];
                } else {
                  child = child[attrs[i]];
                  if (!child) return null;
                }
              }
            } else {
              return json[attribute];
            }
          }
        });
      }
      if (!nothing.hasOwnProperty(JSON, 'setAttribute')) {
        Object.defineProperty(JSON, 'setAttribute', {
          value :(json, attribute, value) => {
            if (attribute.contains('.')) {
              let attrs = attribute.split('.');
              let child = json;
              attrs.forEach((attr, index) => {
                if (index === attrs.length - 1) {
                  child[attr] = value;
                } else {
                  child = child[attr] = child[attr] || {};
                }
              })
            } else {
              json[attribute] = value;
            }
          }
        });
      }
      if (nothing.hasOwnProperty(JSON, 'prototype')) {
        if (!nothing.hasOwnProperty(JSON.prototype, 'new')) {
          /**
           * JSON对象实例扩展：创建新JSON对象（args动态指定属性集）
           * @param {*} args 动态指定属性集
           */
          Object.defineProperty(JSON.prototype, 'new', {
            value (...args) {
              return JSON.new(this, ...args);
            }
          });
        }
        if (!nothing.hasOwnProperty(JSON.prototype, 'toFormSerializeArray')) {
          Object.defineProperty(JSON.prototype, 'toFormSerializeArray', {
            value () {
              return JSON.serializeArray(this);
            }
          });
        }
        if (!nothing.hasOwnProperty(JSON.prototype, 'keys')) {
          Object.defineProperty(JSON.prototype, 'keys', {
            value () {
              return JSON.keys(this);
            }
          });
        }
        if (!nothing.hasOwnProperty(JSON.prototype, 'clear')) {
          Object.defineProperty(JSON.prototype, 'clear', {
            value () {
              return JSON.clear(this);
            }
          });
        }
        if (!nothing.hasOwnProperty(JSON.prototype, 'remove')) {
          Object.defineProperty(JSON.prototype, 'remove', {
            value (...keys) {
              return JSON.remove(this, keys);
            }
          });
        }
      }

    },
    Array: () => {
      if (!nothing.hasOwnProperty(Array, 'isEmpty')) {
        /**
         * Array对象扩展：是否为空
         * @param {*} array
         */
        Object.defineProperty(Array, 'isEmpty', { value: (array) => !array || !array.length });
      }
      if (!nothing.hasOwnProperty(Array.prototype, 'isEmpty')) {
        /**
         * Array对象扩展：是否为空
         */
        Object.defineProperty(Array.prototype, 'isEmpty', { value () { return Array.isEmpty(this); }});
      }
      if (!nothing.hasOwnProperty(Array, 'isNotEmpty')) {
        /**
         * Array对象扩展：是否不为空
         * @param {*} array
         */
        Object.defineProperty(Array, 'isNotEmpty', { value: (array) => array && array.length });
      }
      if (!nothing.hasOwnProperty(Array.prototype, 'isNotEmpty')) {
        /**
         * Array对象扩展：是否不为空
         */
        Object.defineProperty(Array.prototype, 'isNotEmpty', { value () { return Array.isNotEmpty(this); }});
      }
      if (!nothing.hasOwnProperty(Array, 'contains')) {
        /**
         * Array对象扩展：是否包含元素
         * @param {*} array
         * @param {*} element
         */
        Object.defineProperty(Array, 'contains', { value: (array, element) => array && array.indexOf(element) !== -1 });
      }
      if (!nothing.hasOwnProperty(Array.prototype, 'contains')) {
        /**
         * Array对象扩展：是否包含元素
         * @param {*} element
         */
        Object.defineProperty(Array.prototype, 'contains', { value (element) { return Array.contains(this, element); }});
      }
      if (!nothing.hasOwnProperty(Array, 'add')) {
        /**
         * Array对象扩展：添加元素（可指定位置）
         * @param {*} array     数组
         * @param {*} element   元素
         * @param {*} index     添加位置(可选，为空时添加到数组末尾)
         */
        Object.defineProperty(Array, 'add', { value: (array, element, index) => array.add(element, index) });
      }
      if (!nothing.hasOwnProperty(Array.prototype, 'add')) {
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
      }
      if (!nothing.hasOwnProperty(Array, 'addAll')) {
        /**
         * Array对象扩展：批量添加元素（可指定位置）
         * @param {*} array     数组
         * @param {*} elements  元素数组
         * @param {*} index     添加位置(可选，为空时添加到数组末尾)
         */
        Object.defineProperty(Array, 'addAll', { value: (array, elements, index) => array.addAll(elements, index) });
      }
      if (!nothing.hasOwnProperty(Array.prototype, 'addAll')) {
        /**
         * Array对象扩展：批量添加元素（可指定位置）
         * @param {*} elements  元素数组
         * @param {*} index     添加位置(可选，为空时添加到数组末尾)
         */
        Object.defineProperty(Array.prototype, 'addAll', { value (elements = [], index) {
          this.splice(nothing.ifNull(index, this.length), 0, ...elements);
          return this;
        }});
      }
      if (!nothing.hasOwnProperty(Array, 'addFirst')) {
        /**
         * Array对象扩展：添加元素到数据第一个位置
         * @param {*} array   数组
         * @param {*} element 元素
         */
        Object.defineProperty(Array, 'addFirst', { value: (array, element) => array.addFirst(element) });
      }
      if (!nothing.hasOwnProperty(Array.prototype, 'addFirst')) {
        /**
         * Array对象扩展：添加元素到数据第一个位置
         * @param {*} element 元素
         */
        Object.defineProperty(Array.prototype, 'addFirst', { value (element) { return this.add(element, 0); }});
      }
      if (!nothing.hasOwnProperty(Array, 'first')) {
        /**
         * Array对象扩展：获取数组第一个元素
         * @param {*} array   数组
         */
        Object.defineProperty(Array, 'first', { value: (array) => array.first() });
      }
      if (!nothing.hasOwnProperty(Array.prototype, 'first')) {
        /**
         * Array对象扩展：获取数组第一个元素
         */
        Object.defineProperty(Array.prototype, 'first', { value () { return this[0] }});
      }
      if (!nothing.hasOwnProperty(Array, 'last')) {
        /**
         * Array对象扩展：获取数组最后一个元素
         * @param {*} array   数组
         */
        Object.defineProperty(Array, 'last', { value: (array) => array.last() });
      }
      if (!nothing.hasOwnProperty(Array.prototype, 'last')) {
        /**
         * Array对象扩展：获取数组最后一个元素
         */
        Object.defineProperty(Array.prototype, 'last', { value () { return this[this.length - 1] }});
      }
      if (!nothing.hasOwnProperty(Array, 'sum')) {
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
        Object.defineProperty(Array, 'sum', {
          value: (array, {begin, end} = {}) => {
            let total = 0;
            begin = nothing.ifNull(begin, 0);
            end = nothing.ifNull(end, array.length);
            if (array.length) {
              total = array.forEach((item, index) => {
                total += Number(index >= begin && index < end ? item || 0 : 0);
              });
            }
            return total;
          }
        });
      }
      if (!nothing.hasOwnProperty(Array.prototype, 'sum')) {
        /**
         * Array对象扩展：汇总数组元素（数值型有效）
         * @param {*} params  参数对象
         * params 说明：
         * {
         *  begin    开始位置
         *  end      结束位置
         * }
         */
        Object.defineProperty(Array.prototype, 'sum', { value (params = {}) {
          return Array.sum(this, params);
        }});
      }
      if (!nothing.hasOwnProperty(Array, 'sumAttribute')) {
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
        Object.defineProperty(Array, 'sumAttribute', {
          value (array, attribute, {begin, end} = {}) {
            let total = 0;
            begin = nothing.ifNull(begin, 0);
            end = nothing.ifNull(end, array.length);
            if (array.length) {
              array.forEach((item, index) => {
                total += Number(index >= begin && index < end ? item[attribute] || 0 : 0);
              });
            }
            return total;
          }
        });
      }
      if (!nothing.hasOwnProperty(Array.prototype, 'sumAttribute')) {
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
        Object.defineProperty(Array.prototype, 'sumAttribute', { value (attribute, params = {}) {
          return Array.sumAttribute(this, attribute, params);
        }});
      }
      if (!nothing.hasOwnProperty(Array, 'remove')) {
        /**
         * Array对象扩展：移除元素
         * @param {*} array
         * @param {*} element
         */
        Object.defineProperty(Array, 'remove', { value: (array, element) => array.remove(element) });
      }
      if (!nothing.hasOwnProperty(Array.prototype, 'remove')) {
        /**
         * Array对象扩展：移除元素
         * @param {*} element
         */
        Object.defineProperty(Array.prototype, 'remove', { value (element) { this.splice(this.findIndex(item => item === element), 1); return this; }});
      }
      if (!nothing.hasOwnProperty(Array, 'getAttribute')) {
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
      }
      if (!nothing.hasOwnProperty(Array.prototype, 'getAttribute')) {
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
          this.forEach((item, index) => {
            if (index >= begin && index < end) {
              let val = (typeof item[attribute] === 'object' && !(item[attribute] instanceof Date) ? nothing.deepCopy(item[attribute]) : item[attribute]) || null;
              valArray.push(val);
            }
          })
          return valArray;
        }});
      }
      if (!nothing.hasOwnProperty(Array, 'setAttribute')) {
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
      }
      if (!nothing.hasOwnProperty(Array.prototype, 'setAttribute')) {
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
      }
      if (!nothing.hasOwnProperty(Array, 'deleteAttribute')) {
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
      }
      if (!nothing.hasOwnProperty(Array.prototype, 'deleteAttribute')) {
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
      }
      if (!nothing.hasOwnProperty(Array, 'setAttributeToAttribute')) {
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
      if (!nothing.hasOwnProperty(Array.prototype, 'setAttributeToAttribute')) {
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
      }
      if (!nothing.hasOwnProperty(Array, 'agg')) {
        Object.defineProperty(Array, 'agg', {
          value: (data = [], groupBy = [], {sum = [], min = [], max = [], avg = [], count = '_count'} = {}) => {
            let [aggArray, groupSet] = [[], {}];
            if (Array.isNotEmpty(data)) {
              // 按 groupBy 分组
              data.forEach(item => {
                let groupKey = groupBy.map(groupItem => nothing.ifNull(JSON.getAttribute(item, groupItem), '')).join('-');
                groupSet[groupKey] = groupSet[groupKey] || [];
                groupSet[groupKey].push(item);
              })
              for (let key in groupSet) {
                let aggItems = groupSet[key];
                let aggItem = JSON.new(aggItems[0], ...groupBy);
                // sum
                if (Array.isNotEmpty(sum)) {
                  sum.forEach(sumItem => {
                    aggItem[sumItem] = aggItems.sumAttribute(sumItem);
                  });
                }
                // min
                if (Array.isNotEmpty(min)) {
                  min.forEach(minItem => {
                    aggItem[minItem] = aggItems.sort((itemA, itemB) => itemA[minItem] - itemB[minItem])[0][minItem];
                  });
                }
                // max
                if (Array.isNotEmpty(max)) {
                  max.forEach(maxItem => {
                    aggItem[maxItem] = aggItems.sort((itemA, itemB) => itemB[maxItem] - itemA[maxItem])[0][maxItem];
                  });
                }
                // avg
                if (Array.isNotEmpty(avg)) {
                  avg.forEach(avgItem => {
                    aggItem[avgItem] = aggItems.sumAttribute(avgItem) / aggItems.length;
                  });
                }
                // count
                nothing.ternary(nothing.isNotNull(count), JSON.setAttribute(aggItem, count, aggItems.length));
                aggArray.push(aggItem);
              }
            }
            return aggArray;
          }
        });
      }
      if (!nothing.hasOwnProperty(Array.prototype, 'agg')) {
        Object.defineProperty(Array.prototype, 'agg', {
          value (groupBy = [], options = {}) {
            return Array.agg(this, groupBy, options);
          }
        });
      }
    },
    /**
     * Storage 对象扩展
     */
    Storage: () => {
      let { Storage } = typeof window !== 'undefined' ? window : {};
      if (Storage && !nothing.hasOwnProperty(Storage.prototype, 'setJSON')) {
        /**
         * 扩展 Storage 对象实例：增加setJSON方法
         * @param {*} key
         * @param {*} value
         */
        Object.defineProperty(Storage.prototype, 'setJSON', {
          value (key, value) {
            this.setItem(key, nothing.isNotNull(value) ? JSON.stringify(value) : value);
          }
        })
      }
      if (Storage && !nothing.hasOwnProperty(Storage.prototype, 'getJSON')) {
        /**
         * 扩展 Storage 对象实例：增加getJSON方法
         * @param {Object} key
         */
        Object.defineProperty(Storage.prototype, 'getJSON', {
          value (key) {
            let value = this.getItem(key);
            return nothing.isNotNull(value) ? JSON.parse(value) : value;
          }
        })
      }
    }
  },
  /**
   * 初始化系统对象功能扩展
   */
  initExtend: () => {
    nothing.extend.Object();
    nothing.extend.String();
    nothing.extend.Number();
    nothing.extend.Date();
    nothing.extend.JSON();
    nothing.extend.Array();
    nothing.extend.Storage();
  }
}
/**
 * 执行系统对象功能扩展
 */
nothing.initExtend();
/**
 * 绑定到 window 对象
 */
if (typeof window !== 'undefined') window.nothing = nothing;

module.exports = nothing;