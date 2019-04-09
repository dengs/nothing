# nothingJS
  常用的一些系统对象扩展、功能函数集

## 安装

> npm 安装：
  npm install @cbtak/nothing --save

## 使用说明
    const nothing = require('./nothing');

### 1. 功能函数篇

#### 1.1. 深拷贝：deepCopy(source)
```js
参数说明：
  source 要拷贝的对象
返回值：{*}
#示例：
let a = {name: 'this is a'};
let b = nothing.deepCopy(a);
```

#### 1.2. 函数名：isNull(val)
```js
参数说明：
  val 校验对象
返回值：true/false
功能描述：是否为空(值等于 null、''、undefined 时返回 true)
#示例：
let result = nothing.isNull(var) ? 'var is null' : 'var not null';
```

#### 1.3. 函数名：isNotNull(val)
```js
参数说明：
  val 校验对象
返回值：true/false
功能描述：是否不为空(值不等于 null、''、undefined 时返回 true)
#示例：
let result = nothing.isNotNull(var) ? 'var not null' : 'var is null';
```
#### 1.4. 函数名：ifNull (val, val1, val2)
```js
参数说明：
  val 校验对象(val2未传递时作为返回结果)
  val1 返回结果1
  val2 返回结果2(可选)
返回值：{*} val/val1/val2
功能描述：空值处理(类oracle nvl2)
如果val为空，则返回val1，不为空时，则验证是否传递val2参数，如传递则返回val2，否则返回val
#示例：
let [var, var1, var2] = [null, '返回var1', '返回var2'];
nothing.ifNull(var, var1, var2); // 结果为：返回var1
var = '返回var';
nothing.ifNull(var, var1, var2); // 结果为：返回var2
nothing.ifNull(var, var1); // 结果为：返回var
```

----------


后续完善中...