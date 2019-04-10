# nothingJS

## 概述
> 常用的一些系统对象扩展、功能函数集

## 安装
> npm 安装：npm install @cbtak/nothing --save<br/>yarn 安装：yarn add @cbtak/nothing


## 使用说明

### 模块引入
```js
  const nothing = require('@cbtak/nothing');
```

### 1. 功能函数篇

#### 1.1. deepCopy(source)
**参数说明：** `source` *要拷贝的对象*
<br/>&nbsp; &nbsp;**返回值：** `{*}`
<br/>
**功能描述：**
> 深拷贝<br/>对传入对象进行深度拷贝

**示例代码：**
```js
let a = {name: 'this is a'};
let copy_a = nothing.deepCopy(a);
```

#### 1.2. isNull(val)
**参数说明：** `val` *要校验的值*
<br/>&nbsp; &nbsp;**返回值：** `true/false`
<br/>
**功能描述：**
> 检验传入值是否为空<br/>(值等于 null、''、undefined 时返回 true)

**示例代码：**
```js
let var = null;
let result = nothing.isNull(var) ? 'var is null' : 'var is not null';
// 输出结果：var is null
```

#### 1.3. isNotNull(val)
**参数说明：** `val` *要校验的值*
<br/>&nbsp; &nbsp;**返回值：** `true/false`
<br/>
**功能描述：** 
> 检验传入值是否不为空<br/>(值不等于 null、''、undefined 时返回 true)

**示例代码：**
```js
let var = 'not null';
let result = nothing.isNull(var) ? 'var is null' : 'var is not null';
// 输出结果：var is not null
```

#### 1.4. ifNull (val, val1, val2)
**参数说明：** `val` *要校验的值(val2未传递时作为返回结果)，* `val1` *返回结果1，* `val2` *返回结果2(可选)*
<br/>&nbsp; &nbsp;**返回值：** `val/val1/val2`
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

### 2. 系统系统扩展

#### 2.1. Object
##### 2.1.1. Object.new(source, ...attrs)
##### 2.1.2. xxxx

#### 2.2. String

##### 2.2.1. String.replaceAll(source, substr, replacement = '')
**参数说明：** `source` *执行替换操作的字符串，* `substr` *查找匹配的内容，* `replacement` *替换的内容*
<br/>&nbsp; &nbsp;**返回值：** `true/false`
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
<br/>&nbsp; &nbsp;**返回值：** `true/false`
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

----------

后续完善中...