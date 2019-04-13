# nothing.js 
一套简单的常用函数&系统对象扩展库
<br/>
![avatar](/logo.jpeg ':size=320')
## 概述
> varsion：`v1.0.5`
<br>author：`cbtak` <cbtak@hotmail.com>
<br/>
 nothing.js 来源于项目开发过程常用到的一些工具函数，筛选通用性比较好的整理成库，大多为本人所写，部分来源于网络(`时间久远，不清楚原著，如原作者看到请@本人进行署名 ~_~`)，本库不依赖于第三方库，可直接在node服务端及前端环境使用。

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
3 | [ifNull](/?id=_13-ifnull-val-val1-val2) | 空值处理(类oracle 的 nvl2)
4 | [ternary](/?id=_14-ternaryexpression-result1-result2) | 三元函数
5 | [deepCopy](/?id=_15-deepcopysource) | 深拷贝
6 | [caseValue](/?id=_16-casevalueargs) | 匹配函数(类oracle 的 decode)
7 | [buildTree](/?id=_17-buildtreetreedataarray-options) | 构建树
8 | [toFixed](/?id=_18-tofixednum-options) | 数值型的舍入处理(可指定舍入模式)
9 | [numberFormat](/?id=_19-numberformatnum-options) | 数值格式化
10 | [getParam](/?id=_110-getparamkey) | 获取地址栏参数
11 | [hasOwnProperty](/?id=_111-hasownpropertyobject-property) | 检查对象是否具有指定属性
12 | [validateNumber](/?id=_112-validatenumberval) | 数值型验证
13 | [validateMobile](/?id=_113-validatemobilemobile) | 验证手机号码
14 | [validateEmail](/?id=_114-validateemailemail) | 验证邮箱

#### 1.1. isNull(val)
**参数说明：** `val` *要校验的值*
<br/>&nbsp; &nbsp; **返回值：** `Boolean`
<br/>
**功能描述：**
> 检验传入值是否为空<br/>(值等于 null、''、undefined 时返回 true)

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
> 检验传入值是否不为空<br/>(值不等于 null、''、undefined 时返回 true)

**示例代码：**
```js
let var = 'not null';
let result = nothing.isNull(var) ? 'var is null' : 'var is not null';
// 输出结果：var is not null
```

#### 1.3. ifNull (val, val1, val2)
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

#### 1.4. ternary(expression, result1, result2)
**参数说明：** `expression` *表达式，* `result1` *表达式成立时返回，* `result2` *表达式不成立时返回*
<br/>&nbsp; &nbsp; **返回值：** `{*}` *表达式是否成立返回 result1/result2*
<br/>
**功能描述：** 
> 三元函数<br/>expression 表达式成立则返回 result1，否则返回 result2

**示例代码：**
```js
let result = nothing.ternary(var === 100, 'var === 100', 'var != 100');
```

#### 1.5. deepCopy(source)
**参数说明：** `source` *要拷贝的对象*
<br/>&nbsp; &nbsp; **返回值：** `{*}` *拷贝后的对象*
<br/>
**功能描述：**
> 深拷贝<br/>对传入对象进行深度拷贝

**示例代码：**
```js
let a = {name: 'this is a'};
let copy_a = nothing.deepCopy(a);
```

#### 1.6. caseValue(...args)
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

#### 1.7. buildTree(treeDataArray, options)
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

#### 1.8. toFixed(num, options)
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

#### 1.9. numberFormat(num, options)
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

#### 1.10. getParam(key)
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

#### 1.11. hasOwnProperty(object, property)
**参数说明：** `object` *检查的对象*
**参数说明：** `property` *检查的属性(支持多级属性，以"."分隔)*
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

#### 1.12. validateNumber(val)
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

#### 1.13. validateMobile(mobile)
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

#### 1.14. validateEmail(email)
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
##### 2.1.1. Object.new(source, ...attrs)
##### 2.1.2. xxxx

#### 2.2. String

##### 2.2.1. String.replaceAll(source, substr, replacement = '')
**参数说明：** `source` *执行替换操作的字符串，* `substr` *查找匹配的内容，* `replacement` *替换的内容*
<br/>&nbsp; &nbsp; **返回值：** `{*}`
<br/>
**功能描述：**
> 字符串查找替换指定内容(替换全部匹配)<br/>(作为原生 replace 函数的增强)

**示例代码：**
```js
let str = ' this is string ';
let replaceStr = String.replaceAll(str, 'i', '');   // 结果为：ths s strng
```

##### 2.2.2. String.prototype.replaceAll(substr, replacement = '')
**参数说明：** `substr` *查找匹配的内容，* `replacement` *替换的内容*
<br/>&nbsp; &nbsp; **返回值：** `true/false`
<br/>
**功能描述：**
> 字符串查找替换指定内容(替换全部匹配)<br/>(作为原生 replace 函数的增强)

**示例代码：**
```js
let str = ' this is string ';
let replaceStr = str.replaceAll('i', '');     // 结果为：ths s strng
```

#### 2.3. Date
#### 2.4. Array
#### 2.5

---

后续完善中...

---

Powered by cbtak <cbtak@hotmail.com>