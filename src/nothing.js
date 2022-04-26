/**
 * @cbtak/nothing
 * author: cbtak
 * email: cbtak@hotmail.com
 * github: https://github.com/cbtak/nothing.git
 *
 * ███╗   ██╗ ██████╗ ████████╗██╗  ██╗██╗███╗   ██╗ ██████╗         ██╗███████╗
 * ████╗  ██║██╔═══██╗╚══██╔══╝██║  ██║██║████╗  ██║██╔════╝         ██║██╔════╝
 * ██╔██╗ ██║██║   ██║   ██║   ███████║██║██╔██╗ ██║██║  ███╗        ██║███████╗
 * ██║╚██╗██║██║   ██║   ██║   ██╔══██║██║██║╚██╗██║██║   ██║   ██   ██║╚════██║
 * ██║ ╚████║╚██████╔╝   ██║   ██║  ██║██║██║ ╚████║╚██████╔╝██╗╚█████╔╝███████║
 * ╚═╝  ╚═══╝ ╚═════╝    ╚═╝   ╚═╝  ╚═╝╚═╝╚═╝  ╚═══╝ ╚═════╝ ╚═╝ ╚════╝ ╚══════╝
 *
 */
const nothing = {
  /**
   * 是否为空(等于：null、undefined、'')
   * @param {*} val
   */
  isNull: (val) => val === null || val === undefined || val === "",
  /**
   * 是否不为空(不等于：null、undefined、'')
   * @param {*} val
   */
  isNotNull: (val) => val !== null && val !== undefined && val !== "",
  /**
   * 是否为空字符串(等于：null、undefined、''、'  ')
   * @param {*} val
   */
  isBlank: (val) => val === null || val === undefined || val === "" || String(val).trim() === "",
  /**
   * 是否不为空字符串(不等于：null、undefined、''、'  ')
   * @param {*} val
   */
  isNotBlank: (val) => val !== null && val !== undefined && val !== "" && String(val).trim() !== "",
  /**
   * 空值处理(类oracle nvl2)
   * @param {*} val
   * @param {*} val1
   * @param {*} val2
   */
  ifNull: (val, val1, val2) => (nothing.isNull(val) ? val1 : val2 === undefined ? val : val2),
  /**
   * 深度拷贝
   * @param source
   * @param ignorePrototype 暂不推荐使用此参数，默认忽略原型属性
   */
  deepCopy: (source, ignorePrototype = true) => {
    // 非对象类型直接返回
    if (!(source instanceof Object)) return source;
    // 日期类型直接返回
    if (source instanceof Date) return new Date(source);
    let result = source instanceof Array ? [] : {};
    for (let key in source) {
      // 忽略原型属性
      if (typeof source === "object" && ignorePrototype && nothing.isPrototype(source, key)) continue;
      result[key] = nothing.isNotNull(source[key]) && typeof source[key] === "object" ? nothing.deepCopy(source[key], ignorePrototype) : source[key];
    }
    return result;
  },
  /**
   * 三元函数
   * expression 表达式成立则返回 result1，否则返回 result2
   * @param {*} expression
   * @param {*} result1
   * @param {*} result2
   */
  ternary: (expression, result1, result2) => (expression ? result1 : result2),
  /**
   * 匹配函数，类似 oracle 中的 decode
   * 说明: 取第一个参数与后续偶数位置的参数进行比较，如匹配则返回当前比较的偶数位置下一个参数作为结果
   * 如未找到匹配项目，并且参数个数大于3而且为偶数，则取最后一个参数作为默认值返回
   * 注: 参数为动态参数，参数个数最少为3，否则无意义
   *     偶数位置被比较的参数可以为数组
   *     比较使用 === 及 indexOf() 严格匹配值
   *     多个值包含匹配同一结果时，可传入数组(示例4)
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
      if (i % 2 && i !== args.length - 1 && (args[i] === caseKey || (Array.isArray(args[i]) && args[i].indexOf(caseKey) !== -1))) {
        return args[i + 1] === undefined ? null : args[i + 1];
      }
    }
    return args.length > 3 && !(args.length % 2) ? args[args.length - 1] : null;
  },
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
  buildTree: (treeDataArray = [], { nodeKey = "id", parentKey = "parentId", childrenKey = "children", root = null } = {}) => {
    let [tree, nodeSet] = [[], {}];
    treeDataArray.forEach((node) => (nodeSet[JSON.getAttribute(node, nodeKey)] = node));
    Object.keys(nodeSet).forEach((key) => {
      let node = nodeSet[key];
      if (
        nothing.isNotNull(JSON.getAttribute(node, parentKey)) &&
        nodeSet[JSON.getAttribute(node, parentKey)] &&
        !(Array.isArray(root) ? root : [root]).indexOf(JSON.getAttribute(node, parentKey)) !== -1
      ) {
        if (!nodeSet[JSON.getAttribute(node, parentKey)][childrenKey]) {
          nodeSet[JSON.getAttribute(node, parentKey)][childrenKey] = [];
        }
        nodeSet[JSON.getAttribute(node, parentKey)][childrenKey].push(node);
      } else {
        tree.push(node);
      }
    });
    return tree;
  },
  /**
   * 数值型的舍入处理(可指定小数位&舍入模式)
   * 作为Number(num).toFixed(2) 的增强版本
   * @param {*} num         要舍入处理的数值
   * @param {*} scale       保留小数位数
   * @param {*} mode        舍入模式：0:Math.round  1:Math.ceil  -1:Math.floor
   */
  numberToFixed: (num, scale = 0, mode = 0) => {
    num = Number(num);
    scale = Number(scale);
    mode = [0, 1, -1].indexOf(mode) !== -1 ? mode : 0;
    // 舍入处理
    num = nothing.caseValue(
      mode,
      0,
      scale ? Math.round(num * Math.pow(10, scale)) * (1 / Math.pow(10, scale)) : Math.round(num),
      1,
      scale ? Math.ceil(num * Math.pow(10, scale)) * (1 / Math.pow(10, scale)) : Math.ceil(num),
      -1,
      scale ? Math.floor(num * Math.pow(10, scale)) * (1 / Math.pow(10, scale)) : Math.floor(num)
    );
    return Number(num.toFixed(scale));
  },
  /**
   * 数值格式化
   * @param {*} num       要格式化的数值
   * @param {*} options   参数对象
   * params 参数对象说明：
   * {
   *  mode      舍入模式：0:Math.round  1:Math.ceil  -1:Math.floor
   *  thousands 是否显示千分位
   *  scale     保留小数位数
   * }
   */
  numberFormat: (num, { scale, mode, thousands = false } = {}) => {
    if (nothing.isNull(num)) return num;
    num = Number(num);
    if (nothing.isNotNull(scale)) {
      // 舍入处理
      mode = [0, 1, -1].indexOf(mode) !== -1 ? mode : 0;
      num = nothing.numberToFixed(num, scale, mode);
    }
    let tempArr = num.toString().split("."); // 按小数点分割为数组
    tempArr[1] = tempArr[1] || ""; // 小数点后的数值处理
    if (scale) {
      tempArr[1] = tempArr[1].substr(0, scale); // 截去多余位数
      tempArr[1] = "." + tempArr[1] + new Array(scale - tempArr[1].length + 1).join("0"); // 小数位数处理（不够位数补0）
    }
    // 根据是否显示千分位格式化返回
    return (thousands ? String(!Number(tempArr[0]) ? tempArr[0] : Number(tempArr[0])).replace(/(\d)(?=(?:\d{3})+$)/g, "$1,") : tempArr[0]) + (scale ? tempArr[1] : "");
  },
  /**
   * 日期格式化
   * @param {*} date    日期
   * @param {*} format  日期格式
   */
  dateFormat: (date, format) => {
    if (format) format = format.replaceAll("H", "h");
    let o = {
      "M+": date.getMonth() + 1, // 月份
      "d+": date.getDate(), // 日
      "h+": date.getHours(), // 小时
      "m+": date.getMinutes(), // 分
      "s+": date.getSeconds(), // 秒
      "q+": Math.floor((date.getMonth() + 3) / 3), // 季度
      S: date.getMilliseconds(), // 毫秒
    };
    if (/(y+)/.test(format)) format = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (let k in o) {
      if (new RegExp("(" + k + ")").test(format)) format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
    }
    return format;
  },
  /**
   * 数值舍入处理（可指定小数位数和舍入模式）
   * @param {*} num       要格式化的数值
   * @param {*} scale     小数保留位数
   * @param {*} mode      舍入模式：0:Math.round  1:Math.ceil  -1:Math.floor
   */
  /**
   * 获取地址栏参数
   * 示例：
   * // http://www.xxx.com/index?userid=123
   * let userid = getParam('userid')
   * @param {*} key
   */
  getURLParam: (key) => {
    let reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)", "i");
    let r = window.location.search.substr(1).match(reg);
    return r ? unescape(r[2]) : null;
  },
  /**
   * 获取对象指定属性
   * @param {*} object    要获取属性的对象
   * @param {*} property  要获取的属性(支持多级属性，以"."分隔)
   */
  getOwnProperty: (object, property) => {
    if (object && nothing.isNotNull(property)) {
      let attrs = property.split(".");
      for (let i = 0; i < attrs.length; i++) {
        object = object[attrs[i]];
        if (nothing.isNull(object)) return null;
      }
      return object;
    }
    return null;
  },
  /**
   * 检查对象是否具有指定属性
   * @param {*} object    检查的对象
   * @param {*} property  检查的属性(支持多级属性，以"."分隔)
   */
  hasOwnProperty: (object, property) => {
    if (object && nothing.isNotNull(property)) {
      if (property.indexOf(".") !== -1) {
        let attrs = property.split(".");
        property = attrs[attrs.length - 1];
        object = nothing.getOwnProperty(object, attrs.slice(0, attrs.length - 1).join("."));
      }
      return object && object.hasOwnProperty && object.hasOwnProperty(property);
    }
    return false;
  },
  /**
   * 检查对象属性是否为原型属性
   * @param {*} object    检查的对象
   * @param {*} property  检查的属性(支持多级属性，以"."分隔)
   */
  isPrototype: (object, property) => {
    if (object && nothing.isNotNull(property)) {
      if (property.indexOf(".") !== -1) {
        let attrs = property.split(".");
        property = attrs[attrs.length - 1];
        object = nothing.getOwnProperty(object, attrs.slice(0, attrs.length - 1).join("."));
      }
      return object && object.hasOwnProperty && !object.hasOwnProperty(property) && property in object;
    }
    return false;
  },
  /**
   * 定义对象 Getter
   * @param {*} object    源对象
   * @param {*} getter    要定义的getter名称/或要定义getter属性集合
   * @param {*} value     getter的返回值
   */
  defineGetter: (object, getter, value) => {
    let getters = Array.isArray(getter) ? getter : [{ name: getter, value: value }];
    getters.forEach((item) => object.__defineGetter__(item.name, () => (item.value instanceof Function ? item.value.apply(object) : item.value)));
  },
  /**
   * 定义对象 Setter
   * @param {*} object    源对象
   * @param {*} setter    要定义的setter名称/或要定义setter属性集合
   * @param {*} value     setter的处理函数/或要设值的属性
   */
  defineSetter: (object, setter, value) => {
    let setters = Array.isArray(setter) ? setter : [{ name: setter, value: value }];
    setters.forEach((item) =>
      object.__defineSetter__(item.name, (val) => {
        if (nothing.isNotNull(item.value)) {
          if (item.value instanceof Function) {
            item.value.call(object, val);
          } else {
            object[item.value] = val;
          }
        }
      })
    );
  },
  /**
   * 验证手机号码
   * @param {*} mobile
   */
  // validateMobile: (mobile) => /^[1][3,4,5,7,8][0-9]{9}$/.test(mobile),
  validateMobile: (mobile) => /^[1][0-9]{10}$/.test(mobile),
  /**
   * 验证固定电话号码
   * @param {*} phone
   */
  validateTelephone: (phone) => /^[0-9]{3,4}[-]{0,1}[0-9]{7,8}$/.test(phone),
  /**
   * 数值型验证
   * @param {*} val
   */
  validateNumber: (val) => /^\d+(\.\d+)?$/.test(val),
  /**
   * 身份证验证
   * @param {*} val
   */
  validateIDCard: (val) => /^\d{17}[0-9Xx]$/.test(val),
  /**
   * 邮箱验证
   */
  validateEmail: (val) => /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(val),
  /**
   * 系统对象功能扩展定义
   */
  extend: {
    /**
     * Object 对象扩展
     * 注：对 Object 扩展 clone 属性会影响到一些同名公共库，暂取消，直接使用 nothing.deepCopy({...}) 来拷贝
     */
    Object: () => {
      // if (!nothing.hasOwnProperty(Object, 'clone')) {
      //   /**
      //    * 对象克隆(深拷贝)
      //    * @param {*} source 要克隆的对象
      //    * @param {*} ignorePrototype 暂不推荐使用此参数，默认忽略原型属性
      //    */
      //   Object.defineProperty(Object, 'clone', { value :(source, ignorePrototype) => nothing.deepCopy(source, ignorePrototype) });
      // }
      // if (!nothing.hasOwnProperty(Object.prototype, 'clone')) {
      //   // 需要排除微信小程序环境(不想依赖jssdk，临时校验是否有wx对象及wx.login函数)
      //   if (typeof wx !== 'undefined' && wx.login) {
      //     console.warn("## nothing.js warning ## : 当前环境不支持 Object.prototype 原型方式扩展clone函数. ");
      //   } else {
      //     /**
      //      * 对象实例克隆(深拷贝)
      //      */
      //     Object.defineProperty(Object.prototype, 'clone', {
      //       value (ignorePrototype) {
      //         return nothing.deepCopy(this, ignorePrototype);
      //       }
      //     });
      //   }
      // }
    },
    String: () => {
      if (!nothing.hasOwnProperty(String, "replaceAll")) {
        /**
         * String对象扩展：替换全部
         * @param {*} source
         * @param {*} substr
         * @param {*} replacement
         */
        Object.defineProperty(String, "replaceAll", {
          value: (source, substr, replacement = "") => source.replace(new RegExp(substr, "gm"), replacement),
        });
      }
      if (!nothing.hasOwnProperty(String.prototype, "replaceAll")) {
        /**
         * String对象实例扩展：替换全部
         * @param {*} substr
         * @param {*} replacement
         */
        Object.defineProperty(String.prototype, "replaceAll", {
          value(substr, replacement = "") {
            return String.replaceAll(this, substr, replacement);
          },
        });
      }
      if (!nothing.hasOwnProperty(String, "contains")) {
        /**
         * String对象扩展：是否包含
         * @param {*} source
         * @param {*} instr
         */
        Object.defineProperty(String, "contains", {
          value: (source, instr) => source.indexOf(instr) !== -1,
        });
      }
      if (!nothing.hasOwnProperty(String.prototype, "contains")) {
        /**
         * String对象实例扩展：是否包含
         * @param {*} instr
         */
        Object.defineProperty(String.prototype, "contains", {
          value(instr) {
            return String.contains(this, instr);
          },
        });
      }
      if (!nothing.hasOwnProperty(String, "toByte")) {
        Object.defineProperty(String, "toByte", {
          value: (str) => {
            let [bytes, len, c] = [[], str.length, null];
            for (let i = 0; i < len; i++) {
              c = str.charCodeAt(i);
              if (c >= 0x010000 && c <= 0x10ffff) {
                bytes.push(((c >> 18) & 0x07) | 0xf0, ((c >> 12) & 0x3f) | 0x80, ((c >> 6) & 0x3f) | 0x80, (c & 0x3f) | 0x80);
              } else if (c >= 0x000800 && c <= 0x00ffff) {
                bytes.push(((c >> 12) & 0x0f) | 0xe0, ((c >> 6) & 0x3f) | 0x80, (c & 0x3f) | 0x80);
              } else if (c >= 0x000080 && c <= 0x0007ff) {
                bytes.push(((c >> 6) & 0x1f) | 0xc0, (c & 0x3f) | 0x80);
              } else {
                bytes.push(c & 0xff);
              }
            }
            return bytes;
          },
        });
      }
      if (!nothing.hasOwnProperty(String.prototype, "toByte")) {
        /**
         * String对象扩展：字符串转byte数组
         */
        Object.defineProperty(String.prototype, "toByte", {
          value() {
            return String.toByte(this);
          },
        });
      }
      if (!nothing.hasOwnProperty(String, "fromByte")) {
        /**
         * String对象扩展：byte数组转换字符串
         * @param {*} bytes
         */
        Object.defineProperty(String, "fromByte", {
          value(bytes) {
            if (!Array.isArray(bytes)) return null;
            let str = "";
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
          },
        });
      }
      if (!nothing.hasOwnProperty(String, "from")) {
        /**
         * String对象扩展：将对象转换为字符串(日期型可指定格式)
         * @param {*} object
         * @param {*} format  格式(可选，对日期类型有效)
         */
        Object.defineProperty(String, "from", {
          value(object, format) {
            if (nothing.isNull(object) || typeof object === "string") return object;
            // if (Array.isArray(object)) return String(object);
            if (object instanceof Date) return object.format(format || "yyyy-MM-dd hh:mm:ss");
            return JSON.stringify(object);
          },
        });
      }
      if (!nothing.hasOwnProperty(String, "isString")) {
        /**
         * String对象扩展：校验对象是否为字符串
         * @param {*} object
         */
        Object.defineProperty(String, "isString", { value: (object) => typeof object === "string" });
      }
    },
    Number: () => {
      if (!nothing.hasOwnProperty(Number, "format")) {
        /**
         * Number对象扩展：数值格式化
         * @param {*} options 参数项
         */
        Object.defineProperty(Number, "format", {
          value: (num, options) => nothing.numberFormat(num, options),
        });
      }
      if (!nothing.hasOwnProperty(Number.prototype, "format")) {
        /**
         * Number对象实例扩展：数值格式化
         * @param {*} options 参数项
         */
        Object.defineProperty(Number.prototype, "format", {
          value(options) {
            return nothing.numberFormat(this, options);
          },
        });
      }
      if (!nothing.hasOwnProperty(Number, "toFixed2")) {
        /**
         * Number对象扩展：数值舍入处理（可指定小数位数和舍入模式）
         * 作为Number.toFixed()的增强版
         * @param {*} num         要舍入处理的数值
         * @param {*} scale       保留小数位数
         * @param {*} mode        舍入模式：0:Math.round  1:Math.ceil  -1:Math.floor
         */
        Object.defineProperty(Number, "toFixed2", { value: (num, scale, mode) => nothing.numberToFixed(num, scale, mode) });
      }
      if (!nothing.hasOwnProperty(Number.prototype, "toFixed2")) {
        /**
         * Number对象实例扩展：数值舍入处理（可指定小数位数和舍入模式）
         * 作为Number.toFixed()的增强版
         * @param {*} num         要舍入处理的数值
         * @param {*} scale       保留小数位数
         * @param {*} mode        舍入模式：0:Math.round  1:Math.ceil  -1:Math.floor
         */
        Object.defineProperty(Number.prototype, "toFixed2", {
          value(scale, mode) {
            return nothing.numberToFixed(this, scale, mode);
          },
        });
      }
    },
    Date: () => {
      if (!nothing.hasOwnProperty(Date, "nowDate")) {
        nothing.defineGetter(Date, "nowDate", () => Date.from(new Date().format("yyyy-MM-dd")));
      }
      if (!nothing.hasOwnProperty(Date, "nowTime")) {
        nothing.defineGetter(Date, "nowTime", () => new Date());
      }
      if (!nothing.hasOwnProperty(Date, "from")) {
        /**
         * Date对象扩展：将传入参数转换为日期对象
         * @param {*} date    日期（字符串、时间戳等）
         */
        Object.defineProperty(Date, "from", {
          value: (date) => {
            if (String.isString(date)) {
              date = date.replaceAll("-", "/");
            }
            return new Date(date);
          },
        });
      }
      if (!nothing.hasOwnProperty(Date, "format")) {
        /**
         * Date对象扩展：日期格式化
         * @param {*} date    日期
         * @param {*} format  日期格式
         */
        Object.defineProperty(Date, "format", {
          value: (date, format) => nothing.dateFormat(date, format),
        });
      }
      if (!nothing.hasOwnProperty(Date.prototype, "format")) {
        /**
         * Date对象实例扩展：日期格式化
         * @param {*} format  日期格式
         */
        Object.defineProperty(Date.prototype, "format", {
          value(format) {
            return nothing.dateFormat(this, format);
          },
        });
      }
      if (!nothing.hasOwnProperty(Date, "add")) {
        /**
         * Date对象扩展：日期计算
         * @param {*} date
         * @param {*} interval
         * @param {*} number
         */
        Object.defineProperty(Date, "add", {
          value: (date, interval, number) => {
            date = new Date(date);
            let k = {
              y: "FullYear",
              q: "Month",
              m: "Month",
              w: "Date",
              d: "Date",
              h: "Hours",
              n: "Minutes",
              s: "Seconds",
              ms: "Milliseconds",
            };
            let n = { q: 3, w: 7 };
            interval = (interval || "").toLowerCase();
            date["set" + k[interval]](date["get" + k[interval]]() + (n[interval] || 1) * number);
            return date;
          },
        });
      }
      if (!nothing.hasOwnProperty(Date.prototype, "add")) {
        /**
         * Date对象实例扩展：日期计算
         * @param {*} interval
         * @param {*} number
         */
        Object.defineProperty(Date.prototype, "add", {
          value(interval, number = 0) {
            return Date.add(this, interval, number);
          },
        });
      }
      if (!nothing.hasOwnProperty(Date, "diff")) {
        /**
         * Date对象扩展：日期差异
         * @param {*} diffDate1
         * @param {*} diffDate2
         * @param {*} interval
         */
        Object.defineProperty(Date, "diff", {
          value: (diffDate1, diffDate2, interval = "d") => {
            let [time1, time2] = [diffDate1.getTime(), diffDate2.getTime()];
            let result = nothing.caseValue(
              interval,
              "y",
              diffDate2.getFullYear() - diffDate1.getFullYear(),
              "q",
              (diffDate2.getFullYear() - diffDate1.getFullYear()) * 4 + Math.floor(diffDate2.getMonth() / 4) - Math.floor(diffDate1.getMonth() / 4),
              "m",
              (diffDate2.getFullYear() - diffDate1.getFullYear()) * 12 + diffDate2.getMonth() - diffDate1.getMonth(),
              "ms",
              diffDate2.getTime() - diffDate1.getTime(),
              "w",
              Math.floor((time2 + 345600000) / 604800000) - Math.floor((time1 + 345600000) / 604800000),
              "d",
              Math.floor(time2 / 86400000) - Math.floor(time1 / 86400000),
              "h",
              Math.floor(time2 / 3600000) - Math.floor(time1 / 3600000),
              "n",
              Math.floor(time2 / 60000) - Math.floor(time1 / 60000),
              "s",
              Math.floor(time2 / 1000) - Math.floor(time1 / 1000)
            );
            return result;
          },
        });
      }
      if (!nothing.hasOwnProperty(Date.prototype, "diff")) {
        /**
         * Date对象实例扩展：日期差异
         * @param {*} diffDate
         * @param {*} interval  默认：d 天
         */
        Object.defineProperty(Date.prototype, "diff", {
          value(diffDate, interval = "d") {
            return Date.diff(this, diffDate, interval);
          },
        });
      }
    },
    JSON: () => {
      if (!nothing.hasOwnProperty(JSON, "new")) {
        /**
         * JSON对象扩展：传入JSON对象，创建新JSON对象（args动态指定属性集）
         * @param {*} json 要构建的对象
         * @param {*} args 动态指定属性集(支持字符串及对象形式)
         * 示例：
         * JSON.new(
         *    json,
         *    'id', 'name', 'dept.id', 'dept.name',
         *    {attribute: 'office.id', alias: 'officeId'},
         *    {attribute: 'area.id', alias: 'myArea.main.id'},
         *    {attribute: 'age', alias: 'myAge', defaultValue: 20}
         * )
         */
        Object.defineProperty(JSON, "new", {
          value: (json, ...args) => {
            if (nothing.isNull(json)) return json;
            let newJson = {};
            if (Array.isEmpty(args)) return newJson;
            args.forEach((item) => {
              if (nothing.isNull(item) || (typeof item === "object" && nothing.isNull(item.attribute))) return;
              let newAttrItem = typeof item === "object" ? item : { attribute: item };
              JSON.setAttribute(newJson, nothing.ifNull(newAttrItem.alias, newAttrItem.attribute), nothing.ifNull(JSON.getAttribute(json, newAttrItem.attribute), newAttrItem.defaultValue));
            });
            return newJson;
          },
        });
      }
      if (!nothing.hasOwnProperty(JSON, "toFormSerializeArray")) {
        Object.defineProperty(JSON, "toFormSerializeArray", {
          value: (json) => {
            let _arr = [];
            let _toArray = function (json, jsonArray, prefix) {
              for (let key in json) {
                if (typeof json[key] === "function") {
                  continue;
                }
                let newKey = (prefix ? prefix + "." : "") + key;
                if (typeof json[key] === "object" && !(json[key] instanceof Array)) {
                  _toArray(json[key], jsonArray, newKey);
                } else {
                  jsonArray[jsonArray.length] = {
                    name: newKey,
                    value: json[key],
                  };
                }
              }
            };
            _toArray(json, _arr);
            return _arr;
          },
        });
      }
      if (!nothing.hasOwnProperty(JSON, "formSerializeArray")) {
        Object.defineProperty(JSON, "formSerializeArray", {
          value: (formSerializeArray = []) => {
            let json = {};
            formSerializeArray.forEach((item) => {
              let tempAttrs = item.name.split(".");
              let tempParent = json;
              tempAttrs.forEach((attr, attrIndex) => {
                if (attr.indexOf("[") != -1) {
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
          },
        });
      }
      if (!nothing.hasOwnProperty(JSON, "keys")) {
        Object.defineProperty(JSON, "keys", {
          value: (json) => {
            return Object.keys(json);
          },
        });
      }
      if (!nothing.hasOwnProperty(JSON, "clear")) {
        Object.defineProperty(JSON, "clear", {
          value: (json) => {
            if (json) {
              JSON.keys(json).forEach((key) => {
                delete json[key];
              });
            }
            return json;
          },
        });
      }
      if (!nothing.hasOwnProperty(JSON, "remove")) {
        Object.defineProperty(JSON, "remove", {
          value: (json, ...keys) => {
            if (json && keys && keys.length) {
              keys.forEach((key) => {
                delete json[key];
              });
            }
            return json;
          },
        });
      }
      if (!nothing.hasOwnProperty(JSON, "getAttribute")) {
        Object.defineProperty(JSON, "getAttribute", {
          value: (json, attribute) => {
            if (attribute.contains(".")) {
              let attrs = attribute.split(".");
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
          },
        });
      }
      if (!nothing.hasOwnProperty(JSON, "setAttribute")) {
        Object.defineProperty(JSON, "setAttribute", {
          value: (json, attribute, value) => {
            if (attribute.contains(".")) {
              let attrs = attribute.split(".");
              let child = json;
              attrs.forEach((attr, index) => {
                if (index === attrs.length - 1) {
                  child[attr] = value;
                } else {
                  child = child[attr] = child[attr] || {};
                }
              });
            } else {
              json[attribute] = value;
            }
          },
        });
      }
      if (nothing.hasOwnProperty(JSON, "prototype")) {
        if (!nothing.hasOwnProperty(JSON.prototype, "new")) {
          /**
           * JSON对象实例扩展：创建新JSON对象（args动态指定属性集）
           * @param {*} args 动态指定属性集
           */
          Object.defineProperty(JSON.prototype, "new", {
            value(...args) {
              return JSON.new(this, ...args);
            },
          });
        }
        if (!nothing.hasOwnProperty(JSON.prototype, "toFormSerializeArray")) {
          Object.defineProperty(JSON.prototype, "toFormSerializeArray", {
            value() {
              return JSON.serializeArray(this);
            },
          });
        }
        if (!nothing.hasOwnProperty(JSON.prototype, "keys")) {
          Object.defineProperty(JSON.prototype, "keys", {
            value() {
              return JSON.keys(this);
            },
          });
        }
        if (!nothing.hasOwnProperty(JSON.prototype, "clear")) {
          Object.defineProperty(JSON.prototype, "clear", {
            value() {
              return JSON.clear(this);
            },
          });
        }
        if (!nothing.hasOwnProperty(JSON.prototype, "remove")) {
          Object.defineProperty(JSON.prototype, "remove", {
            value(...keys) {
              return JSON.remove(this, keys);
            },
          });
        }
        if (!nothing.hasOwnProperty(JSON.prototype, "getAttribute")) {
          Object.defineProperty(JSON.prototype, "getAttribute", {
            value() {
              return JSON.getAttribute(this, attribute);
            },
          });
        }
        if (!nothing.hasOwnProperty(JSON.prototype, "setAttribute")) {
          Object.defineProperty(JSON.prototype, "setAttribute", {
            value() {
              return JSON.setAttribute(this, attribute);
            },
          });
        }
      }
    },
    Array: () => {
      if (!nothing.hasOwnProperty(Array, "isEmpty")) {
        /**
         * Array对象扩展：是否为空
         * @param {*} array
         */
        Object.defineProperty(Array, "isEmpty", { value: (array) => !array || !array.length });
      }
      if (!nothing.hasOwnProperty(Array.prototype, "isEmpty")) {
        /**
         * Array对象扩展：是否为空
         */
        Object.defineProperty(Array.prototype, "isEmpty", {
          value() {
            return Array.isEmpty(this);
          },
        });
      }
      if (!nothing.hasOwnProperty(Array, "isNotEmpty")) {
        /**
         * Array对象扩展：是否不为空
         * @param {*} array
         */
        Object.defineProperty(Array, "isNotEmpty", { value: (array) => array && array.length });
      }
      if (!nothing.hasOwnProperty(Array.prototype, "isNotEmpty")) {
        /**
         * Array对象扩展：是否不为空
         */
        Object.defineProperty(Array.prototype, "isNotEmpty", {
          value() {
            return Array.isNotEmpty(this);
          },
        });
      }
      if (!nothing.hasOwnProperty(Array, "contains")) {
        /**
         * Array对象扩展：是否包含元素
         * @param {*} array
         * @param {*} element
         */
        Object.defineProperty(Array, "contains", { value: (array, element) => array && array.indexOf(element) !== -1 });
      }
      if (!nothing.hasOwnProperty(Array.prototype, "contains")) {
        /**
         * Array对象扩展：是否包含元素
         * @param {*} element
         */
        Object.defineProperty(Array.prototype, "contains", {
          value(element) {
            return Array.contains(this, element);
          },
        });
      }
      if (!nothing.hasOwnProperty(Array, "add")) {
        /**
         * Array对象扩展：添加元素（可指定位置）
         * @param {*} array     数组
         * @param {*} element   元素
         * @param {*} index     添加位置(可选，为空时添加到数组末尾)
         */
        Object.defineProperty(Array, "add", {
          value: (array, element, index) => {
            if (nothing.isNotNull(index)) {
              array.splice(index, 0, element);
            } else {
              array.push(element);
            }
            return array;
          },
        });
      }
      if (!nothing.hasOwnProperty(Array.prototype, "add")) {
        /**
         * Array对象扩展：添加元素（可指定位置）
         * @param {*} element   元素
         * @param {*} index     添加位置(可选，为空时添加到数组末尾)
         */
        Object.defineProperty(Array.prototype, "add", {
          value(element, index) {
            return Array.add(this, element, index);
          },
        });
      }
      if (!nothing.hasOwnProperty(Array, "addAll")) {
        /**
         * Array对象扩展：批量添加元素（可指定位置）
         * @param {*} array     数组
         * @param {*} elements  元素数组
         * @param {*} index     添加位置(可选，为空时添加到数组末尾)
         */
        Object.defineProperty(Array, "addAll", {
          value: (array, elements = [], index) => {
            array.splice(nothing.ifNull(index, array.length), 0, ...elements);
            return array;
          },
        });
      }
      if (!nothing.hasOwnProperty(Array.prototype, "addAll")) {
        /**
         * Array对象扩展：批量添加元素（可指定位置）
         * @param {*} elements  元素数组
         * @param {*} index     添加位置(可选，为空时添加到数组末尾)
         */
        Object.defineProperty(Array.prototype, "addAll", {
          value(elements, index) {
            return Array.addAll(this, elements, index);
          },
        });
      }
      if (!nothing.hasOwnProperty(Array, "addFirst")) {
        /**
         * Array对象扩展：添加元素到数据第一个位置
         * @param {*} array   数组
         * @param {*} element 元素
         */
        Object.defineProperty(Array, "addFirst", { value: (array, element) => Array.add(array, element, 0) });
      }
      if (!nothing.hasOwnProperty(Array.prototype, "addFirst")) {
        /**
         * Array对象扩展：添加元素到数据第一个位置
         * @param {*} element 元素
         */
        Object.defineProperty(Array.prototype, "addFirst", {
          value(element) {
            return Array.addFirst(this, element);
          },
        });
      }
      if (!nothing.hasOwnProperty(Array, "first")) {
        /**
         * Array对象扩展：获取数组第一个元素
         * @param {*} array   数组
         */
        Object.defineProperty(Array, "first", { value: (array) => array[0] });
      }
      if (!nothing.hasOwnProperty(Array.prototype, "first")) {
        /**
         * Array对象扩展：获取数组第一个元素
         */
        Object.defineProperty(Array.prototype, "first", {
          value() {
            return this[0];
          },
        });
      }
      if (!nothing.hasOwnProperty(Array, "last")) {
        /**
         * Array对象扩展：获取数组最后一个元素
         * @param {*} array   数组
         */
        Object.defineProperty(Array, "last", { value: (array) => array[array.length - 1] });
      }
      if (!nothing.hasOwnProperty(Array.prototype, "last")) {
        /**
         * Array对象扩展：获取数组最后一个元素
         */
        Object.defineProperty(Array.prototype, "last", {
          value() {
            return this[this.length - 1];
          },
        });
      }
      if (!nothing.hasOwnProperty(Array, "sum")) {
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
        Object.defineProperty(Array, "sum", {
          value: (array, { begin = 0, end = array.length } = {}) => {
            let total = 0;
            if (array.length) {
              array.forEach((item, index) => {
                total += Number(index >= begin && index <= end ? item || 0 : 0);
              });
            }
            return total;
          },
        });
      }
      if (!nothing.hasOwnProperty(Array.prototype, "sum")) {
        /**
         * Array对象扩展：汇总数组元素（数值型有效）
         * @param {*} params  参数对象
         * params 说明：
         * {
         *  begin    开始位置
         *  end      结束位置
         * }
         */
        Object.defineProperty(Array.prototype, "sum", {
          value(params = {}) {
            return Array.sum(this, params);
          },
        });
      }
      if (!nothing.hasOwnProperty(Array, "sumAttribute")) {
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
        Object.defineProperty(Array, "sumAttribute", {
          value(array, attribute, { begin = 0, end = array.length } = {}) {
            let total = 0;
            if (array.length) {
              array.forEach((item, index) => {
                total += Number(index >= begin && index <= end ? JSON.getAttribute(item, attribute) || 0 : 0);
              });
            }
            return total;
          },
        });
      }
      if (!nothing.hasOwnProperty(Array.prototype, "sumAttribute")) {
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
        Object.defineProperty(Array.prototype, "sumAttribute", {
          value(attribute, params = {}) {
            return Array.sumAttribute(this, attribute, params);
          },
        });
      }
      if (!nothing.hasOwnProperty(Array, "remove")) {
        /**
         * Array对象扩展：移除元素
         * @param {*} array
         * @param {*} element
         */
        Object.defineProperty(Array, "remove", {
          value: (array, element) => {
            array.splice(
              array.findIndex((item) => item === element),
              1
            );
            return array;
          },
        });
      }
      if (!nothing.hasOwnProperty(Array.prototype, "remove")) {
        /**
         * Array对象扩展：移除元素
         * @param {*} element
         */
        Object.defineProperty(Array.prototype, "remove", {
          value(element) {
            return Array.remove(this, element);
          },
        });
      }
      if (!nothing.hasOwnProperty(Array, "getAttribute")) {
        /**
         * Array对象扩展：批量获取对象指定属性值
         * @param {*} array       数组
         * @param {*} attribute   属性
         * @param {*} options     参数对象
         * options 说明：
         * {
         *  begin     开始位置
         *  end       结束位置
         * }
         */
        Object.defineProperty(Array, "getAttribute", {
          value: (array, attribute, { begin = 0, end = array.length } = {}) => {
            let valArray = [];
            array.forEach((item, index) => {
              if (index >= begin && index <= end) {
                let val = Number.isInteger(attribute) ? item[attribute] : JSON.getAttribute(item, attribute);
                valArray.push(val);
              }
            });
            return valArray;
          },
        });
      }
      if (!nothing.hasOwnProperty(Array.prototype, "getAttribute")) {
        /**
         * Array对象扩展：批量获取对象指定属性值
         * @param {*} attribute   属性
         * @param {*} options     参数对象
         * options 说明：
         * {
         *  begin     开始位置
         *  end       结束位置
         * }
         */
        Object.defineProperty(Array.prototype, "getAttribute", {
          value(attribute, options = {}) {
            return Array.getAttribute(this, attribute, options);
          },
        });
      }
      if (!nothing.hasOwnProperty(Array, "setAttribute")) {
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
        Object.defineProperty(Array, "setAttribute", { value: (array, attribute, value, params = {}) => array.setAttribute(attribute, value, params) });
      }
      if (!nothing.hasOwnProperty(Array.prototype, "setAttribute")) {
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
        Object.defineProperty(Array.prototype, "setAttribute", {
          value(attribute, value, { begin, end } = {}) {
            begin = nothing.ifNull(begin, 0);
            end = nothing.ifNull(end, this.length);
            for (let i = 0; i < this.length; i++) {
              if (i >= begin && i <= end && typeof this[i] === "object" && !(this[i] instanceof Date)) {
                this[i][attribute] = value;
              }
            }
            return this;
          },
        });
      }
      if (!nothing.hasOwnProperty(Array, "deleteAttribute")) {
        /**
         * Array对象扩展：批量删除指定属性
         * @param {*} array       数组
         * @param {*} attribute   属性(支持多个以数组形式)
         * @param {*} options     参数对象
         * options 说明：
         * {
         *  begin     开始位置
         *  end       结束位置
         * }
         */
        Object.defineProperty(Array, "deleteAttribute", {
          value: (array, attribute, { begin = 0, end = array.length } = {}) => {
            let deleteAttributes = Array.isArray(attribute) ? attribute : [attribute];
            array.forEach((item, index) => {
              if (index >= begin && index <= end && typeof item === "object" && !(item instanceof Date)) {
                deleteAttributes.forEach((attr) => delete item[attr]);
              }
            });
            return array;
          },
        });
      }
      if (!nothing.hasOwnProperty(Array.prototype, "deleteAttribute")) {
        /**
         * Array对象扩展：批量删除指定属性
         * @param {*} attribute   属性(支持多个以数组形式)
         * @param {*} options     参数对象
         * options 说明：
         * {
         *  begin     开始位置
         *  end       结束位置
         * }
         */
        Object.defineProperty(Array.prototype, "deleteAttribute", {
          value(attribute, options = {}) {
            return Array.deleteAttribute(this, attribute, options);
          },
        });
      }
      if (!nothing.hasOwnProperty(Array, "setAttributeToAttribute")) {
        /**
         * Array对象扩展：批量设置对象本身属性到指定属性
         * @param {*} array             数组
         * @param {*} sourceAttribute   源属性
         * @param {*} targetAttribute   目标属性
         * @param {*} options           参数对象
         * options 说明：
         * {
         *  begin     开始位置
         *  end       结束位置
         * }
         */
        Object.defineProperty(Array, "setAttributeToAttribute", {
          value: (array, sourceAttribute, targetAttribute, { begin = 0, end = array.length } = {}) => {
            array.forEach((item, index) => {
              if (index >= begin && index <= end && typeof item === "object" && !(item instanceof Date)) {
                JSON.setAttribute(item, targetAttribute, JSON.getAttribute(item, sourceAttribute));
              }
            });
            return array;
          },
        });
      }
      if (!nothing.hasOwnProperty(Array.prototype, "setAttributeToAttribute")) {
        /**
         * Array对象扩展：批量设置对象本身属性到指定属性
         * @param {*} sourceAttribute   源属性
         * @param {*} targetAttribute   目标属性
         * @param {*} options           参数对象
         * options 说明：
         * {
         *  begin     开始位置
         *  end       结束位置
         * }
         */
        Object.defineProperty(Array.prototype, "setAttributeToAttribute", {
          value(sourceAttribute, targetAttribute, options = {}) {
            return Array.setAttributeToAttribute(this, sourceAttribute, targetAttribute, options);
          },
        });
      }
      if (!nothing.hasOwnProperty(Array, "agg")) {
        Object.defineProperty(Array, "agg", {
          value: (data = [], groupBy = [], { sum = [], min = [], max = [], avg = [], count = "_count" } = {}) => {
            let [aggArray, groupSet] = [[], {}];
            if (Array.isNotEmpty(data)) {
              // 按 groupBy 分组
              data.forEach((item) => {
                let groupKey = groupBy.map((groupItem) => nothing.ifNull(JSON.getAttribute(item, groupItem), "")).join("-");
                groupSet[groupKey] = groupSet[groupKey] || [];
                groupSet[groupKey].push(item);
              });
              for (let key in groupSet) {
                let aggItems = groupSet[key];
                let aggItem = JSON.new(aggItems[0], ...groupBy);
                // sum
                if (Array.isNotEmpty(sum)) {
                  sum.forEach((sumItem) => {
                    aggItem[sumItem] = aggItems.sumAttribute(sumItem);
                  });
                }
                // min
                if (Array.isNotEmpty(min)) {
                  min.forEach((minItem) => {
                    aggItem[minItem] = aggItems.sort((itemA, itemB) => itemA[minItem] - itemB[minItem])[0][minItem];
                  });
                }
                // max
                if (Array.isNotEmpty(max)) {
                  max.forEach((maxItem) => {
                    aggItem[maxItem] = aggItems.sort((itemA, itemB) => itemB[maxItem] - itemA[maxItem])[0][maxItem];
                  });
                }
                // avg
                if (Array.isNotEmpty(avg)) {
                  avg.forEach((avgItem) => {
                    aggItem[avgItem] = aggItems.sumAttribute(avgItem) / aggItems.length;
                  });
                }
                // count
                nothing.ternary(nothing.isNotNull(count), JSON.setAttribute(aggItem, count, aggItems.length));
                aggArray.push(aggItem);
              }
            }
            return aggArray;
          },
        });
      }
      if (!nothing.hasOwnProperty(Array.prototype, "agg")) {
        Object.defineProperty(Array.prototype, "agg", {
          value(groupBy = [], options = {}) {
            return Array.agg(this, groupBy, options);
          },
        });
      }
    },
    /**
     * Storage 对象扩展
     */
    Storage: () => {
      let { Storage } = typeof window !== "undefined" ? window : {};
      if (Storage && !nothing.hasOwnProperty(Storage.prototype, "setJSON")) {
        /**
         * 扩展 Storage 对象实例：增加setJSON方法
         * @param {*} key
         * @param {*} value
         */
        Object.defineProperty(Storage.prototype, "setJSON", {
          value(key, value) {
            this.setItem(key, nothing.isNotNull(value) ? JSON.stringify(value) : value);
          },
        });
      }
      if (Storage && !nothing.hasOwnProperty(Storage.prototype, "getJSON")) {
        /**
         * 扩展 Storage 对象实例：增加getJSON方法
         * @param {Object} key
         */
        Object.defineProperty(Storage.prototype, "getJSON", {
          value(key) {
            let value = this.getItem(key);
            return nothing.isNotNull(value) ? JSON.parse(value) : value;
          },
        });
      }
    },
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
  },
};
/**
 * 执行系统对象功能扩展
 */
nothing.initExtend();
/**
 * 绑定到 window 对象
 */
if (typeof window !== "undefined") window.nothing = nothing;

module.exports = nothing;
