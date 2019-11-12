# Nothing.JS 
一套简单易用的常用函数&系统对象扩展库
<br>
![avatar](/logo.jpeg ':size=480')
## 概述
> varsion：`v1.1.9`
<br>author：`cbtak` <cbtak@hotmail.com>
<br>
 nothing.js 来源于项目开发过程积累常用到的一些工具函数，筛选通用性比较好的整理成库，采用`ES6`规范重构。本库不依赖于第三方库，可直接在node服务端及前端环境使用。

## 安装
> npm 安装：
```
npm install @cbtak/nothing --save
```
> yarn 安装：
```
yarn add @cbtak/nothing
```

## 使用说明

### 模块引入
```js
  // require
  const nothing = require('@cbtak/nothing')
  // import
  import nothing from '@cbtak/nothing'
```

### 1. 功能函数篇

序号 | 函数名称 | 说明
:--- | :--- | :---
1 | [isNull](/?id=_11-isnullval) | 检验传入值是否为空
2 | [isNotNull](/?id=_12-isnotnullval) | 检验传入值是否不为空
3 | [isBlank](/?id=_13-isblankval) | 检验传入值是否为空字符串
4 | [isNotBlank](/?id=_14-isnotblankval) | 检验传入值是否不为空字符串
5 | [ifNull](/?id=_15-ifnull-val-val1-val2) | 空值处理(类oracle 的 nvl2)
6 | [deepCopy](/?id=_16-deepcopysource) | 深拷贝
7 | [ternary](/?id=_17-ternaryexpression-result1-result2) | 三元函数
8 | [caseValue](/?id=_18-casevalueargs) | 匹配函数(类oracle 的 decode)
9 | [buildTree](/?id=_19-buildtreetreedataarray-options) | 构建树
10 | [numberToFixed](/?id=_110-numbertofixednum-scale-0-mode-0) | 数值型的舍入处理(可指定小数位&舍入模式)
11 | [numberFormat](/?id=_111-numberformatnum-options) | 数值格式化
12 | [dateFormat](/?id=_112-dateformatdate-format) | 日期格式化
13 | [getParam](/?id=_113-geturlparamkey) | 获取地址栏参数
14 | [getOwnProperty](/?id=_114-getownpropertyobject-property) | 获取对象指定属性
15 | [hasOwnProperty](/?id=_115-hasownpropertyobject-property) | 检查对象是否具有指定属性
16 | [isPrototype](/?id=_116-isprototypeobject-property) | 检查对象指定属性是否为原型属性
17 | [defineGetter](/?id=_117-definegetter-object-getter-value) | 定义对象Getter
18 | [defineSetter](/?id=_118-definesetter-object-setter-value) | 定义对象Setter
19 | [validateNumber](/?id=_119-validatenumberval) | 数值型验证
20 | [validateMobile](/?id=_120-validatemobilemobile) | 验证手机号码
21 | [validateTelephone](/?id=_121-validatetelephonephone) | 验证固定电话号码
22 | [validateIDCard](/?id=_122-validateidcardidcard) | 验证身份证
23 | [validateEmail](/?id=_123-validateemailemail) | 验证邮箱

#### 1.1. isNull(val)
**参数说明：** `val` *要校验的值*
<br>　**返回值：** `Boolean`
<br>**功能描述：**
> 检验传入值是否为空<br>(值等于 `null`、`''`、`undefined` 时返回 true)

**示例代码：**
```js
let var = null;
let result = nothing.isNull(var) ? 'var is null' : 'var is not null';
// 输出结果：var is null
```

#### 1.2. isNotNull(val)
**参数说明：** `val` *要校验的值*
<br>　**返回值：** `Boolean`
<br>**功能描述：** 
> 检验传入值是否不为空<br>(值不等于 `null`、`''`、`undefined` 时返回 true)

**示例代码：**
```js
let var = 'not null';
let result = nothing.isNull(var) ? 'var is null' : 'var is not null';
// 输出结果：var is not null
```

#### 1.3. isBlank(val)
**参数说明：** `val` *要校验的值*
<br>　**返回值：** `Boolean`
<br>**功能描述：**
> 检验传入值是否为空字符串<br>(值等于 `null`、`''`、`undefined`、`'  '` 时返回 true)

**示例代码：**
```js
let var = '  ';
let result = nothing.isBlank(var) ? 'var is blank' : 'var is not blank';
// 输出结果：var is blank
```

#### 1.4. isNotBlank(val)
**参数说明：** `val` *要校验的值*
<br>　**返回值：** `Boolean`
<br>**功能描述：**
> 检验传入值是否不为空字符串<br>(值不等于 `null`、`''`、`undefined`、`'  '` 时返回 true)

**示例代码：**
```js
let var = '  ';
let result = nothing.isNotBlank(var) ? 'var is not blank' : 'var is blank';
// 输出结果：var is blank
```

#### 1.5. ifNull (val, val1, val2)
**参数说明：** `val` *要校验的值(val2未传递时作为返回结果)，*
<br>　　　　　 `val1` *返回结果1，*
<br>　　　　　 `val2` *返回结果2(可选)*
<br>　**返回值：** `{*}` *根据校验结果返回：val/val1/val2*
<br>**功能描述：** 
>空值处理(类oracle nvl2)<br>如果val为空，则返回val1，不为空时，则验证是否传递val2参数，如传递则返回val2，否则返回val

**示例代码：**
```js
let [var, var1, var2] = [null, '返回var1', '返回var2'];
nothing.ifNull(var, var1, var2);    // 结果为：返回var1
var = '返回var';
nothing.ifNull(var, var1, var2);    // 结果为：返回var2
nothing.ifNull(var, var1);          // 结果为：返回var
```


#### 1.6. deepCopy(source)
**参数说明：** `source` *要拷贝的对象*
<br>　**返回值：** `{*}` *拷贝后的对象*
<br>**功能描述：**
> 深拷贝<br>对传入对象进行深度拷贝<br>

**示例代码：**
```js
let a = {name: 'this is a', showFun: function() { return 'is a.'; }};
let copy_a = nothing.deepCopy(a);         // 完整拷贝
```

#### 1.7. ternary(expression, result1, result2)
**参数说明：** `expression` *表达式，*
<br>　　　　　 `result1` *表达式成立时返回，*
<br>　　　　　 `result2` *表达式不成立时返回*
<br>　**返回值：** `{*}` *表达式是否成立返回 result1/result2*
<br>**功能描述：** 
> 三元函数<br>expression 表达式成立则返回 result1，否则返回 result2

**示例代码：**
```js
let result = nothing.ternary(var === 100, 'var === 100', 'var != 100');
```

#### 1.8. caseValue(...args)
**参数说明：** `args` *动态参数*
<br>　**返回值：** `{*}`  *匹配后的结果*
<br>**功能描述：** 
> 匹配函数，类似 oracle 中的 decode<br>匹配规则: 取第一个参数与后续偶数位置的参数进行比较，如匹配则返回当前比较的偶数位置下一个参数作为结果，
如未找到匹配项目，并且参数个数大于3而且为偶数，则取最后一个参数作为默认值返回
<br>

* `注：参数为动态参数，参数个数最少为3，否则无意义`
* `偶数位置被比较的参数可以为数组`
* `比较使用 === 及 indexOf() 严格匹配值`
* `多个值包含匹配时，可传入数组(详见示例)`

**示例代码：**
```js
nothing.caseValue('A', 'A', value1, 'B', value2)    // 返回 value1
nothing.caseValue('A', 'B', value1, 'A', value2)    // 返回 value2
nothing.caseValue('A', 'B', value1, 'C', value2, defaultValue)        // 返回 defaultValue
nothing.caseValue('A', 'B', value1, ['A','C'], value2, defaultValue)  // 返回 value2
```

#### 1.9. buildTree(treeDataArray, options)
**参数说明：** `treeDataArray` *树节点数据集合(一维)*
<br>　　　　　 `options` *参数项(可选)，详细说明：*
<br>　　　　　　{
<br>　　　　　　　`nodeKey` *节点唯一标识(默认：id)*
<br>　　　　　　　`parentKey` *'父节点唯一标识(默认：parentId)*
<br>　　　　　　　`childrenKey` *子节点集合标识(默认：children)*
<br>　　　　　　　`root` *指定作为根节点的项目唯一标识(指定多个时用数组表示)*
<br>　　　　　　}
<br>　**返回值：** `Array`
<br>
**功能描述：** 
> 构建树<br>根据父节点唯一标识生成树型结构数据

**示例代码：**
```js
let data = [
  {id: 'N1', name: '节点1', parent: null},
  {id: 'N2', name: '节点2', parent: null},
  {id: 'N1-1', name: '节点1-1', parent: 'N1'},
  {id: 'N1-1-1', name: '节点1-1-1', parent: 'N1-1'},
  {id: 'N1-1-2', name: '节点1-1-2', parent: 'N1=1'}
];
let tree = nothing.buildTree(data, {parentKey: 'parent'});
```

#### 1.10. numberToFixed(num, scale = 0, mode = 0)
**参数说明：** `num`*要舍入处理的数值* 
<br>　　　　　 `scale` *保留小数位(可选，默认0)*
<br>　　　　　 `mode` *舍入模式(可选，默认0)：0:Math.round  1:Math.ceil  -1:Math.floor*
<br>　**返回值：** `Number`
<br>**功能描述：** 
> 数值型的舍入处理，可指定小数位&舍入模式<br>作为Number(num).toFixed(2) 的增强版本

**示例代码：**
```js
nothing.numberToFixed(10.2345, 2);      // 结果：10.23
nothing.numberToFixed(10.2345, 2, 0);   // 结果：10.23
nothing.numberToFixed(10.2345, 2, 1);   // 结果：10.24
nothing.numberToFixed(10.2345, 2, -1);  // 结果：10.23
```

#### 1.11. numberFormat(num, options)
**参数说明：** `num` *要舍入处理的数值*
<br>　　　　　 `options` *参数项(可选)，详细说明：*
<br>　　　　　　{
<br>　　　　　　　`scale` *保留小数位数*
<br>　　　　　　　`thousands` *是否显示千分位*
<br>　　　　　　　`mode` *舍入模式：0:Math.round  1:Math.ceil  -1:Math.floor*
<br>　　　　　　}
<br>　**返回值：** `String` *格式化后的字符串表示*
<br>**功能描述：** 
> 数值格式化<br>转换为指定格式的文本(舍入处理并可指定舍入模式)

**示例代码：**
```js
nothing.numberFormat(12806.123)                                               // 返回：12806
nothing.numberFormat(12806.123, {mode: 0, thousands: true, scale: 2})     // 返回：12,806.12
nothing.numberFormat(12806.123, {mode: 1, scale: 2})                      // 返回：12806.13
nothing.numberFormat(12806.126, {mode: -1, thousands: false, scale: 2})   // 返回：12806.12
```

#### 1.12. dateFormat(date, format)
**参数说明：** `date`*日期* 
<br>　　　　　 `format` *日期格式*
<br>　**返回值：** `String`
<br>**功能描述：** 
> 日期格式化<br>格式化日期为格式化表达式的字符串形式

**示例代码：**
```js
nothing.dateFormat(new Date(), 'yyyy年MM月');              // 结果：2018年06月
nothing.dateFormat(new Date(), 'yyyy-MM-dd');             // 结果：2018-06-10
nothing.dateFormat(new Date(), 'yyyy-MM-dd HH:mm:ss');    // 结果：2018-06-10 12:20:35
nothing.dateFormat(new Date(), 'yyyy-MM-dd');             // 结果：12:20:35
nothing.dateFormat(new Date(), 'dd/MM/yyyy');             // 结果：10/06/2018
```

#### 1.13. getURLParam(key)
**参数说明：** `key` *参数名称*
<br>　**返回值：** `String`
<br>**功能描述：** 
> 获取地址栏指定参数

**示例代码：**
```js
// 当前地址栏：http://www.xxx.com/index?userid=123&name=xiaoming
let userid = nothing.getParam('userid');  // 结果：123
```

#### 1.14. getOwnProperty(object, property)
**参数说明：** `object` *要获取属性的对象*
<br>　　　　　 `property` *要获取的属性(支持多级属性，以"."分隔)*
<br>　**返回值：** `{*}`
<br>**功能描述：** 
> 获取对象指定属性<br>注：属性支持多级属性，以"."分隔

**示例代码：**
```js
let user = {id: '0001', name: 'zhang san', school: {class: '302'}};
nothing.getOwnProperty(user, 'id');           // 结果：0001
nothing.getOwnProperty(user, 'name');         // 结果：zhang san
nothing.getOwnProperty(user, 'school.class'); // 结果：302
```

#### 1.15. hasOwnProperty(object, property)
**参数说明：** `object` *检查的对象*
<br>　　　　　 `property` *检查的属性(支持多级属性，以"."分隔)*
<br>　**返回值：** `Boolean`
<br>**功能描述：** 
> 检查对象是否具有指定属性<br>注：检查的属性支持多级属性，以"."分隔

**示例代码：**
```js
let user = {id: '0001', name: 'zhang san', school: {class: '302'}};
nothing.hasOwnProperty(user, 'name');   // 结果：true
nothing.hasOwnProperty(user, 'age');    // 结果：false
nothing.hasOwnProperty(user, 'school.class');    // 结果：true
```

#### 1.16. isPrototype(object, property)
**参数说明：** `object` *检查的对象*
<br>　　　　　 `property` *检查的属性(支持多级属性，以"."分隔)*
<br>　**返回值：** `Boolean`
<br>**功能描述：** 
> 检查对象属性是否为原型属性/函数<br>注：检查的属性支持多级属性，以"."分隔

**示例代码：**
```js
let user = {id: '0001', name: 'zhang san', school: {class: '302'}};
nothing.isPrototype(user, 'name');   // 结果：false
nothing.isPrototype(user, 'age');    // 结果：false
nothing.isPrototype(user, 'school.class');    // 结果：false
nothing.isPrototype(user, 'toString');        // 结果：true
```

#### 1.17. defineGetter: (object, getter, value)
**参数说明：** `object` *源对象*
<br>　　　　　 `getter` *要定义的getter名称/或要定义getter属性集合*
<br>　　　　　 `value` *getter的返回值*
<br>　**返回值：** 无
<br>**功能描述：** 
> 为对象定义getter，可单个定义或指定定义<br>单个定义：第二个参数`getter`为字符串形式的getter属性名称，并且需传入第三个参数`value`<br>批量定义：第二个参数`getter`为数组形式的getter属性集合，数据格式为：`[{name: 'getter1', value: 1}, {name: 'getter2', value: function() {return this.name; }}]`，第三个参数无效<br>
*注：`value` 可以为任何形式的数据或对象，为函数时在访问该getter属性时会执行，详见示例代码：*

**示例代码：**
```js
let user = {id: '0001', firstName: 'zhang', lastName: 'san', age: 20};
// 单个定义
nothing.defineGetter(user,
  'fullName',
  function () { return `${this.firstName} ${this.lastName}`; }
);
nothing.defineGetter(user, 'sayHello', 'Hello !');
// 批量定义
nothing.defineGetter(user, [
  {name: 'preYearAge', value: function () { return this.age - 1; }},
  {name: 'nextYearAge', value: function () { return this.age + 1; }}
]);
console.log(user.fullName);     // 输出：zhang san
console.log(user.sayHello);     // 输出：Hello !
console.log(user.preYearAge);   // 输出：19
console.log(user.nextYearAge);  // 输出：21
```

#### 1.18. defineSetter: (object, setter, value)

#### 1.19. validateNumber(val)
**参数说明：** `val` *要验证的参数*
<br>　**返回值：** `Boolean`
<br>**功能描述：** 
> 数值型验证是否合法

**示例代码：**
```js
nothing.validateNumber(12);           // 结果：true
nothing.validateNumber('12.22.32');   // 结果：false
nothing.validateNumber('ab32');       // 结果：false
```

#### 1.20. validateMobile(mobile)
**参数说明：** `mobile` *要验证的手机号*
<br>　**返回值：** `Boolean`
<br>**功能描述：** 
> 验证手机号码是否合法

**示例代码：**
```js
nothing.validateMobile(13500012222);    // 结果：true
nothing.validateMobile(24563325633);    // 结果：false
```

#### 1.21. validateTelephone(phone)
**参数说明：** `phone` *要验证的固定电话号码*
<br>　**返回值：** `Boolean`
<br>**功能描述：** 
> 验证固定电话号码是否合法

**示例代码：**
```js
nothing.validateTelephone('020-11112222');  // 结果：true
nothing.validateTelephone('02011112222');   // 结果：true
```

#### 1.22. validateIDCard(idCard)
**参数说明：** `idCard` *要验证的身份证号码*
<br>　**返回值：** `Boolean`
<br>**功能描述：** 
> 验证身份证号码是否合法

**示例代码：**
```js
nothing.validateIDCard('43048820100102445X'); // 结果：true
nothing.validateIDCard('1234567890');         // 结果：false
```

#### 1.23. validateEmail(email)
**参数说明：** `mail` *要验证的 email*
<br>　**返回值：** `Boolean`
<br>**功能描述：** 
> 验证email是否合法

**示例代码：**
```js
nothing.validateEmail('wangyi@163.com');    // 结果：true
nothing.validateEmail('wangyi@@');          // 结果：false
```

### 2. 系统对象扩展

#### 2.1. Object
序号 | 函数名称 | 说明
:--- | :--- | :---
1 | [Object.clone](/?id=_211-objectclonesource) | 对象克隆(深拷贝)
2 | [Object.prototype.clone](/?id=_212-objectprototypeclone) | 对象克隆(深拷贝)，基于对象实例克隆

##### 2.1.1. Object.clone(source)
**参数说明：** `source` *要克隆的对象*
<br>　**返回值：** `{*}` *克隆后的新对象*
<br>**功能描述：** 
> 对象克隆(深拷贝)

**示例代码：**
```js
let user = {id: '0001', name: 'wangxiaoming', showFun: () => { return this.name; }};
let newUser1 = Object.clone(user);        // 完整拷贝
```

##### 2.1.2. Object.prototype.clone()
**参数说明：** `无` 
<br>　**返回值：** `{*}` *克隆后的新对象*
<br>**功能描述：** 
> 对象克隆(深拷贝)，基于对象实例克隆<<br>派生于Object的对象实例都继承此方法(如：JSON、String、Array...等对象实例)

**示例代码：**
```js
let user = {id: '0001', name: 'wangxiaoming', showFun: () => { return this.name; }};
let newUser1 = user.clone();        // 完整拷贝
```

!> 注：`微信小程序` 环境不适用，暂无法实现对Object对象的原型扩展，请直接使用 `nothing.clone(object)` 或 `Object.clone(object)` 代替

#### 2.2. String
序号 | 函数名称 | 说明
:--- | :--- | :---
1 | [String.replaceAll](/?id=_221-stringreplaceallsource-substr-replacement) | String对象扩展：替换全部
2 | [String.prototype.replaceAll](/?id=_222-stringprototypereplaceallsubstr-replacement) | String对象原型扩展：替换全部
3 | [String.contains](/?id=_223-stringcontainssource-instr) | String对象扩展：是否包含
4 | [String.prototype.contains](/?id=_224-stringprototypecontainsinstr) | String对象原型扩展：是否包含
5 | [String.toByte](/?id=_225-stringtobytestr) | String对象扩展：字符串转 Byte 数组
6 | [String.prototype.toByte](/?id=_226-stringprototypetobyte) | String对象原型扩展：字符串转 Byte 数组
7 | [String.fromByte](/?id=_227-stringfrombytebytes) | String对象扩展：Byte 数组转字符串
8 | [String.from](/?id=_228-stringfromobject-format) | String对象扩展：将对象转换为字符串
9 | [String.isString](/?id=_229-stringisstringobject) | String对象扩展：校验对象是否为字符串

##### 2.2.1. String.replaceAll(source, substr, replacement)
**参数说明：** `source` *执行替换操作的字符串，*
<br>　　　　　 `substr` *查找匹配的内容，*
<br>　　　　　 `replacement` *替换的内容*
<br>　**返回值：** `String`
<br>**功能描述：**
> String对象扩展：替换全部<br>字符串查找替换指定内容(替换全部匹配)，作为原生 replace 函数的增强

**示例代码：**
```js
let str = ' this is string ';
let replaceStr = String.replaceAll(str, 'i', '');   // 结果为：ths s strng
```

##### 2.2.2. String.prototype.replaceAll(substr, replacement)
**参数说明：** `substr` *查找匹配的内容，*
<br>　　　　　 `replacement` *替换的内容*
<br>　**返回值：** `String`
<br>**功能描述：**
> String对象原型扩展：替换全部<br>字符串查找替换指定内容(替换全部匹配)，作为原生 replace 函数的增强

**示例代码：**
```js
let str = ' this is string ';
let replaceStr = str.replaceAll('i', '');     // 结果为：ths s strng
```

##### 2.2.3. String.contains(source, instr)
**参数说明：** `source` *源字符串，*
<br>　　　　　 `instr` *检查的内容*
<br>　**返回值：** `Boolean`
<br>**功能描述：**
> String对象扩展：是否包含<br>在字符串 `source` 中查找是否包含 `inStr`

**示例代码：**
```js
let source = 'user: zhang wang li';
let isContains = String.contains(source, 'zhang');     // 结果：true
```

##### 2.2.4. String.prototype.contains(instr)
**参数说明：** `instr` *检查的内容*
<br>　**返回值：** `Boolean`
<br>**功能描述：**
> String对象原型扩展：是否包含<br>在字符串中查找是否包含 `inStr`

**示例代码：**
```js
let source = 'user: zhang wang li';
let isContains = source.contains('zhang');     // 结果：true
```

##### 2.2.5. String.toByte(str)
**参数说明：** `str` *源字符串*
<br>　**返回值：** `[*]` *转换后的 Byte 数组形式*
<br>**功能描述：**
> String对象扩展：字符串转 Byte 数组

**示例代码：**
```js
let str = 'this is a string';
let bytes = String.toByte(str);
```

##### 2.2.6. String.prototype.toByte()
**参数说明：** `无`
<br>　**返回值：** `[*]` *转换后的 Byte 数组形式*
<br>**功能描述：**
> String对象原型扩展：字符串转 Byte 数组

**示例代码：**
```js
let str = 'this is a string';
let bytes = str.toByte();
```

##### 2.2.7. String.fromByte(bytes)
**参数说明：** `bytes` *Byte 数组*
<br>　**返回值：** `String` *转换后的字符串形式*
<br>**功能描述：**
> String对象扩展：Byte 数组转字符串

**示例代码：**
```js
let bytes = [ 122, 104, 97, 110, 103 ];
let str = String.fromByte(bytes); // 结果：zhang
```

##### 2.2.8. String.from(object, format)
**参数说明：** `object` *要转换的对象*
<br>　　　　　 `format` *格式(可选，仅对日期有效)*
<br>　**返回值：** `String` *转换后的字符串形式*
<br>**功能描述：**
> String对象扩展：将对象转换为字符串(日期型可指定格式)

**示例代码：**
```js
let str1 = String.from(true);             // 结果："true"
let str2 = String.from(100.1);            // 结果："100.1"
let str3 = String.from([1, 2, {a: 1}]);   // 结果："[1,2,{"a":1}]"
let str4 = String.from(new Date());       // 结果："2019-01-01 01:01:01"
let str5 = String.from(new Date(), 'yy-MM-dd'); // 结果："19-01-01"
```

##### 2.2.9. String.isString(object)
**参数说明：** `object` *要校验的对象*
<br>　**返回值：** `Boolean`
<br>**功能描述：**
> String对象扩展：校验对象是否为字符串

**示例代码：**
```js
String.isString(true);            // 结果：false
String.isString(100.1);           // 结果：false
String.isString([1, 2]);          // 结果：false
String.isString(new Date());      // 结果：false
String.isString("string");        // 结果：true
```

#### 2.3. Number
序号 | 函数名称 | 说明
:--- | :--- | :---
1 | [Number.format](/?id=_231-numberformatnum-options) | Number对象扩展：数值格式化
2 | [Number.prototype.format](/?id=_232-numberprototypeformatoptions) | Number对象原型扩展：数值格式化
3 | [Number.toFixed2](/?id=_233-numbertofixed2num-scale-mode) | Number对象扩展：数值舍入处理（可指定小数位数和舍入模式）
4 | [Number.prototype.toFixed2](/?id=_234-numberprototypetofixed2scale-mode) | Number对象原型扩展：数值舍入处理（可指定小数位数和舍入模式）

##### 2.3.1. Number.format(num, options)
**参数说明：** `num` *要舍入处理的数值*
<br>　　　　　 `options` *参数项(可选)，详细说明：*
<br>　　　　　　{
<br>　　　　　　　`scale` *保留小数位数*
<br>　　　　　　　`thousands` *是否显示千分位*
<br>　　　　　　　`mode` *舍入模式：0:Math.round  1:Math.ceil  -1:Math.floor*
<br>　　　　　　}
<br>　**返回值：** `String` *格式化后的字符串表示*
<br>**功能描述：** 
> 数值格式化<br>转换为指定格式的文本(舍入处理并可指定舍入模式)

**示例代码：**
```js
Number.format(12806.123)                                           // 返回：12806
Number.format(12806.123, {mode: 0, thousands: true, scale: 2})     // 返回：12,806.12
Number.format(12806.123, {mode: 1, scale: 2})                      // 返回：12806.13
Number.format(12806.126, {mode: -1, thousands: false, scale: 2})   // 返回：12806.12
```

##### 2.3.2. Number.prototype.format(options)
**参数说明：** `options` *参数项(可选)，详细说明：*
<br>　　　　　　{
<br>　　　　　　　`scale` *保留小数位数*
<br>　　　　　　　`thousands` *是否显示千分位*
<br>　　　　　　　`mode` *舍入模式：0:Math.round  1:Math.ceil  -1:Math.floor*
<br>　　　　　　}
<br>　**返回值：** `String` *格式化后的字符串表示*
<br>**功能描述：** 
> 数值格式化<br>转换为指定格式的文本(舍入处理并可指定舍入模式)

**示例代码：**
```js
Number(12806.123)                                                     // 返回：12806
Number(12806.123).format.({mode: 0, thousands: true, scale: 2})   // 返回：12,806.12
Number(12806.123).format.({mode: 1, scale: 2})                    // 返回：12806.13
Number(12806.126).format.({mode: -1, thousands: false, scale: 2}) // 返回：12806.12
```

##### 2.3.3. Number.toFixed2(num, scale, mode)
**参数说明：** `num`*要舍入处理的数值* 
<br>　　　　　 `scale` *保留小数位(可选，默认0)*
<br>　　　　　 `mode` *舍入模式(可选，默认0)：0:Math.round  1:Math.ceil  -1:Math.floor*
<br>　**返回值：** `Number`
<br>**功能描述：** 
> 数值型的舍入处理，可指定小数位&舍入模式<br>作为Number(num).toFixed() 的增强版本

**示例代码：**
```js
Number.toFixed2(10.2345, 2);      // 结果：10.23
Number.toFixed2(10.2345, 2, 0);   // 结果：10.23
Number.toFixed2(10.2345, 2, 1);   // 结果：10.24
Number.toFixed2(10.2345, 2, -1);  // 结果：10.23
```

##### 2.3.4. Number.prototype.toFixed2(scale, mode)
**参数说明：** `scale` *保留小数位(可选，默认0)*
<br>　　　　　 `mode` *舍入模式(可选，默认0)：0:Math.round  1:Math.ceil  -1:Math.floor*
<br>　**返回值：** `Number`
<br>**功能描述：** 
> 数值型的舍入处理，可指定小数位&舍入模式<br>作为Number(num).toFixed() 的增强版本

**示例代码：**
```js
Number(10.2345).toFixed2(2);      // 结果：10.23
Number(10.2345).toFixed2(2, 0);   // 结果：10.23
Number(10.2345).toFixed2(2, 1);   // 结果：10.24
Number(10.2345).toFixed2(2, -1);  // 结果：10.23
```

#### 2.4. Boolean
><br>　　　　　暂无<br><br>

#### 2.5. Date

> 扩展属性：

序号 | 属性名称 | 说明
:--- | :--- | :---
1 | Date.nowDate | 当前日期
2 | Date.nowTime | 当前时间

> 扩展函数：

序号 | 函数名称 | 说明
:--- | :--- | :---
1 | [Date.from](/?id=_251-datefromdate) | Date对象扩展：将传入参数转换为日期对象
2 | [Date.format](/?id=_252-dateformatdate-fmt) | Date对象扩展：日期格式化
3 | [Date.prototype.format](/?id=_253-dateprototypeformatfmt) | Date对象原型扩展：日期格式化
4 | [Date.add](/?id=_254-dateadddate-interval-number) | Date对象扩展：日期计算(增加)
5 | [Date.prototype.add](/?id=_25-dateprototypeaddinterval-number) | Date对象原型扩展：日期计算(增加)
6 | [Date.diff](/?id=_256-datediffdiffdate1-diffdate2-interval) | Date对象扩展：日期差异计算
7 | [Date.prototype.diff](/?id=_257-dateprototypediffdiffdate-interval) | Date对象原型扩展：日期差异计算

##### 2.5.1. Date.from(date)
**参数说明：** `date` *日期（字符串、时间戳、日期实例等形式）*
<br>　**返回值：** `Date` *转换后的Date对象*
<br>**功能描述：**
> 扩展 Date 对象实例：将传入参数转换为Date对象<br>


##### 2.5.2. Date.format(date, fmt)
**参数说明：** `date` *日期*
<br>　　　　　 `fmt` *格式表达式*
<br>　**返回值：** `String` *格式化后字符串形式*
<br>**功能描述：**
> 扩展 Date 对象实例：按指定格式表达式格式化日期<br>

**示例代码：**
```js
let date = new Date();
let year = Date.format(date, 'yy');
let fullYear = Date.format(date, 'yyyy');
let strDate = Date.format(date, 'yyyy-MM-dd');
let strTime = Date.format(date, 'yyyy-MM-dd HH:mm:ss');
/**
 * 结果：
 * year = 19
 * fullYear = 2019
 * strDate = 2019-06-10
 * strTime = 2019-06-10 10:55:22
 */
```

##### 2.5.3. Date.prototype.format(fmt)
**参数说明：** `fmt` *格式表达式*
<br>　**返回值：** `String` *格式化后字符串形式*
<br>**功能描述：**
> 扩展 Date 对象实例：按指定格式表达式格式化日期<br>

**示例代码：**
```js
let date = new Date();
let year = date.format('yy');
let fullYear = date.format('yyyy');
let strDate = date.format('yyyy-MM-dd');
let strTime = date.format('yyyy-MM-dd HH:mm:ss');
/**
 * 结果：
 * year = 19
 * fullYear = 2019
 * strDate = 2019-06-10
 * strTime = 2019-06-10 10:55:22
 */
```

##### 2.5.4. Date.add(date, interval, number)
**参数说明：** `date` *日期*
<br>　　　　　 `interval` *计算日期间隔单位*
<br>　　　　　 `number` *计算值(可传入负数)*
<br>　**返回值：** `Date` *计算后的日期*
<br>**功能描述：**
> 扩展 Date 对象实例：日期计算-为日期增加指定间隔单位的值<br>

**示例代码：**
```js
let date = new Date();
date = Date.add(date, 'y', 1);  // 增加1年
date = Date.add(date, 'q', 1);  // 增加1季度
date = Date.add(date, 'm', 1);  // 增加1月
date = Date.add(date, 'w', 1);  // 增加1星期
date = Date.add(date, 'd', -1);  // 增加-1天(减少一天)
date = Date.add(date, 'h', 1);  // 增加1小时
date = Date.add(date, 'n', 1);  // 增加1分钟
date = Date.add(date, 's', 30); // 增加30秒
date = Date.add(date, 'ms', 1000 * 3 * 10);   // 增加(1000 * 3 * 10)毫秒
```

##### 2.5.5. Date.prototype.add(interval, number)
**参数说明：** `interval` *计算日期间隔单位*
<br>　　　　　 `number` *计算值(可传入负数)*
<br>　**返回值：** `Date` *计算后的日期*
<br>**功能描述：**
> 扩展 Date 对象实例：日期计算-为日期增加指定间隔单位的值<br>

**示例代码：**
```js
let date = new Date();
date = date.add('y', 1);  // 增加1年
date = date.add('q', 1);  // 增加1季度
date = date.add('m', 1);  // 增加1月
date = date.add('w', 1);  // 增加1星期
date = date.add('d', -1);  // 增加-1天(减少一天)
date = date.add('h', 1);  // 增加1小时
date = date.add('n', 1);  // 增加1分钟
date = date.add('s', 30); // 增加30秒
date = date.add('ms', 1000 * 3 * 10);   // 增加(1000 * 3 * 10)毫秒
```

##### 2.5.6. Date.diff(diffDate1 , diffDate2, interval)
**参数说明：** `diffDate1` *日期1*
<br>　　　　　 `diffDate2` *日期2*
<br>　　　　　 `interval` *计算日期间隔单位*
<br>　**返回值：** `Number` *计算后差异值*
<br>**功能描述：**
> 扩展 Date 对象实例：日期计算-计算两个日期指定间隔单位的差异值<br>

**示例代码：**
```js
let date1 = new Date('2018-05-01')
let date2 = new Date('2019-05-01')
let diff_year = Date.diff(date1, date2, 'y');   // 结果(年)：1
let diff_month = Date.diff(date1, date2, 'm');  // 结果(月)：12
let diff_day = Date.diff(date1, date2, 'd');    // 结果(天)：365

let dateTime1 = new Date('2019-05-01 12:30:15')
let dateTime2 = new Date('2019-05-01 16:30:15')
let diff_hour = Date.diff(dateTime1, dateTime2, 'h');           // 结果(小时)：4
let diff_minutes = Date.diff(dateTime1, dateTime2, 'n');        // 结果(分钟)：240
let diff_seconds = Date.diff(dateTime1, dateTime2, 's');        // 结果(秒)：14400
let diff_milliseconds = Date.diff(dateTime1, dateTime2, 'ms');  // 结果(毫秒)：14400000
```

##### 2.5.7. Date.prototype.diff(diffDate, interval)
**参数说明：** `diffDate` *要计算差异的日期*
<br>　　　　　 `interval` *计算日期间隔单位*
<br>　**返回值：** `Number` *计算后差异值*
<br>**功能描述：**
> 扩展 Date 对象实例：日期计算-计算两个日期指定间隔单位的差异值<br>

**示例代码：**
```js
let date1 = new Date('2018-05-01')
let date2 = new Date('2019-05-01')
let diff_year = date1.diff(date2, 'y');   // 结果(年)：1
let diff_month = date1.diff(date2, 'm');  // 结果(月)：12
let diff_day = date1.diff(date2, 'd');    // 结果(天)：365

let dateTime1 = new Date('2019-05-01 12:30:15')
let dateTime2 = new Date('2019-05-01 16:30:15')
let diff_hour = dateTime1.diff(dateTime2, 'h');           // 结果(小时)：4
let diff_minutes = dateTime1.diff(dateTime2, 'n');        // 结果(分钟)：240
let diff_seconds = dateTime1.diff(dateTime2, 's');        // 结果(秒)：14400
let diff_milliseconds = dateTime1.diff(dateTime2, 'ms');  // 结果(毫秒)：14400000
```

#### 2.6. JSON
序号 | 函数名称 | 说明
:--- | :--- | :---
1 | [JSON.new](/?id=_261-jsonnewjson-args) | JSON对象扩展：传入JSON对象，创建新JSON对象
2 | [JSON.prototype.new](/?id=_262-jsonprototypenewargs) | JSON对象原型扩展：基于对象实例本身创建新JSON对象
3 | [JSON.toFormSerializeArray](/?id=_263-jsontoformserializearrayjson) | JSON对象扩展：JSON转表单序列化数组
4 | [JSON.prototype.toFormSerializeArray](/?id=_264-jsonprototypetoformserializearray) | JSON对象原型扩展：基于对象实例本身创建新JSON对象
5 | [JSON.formSerializeArray](/?id=_265-jsonformserializearrayformserializearray) | JSON对象扩展：表单序列化数组形式转JSON对象
6 | [JSON.keys](/?id=_266-jsonkeysjson) | JSON对象扩展：获取JSON对象的所有key(数组形式)
7 | [JSON.prototype.keys](/?id=_267-jsonprototypekeys) | JSON对象原型扩展：获取JSON对象的所有key(数组形式)
8 | [JSON.clear](/?id=_268-jsonclearjson) | JSON对象扩展：清空JSON对象(移除所有属性)
9 | [JSON.prototype.clear](/?id=_269-jsonprototypeclear) | JSON对象原型扩展：清空JSON对象(移除所有属性)
10 | [JSON.remove](/?id=_2610-jsonremovejson-keys) | JSON对象扩展：移除JSON对象指定属性
11 | [JSON.prototype.remove](/?id=_2611-jsonprototyperemovekeys) | JSON对象原型扩展：移除JSON对象指定属性
12 | [JSON.getAttribute](/?id=_2612-jsongetattributejson-attribute) | JSON对象扩展：获取JSON对象指定属性值
13 | [JSON.prototype.getAttribute](/?id=_2613-jsonprototypegetattributeattribute) | JSON对象原型扩展：获取JSON对象指定属性值
14 | [JSON.setAttribute](/?id=_2614-jsonsetattributejson-attribute-value) | JSON对象扩展：设置JSON对象指定属性值
15 | [JSON.prototype.setAttribute](/?id=_2615-jsonprototypesetattributeattribute-value) | JSON对象原型扩展：设置JSON对象指定属性值

##### 2.6.1. JSON.new(json, ...args)
**参数说明：** `json` *源对象，* `args` *动态指定属性集*
<br>　**返回值：** `{*}` *创建的新对象*
<br>
**功能描述：**
> JSON对象扩展：传入JSON对象，创建新JSON对象（args动态指定属性集）

**示例代码：**
```js
let psn = {id: '001', name: 'zhang',
  corp: {id: 'c01', name: 'xxx公司', depts: [{id: 'd01', 'xxx部门'}]}
};
let simpPsn = JSON.new(psn, 'id', 'name', 'corp.id', 'test.test1');
// 结果：{id: '001', name: 'zhang', corp: {id: 'c01'}, test: {test1: null}};
```

##### 2.6.2. JSON.prototype.new(...args)
**参数说明：** `args` *动态指定属性集*
<br>　**返回值：** `{*}` *创建的新对象*
<br>
**功能描述：**
> JSON对象原型扩展：基于对象实例本身创建新JSON对象（args动态指定属性集）

**示例代码：**
```js
let psn = {id: '001', name: 'zhang',
  corp: {id: 'c01', name: 'xxx公司', depts: [{id: 'd01', 'xxx部门'}]}
};
let simpPsn = psn.new('id', 'name', 'corp.id', 'test.test1');
// 结果：{id: '001', name: 'zhang', corp: {id: 'c01'}, test: {test1: null}};
```

!> 注：`Node.js` 后端环境不适用，暂无法实现后端环境对JSON对象的原型扩展，请使用 `JSON.new(json, ...args)` 代替

##### 2.6.3. JSON.toFormSerializeArray(json)
**参数说明：** `json` *要转换的对象*
<br>　**返回值：** `Array` *表单序列化数组形式*
<br>**功能描述：**
> JSON转表单序列化数组<br>将传入的JSON对象转换为表单序列化数组形式<br>

**示例代码：**
```js
let json = {name: 'zhang san', dept: {id: 'dept1', name: '信息部'}, hobby: ['篮球', '唱歌', '爬山', '摄影']};
let formArray = JSON.toFormSerializeArray(json);
```

##### 2.6.4. JSON.prototype.toFormSerializeArray()
**参数说明：** `无`
<br>　**返回值：** `Array` *表单序列化数组形式*
<br>**功能描述：**
> JSON转表单序列化数组<br>将JSON对象自身转换为表单序列化数组形式<br>

**示例代码：**
```js
let json = {name: 'zhang san', dept: {id: 'dept1', name: '信息部'}, hobby: ['篮球', '唱歌', '爬山', '摄影']};
let formArray = json.toFormSerializeArray();
```

##### 2.6.5. JSON.formSerializeArray(formSerializeArray)
**参数说明：** `formSerializeArray` *表单序列化数组形式*
<br>　**返回值：** `{*}` *转化后的JSON对象*
<br>**功能描述：**
> 表单序列化数组形式转JSON对象<br>将传入的表单序列化数组形式转换为JSON对象形式<br>

**示例代码：**
```js
```

##### 2.6.6. JSON.keys(json)
**参数说明：** `json` *json对象*
<br>　**返回值：** `{*}` *json对象的所有key(数组形式)*
<br>**功能描述：**
> 获取JSON对象的所有key(数组形式)<br>

**示例代码：**
```js
let json = {name: 'zhang san', dept: {id: 'dept1', name: '信息部'}, hobby: ['篮球', '唱歌', '爬山', '摄影']};
let jsonKeys = JSON.keys(json);
// 结果：[ 'name', 'dept', 'hobby' ]
```

##### 2.6.7. JSON.prototype.keys()
**参数说明：** `无`
<br>　**返回值：** `{*}` *json对象的所有key(数组形式)*
<br>**功能描述：**
> 获取JSON对象自身的所有key(数组形式)<br>

**示例代码：**
```js
let json = {name: 'zhang san', dept: {id: 'dept1', name: '信息部'}, hobby: ['篮球', '唱歌', '爬山', '摄影']};
let jsonKeys = json.keys();
// 结果：[ 'name', 'dept', 'hobby' ]
```

##### 2.6.8. JSON.clear(json)
**参数说明：** `json` *json对象*
<br>　**返回值：** `{*}`
<br>**功能描述：**
> 清空传入的JSON对象的所有属性<br>

**示例代码：**
```js
let json = {name: 'zhang san', dept: {id: 'dept1', name: '信息部'}, hobby: ['篮球', '唱歌', '爬山', '摄影']};
json = JSON.clear(json);
// 结果：json = {}
```

##### 2.6.9. JSON.prototype.clear()
**参数说明：** `无`
<br>　**返回值：** `{*}`
<br>**功能描述：**
> 清空JSON对象本身的所有属性<br>

**示例代码：**
```js
let json = {name: 'zhang san', dept: {id: 'dept1', name: '信息部'}, hobby: ['篮球', '唱歌', '爬山', '摄影']};
json = json.clear();
// 结果：json = {}
```

##### 2.6.10. JSON.remove(json, ...keys)
**参数说明：** `json` *json对象*
<br>　　　　　 `keys` *动态参数(key集合)*
<br>　**返回值：** `{*}`
<br>**功能描述：**
> 移除传入的JSON对象的指定属性(可批量指定，支持多级属性)<br>

**示例代码：**
```js
let json = {name: 'zhang san', dept: {id: 'dept1', name: '信息部'}, hobby: ['篮球', '唱歌', '爬山', '摄影']};
json = JSON.remove(json, 'dept.name', 'hobby');
// 结果：json = {name: 'zhang san', dept: {id: 'dept1'}}
```

##### 2.6.11. JSON.prototype.remove(...keys)
**参数说明：** `keys` *动态参数(key集合)*
<br>　**返回值：** `{*}`
<br>**功能描述：**
> 移除JSON对象本身的指定属性(可批量指定，支持多级属性)<br>

**示例代码：**
```js
let json = {name: 'zhang san', dept: {id: 'dept1', name: '信息部'}, hobby: ['篮球', '唱歌', '爬山', '摄影']};
json = json.remove('dept.name', 'hobby');
// 结果：json = {name: 'zhang san', dept: {id: 'dept1'}}
```

##### 2.6.12. JSON.getAttribute(json, attribute)
**参数说明：** `json` *json对象*
<br>　　　　　 `attribute` *属性*
<br>　**返回值：** `{*}` *属性值*
<br>**功能描述：**
> 获取传入的JSON对象的指定属性(支持多级属性)<br>

**示例代码：**
```js
let json = {name: 'zhang san', dept: {id: 'dept1', name: '信息部'}};
let dept = JSON.getAttribute(json, 'dept');           // 结果：{id: 'dept1', name: '信息部'}
let deptName = JSON.getAttribute(json, 'dept.name');  // 结果：信息部
```

##### 2.6.13. JSON.prototype.getAttribute(attribute)
**参数说明：** `attribute` *属性*
<br>　**返回值：** `{*}` *属性值*
<br>**功能描述：**
> 获取JSON对象本身的指定属性(支持多级属性)<br>

**示例代码：**
```js
let json = {name: 'zhang san', dept: {id: 'dept1', name: '信息部'}};
let dept = json.getAttribute('dept');           // 结果：{id: 'dept1', name: '信息部'}
let deptName = json.getAttribute('dept.name');  // 结果：信息部
```

##### 2.6.14. JSON.setAttribute(json, attribute, value)
**参数说明：** `json` *json对象*
<br>　　　　　 `attribute` *要设置的属性*
<br>　　　　　 `value` *要设置的值*
<br>　**返回值：** `{*}` *属性值*
<br>**功能描述：**
> 设置传入的JSON对象的指定属性值(支持多级属性)<br>

**示例代码：**
```js
let json = {name: 'zhang san', dept: {id: 'dept1', name: '信息部'}};
json = JSON.setAttribute(json, 'dept.name', '财务部');
// 结果：{name: 'zhang san', dept: {id: 'dept1', name: '财务部'}}
json = JSON.setAttribute(json, 'hobby', ['篮球', '唱歌', '爬山', '摄影']);
// 结果：{name: 'zhang san', dept: {id: 'dept1', name: '信息部'}, hobby: ['篮球', '唱歌', '爬山', '摄影']}
```

##### 2.6.15. JSON.prototype.setAttribute(attribute, value)
**参数说明：** `attribute` *要设置的属性*
<br>　　　　　 `value` *要设置的值*
<br>　**返回值：** `{*}` *属性值*
<br>**功能描述：**
> 设置JSON对象本身的指定属性值(支持多级属性)<br>

**示例代码：**
```js
let json = {name: 'zhang san', dept: {id: 'dept1', name: '信息部'}};
json = JSON.setAttribute('dept.name', '财务部');
// 结果：{name: 'zhang san', dept: {id: 'dept1', name: '财务部'}}
json = JSON.setAttribute('hobby', ['篮球', '唱歌', '爬山', '摄影']);
// 结果：{name: 'zhang san', dept: {id: 'dept1', name: '信息部'}, hobby: ['篮球', '唱歌', '爬山', '摄影']}
```

#### 2.7. Array
序号 | 函数名称 | 说明
:--- | :--- | :---
1 | [Array.isEmpty](/?id=_271-arrayisemptyarray) | Array对象扩展：数组是否为空
2 | [Array.prototype.isEmpty](/?id=_272-arrayprototypeisempty) | Array对象原型扩展：数组是否为空
3 | [Array.isNotEmpty](/?id=_273-arrayisnotemptyarray) | Array对象扩展：数据是否不为空
4 | [Array.prototype.isNotEmpty](/?id=_274-arrayprototypeisnotempty) | Array对象原型扩展：数据是否不为空
5 | [Array.contains](/?id=_275-arraycontainsarray-element) | Array对象扩展：数组中是否包含指定元素
6 | [Array.prototype.contains](/?id=_276-arrayprototypecontainselement) | Array对象原型扩展：数组中是否包含指定元素
7 | [Array.add](/?id=_277-arrayaddarray-element-index) | Array对象扩展：添加元素到数组中
8 | [Array.prototype.add](/?id=_278-arrayprototypeaddelement-index) | Array对象原型扩展：添加元素到数组中
9 | [Array.addAll](/?id=_279-arrayaddallarray-elements-index) | Array对象扩展：批量添加元素到数组中
10 | [Array.prototype.addAll](/?id=_2710-arrayprototypeaddallelements-index) | Array对象原型扩展：批量添加元素到数组中
11 | [Array.addFirst](/?id=_2711-arrayaddfirstarray-element) | Array对象扩展：添加元素到数组的第一个位置
12 | [Array.prototype.addFirst](/?id=_2712-arrayprototypeaddfirstelement) | Array对象原型扩展：添加元素到数组的第一个位置
13 | [Array.first](/?id=_2713-arrayfirstarray) | Array对象扩展：返回数组的第一个元素
14 | [Array.prototype.first](/?id=_2714-arrayprototypefirst) | Array对象原型扩展：返回数组的第一个元素
15 | [Array.last](/?id=_2715-arraylastarray) | Array对象扩展：返回数组的最后一个元素
16 | [Array.prototype.last](/?id=_2716-arrayprototypelast) | Array对象原型扩展：返回数组的最后一个元素
17 | [Array.remove](/?id=_2717-arrayremovearray-element) | Array对象扩展：从数组的移除指定元素
18 | [Array.prototype.remove](/?id=_2718-arrayprototyperemoveelement) | Array对象原型扩展：从数组的移除指定元素
19 | [Array.sum](/?id=_2719-arraysumarray-options) | Array对象扩展：汇总数组元素
20 | [Array.prototype.sum](/?id=_2720-arrayprototypesumoptions) | Array对象原型扩展：汇总数组元素
21 | [Array.sumAttribute](/?id=_2721-arraysumattributearray-attribute-options) | Array对象扩展：汇总数组元素指定属性
22 | [Array.prototype.sumAttribute](/?id=_2722-arrayprototypesumattributeattribute-options) | Array对象原型扩展：汇总数组元素指定属性
23 | [Array.getAttribute](/?id=_2723-arraygetattributearray-attribute-options) | Array对象扩展：批量获取对象指定属性值
24 | [Array.prototype.getAttribute](/?id=_2724-arrayprototypegetattributeattribute-options) | Array对象原型扩展：批量获取对象指定属性值
25 | [Array.setAttribute](/?id=_2725-arraysetattributearray-attribute-value-options) | Array对象扩展：批量设置数组元素指定属性值
26 | [Array.prototype.setAttribute](/?id=_2726-arrayprototypesetattributeattribute-value-options) | Array对象原型扩展：批量设置数组元素指定属性值
27 | [Array.deleteAttribute](/?id=_2727-arraydeleteattributearray-attribute-options) | Array对象扩展：批量删除数组元素指定属性
28 | [Array.prototype.deleteAttribute](/?id=_2728-arrayprototypedeleteattributeattribute-options) | Array对象原型扩展：批量删除数组元素指定属性
29 | [Array.setAttributeToAttribute](/?id=_2729-arraysetattributetoattributearray-sourceattribute-targetattribute-options) | Array对象扩展：批量设置数组元素本身属性到指定属性
30 | [Array.prototype.setAttributeToAttribute](/?id=_2730-arrayprototypesetattributetoattributesourceattribute-targetattribute-options) | Array对象原型扩展：批量设置数组元素本身属性到指定属性
31 | [Array.agg](/?id=_2731-arrayaggdata-groupby-options) | Array对象扩展：对数组进行分组聚合统计
32 | [Array.prototype.agg](/?id=_2732-arrayprototypeagggroupby-options) | Array对象原型扩展：对数组进行分组聚合统计

##### 2.7.1. Array.isEmpty(array)
**参数说明：** `array` *数组*
<br>　**返回值：** `Boolean` *数据是否为空*
<br>**功能描述：**
> 校验传入的数组对象是否为空(等于：[]、null、undefined)<br>

**示例代码：**
```js
let arr1 = [], arr2 = [1, 2, 3], arr3;
let result1 = Array.isEmpty(arr1);  // 结果：true
let result2 = Array.isEmpty(arr2);  // 结果：false
let result3 = Array.isEmpty(arr3);  // 结果：true
```

##### 2.7.2. Array.prototype.isEmpty()
**参数说明：** `无`
<br>　**返回值：** `Boolean` *数据是否为空*
<br>**功能描述：**
> 校验数组本身是否为空(等于：[]、null、undefined)<br>

**示例代码：**
```js
let arr1 = [], arr2 = [1, 2, 3], arr3;
let result1 = arr1.isEmpty();  // 结果：true
let result2 = arr2.isEmpty();  // 结果：false
let result3 = arr3.isEmpty();  // 结果：true
```

##### 2.7.3. Array.isNotEmpty(array)
**参数说明：** `array` *数组*
<br>　**返回值：** `Boolean` *数据是否不为空*
<br>**功能描述：**
> 校验传入的数组对象是否不为空(不等于：[]、null、undefined)<br>

**示例代码：**
```js
let arr1 = [], arr2 = [1, 2, 3], arr3;
let result1 = Array.isNotEmpty(arr1);  // 结果：false
let result2 = Array.isNotEmpty(arr2);  // 结果：true
let result3 = Array.isNotEmpty(arr3);  // 结果：false
```

##### 2.7.4. Array.prototype.isNotEmpty()
**参数说明：** `无`
<br>　**返回值：** `Boolean` *数据是否不为空*
<br>**功能描述：**
> 校验数组对象本身是否不为空(不等于：[]、null、undefined)<br>

**示例代码：**
```js
let arr1 = [], arr2 = [1, 2, 3], arr3;
let result1 = arr1.isNotEmpty();  // 结果：false
let result2 = arr2.isNotEmpty();  // 结果：true
let result3 = arr3.isNotEmpty();  // 结果：false
```

##### 2.7.5. Array.contains(array, element)
**参数说明：** `array` *要校验的数组*
<br>　　　　　 `element` *要校验的数组元素*
<br>　**返回值：** `Boolean` *是否包含*
<br>**功能描述：**
> 检验传入的数组中是否包含指定元素<br>

**示例代码：**
```js
let array = [1, 2, 3, 4, 8, 10];
let result1 = Array.contains(array, 1);   // 结果：true
let result2 = Array.contains(array, 5);   // 结果：false
let result3 = Array.contains(array, 10);   // 结果：true
```

##### 2.7.6. Array.prototype.contains(element)
**参数说明：** `element` *要校验的数组元素*
<br>　**返回值：** `Boolean` *是否包含*
<br>**功能描述：**
> 检验数组本身是否包含指定元素<br>

**示例代码：**
```js
let array = [1, 2, 3, 4, 8, 10];
let result1 = array.contains(1);   // 结果：true
let result2 = array.contains(5);   // 结果：false
let result3 = array.contains(10);   // 结果：true
```

##### 2.7.7. Array.add(array, element, index)
**参数说明：** `array` *数组*
<br>　　　　　 `element` *要添加的元素*
<br>　　　　　 `index` *添加的位置(可选)*
<br>　**返回值：** `Array`
<br>**功能描述：**
> 添加指定元素到传入的数组中(可指定位置[可选参数])<br>

**示例代码：**
```js
let array = [1, 2, 3, 4, 8, 10];
array = Array.add(array, 9);      // 结果：[ 1, 2, 3, 4, 8, 10, 9 ]
array = Array.add(array, 5, 4);   // 结果：[ 1, 2, 3, 4, 5, 8, 10, 9 ]
```

##### 2.7.8. Array.prototype.add(element, index)
**参数说明：** `element` *要添加的元素*
<br>　　　　　 `index` *添加的位置(可选)*
<br>　**返回值：** `Array`
<br>**功能描述：**
> 添加指定元素到数组中(可指定位置[可选参数])<br>

**示例代码：**
```js
let array = [1, 2, 3, 4, 8, 10];
array = array.add(9);      // 结果：[ 1, 2, 3, 4, 8, 10, 9 ]
array = array.add(5, 4);   // 结果：[ 1, 2, 3, 4, 5, 8, 10, 9 ]
```

##### 2.7.9. Array.addAll(array, elements, index)
**参数说明：** `array` *数组*
<br>　　　　　 `elements` *要添加的元素集合*
<br>　　　　　 `index` *添加的位置(可选)*
<br>　**返回值：** `Array`
<br>**功能描述：**
> 批量添加元素到传入的数组中(可指定位置[可选参数])<br>

**示例代码：**
```js
let array = [1, 2, 3, 4, 8, 10];
let elements = [5, 6, 7];
array = Array.addAll(array, elements, 4);      // 结果：[ 1, 2, 3, 4, 5, 6, 7, 8, 10 ]
```

##### 2.7.10. Array.prototype.addAll(elements, index)
**参数说明：** `elements` *要添加的元素集合*
<br>　　　　　 `index` *添加的位置(可选)*
<br>　**返回值：** `Array`
<br>**功能描述：**
> 批量添加元素到数组中(可指定位置[可选参数])<br>

**示例代码：**
```js
let array = [1, 2, 3, 4, 8, 10];
let elements = [5, 6, 7];
array = array.addAll(elements, 4);      // 结果：[ 1, 2, 3, 4, 5, 6, 7, 8, 10 ]
```

##### 2.7.11. Array.addFirst(array, element)
**参数说明：** `array` *数组*
<br>　　　　　 `element` *要添加的元素*
<br>　**返回值：** `Array`
<br>**功能描述：**
> 添加指定元素到传入的数组的第一个位置<br>

**示例代码：**
```js
let array = [1, 2, 3, 4, 8, 10];
array = Array.addFirst(array, 9);      // 结果：[ 9, 1, 2, 3, 4, 8, 10 ]
```

##### 2.7.12. Array.prototype.addFirst(element)
**参数说明：** `element` *要添加的元素*
<br>　**返回值：** `Array`
<br>**功能描述：**
> 添加指定元素到数组的第一个位置<br>

**示例代码：**
```js
let array = [1, 2, 3, 4, 8, 10];
array = array.addFirst( 9);      // 结果：[ 9, 1, 2, 3, 4, 8, 10 ]
```

##### 2.7.13. Array.first(array)
**参数说明：** `array` *数组*
<br>　**返回值：** `{*}` *数组的第一个元素*
<br>**功能描述：**
> 返回传入的数组对象的第一个元素<br>

**示例代码：**
```js
let array = [1, 2, 3, 4, 5];
let first = Array.first(array); // 结果: 1
```

##### 2.7.14. Array.prototype.first()
**参数说明：** `无`
<br>　**返回值：** `{*}` *数组的第一个元素*
<br>**功能描述：**
> 返回数组对象的第一个元素<br>

**示例代码：**
```js
let array = [1, 2, 3, 4, 5];
let first = array.first(); // 结果: 1
```

##### 2.7.15. Array.last(array)
**参数说明：** `array` *数组*
<br>　**返回值：** `{*}` *数组的最后一个元素*
<br>**功能描述：**
> 返回传入的数组对象的最后一个元素<br>

**示例代码：**
```js
let array = [1, 2, 3, 4, 5];
let first = Array.last(array); // 结果: 5
```

##### 2.7.16. Array.prototype.last()
**参数说明：** `无`
<br>　**返回值：** `{*}` *数组的最后一个元素*
<br>**功能描述：**
> 返回数组对象的最后一个元素<br>

**示例代码：**
```js
let array = [1, 2, 3, 4, 5];
let first = array.last(); // 结果: 5
```

##### 2.7.17. Array.remove(array, element)
**参数说明：** `array` *数组*
<br>　　　　　 `element` *要移除的元素*
<br>　**返回值：** `Array`
<br>**功能描述：**
> 从数组的移除指定元素<br>

**示例代码：**
```js
let array = [1, 2, 3, 4, 8, 10];
array = Array.remove(array, 2);      // 结果：[1, 3, 4, 8, 10]
```

##### 2.7.18. Array.prototype.remove(element)
**参数说明：** `element` *要移除的元素*
<br>　**返回值：** `Array`
<br>**功能描述：**
> 从数组的移除指定元素<br>

**示例代码：**
```js
let array = [1, 2, 3, 4, 8, 10];
array = array.remove(2);      // 结果：[1, 3, 4, 8, 10]
```

##### 2.7.19. Array.sum(array, options)
**参数说明：** `array` *数组*
<br>　　　　　 `options` *参数项(可选)，详细说明：*
<br>　　　　　　{
<br>　　　　　　　`begin` *开始位置*
<br>　　　　　　　`end` *'结束位置*
<br>　　　　　　}
<br>　**返回值：** `Array`
<br>**功能描述：**
> 汇总传入的数组元素（数值型有效），可指定元素的起、止位置<br>

**示例代码：**
```js
let array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let sum1 = Array.sum(array);                      // 结果：55
let sum2 = Array.sum(array, {begin: 2, end: 5});  // 结果：18
```

##### 2.7.20. Array.prototype.sum(options)
**参数说明：** `options` *参数项(可选)，详细说明：*
<br>　　　　　　{
<br>　　　　　　　`begin` *开始位置*
<br>　　　　　　　`end` *'结束位置*
<br>　　　　　　}
<br>　**返回值：** `Array`
<br>**功能描述：**
> 汇总数组元素（数值型有效），可指定元素的起、止位置<br>

**示例代码：**
```js
let array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let sum1 = array.sum();                   // 结果：55
let sum2 = array.sum({begin: 2, end: 5}); // 结果：18
```

##### 2.7.21. Array.sumAttribute(array, attribute, options)
**参数说明：** `array` *数组*
<br>　　　　　 `attribute` *要汇总属性(支持多级属性)*
<br>　　　　　 `options` *参数项(可选)，详细说明：*
<br>　　　　　　{
<br>　　　　　　　`begin` *开始位置*
<br>　　　　　　　`end` *'结束位置*
<br>　　　　　　}
<br>　**返回值：** `Array`
<br>**功能描述：**
> 汇总数组元素对象指定属性(支持多级属性)，可指定元素的起、止位置<br>

**示例代码：**
```js
let examScores = [
  {name: 'wang', en: {score: 6}, ch: {score: 8}, total: 14},
  {name: 'li', en: {score: 8}, ch: {score: 9}, total: 17},
  {name: 'liu', en: {score: 10}, ch: {score: 6}, total: 16},
  {name: 'hao', en: {score: 9}, ch: {score: 7}, total: 16},
  {name: 'deng', en: {score: 7}, ch: {score: 5}, total: 12},
  {name: 'zhang', en: {score: 2}, ch: {score: 4}, total: 6}
];
let sum1 = Array.sumAttribute(examScores, 'total');                         // 结果：81
let sum2 = Array.sumAttribute(examScores, 'en.score');                      // 结果：42
let sum3 = Array.sumAttribute(examScores, 'ch.score', {begin: 2, end: 5});  // 结果：22
```

##### 2.7.22. Array.prototype.sumAttribute(attribute, options)
**参数说明：** `array` *数组*
<br>　　　　　 `attribute` *要汇总属性(支持多级属性)*
<br>　　　　　 `options` *参数项(可选)，详细说明：*
<br>　　　　　　{
<br>　　　　　　　`begin` *开始位置*
<br>　　　　　　　`end` *'结束位置*
<br>　　　　　　}
<br>　**返回值：** `Array`
<br>**功能描述：**
> 汇总数组元素对象指定属性(支持多级属性)，可指定元素的起、止位置<br>

**示例代码：**
```js
let examScores = [
  {name: 'wang', en: {score: 6}, ch: {score: 8}, total: 14},
  {name: 'li', en: {score: 8}, ch: {score: 9}, total: 17},
  {name: 'liu', en: {score: 10}, ch: {score: 6}, total: 16},
  {name: 'hao', en: {score: 9}, ch: {score: 7}, total: 16},
  {name: 'deng', en: {score: 7}, ch: {score: 5}, total: 12},
  {name: 'zhang', en: {score: 2}, ch: {score: 4}, total: 6}
];
let sum1 = examScores.sumAttribute('total');                         // 结果：81
let sum2 = examScores.sumAttribute('en.score');                      // 结果：42
let sum3 = examScores.sumAttribute('ch.score', {begin: 2, end: 5});  // 结果：22
```

##### 2.7.23. Array.getAttribute(array, attribute, options)
**参数说明：** `array` *数组*
<br>　　　　　 `attribute` *要获取值的属性(支持多级属性)*
<br>　　　　　 `options` *参数项(可选)，详细说明：*
<br>　　　　　　{
<br>　　　　　　　`begin` *开始位置*
<br>　　　　　　　`end` *'结束位置*
<br>　　　　　　}
<br>　**返回值：** `Array`
<br>**功能描述：**
> 批量获取数组元素对象指定属性的值(支持多级属性)，可指定元素的起、止位置<br>

**示例代码：**
```js
let users = [{name: 'wang', age: 18, sex: '男'}, {name: 'li', age: 22, sex: '男'}, {name: 'liu', age: 30, sex: '女'}];
let result1 = Array.getAttribute(users, 'age');               // 结果：[ 18, 22, 30 ]
let result2 = Array.getAttribute(users, 'sex', {begin: 1});   // 结果：[ '男', '女' ]
```

##### 2.7.24. Array.prototype.getAttribute(attribute, options)
**参数说明：** `attribute` *要获取值的属性(支持多级属性)*
<br>　　　　　 `options` *参数项(可选)，详细说明：*
<br>　　　　　　{
<br>　　　　　　　`begin` *开始位置*
<br>　　　　　　　`end` *'结束位置*
<br>　　　　　　}
<br>　**返回值：** `Array`
<br>**功能描述：**
> 批量获取数组元素对象指定属性的值(支持多级属性)，可指定元素的起、止位置<br>

**示例代码：**
```js
let users = [{name: 'wang', age: 18, sex: '男'}, {name: 'li', age: 22, sex: '男'}, {name: 'liu', age: 30, sex: '女'}];
let result1 = users.getAttribute('age');               // 结果：[ 18, 22, 30 ]
let result2 = users.getAttribute('sex', {begin: 1});   // 结果：[ '男', '女' ]
```

##### 2.7.25. Array.setAttribute(array, attribute, value, options)
**参数说明：** `array` *数组*
<br>　　　　　 `attribute` *要设置值的属性(支持多级属性)*
<br>　　　　　 `value` *要设置的值*
<br>　　　　　 `options` *参数项(可选)，详细说明：*
<br>　　　　　　{
<br>　　　　　　　`begin` *开始位置*
<br>　　　　　　　`end` *'结束位置*
<br>　　　　　　}
<br>　**返回值：** `Array`
<br>**功能描述：**
> 批量设置数组元素对象指定属性的值(支持多级属性)，可指定元素的起、止位置<br>

**示例代码：**
```js
let users = [{name: 'wang'}, {name: 'li'}, {name: 'liu'}];
users = Array.setAttribute(users, 'age', 20);
// 结果：users = [ { name: 'wang', age: 20 }, { name: 'li', age: 20 }, { name: 'liu', age: 20 } ]
users = Array.setAttribute(users, 'sex', '男', {begin: 0, end: 1});
// 结果：users = [ { name: 'wang', age: 20, sex: '男' }, { name: 'li', age: 20, sex: '男' }, { name: 'liu', age: 20 } ]
```

##### 2.7.26. Array.prototype.setAttribute(attribute, value, options)
**参数说明：** `attribute` *要设置值的属性(支持多级属性)*
<br>　　　　　 `value` *要设置的值*
<br>　　　　　 `options` *参数项(可选)，详细说明：*
<br>　　　　　　{
<br>　　　　　　　`begin` *开始位置*
<br>　　　　　　　`end` *'结束位置*
<br>　　　　　　}
<br>　**返回值：** `Array`
<br>**功能描述：**
> 批量设置数组元素对象指定属性的值(支持多级属性)，可指定元素的起、止位置<br>

**示例代码：**
```js
let users = [{name: 'wang'}, {name: 'li'}, {name: 'liu'}];
users = users.setAttribute('age', 20);
// 结果：users = [ { name: 'wang', age: 20 }, { name: 'li', age: 20 }, { name: 'liu', age: 20 } ]
users = users.setAttribute('sex', '男', {begin: 0, end: 1});
// 结果：users = [ { name: 'wang', age: 20, sex: '男' }, { name: 'li', age: 20, sex: '男' }, { name: 'liu', age: 20 } ]
```

##### 2.7.27. Array.deleteAttribute(array, attribute, options)
**参数说明：** `array` *数组*
<br>　　　　　 `attribute` *要删除的属性(支持多个以数组形式)*
<br>　　　　　 `options` *参数项(可选)，详细说明：*
<br>　　　　　　{
<br>　　　　　　　`begin` *开始位置*
<br>　　　　　　　`end` *'结束位置*
<br>　　　　　　}
<br>　**返回值：** `Array`
<br>**功能描述：**
> 批量删除数组元素对象指定属性的值(支持多个以数组形式)，可指定元素的起、止位置<br>

**示例代码：**
```js
let users = [{name: 'wang', age: 18, sex: '男'}, {name: 'li', age: 22, sex: '男'}, {name: 'liu', age: 30, sex: '女'}];
users = Array.getAttribute(users, 'sex', {begin: 1});   // 结果：[ '男', '女' ]
// 结果：[{name: 'wang', age: 18, sex: '男'}, {name: 'li', age: 22 }, {name: 'liu', age: 30}]
users = Array.deleteAttribute(users, ['age', 'sex']);
// 结果：[{name: 'wang' }, {name: 'li'}, {name: 'liu'}]
```

##### 2.7.28. Array.prototype.deleteAttribute(attribute, options)
**参数说明：** `attribute` *要删除的属性(支持多个以数组形式)*
<br>　　　　　 `options` *参数项(可选)，详细说明：*
<br>　　　　　　{
<br>　　　　　　　`begin` *开始位置*
<br>　　　　　　　`end` *'结束位置*
<br>　　　　　　}
<br>　**返回值：** `Array`
<br>**功能描述：**
> 批量删除数组元素对象指定属性的值(支持多个以数组形式)，可指定元素的起、止位置<br>

**示例代码：**
```js
let users = [{name: 'wang', age: 18, sex: '男'}, {name: 'li', age: 22, sex: '男'}, {name: 'liu', age: 30, sex: '女'}];
users = users.getAttribute('sex', {begin: 1});   // 结果：[ '男', '女' ]
// 结果：[{name: 'wang', age: 18, sex: '男'}, {name: 'li', age: 22 }, {name: 'liu', age: 30}]
users = users.deleteAttribute(['age', 'sex']);
// 结果：[{name: 'wang' }, {name: 'li'}, {name: 'liu'}]
```

##### 2.7.29. Array.setAttributeToAttribute(array, sourceAttribute, targetAttribute, options)
**参数说明：** `array` *数组*
<br>　　　　　 `sourceAttribute` *源属性(支持多级属性)*
<br>　　　　　 `targetAttribute` *目标属性(支持多级属性)*
<br>　　　　　 `options` *参数项(可选)，详细说明：*
<br>　　　　　　{
<br>　　　　　　　`begin` *开始位置*
<br>　　　　　　　`end` *'结束位置*
<br>　　　　　　}
<br>　**返回值：** `Array`
<br>**功能描述：**
> 批量设置数组元素对象本身属性的值到指定属性(支持多级属性)，可指定元素的起、止位置<br>

**示例代码：**
```js
let users = [{name: 'wang'}, {name: 'li'}, {name: 'liu'}];
users = Array.setAttributeToAttribute(users, 'name', 'user_name', {begin: 1});
// 结果：[{name: 'wang'}, {name: 'li', user_name: 'li'}, {name: 'liu', user_name: 'liu'}]
```

##### 2.7.30. Array.prototype.setAttributeToAttribute(sourceAttribute, targetAttribute, options)
**参数说明：** `sourceAttribute` *源属性(支持多级属性)*
<br>　　　　　 `targetAttribute` *目标属性(支持多级属性)*
<br>　　　　　 `options` *参数项(可选)，详细说明：*
<br>　　　　　　{
<br>　　　　　　　`begin` *开始位置*
<br>　　　　　　　`end` *'结束位置*
<br>　　　　　　}
<br>　**返回值：** `Array`
<br>**功能描述：**
> 批量设置数组元素对象本身属性的值到指定属性(支持多级属性)，可指定元素的起、止位置<br>

**示例代码：**
```js
let users = [{name: 'wang'}, {name: 'li'}, {name: 'liu'}];
users = users.setAttributeToAttribute('name', 'user_name', {begin: 1});
// 结果：[{name: 'wang'}, {name: 'li', user_name: 'li'}, {name: 'liu', user_name: 'liu'}]
```

##### 2.7.31. Array.agg(data, groupBy, options)
**参数说明：** `data` *要聚合的数据(数组)*
<br>　　　　　 `groupBy` *聚合分组属性(数组)*
<br>　　　　　 `options` *参数项(可选)，详细说明：*
<br>　　　　　　{
<br>　　　　　　　`sum` *汇总合计的属性(数组)*
<br>　　　　　　　`min` *取最小值的属性(数组)*
<br>　　　　　　　`max` *取最大值的属性(数组)*
<br>　　　　　　　`avg` *取平均值的属性(数组)*
<br>　　　　　　　`count` *分组后的统计数量(设置别名，默认为：_count)*
<br>　　　　　　}
<br>　**返回值：** `Array`
<br>**功能描述：**
> 对数组进行分组聚合统计，可进行合计、最小值、最大值、平均值和数量统计<br>

**示例代码：**
```js
let saleData = [
  {id: 'A001', grp: 'G01', name: 'name1', dept: {id: 'DEPT01', name: 'NAME_DEPT01'}, price: 80, num: 2, money: 160},
  {id: 'A002', grp: 'G01', name: 'name1', dept: {id: 'DEPT01', name: 'NAME_DEPT01'}, price: 10, num: 20, money: 200},
  {id: 'A003', grp: 'G01', name: 'name1', dept: {id: 'DEPT01', name: 'NAME_DEPT01'}, price: 100, num: 10, money: 1000},
  {id: 'A004', grp: 'G02', name: 'name1', dept: {id: 'DEPT01', name: 'NAME_DEPT01'}, price: 101, num: 20, money: 2020},
  {id: 'A005', grp: 'G02', name: 'name1', dept: {id: 'DEPT01', name: 'NAME_DEPT01'}, price: 102, num: 20, money: 2040},
  {id: 'A006', grp: 'G03', name: 'name1', dept: {id: 'DEPT01', name: 'NAME_DEPT01'}, price: 103, num: 20, money: 2060},
  {id: 'A007', grp: 'G03', name: 'name1', dept: {id: 'DEPT01', name: 'NAME_DEPT01'}, price: 104, num: 20, money: 2080},
  {id: 'A008', grp: 'G03', name: 'name1', dept: {id: 'DEPT01', name: 'NAME_DEPT01'}, price: 200, num: 20, money: 4000},
  {id: 'A009', grp: 'G03', name: 'name1', dept: {id: 'DEPT01', name: 'NAME_DEPT01'}, price: 100, num: 20, money: 2000},
  {id: 'A010', grp: 'G04', name: 'name1', dept: {id: 'DEPT01', name: 'NAME_DEPT01'}, price: 100, num: 20, money: 2000}
]
let aggResult = Array.agg(saleData, ['grp', 'name', 'dept.id'], {max: ['price'], min: ['num'], sum: ['money']})
/** 结果：
aggResult = [
  { grp: 'G01', name: 'name1', dept: { id: 'DEPT01' }, money: 1360, num: 2, price: 100, _count: 3 },
  { grp: 'G02', name: 'name1', dept: { id: 'DEPT01' }, money: 4060, num: 20, price: 102, _count: 2 },
  { grp: 'G03', name: 'name1', dept: { id: 'DEPT01' }, money: 10140, num: 20, price: 200, _count: 4 },
  { grp: 'G04', name: 'name1', dept: { id: 'DEPT01' }, money: 2000, num: 20, price: 100, _count: 1 }
]
*/
```

##### 2.7.32. Array.prototype.agg(groupBy, options)
**参数说明：** `groupBy` *聚合分组属性(数组)*
<br>　　　　　 `options` *参数项(可选)，详细说明：*
<br>　　　　　　{
<br>　　　　　　　`sum` *汇总合计的属性(数组)*
<br>　　　　　　　`min` *取最小值的属性(数组)*
<br>　　　　　　　`max` *取最大值的属性(数组)*
<br>　　　　　　　`avg` *取平均值的属性(数组)*
<br>　　　　　　　`count` *分组后的统计数量(设置别名，默认为：_count)*
<br>　　　　　　}
<br>　**返回值：** `Array`
<br>**功能描述：**
> 对数组进行分组聚合统计，可进行合计、最小值、最大值、平均值和数量统计<br>

**示例代码：**
```js
let saleData = [
  {id: 'A001', grp: 'G01', name: 'name1', dept: {id: 'DEPT01', name: 'NAME_DEPT01'}, price: 80, num: 2, money: 160},
  {id: 'A002', grp: 'G01', name: 'name1', dept: {id: 'DEPT01', name: 'NAME_DEPT01'}, price: 10, num: 20, money: 200},
  {id: 'A003', grp: 'G01', name: 'name1', dept: {id: 'DEPT01', name: 'NAME_DEPT01'}, price: 100, num: 10, money: 1000},
  {id: 'A004', grp: 'G02', name: 'name1', dept: {id: 'DEPT01', name: 'NAME_DEPT01'}, price: 101, num: 20, money: 2020},
  {id: 'A005', grp: 'G02', name: 'name1', dept: {id: 'DEPT01', name: 'NAME_DEPT01'}, price: 102, num: 20, money: 2040},
  {id: 'A006', grp: 'G03', name: 'name1', dept: {id: 'DEPT01', name: 'NAME_DEPT01'}, price: 103, num: 20, money: 2060},
  {id: 'A007', grp: 'G03', name: 'name1', dept: {id: 'DEPT01', name: 'NAME_DEPT01'}, price: 104, num: 20, money: 2080},
  {id: 'A008', grp: 'G03', name: 'name1', dept: {id: 'DEPT01', name: 'NAME_DEPT01'}, price: 200, num: 20, money: 4000},
  {id: 'A009', grp: 'G03', name: 'name1', dept: {id: 'DEPT01', name: 'NAME_DEPT01'}, price: 100, num: 20, money: 2000},
  {id: 'A010', grp: 'G04', name: 'name1', dept: {id: 'DEPT01', name: 'NAME_DEPT01'}, price: 100, num: 20, money: 2000}
]
let aggResult = saleData.agg(['grp', 'name', 'dept.id'], {max: ['price'], min: ['num'], sum: ['money']})
/** 结果：
aggResult = [
  { grp: 'G01', name: 'name1', dept: { id: 'DEPT01' }, money: 1360, num: 2, price: 100, _count: 3 },
  { grp: 'G02', name: 'name1', dept: { id: 'DEPT01' }, money: 4060, num: 20, price: 102, _count: 2 },
  { grp: 'G03', name: 'name1', dept: { id: 'DEPT01' }, money: 10140, num: 20, price: 200, _count: 4 },
  { grp: 'G04', name: 'name1', dept: { id: 'DEPT01' }, money: 2000, num: 20, price: 100, _count: 1 }
]
*/
```

#### 2.8. Storage

##### 2.8.1. Storage.prototype.setJSON(key, value)
**参数说明：** `key` *存储到Storage中唯一标识*
<br>　　　　　 `value` *要存储的JSON数据对象*
<br>　**返回值：** `无`
<br>**功能描述：**
> 扩展 Storage 对象实例：增加setJSON函数<br>

**示例代码：**
```js
let users = [{name: 'wang'}, {name: 'li'}, {name: 'liu'}];
localStorage.setJSON('USERS_KEY', users);
```

##### 2.8.2. Storage.prototype.getJSON(key)
**参数说明：** `key` *存储到Storage中唯一标识*
<br>　**返回值：** `无`
<br>**功能描述：**
> 扩展 Storage 对象实例：增加setJSON函数<br>

**示例代码：**
```js
let users = [{name: 'wang'}, {name: 'li'}, {name: 'liu'}];
// 存储到localStorage中
localStorage.setJSON('USERS_KEY', users);
// 从localStorage中获取
users = localStorage.getJSON('USERS_KEY');

```

---

!> 截止【2019-07-09】初步完成 `nothing.js` 文档，后续持续更正、勘误、完善中...

---

Powered by cbtak <cbtak@hotmail.com>