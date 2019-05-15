# nothing.js 
一套简单易用的常用函数&系统对象扩展库
<br/>
![avatar](/logo.jpeg ':size=480')
## 概述
> varsion：`v1.0.16`
<br>author：`cbtak` <cbtak@hotmail.com>
<br/>
 nothing.js 来源于项目开发过程积累常用到的一些工具函数，筛选通用性比较好的整理成库，采用`CommonJS`规范、`ES6`重构。本库不依赖于第三方库，可直接在node服务端及前端环境使用。

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
  const nothing = require('@cbtak/nothing');
```

### 1. 功能函数篇

序号 | 函数名称 | 说明
:--- | :--- | :---
1 | [isNull](/?id=_11-isnullval) | 检验传入值是否为空
2 | [isNotNull](/?id=_12-isnotnullval) | 检验传入值是否不为空
3 | [isBlank](/?id=_13-isblankval) | 检验传入值是否为空字符串
4 | [isNotBlank](/?id=_14-isnotblankval) | 检验传入值是否不为空字符串
5 | [ifNull](/?id=_15-ifnull-val-val1-val2) | 空值处理(类oracle 的 nvl2)
6 | [ternary](/?id=_16-ternaryexpression-result1-result2) | 三元函数
7 | [deepCopy](/?id=_17-deepcopysource-ignorefunction) | 深拷贝
8 | [caseValue](/?id=_18-casevalueargs) | 匹配函数(类oracle 的 decode)
9 | [buildTree](/?id=_19-buildtreetreedataarray-options) | 构建树
10 | [toFixed](/?id=_110-tofixednum-options) | 数值型的舍入处理(可指定舍入模式)
11 | [numberFormat](/?id=_111-numberformatnum-options) | 数值格式化
12 | [getParam](/?id=_112-getparamkey) | 获取地址栏参数
13 | [hasOwnProperty](/?id=_113-hasownpropertyobject-property) | 检查对象是否具有指定属性
14 | [defineGetter](/?id=_114-definegetter-object-args) | 定义对象Getter访问器
15 | [defineSetter](/?id=_115-definesetter-object-args) | 定义对象Setter访问器
16 | [validateNumber](/?id=_116-validatenumberval) | 数值型验证
17 | [validateMobile](/?id=_117-validatemobilemobile) | 验证手机号码
18 | [validateIDCard](/?id=_118-validateidcardidcard) | 验证身份证
19 | [validateEmail](/?id=_119-validateemailemail) | 验证邮箱

#### 1.1. isNull(val)
**参数说明：** `val` *要校验的值*
<br/>&nbsp; &nbsp; **返回值：** `Boolean`
<br/>
**功能描述：**

> 检验传入值是否为空<br/>(值等于 `null`、`''`、`undefined` 时返回 true)

**示例代码：**
```js
let var = null;
let result = nothing.isNull(var) ? 'var is null' : 'var is not null';
// 输出结果：var is null
```

#### 1.2. isNotNull(val)
**参数说明：** `val` *要校验的值*
<br/>&nbsp; &nbsp; **返回值：** `Boolean`
<br/>
**功能描述：** 
> 检验传入值是否不为空<br/>(值不等于 `null`、`''`、`undefined` 时返回 true)

**示例代码：**
```js
let var = 'not null';
let result = nothing.isNull(var) ? 'var is null' : 'var is not null';
// 输出结果：var is not null
```

#### 1.3. isBlank(val)
**参数说明：** `val` *要校验的值*
<br/>&nbsp; &nbsp; **返回值：** `Boolean`
<br/>
**功能描述：**
> 检验传入值是否为空字符串<br/>(值等于 `null`、`''`、`undefined`、`'  '` 时返回 true)

**示例代码：**
```js
let var = '  ';
let result = nothing.isBlank(var) ? 'var is blank' : 'var is not blank';
// 输出结果：var is blank
```

#### 1.4. isNotBlank(val)
**参数说明：** `val` *要校验的值*
<br/>&nbsp; &nbsp; **返回值：** `Boolean`
<br/>
**功能描述：**
> 检验传入值是否不为空字符串<br/>(值不等于 `null`、`''`、`undefined`、`'  '` 时返回 true)

**示例代码：**
```js
let var = '  ';
let result = nothing.isNotBlank(var) ? 'var is not blank' : 'var is blank';
// 输出结果：var is blank
```

#### 1.5. ifNull (val, val1, val2)
**参数说明：** `val` *要校验的值(val2未传递时作为返回结果)，* `val1` *返回结果1，* `val2` *返回结果2(可选)*
<br/>&nbsp; &nbsp; **返回值：** `{*}` *根据校验结果返回：val/val1/val2*
<br/>
**功能描述：** 
>空值处理(类oracle nvl2)<br/>如果val为空，则返回val1，不为空时，则验证是否传递val2参数，如传递则返回val2，否则返回val

**示例代码：**
```js
let [var, var1, var2] = [null, '返回var1', '返回var2'];
nothing.ifNull(var, var1, var2);    // 结果为：返回var1
var = '返回var';
nothing.ifNull(var, var1, var2);    // 结果为：返回var2
nothing.ifNull(var, var1);          // 结果为：返回var
```

#### 1.6. ternary(expression, result1, result2)
**参数说明：** `expression` *表达式，* `result1` *表达式成立时返回，* `result2` *表达式不成立时返回*
<br/>&nbsp; &nbsp; **返回值：** `{*}` *表达式是否成立返回 result1/result2*
<br/>
**功能描述：** 
> 三元函数<br/>expression 表达式成立则返回 result1，否则返回 result2

**示例代码：**
```js
let result = nothing.ternary(var === 100, 'var === 100', 'var != 100');
```

#### 1.7. deepCopy(source, ignoreFunction)
**参数说明：** `source` *要拷贝的对象* `ignoreFunction` *忽略函数属性(可选，默认 false)*
<br/>&nbsp; &nbsp; **返回值：** `{*}` *拷贝后的对象*
<br/>
**功能描述：**
> 深拷贝<br/>对传入对象进行深度拷贝<br>第二个参数传入`true`时，将忽略函数类型的属性

**示例代码：**
```js
let a = {name: 'this is a', showFun: function() {}};
let copy_a = nothing.deepCopy(a);         // 完整拷贝
let copy_b = nothing.deepCopy(a, true);   // 第二个参数传入true，将忽略函数类型属性 showFun
```

#### 1.8. caseValue(...args)
**参数说明：** `args` *动态参数*
<br/>&nbsp; &nbsp; **返回值：** `{*}`  *匹配后的结果*
<br/>
**功能描述：** 
> 匹配函数，类似 oracle 中的 decode<br/>匹配规则: 取第一个参数与后续偶数位置的参数进行比较，如匹配则返回当前比较的偶数位置下一个参数作为结果，
如未找到匹配项目，并且参数个数大于3而且为偶数，则取最后一个参数作为默认值返回
<br/>

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
<br/>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;`options` *参数项(可选)，详细说明：*
<br/>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;{
<br/>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;`nodeKey` *节点唯一标识(默认：id)*
<br/>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;`parentKey` *'父节点唯一标识(默认：parentId)*
<br/>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;`childrenKey` *子节点集合标识(默认：children)*
<br/>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;`root` *指定作为根节点的项目唯一标识(指定多个时用数组表示)*
<br/>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;}
<br/>&nbsp; &nbsp; **返回值：** `Array`
<br/>
**功能描述：** 
> 构建树<br/>根据父节点唯一标识生成树型结构数据

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

#### 1.10. toFixed(num, options)
**参数说明：** `num` *要舍入处理的数值*
<br/>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;`options` *参数项(可选)，详细说明：*
<br/>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;{
<br/>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;`precision` *保留小数位数*
<br/>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;`mode` *舍入模式：0:Math.round  1:Math.ceil  -1:Math.floor*
<br/>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;}
<br/>&nbsp; &nbsp; **返回值：** `Number`
<br/>
**功能描述：** 
> 数值型的舍入处理(可指定舍入模式)<br/>作为Number(num).toFixed(2) 的增强版本

**示例代码：**
```js
nothing.toFixed(10.2345, {precision: 2});           // 结果：10.23
nothing.toFixed(10.2345, {precision: 2, mode: 0});  // 结果：10.23
nothing.toFixed(10.2345, {precision: 2, mode: 1});  // 结果：10.24
nothing.toFixed(10.2345, {precision: 2, mode: -1}); // 结果：10.23
```

#### 1.11. numberFormat(num, options)
**参数说明：** `num` *要舍入处理的数值*
<br/>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;`options` *参数项(可选)，详细说明：*
<br/>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;{
<br/>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;`precision` *保留小数位数*
<br/>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;`thousands` *是否显示千分位*
<br/>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;`mode` *舍入模式：0:Math.round  1:Math.ceil  -1:Math.floor*
<br/>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;}
<br/>&nbsp; &nbsp; **返回值：** `String` *格式化后的字符串表示*
<br/>
**功能描述：** 
> 数值格式化<br/>转换为指定格式的文本(舍入处理并可指定舍入模式)

**示例代码：**
```js
nothing.numberFormat(12806.123)                                               // 返回：12806
nothing.numberFormat(12806.123, {mode: 0, thousands: true, precision: 2})     // 返回：12,806.12
nothing.numberFormat(12806.123, {mode: 1, precision: 2})                      // 返回：12806.13
nothing.numberFormat(12806.126, {mode: -1, thousands: false, precision: 2})   // 返回：12806.12
```

#### 1.12. getParam(key)
**参数说明：** `key` *参数名称*
<br/>&nbsp; &nbsp; **返回值：** `String`
<br/>
**功能描述：** 
> 获取地址栏指定参数

**示例代码：**
```js
// 当前地址栏：http://www.xxx.com/index?userid=123&name=xiaoming
let userid = nothing.getParam('userid');  // 结果：123
```

#### 1.13. hasOwnProperty(object, property)
**参数说明：** `object` *检查的对象* `property` *检查的属性(支持多级属性，以"."分隔)*
<br/>&nbsp; &nbsp; **返回值：** `Boolean`
<br/>
**功能描述：** 
> 检查对象是否具有指定属性<br/>注：检查的属性支持多级属性，以"."分隔

**示例代码：**
```js
let user = {id: '0001', name: 'zhang san', school: {class: '302'}};
nothing.hasOwnProperty(user, 'name');   // 结果：true
nothing.hasOwnProperty(user, 'age');    // 结果：false
nothing.hasOwnProperty(user, 'school.class');    // 结果：true
```

#### 1.14. defineGetter: (object, ...args)

#### 1.15. defineSetter: (object, ...args)

#### 1.16. validateNumber(val)
**参数说明：** `val` *要验证的参数*
<br/>&nbsp; &nbsp; **返回值：** `Boolean`
<br/>
**功能描述：** 
> 数值型验证是否合法

**示例代码：**
```js
nothing.validateNumber(12);           // 结果：true
nothing.validateNumber('12.22.32');   // 结果：false
nothing.validateNumber('ab32');       // 结果：false
```

#### 1.17. validateMobile(mobile)
**参数说明：** `mobile` *要验证的手机号*
<br/>&nbsp; &nbsp; **返回值：** `Boolean`
<br/>
**功能描述：** 
> 验证手机号码是否合法

**示例代码：**
```js
nothing.validateMobile(13500012222);    // 结果：true
nothing.validateMobile(24563325633);    // 结果：false
```

#### 1.18. validateIDCard(idCard)
**参数说明：** `idCard` *要验证的身份证号码*
<br/>&nbsp; &nbsp; **返回值：** `Boolean`
<br/>
**功能描述：** 
> 验证身份证号码是否合法

**示例代码：**
```js
nothing.validateIDCard('43048820100102445X'); // 结果：true
nothing.validateIDCard('1234567890');         // 结果：false
```

#### 1.19. validateEmail(email)
**参数说明：** `mail` *要验证的 email*
<br/>&nbsp; &nbsp; **返回值：** `Boolean`
<br/>
**功能描述：** 
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
1 | [Object.clone](/?id=_211-objectclonesource-ignorefunction) | 对象克隆(深拷贝)
2 | [Object.prototype.clone](/?id=_212-objectprototypecloneignorefunction) | 对象克隆(深拷贝)，基于对象实例克隆

##### 2.1.1. Object.clone(source, ignoreFunction)
**参数说明：** `source` *要克隆的对象* `ignoreFunction` *忽略函数属性(可选，默认 false)*
<br/>&nbsp; &nbsp; **返回值：** `{*}` *克隆后的新对象*
<br/>
**功能描述：** 
> 对象克隆(深拷贝)<br>第二个参数传入`true`时，将忽略函数类型的属性

**示例代码：**
```js
let user = {id: '0001', name: 'wangxiaoming', fun: () => {}};
let newUser1 = Object.clone(user);
let newUser2 = Object.clone(user, true); // 忽略函数属性
```

##### 2.1.2. Object.prototype.clone(ignoreFunction)
**参数说明：** `ignoreFunction` *忽略函数属性(可选，默认 false)*
<br/>&nbsp; &nbsp; **返回值：** `{*}` *克隆后的新对象*
<br/>
**功能描述：** 
> 对象克隆(深拷贝)，基于对象实例克隆<br>第二个参数传入`true`时，将忽略函数类型的属性<br/>派生于Object的对象实例都继续此方法(如：JSON、String、Array...等对象实例)

**示例代码：**
```js
let user = {id: '0001', name: 'wangxiaoming', fun: () => {}};
let newUser1 = user.clone();
let newUser2 = user.clone(true);            // 忽略函数属性
let userArray = [user, newUser];
let newUserArray1 = userArray.clone();
let newUserArray2 = userArray.clone(true);  // 忽略函数属性
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
7 | [String.from](/?id=_228-stringfromobject-format) | String对象扩展：将对象转换为字符串
7 | [String.isString](/?id=_229-stringisstringobject) | String对象扩展：校验对象是否为字符串

##### 2.2.1. String.replaceAll(source, substr, replacement)
**参数说明：** `source` *执行替换操作的字符串，* `substr` *查找匹配的内容，* `replacement` *替换的内容*
<br/>&nbsp; &nbsp; **返回值：** `String`
<br/>
**功能描述：**
> String对象扩展：替换全部<br/>字符串查找替换指定内容(替换全部匹配)，作为原生 replace 函数的增强

**示例代码：**
```js
let str = ' this is string ';
let replaceStr = String.replaceAll(str, 'i', '');   // 结果为：ths s strng
```

##### 2.2.2. String.prototype.replaceAll(substr, replacement)
**参数说明：** `substr` *查找匹配的内容，* `replacement` *替换的内容*
<br/>&nbsp; &nbsp; **返回值：** `String`
<br/>
**功能描述：**
> String对象原型扩展：替换全部<br/>字符串查找替换指定内容(替换全部匹配)，作为原生 replace 函数的增强

**示例代码：**
```js
let str = ' this is string ';
let replaceStr = str.replaceAll('i', '');     // 结果为：ths s strng
```

##### 2.2.3. String.contains(source, instr)
**参数说明：** `source` *源字符串，* `instr` *检查的内容*
<br/>&nbsp; &nbsp; **返回值：** `Boolean`
<br/>
**功能描述：**
> String对象扩展：是否包含<br/>在字符串 `source` 中查找是否包含 `inStr`

**示例代码：**
```js
let source = 'user: zhang wang li';
let isContains = String.contains(source, 'zhang');     // 结果：true
```

##### 2.2.4. String.prototype.contains(instr)
**参数说明：** `instr` *检查的内容*
<br/>&nbsp; &nbsp; **返回值：** `Boolean`
<br/>
**功能描述：**
> String对象原型扩展：是否包含<br/>在字符串中查找是否包含 `inStr`

**示例代码：**
```js
let source = 'user: zhang wang li';
let isContains = source.contains('zhang');     // 结果：true
```

##### 2.2.5. String.toByte(str)
**参数说明：** `str` *源字符串*
<br/>&nbsp; &nbsp; **返回值：** `[*]` *转换后的 Byte 数组形式*
<br/>
**功能描述：**
> String对象扩展：字符串转 Byte 数组

**示例代码：**
```js
let str = 'this is a string';
let bytes = String.toByte(str);
```

##### 2.2.6. String.prototype.toByte()
**参数说明：** `无`
<br/>&nbsp; &nbsp; **返回值：** `[*]` *转换后的 Byte 数组形式*
<br/>
**功能描述：**
> String对象原型扩展：字符串转 Byte 数组

**示例代码：**
```js
let str = 'this is a string';
let bytes = str.toByte();
```

##### 2.2.7. String.fromByte(bytes)
**参数说明：** `bytes` *Byte 数组*
<br/>&nbsp; &nbsp; **返回值：** `String` *转换后的字符串形式*
<br/>
**功能描述：**
> String对象扩展：Byte 数组转字符串

**示例代码：**
```js
let bytes = [ 122, 104, 97, 110, 103 ];
let str = String.fromByte(bytes); // 结果：zhang
```

##### 2.2.8. String.from(object, format)
**参数说明：** `object` *要转换的对象* `format` *格式(可选，仅对日期有效)*
<br/>&nbsp; &nbsp; **返回值：** `String` *转换后的字符串形式*
<br/>
**功能描述：**
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
<br/>&nbsp; &nbsp; **返回值：** `Boolean`
<br/>
**功能描述：**
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
3 | [Number.toFixed2](/?id=_233-numbertofixed2num-options) | Number对象扩展：数值舍入处理（可指定小数位数和舍入模式）
4 | [Number.prototype.toFixed2](/?id=_234-numberprototypetofixed2options) | Number对象原型扩展：数值舍入处理（可指定小数位数和舍入模式）

##### 2.3.1. Number.format(num, options)

##### 2.3.2. Number.prototype.format(options)

##### 2.3.3. Number.toFixed2(num, options)

##### 2.3.4. Number.prototype.toFixed2(options)

#### 2.4. Boolean

#### 2.5. Date
序号 | 函数名称 | 说明
:--- | :--- | :---
1 | [Date.format](/?id=_251-dateformatdate-fmt) | Date对象扩展：日期格式化
2 | [Date.prototype.format](/?id=_252-dateprototypeformatfmt) | Date对象原型扩展：日期格式化
3 | [Date.add](/?id=_253-dateadddate-interval-number) | Date对象扩展：日期计算(增加)
4 | [Date.prototype.add](/?id=_254-dateprototypeaddinterval-number) | Date对象原型扩展：日期计算(增加)
5 | [Date.diff](/?id=_255-datediffdiffdate1-diffdate2-interval) | Date对象扩展：日期差异计算
6 | [Date.prototype.diff](/?id=_256-dateprototypediffdiffdate-interval) | Date对象原型扩展：日期差异计算

##### 2.5.1. Date.format(date, fmt)

##### 2.5.2. Date.prototype.format(fmt)

##### 2.5.3. Date.add(date, interval, number)

##### 2.5.4. Date.prototype.add(interval, number)

##### 2.5.5. Date.diff(diffDate1 , diffDate2, interval)

##### 2.5.6. Date.prototype.diff(diffDate, interval)

#### 2.6. JSON
序号 | 函数名称 | 说明
:--- | :--- | :---
1 | [JSON.new](/?id=_261-jsonnewjson-args) | JSON对象扩展：传入JSON对象，创建新JSON对象
2 | [JSON.prototype.new](/?id=_262-jsonprototypenewargs) | JSON对象原型扩展：基于对象实例本身创建新JSON对象

##### 2.6.1. JSON.new(json, ...args)
**参数说明：** `json` *源对象，* `args` *动态指定属性集*
<br/>&nbsp; &nbsp; **返回值：** `{*}` *创建的新对象*
<br/>
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
<br/>&nbsp; &nbsp; **返回值：** `{*}` *创建的新对象*
<br/>
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

#### 2.7. Array

#### 2.8. Storage

---

持续完善中...

---

Powered by cbtak <cbtak@hotmail.com>