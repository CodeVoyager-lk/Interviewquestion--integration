# ES6部分

## 📕说说let、const、var之间的区别

### var关键字

- var在全局作用域中声明的变量会成为window对象的属性

  ```js
  var a = 10;
  console.log(window.a) // 10
  ```

- var声明的变量存在变量提升

  ```js
  console.log(a) // undefined
  var a = 20
  
  //在编译阶段，编译器会将其变成以下执行
  var a
  console.log(a)
  a = 20
  ```

- 使用`var`，我们能够对一个变量进行多次声明，后面声明的变量会覆盖前面的变量声明

  ```js
  var a = 20 
  var a = 30
  console.log(a) // 30
  ```

### let 关键字

- let 声明的范围是块级作用域，而var声明的范围是函数作用域

  ```js
  if(true){
  	let name = "Matt";
  	console.log(name); //Matt
  }
  console.log(name); //ReferenceError name没有定义
  ```

- let不存在声明提前，因此，let变量声明之前该变量都是不可用的，let声明之前的执行瞬间被称为“暂时性死区”

  ```js
  console.log(age);//age没有dingyi
  let age = 25
  ```

- `let`不允许在相同作用域中重复声明，并且，**不能在函数内部重新声明参数**

  ```js
  let a = 20
  let a = 30
  // Uncaught SyntaxError: Identifier 'a' has already been declared
  
  function func(arg) {
    let arg;
  }
  func()
  // Uncaught SyntaxError: Identifier 'arg' has already been declared
  ```

- 使用let在全局作用域中声明的变量不会成为window对象的属性（var会）

  ```js
  let age = 25;
  console.log(window.age);//undefined
  ```

### const关键字

- `const`声明一个只读的常量，一旦声明，常量的值就不能改变。因此，**`const`一旦声明变量，就必须立即初始化**

  ```js
  const a = 1
  a = 3
  // TypeError: Assignment to constant variable.
  ```

- 内存地址的引用是不可改变的，但是比如修改对象内部的属性值，这是可以的

  ```js
  const foo = {};
  foo.prop = 123;// 为 foo 添加一个属性，可以成功
  foo.prop; // 123
  
  // 将 foo 指向另一个对象，就会报错
  foo = {}; // TypeError: "foo" is read-only
  ```

  扩展：如果真的想要不能修改对象的属性值，可以使用`Object.freeze()`

  ```js
  const foo = Object.freeze({});
  // 常规模式时，下面一行不起作用
  foo.prop = 123;
  console.log(foo); //里面没有prop属性
  
  // 严格模式时，该行会报错
  'use strict';
  const foo = Object.freeze({});
  foo.prop = 123; // 报错
  ```

**~~其余特性和let基本相同**

### 为什么要引入块级作用域

没有引入块级作用域的时候，函数内部代码块内的变量会自动提升，就会出现以下情况：

1. 内层变量覆盖外层变量

   ```js
   var tmp = new Date();
   function f() {
   console.log(tmp);//外层的tmp被内部的提前声明覆盖了
     if (false) {
       var tmp = 'hello world';
     }}
   f(); // undefined
   ```

2. 用来计数的循环变量泄露为全局变量

   **注意：对于for的块级作用域，设置循环变量的那部分是一个父作用域，而循环体内部是一个单独的子作用域**

   ```js
   var a = [];
   for (var i = 0; i < 10; i++) {
     a[i] = function () {
       console.log(i);
     };}
   a[6](); // 10
   //相当于
   var a = [];
   var i;
   for (; i < 10; i++) {
     a[i] = function () {
       console.log(i);
     };}
   a[6](); // 10
   //使用let修改
   var a = [];for (let i = 0; i < 10; i++) {
     a[i] = function () {
       console.log(i);
     };}
   a[6](); // 6
   ```

   变量i是let声明的，当前的i只在本轮循环有效，所以每一次循环的i其实都是一个新的变量，所以最后输出的是6

## 📕ES6数组新增的扩展

   ### 扩展运算符的应用

   #### 解构赋值

   原来我们需要提取数组中的某一个值，需要以`arr[0]`这种数组索引的方式获取。然而ES6 允许解构赋值，只要等号两边的模式相同，左边的变量就会被赋予右边对应的值

   - 如果解构不成功，变量的值就等于undefined

   ```js
   let [foo, [[bar], baz]] = [1, [[2], 3]];
   foo // 1
   bar // 2
   baz // 3
   
   let [x, , y] = [1, 2, 3];
   x // 1
   y // 3
   
   let [head, ...tail] = [1, 2, 3, 4];
   head // 1
   tail // [2, 3, 4]
   
   let [x, y, ...z] = ['a'];
   x // "a"
   y // undefined 
   z // []
   ```

   #### 扩展运算符

   扩展运算符可以将一个数组转为用逗号分隔的参数序列

   ```JS
   console.log(...[1, 2, 3])
   // 1 2 3
   
   console.log(1, ...[2, 3, 4], 5)
   // 1 2 3 4 5
   ```

   扩展运算符可以与解构赋值结合起来，用于生成数组

   - 注意：**将扩展运算符用于数组赋值，只能放在参数的最后一位，否则会报错**

   ```js
   const [first, ...rest] = [1, 2, 3, 4, 5];
   first // 1
   rest  // [2, 3, 4, 5]
   const [first, ...rest] = ["foo"];
   first  // "foo"
   rest   // []
   
   //放在最后一项
   const [...butLast, last] = [1, 2, 3, 4, 5];
   // 报错
   const [first, ...middle, last] = [1, 2, 3, 4, 5];
   // 报错
   ```

   定义了遍历器（Iterator）接口的对象，都可以用扩展运算符转为真正的数组。如果对没有 Iterator 接口的对象，使用扩展运算符，将会报错

   ```js
   let nodeList = document.querySelectorAll('div');
   let array = [...nodeList];
   
   let map = new Map([
     [1, 'one'],
     [2, 'two'],
     [3, 'three'],
   ]);
   
   let arr = [...map.keys()]; // [1, 2, 3]
   ```

   ```javascript
   const obj = {a: 1, b: 2};
   let arr = [...obj]; // TypeError: Cannot spread non-iterable object
   ```

   注意：**通过扩展运算符实现的是浅拷贝，修改了引用指向的值，会同步反映到新数组**

   ```js
   const arr1 = ['a', 'b',[1,2]];
   const arr2 = ['c'];
   const arr3  = [...arr1,...arr2]
   arr[1][0] = 9999 // 修改arr1里面数组成员值
   console.log(arr[3]) // 影响到arr3,['a','b',[9999,2],'c']
   ```

   ### Array构造函数新增方法

   关于构造函数，数组新增的方法有：`Array.from()`  `Array.of()`

   #### Array.from()

   可将 **类似数组的对象** 和 **可遍历`（iterable）`的对象**（包括 `ES6` 新增的数据结构 `Set` 和 `Map`） 转为真正的数组

   参数：第一个参数为需要转换的对象，第二个可选参数可以对每个元素进行处理，将处理后的值放入返回的数组

   ```js
   //类数组对象
   let arrayLike = {
       '0': 'a',
       '1': 'b',
       '2': 'c',
       length: 3
   };
   let arr2 = Array.from(arrayLike); // ['a', 'b', 'c']
   ```

   ```js
   //第二参数使用
   Array.from([1, 2, 3], (x) => x * x)
   // [1, 4, 9]
   ```

   #### Array.of()

   用于将一组值，转换为数组

   ```js
   Array.of(3, 11, 8) // [3,11,8]
   ```

   **参数**：没有参数的时候，返回一个空数组；当参数只有一个的时候，实际上是指定数组的长度；参数个数不少于 2 个时，`Array()`才会返回由参数组成的新数组

   ```js
   Array() // []
   Array(3) // [, , ,]
   Array(3, 11, 8) // [3, 11, 8]
   ```

   ### 实例对象上新增的方法

   #### 迭代器方法

   ES6中暴露了3个用于检索数组内容的方法：`keys()`  `values()`  `entries()`

   `keys()`是对键名的遍历、`values()`是对键值的遍历，`entries()`是对键值对的遍历

   ```js
   const a = ["foo","bar","baz"];
   //这些方法都返回迭代器，所以可以通过Array.from()直接转换为数组实例
   const aKeys = Array.from(a.keys());
   const aValues = Array.from(a.values());
   const aEntries = Array.from(a.entries());
   
   console.log(aKeys);//[0,1,2,3]
   console.log(aValues);//["foo","bar","baz"]
   console.log(aEntries);//[0,"foo"],[1,"bar"],[2,"baz"]
   
   //或者
   for (let [index, elem] of ['a', 'b'].entries()) {
     console.log(index, elem);
   }
   // 0 "a"
   ```

   #### 复制和填充

   批量复制方法：`copyWithin()` 以及 填充数组方法：`fill()`

   ##### copyWithin()

   将指定位置的成员复制到其他位置（会覆盖原有成员），然后返回当前数组

   **参数**：

   - target（必需）：从该位置开始替换数据。如果为负值，表示倒数。
   - start（可选）：从该位置开始读取数据，默认为 0。如果为负值，表示从末尾开始计算。
   - end（可选）：到该位置前停止读取数据，默认等于数组长度。如果为负值，表示从末尾开始计算。

   ```js
   [1, 2, 3, 4, 5].copyWithin(0, 3) // 将从 3 号位直到数组结束的成员（4 和 5），复制到从 0 号位开始的位置，结果覆盖了原来的 1 和 2
   // [4, 5, 3, 4, 5] 
   ```

   ##### fill()

   使用给定值，填充一个数组

   ```javascript
   ['a', 'b', 'c'].fill(7)
   // [7, 7, 7]
   
   new Array(3).fill(7)
   // [7, 7, 7]
   ```

   还可以接受第二个和第三个参数，用于指定填充的起始位置和结束位置

   ```js
   ['a', 'b', 'c'].fill(7, 1, 2)
   // ['a', 7, 'c']
   ```

   注意，如果填充的类型为对象，则是浅拷贝(copyWithin也是)

   #### 搜索方法

   搜索方法分为：严格相等搜索 和 断言函数搜索

   - 严格相等搜索

     `includes()`用于判断数组是否包含给定的值

     **参数**：方法的第二个参数表示搜索的起始位置，默认为`0`。参数为负数则表示倒数的位置

     ```js
     [1, 2, 3].includes(2)     // true
     [1, 2, 3].includes(4)     // false
     [1, 2, NaN].includes(NaN) // true
     ```

   - 断言函数搜索

     `find()、findIndex()`

     `find()`用于找出第一个符合条件的数组成员

     参数是一个回调函数，接受三个参数依次为当前的值、当前的位置和原数组。这两个方法都可以接受第二个参数，用来绑定回调函数的`this`对象。

     ```js
     [1, 5, 10, 15].find(function(value, index, arr) {
       return value > 9;
     }) // 10
     
     //绑定回调函数的this对象
     function f(v){
       return v > this.age;
     }
     let person = {name: 'John', age: 20};
     [10, 12, 26, 15].find(f, person);    // 26
     ```

     `findIndex()` 返回第一个符合条件的数组成员的位置，如果所有成员都不符合条件，则返回-1

     ```
     [1, 5, 10, 15].findIndex(function(value, index, arr) {
       return value > 9;
     }) // 2
     ```

   #### 扁平化方法

   - `flat()`

   将数组扁平化处理，返回一个新数组，对原数据没有影响

   ```js
   [1, 2, [3, 4]].flat()
   // [1, 2, 3, 4]
   ```

   `flat()`默认只会“拉平”一层，如果想要“拉平”多层的嵌套数组，可以将`flat()`方法的参数写成一个整数，表示想要拉平的层数

   ```js
   [1, 2, [3, [4, 5]]].flat()
   // [1, 2, 3, [4, 5]]
   
   [1, 2, [3, [4, 5]]].flat(2)
   // [1, 2, 3, 4, 5]
   ```

   - `flatMap()`

   `flatMap()`方法对原数组的每个成员执行一个函数相当于执行`Array.prototype.map()`，然后对返回值组成的数组执行`flat()`方法。该方法返回一个新数组，不改变原数组

   flatMap()方法还可以有第二个参数，用来绑定遍历函数里面的`this`

   ```js
   // 相当于 [[2, 4], [3, 6], [4, 8]].flat()
   [2, 3, 4].flatMap((x) => [x, x * 2])
   // [2, 4, 3, 6, 4, 8]
   ```

   ### 数组空位

   ES6之前的方法会忽略空位，然而在ES6之后新增的方法普遍将空位当成存在的元素，值为`undefined`

   其中包括`Array.from`、扩展运算符、解构赋值、`copyWithin()`、`fill()`、`entries()`、`keys()`、`values()`、`find()`和`findIndex()`

   **但是由于标准不统一不建议使用**

## 📕ES6对象新增了哪些扩展

### 属性的简写

ES6中，当对象键名与对应值名相等的时候，可以进行简写

```js
const baz = {foo:foo}

// 等同于
const baz = {foo}
```

**注意：简写的对象方法不能用作构造函数，否则会报错**

```js
const obj = {
  f() {
    this.foo = 'bar';
  }
};
```

### 属性名表达式

ES6 允许字面量定义对象时，将表达式放在括号内，也可以定义方法名

```js
let lastWord = 'last word';
const a = {
  'first word': 'hello',
  [lastWord]: 'world'
};
a['first word'] // "hello"
a[lastWord] // "world"
a['last word'] // "world"

//定义方法名
let obj = {
  ['h' + 'ello']() {
    return 'hi';
  }
};
obj.hello() // hi
```

**注意，属性名表达式与简洁表示法，不能同时使用，会报错**

```js
// 报错
const foo = 'bar';
const bar = 'abc';
const baz = { [foo] };

// 正确
const foo = 'bar';
const baz = { [foo]: 'abc'};
```

**注意，属性名表达式如果是一个对象，默认情况下会自动将对象转为字符串`[object Object]`**

```js
const keyA = {a: 1};
const keyB = {b: 2};

const myObject = {
  [keyA]: 'valueA',
  [keyB]: 'valueB'
};

myObject // Object {[object Object]: "valueB"}
```

### 对象的解构赋值

数组的元素是按次序排列的，变量的取值由它的位置决定；而对象的属性没有次序，变量必须与属性同名，才能取到正确的值

```js
let { bar, foo } = { foo: 'aaa', bar: 'bbb' };
foo // "aaa"
bar // "bbb"

// 注意：如果解构失败，变量的值等于undefined。
let {foo} = {bar: 'baz'};
foo // undefined
```

解构赋值的内部机制：先找到 属性，然后再赋给对应的变量。**真正被赋值的是后者，而不是前者。**

```js
let { foo: baz } = { foo: 'aaa', bar: 'bbb' };
baz // "aaa"
foo // error: foo is not defined
```

要点：

- 与数组一样，**解构也可以用于嵌套结构的对象**

```js
let obj = {
  p: [
    'Hello',
    { y: 'World' }
  ]};
let { p: [x, { y }] } = obj;
x // "Hello"
y // "World"
```

- **对象的解构赋值可以取到继承的属性**。

```js
const obj1 = {};
const obj2 = { foo: 'bar' };
// Object.setPrototypeOf(obj1, obj2);
// obj1.__proto__ = obj2
const { foo } = obj1;
console.log(foo);

```

- **对象的解构也可以指定默认值**（默认值生效的条件是，对象的属性值严格等于undefined）

```js
var {x = 3} = {};
x // 3
var {x, y = 5} = {x: 1};
x // 1 
y // 5
var { message: msg = 'Something went wrong' } = {};
msg // "Something went wrong"
// 默认值生效的条件是，对象的属性值严格等于undefined。
var {x = 3} = {x: undefined};x // 3
var {x = 3} = {x: null};
x // null
// 上面代码中，属性x等于null，因为null与undefined不严格相等，所以是个有效的赋值，导致默认值3不会生效。

```

- 解构赋值对于引用类型数据的赋值时是浅拷贝

```js
let obj = { a: { b: 1 } };
let { ...x } = obj;
obj.a.b = 2; // 修改obj里面a属性中键值
x.a.b // 2，影响到了结构出来x的值
```

### 属性的遍历

ES6 一共有 5 种方法可以遍历对象的属性。

- `for...in`：循环遍历对象自身的和继承的可枚举属性（不含 Symbol 属性）
- `Object.keys(obj)`：返回一个数组，包括对象自身的（不含继承的）所有可枚举属性（不含 Symbol 属性）的键名
- `Object.getOwnPropertyNames(obj)`：回一个数组，包含对象自身的所有属性（不含 Symbol 属性，但是包括不可枚举属性）的键名
- `Object.getOwnPropertySymbols(obj)`：返回一个数组，包含对象自身的所有 Symbol 属性的键名
- `Reflect.ownKeys(obj)`：返回一个数组，包含对象自身的（不含继承的）所有键名，不管键名是 Symbol 或字符串，也不管是否可枚举

### 对象新增的方法

关于对象新增的方法，分别有以下：

- Object.is()
- Object.assign()
- Object.getOwnPropertyDescriptors()
- Object.setPrototypeOf()，Object.getPrototypeOf()
- Object.keys()，Object.values()，Object.entries()
- Object.fromEntries()

#### Object.is()

严格判断两个值是否相等，与严格比较运算符（===）的行为基本一致，不同之处只有两个：一是`+0`不等于`-0`，二是`NaN`等于自身

```js
+0 === -0 //true
NaN === NaN // false

Object.is(+0, -0) // false
Object.is(NaN, NaN) // true
```

#### Object.assign()

`Object.assign()`方法用于对象的合并，将源对象`source`的所有可枚举属性，复制到目标对象`target`

**参数**：`Object.assign()`方法的第一个参数是目标对象，后面的参数都是源对象              

```javascript
const target = { a: 1, b: 1 };

const source1 = { b: 2, c: 2 };
const source2 = { c: 3 };

Object.assign(target, source1, source2);
target // {a:1, b:2, c:3}
```

注意：`Object.assign()`方法是浅拷贝，遇到同名属性会进行替换

#### Object.getOwnPropertyDescriptors()

返回指定对象所有自身属性（非继承属性）的描述对象

```js
const obj = {
  foo: 123,
  get bar() { return 'abc' }
};

Object.getOwnPropertyDescriptors(obj)
// { foo:
//    { value: 123,
//      writable: true,
//      enumerable: true,
//      configurable: true },
//   bar:
//    { get: [Function: get bar],
//      set: undefined,
//      enumerable: true,  
//      configurable: true } 
//  }
```

#### Object.setPrototypeOf()

`Object.setPrototypeOf`方法用来设置一个对象的原型对象

```js
Object.setPrototypeOf(object, prototype)

// 用法
const o = Object.setPrototypeOf({}, null);
```

#### Object.getPrototypeOf()

用于读取一个对象的原型对象

```js
Object.getPrototypeOf(obj);
```

#### Object.keys()

返回自身的（不含继承的）所有可遍历（enumerable）属性的键名的数组

```js
var obj = { foo: 'bar', baz: 42 };
Object.keys(obj)
// ["foo", "baz"]
```

#### Object.values()

返回自身的（不含继承的）所有可遍历（enumerable）属性的键对应值的数组

```js
const obj = { foo: 'bar', baz: 42 };
Object.values(obj)
// ["bar", 42]
```

#### Object.entries()

返回一个对象自身的（不含继承的）所有可遍历（enumerable）属性的键值对的数组

```js
const obj = { foo: 'bar', baz: 42 };
Object.entries(obj)
// [ ["foo", "bar"], ["baz", 42] ]
```

#### Object.fromEntries()

用于将一个键值对数组转为对象

```js
Object.fromEntries([
  ['foo', 'bar'],
  ['baz', 42]
])
// { foo: "bar", baz: 42 }
```

---

## 📕箭头函数 与 普通函数的区别

1. this指向的问题：箭头函数本身是没有this的，它的this是从他作用域链的上一层继承来的，并且无法通过call和apply改变this指向

```js
// 箭头函数this继承作用域上一层
var fn = function () {
  return () => { console.log(this.name) }
}
var obj1 = {
  name: '张三'
}
var obj2 = {
  name: '李四'
}
var name = '王五'
obj1.fn = fn
obj2.fn = fn
obj1.fn()()//张三
obj2.fn()()//李四
fn()()//王五

// 箭头函数不能通过call改变this
var user = {
  name: '张三',
  fn: function () {
    var obj = {
      name: '李四'
    }
    var f = () => this.name
    return f.call(obj)
  }
}
```

2. 不能作为构造函数 没有prototype属性

```js
var fn = ()=>{};
new fn(); //Fn is not a constructor at
console.log(fn.prototype,"prototype");//没有prototype属性
```

3. 没有arguments对象

```js
var foo = ()=>{
	console.log(arguments); //argument is not defined
}
foo(1,2,3)

//可以通过res参数这种方式获取
var foo = (...arguments){
	console.log(arguments)
}
```

## 📕如何理解ES6中的promise

Promise 是异步编程的一种解决方案（传统的异步编程嵌套问题可能造成回调地狱，promise可以解决这样的问题）

### 状态

`promise`对象仅有三种状态：

- `pending`（进行中）
- `fulfilled`（已成功）
- `rejected`（已失败）

```js
// pending
new Promise((resolve, reject) => {})
// fulfilled
new Promise((resolve, reject) => { resolve('hello world') })
// rejected
new Promise((resolve, reject) => { reject('bad code') })
```

### 特点

- 对象的状态不受外界影响，只有异步操作的结果，可以决定当前是哪一种状态

- 一旦状态改变（从`pending`变为`fulfilled`和从`pending`变为`rejected`），就不会再变，任何时候都可以得到这个结果

```js
new Promise((resolve, reject) => {
  reject('bad code')
  resolve('hello world')
}).then(val => {
  console.log(val)
}).catch(err => {
  console.log(err)
})
```

### promise相关方法

`Promise.resolve()`

Promise.resolve()方法会返回一个状态为fulfilled的promise对象。

```js
Promise.resolve(2).then((val) => {
  console.log(val)
})
```

`Promise.reject()`

Promise.reject()方法返回一个带有拒绝原因的Promise对象。

```js
Promise.reject({ message: '接口返回错误' }).catch((err) => {
  console.log(err)
})
```

#### 实例方法

`then()`

`then`是**实例状态发生改变**时的回调函数，第一个参数是`resolved`状态的回调函数，第二个参数是`rejected`状态的回调函数

`then`方法返回的是一个新的`Promise`实例，也就是`promise`能链式书写的原因

```javascript
getJSON("/posts.json").then(function(json) {
  return json.post
}).then(function(post) {
  // ...
})
```

`catch()`

`catch()`方法是`.then(null, rejection)`的别名，本质是一个语法糖，用于指定发生错误时的回调函数

- `Promise`对象的错误具有“冒泡”性质，会一直向后传递，直到被捕获为止

```javascript
getJSON('/posts.json').then(function(posts) {
  // ...
}).catch(function(error) {
  // 处理 getJSON 和 前一个回调函数运行时发生的错误
  console.log('发生错误！', error);
});
```

- `Promise`对象抛出的错误不会传递到外层代码，即不会有任何反应

```js
const someAsyncThing = function() {
  return new Promise(function(resolve, reject) {
    // 下面一行会报错，因为x没有声明
    resolve(x + 2);
  });
};
//浏览器运行到这一行，会打印出错误提示`ReferenceError: x is not defined`，但是不会退出进程catch()方法之中，还能再抛出错误，通过后面`catch`方法捕获到
```

`finally()`

`finally()`方法用于指定不管 Promise 对象最后状态如何，都会执行的操作

```javascript
promise
.then(result => {···})
.catch(error => {···})
.finally(() => {···});
```

**`.carch()`方法 和 `.then()` 中第二个参数的运行规则**：

主要区别：如果在then的第一个函数里抛出了异常，后面的catch能捕获到，而then的第二个函数捕获不到

then的第二个参数和catch捕获错误信息的时候会**就近原则**，如果是promise内部报错，reject抛出错误后，then的第二个参数和catch方法都存在的情况下，只有then的第二个参数能捕获到，如果then的第二个参数不存在，则catch方法会捕获到。

```tsx
//此时只有catch可以捕获到.then内部抛出的错误信息
let promise = new Promise((resolve,reject)=>resolve("nihao"));
promise.then(res => {
    throw new Error('hello');
}, err => {
    console.log("err:"+err);
}).catch(err1 => {
    console.log("err1:"err1);
});

//此时只有then的第二个参数可以捕获到错误信息
const promise = new Promise((resolve, rejected) => {
    throw new Error('test')
})
promise.then(res => {
    //
}, err => {
    console.log(err)
}).catch(err1 => {
    console.log(err1)
});

//此时catch可以捕获到Promise内部抛出的错误信息
promise.then(res => {
    throw new Error('hello');
}).catch(err1 => {
    console.log(err1);
});
```

#### 构造函数方法

`Promise`构造函数存在以下方法：`all()` `race()` `any()` `allSettled()` `resolve()` `reject()` `try()`

`all()`

`Promise.all()`方法用于将多个 `Promise`实例，包装成一个新的 `Promise`实例（）

```javascript
const p = Promise.all([p1, p2, p3]);
```

接受一个数组（迭代对象）作为参数，数组成员都应为`Promise`实例

实例`p`的状态由`p1`、`p2`、`p3`决定，分为两种：

- 只有`p1`、`p2`、`p3`的状态都变成`fulfilled`，`p`的状态才会变成`fulfilled`，此时`p1`、`p2`、`p3`的返回值组成一个数组，传递给`p`的回调函数（这个时候会等待所有promise状态进行变更以后返回）
- 只要`p1`、`p2`、`p3`之中有一个被`rejected`，`p`的状态就变成`rejected`，此时第一个被`reject`的实例的返回值，会传递给`p`的回调函数

注意：如果**作为参数的 `Promise` 实例，定义了`catch`方法，那么它一旦被`rejected`，并不会触发`Promise.all()`的`catch`方法**

```javascript
const p1 = new Promise((resolve, reject) => {
  resolve('hello');
})
.then(result => result)
.catch(e => e);

const p2 = new Promise((resolve, reject) => {
  throw new Error('报错了');
})
.then(result => result)
.catch(e => e);

Promise.all([p1, p2])
.then(result => console.log(result));
.catch(e => console.log(e));
// ["hello", Error: 报错了]
```

如果`p2`没有自己的`catch`方法，就会调用`Promise.all()`的`catch`方法

```javascript
const p1 = new Promise((resolve, reject) => {
  resolve('hello');
})
.then(result => result);

const p2 = new Promise((resolve, reject) => {
  throw new Error('报错了');
})
.then(result => result);

Promise.all([p1, p2])
.then(result => console.log(result))
.catch(e => console.log(e));
// Error: 报错了
```

`race()`

`Promise.race()`同样是将多个`promise`实例包装成新的`promise`实例。

只要参数`promise`实例数组之中有一个实例率先改变状态，`p`的状态就跟着改变。率先改变的 Promise 实例的返回值则传递给`p`的回调函数

```javascript
//race()格式
const p = Promise.race([p1, p2, p3]);

//实际运用—超时请求
const p = Promise.race([
  fetch('/resource-that-may-take-a-while'),
  new Promise(function (resolve, reject) {
    setTimeout(() => reject(new Error('request timeout')), 5000)
  })
]);
p
.then(result => console.log(result))
.catch(console.error);
```

`any()`

该方法接受一组 Promise 实例作为参数，只要参数实例有一个变成`fulfilled`状态，包装实例就会变成`fulfilled`状态；如果所有参数实例都变成`rejected`状态，包装实例就会变成`rejected`状态

**注意**：`Promise.any()`跟`Promise.race()`的区别在于—`Promise.any()`不会因为某个 Promise 变成`rejected`状态而结束，必须等到所有参数 Promise 变成`rejected`状态才会结束

```js
const promises = [
  fetch('/endpoint-a').then(() => 'a'),
  fetch('/endpoint-b').then(() => 'b'),
  fetch('/endpoint-c').then(() => 'c'),
];

try {
  const first = await Promise.any(promises);
  console.log(first);
} catch (error) {
  console.log(error);
}
```

`allSettled()`

`Promise.allSettled()`方法接受一组 `Promise` 实例作为参数，包装成一个新的 Promise 实例

只有等到所有这些参数实例都返回结果，不管是`fulfilled`还是`rejected`，包装实例才会结束

```javascript
const promises = [
  fetch('/api-1'),
  fetch('/api-2'),
  fetch('/api-3'),
];

await Promise.allSettled(promises);
removeLoadingIndicator();
```

## 📕如何理解ES6中的Proxy

Proxy 对象用于创建一个对象的代理，从而实现基本操作的拦截和自定义（如属性查找、赋值、枚举、函数调用等）

**创建Proxy的方法**

```js
//方法1
var proxy = new Proxy(target,handler);
//举例handler——处理程序对象中定义的“基本操作的拦截器”
const handler = {
	//get接收3个参数
	get(target,prototype,receiver){
		return target[prototype];
		....
		//target—代理对象	prototype——属性名	receiver——一般指向代理对象proxy
	}
	
	//set接收4个参数
	set(target,prototype,value,receiver){
		...
		target[prototype] = value;
		//value——对象prototype需要修改的属性值
	}
}

//方法2——创建可撤销代理
const { proxy, revoke } = Proxy.revocable(data, handler)
```

`target`表示所要拦截的目标对象（任何类型的对象，包括原生数组，函数，甚至另一个代理）

`handler`通常以函数作为属性的对象，各属性中的函数分别定义了在执行各种操作时代理 `p` 的行为

**注意**：**参数中的`receiver`不能用于调用本身（如：`console.log(receiver)`） 或 调用其属性（如：`return receiver[prototype]`）相当于代理对象，调用其身上的属性会循环调用`get()`，陷入死循环**

### handler解析

关于`handler`拦截属性，有如下：

- get(target,propKey,receiver)：拦截对象属性的读取

  该方法会拦截目标对象的以下操作：

  1. 访问属性：proxy[foo] 和 proxy.bar
  2. 访问原型链上的属性：Object.create(proxy)[foo]
  3. Reflect.get()

- set(target,propKey,value,receiver)：拦截对象属性的设置

- has(target,propKey)：拦截`propKey in proxy`的操作，返回一个布尔值

- deleteProperty(target,propKey)：拦截`delete proxy[propKey]`的操作，返回一个布尔值

- ownKeys(target)：拦截`Object.keys(proxy)`、`for...in`等循环，返回一个数组

- getOwnPropertyDescriptor(target, propKey)：拦截`Object.getOwnPropertyDescriptor(proxy, propKey)`，返回属性的描述对象

- defineProperty(target, propKey, propDesc)：拦截`Object.defineProperty(proxy, propKey, propDesc）`，返回一个布尔值

- preventExtensions(target)：拦截`Object.preventExtensions(proxy)`，返回一个布尔值

- getPrototypeOf(target)：拦截`Object.getPrototypeOf(proxy)`，返回一个对象

- isExtensible(target)：拦截`Object.isExtensible(proxy)`，返回一个布尔值

- setPrototypeOf(target, proto)：拦截`Object.setPrototypeOf(proxy, proto)`，返回一个布尔值

- apply(target, object, args)：拦截 Proxy 实例作为函数调用的操作

- construct(target, args)：拦截 Proxy 实例作为构造函数调用的操作

**在handler直接定义操作拦截的问题（代理陷阱）：**

```js
var obj2 = {
	name:"mjn";
	get value(){
		return this.name
	}
}
var obj1 = {name:"allen"}
const handler = {
	//这里直接输出target[prototype] 是 obj2 中的prototype，而obj1调用向输出的是自己的prototype，因此会产生代理陷阱问题
	get(target,prototype,receiver){
		return targte[prototype];
        //这里receiver指向obj1，而不是proxy
        //解决方案
        //return Refelct.get(...arguments)
	}
}
const proxy = new Proxy(obj2,handler);
Object.setPrototypeOf(obj1,proxy);
console.log(obj1.value);// "mjn"而不是"allen"
```

### Reflect API

若需要在`Proxy`内部调用对象的默认行为，建议使用`Reflect`，其是`ES6`中操作对象而提供的新 `API`

```js
const handeler = {
	//使用方式1
	get(){
		return Reflect.get(...arguments);
	}
	//使用方式2
	get:Reflect.get;
}
//使用方式3
const proxy = new Proxy(target,handler);
```

## 📕如何理解ES6新增的Symbol数据结构

ES6 引入了的一种新的原始数据类型Symbol，可以用于创建对象的唯一标识符，可以接受一个字符串作为参数，表示对 Symbol 实例的描述。

原始对象的问题：当用两个不同的对象作为另一个对象的键值时，后者会覆盖前者

```js
let a = {a:1}
let b = {b:1}
let c = {}
c[a] = 3
c[b] = 4
console.log(c); // [object Object]: 4 
//遇到对象键名都会调用String() 或 toString()方法 ——> 就转换成了[object Object]
```

解决方案：因此可以使用`Symbol()` 来解决这个问题

```js
let obj = {a:2,b:3}
let obj1 = {a:3,b:4}
let s = Symbol(obj);
let s1 = Symbol(obj1);
let o = {}
o[s] = 1;
o[s1] = 2;
console.log(o); //{Symbol([object Object]): 1, Symbol([object Object]): 2}
```

要点：

- Symbol() 函数不能与 new 关键字一起作为构造函数使用

- 每次通过Symbol()函数创建的Symbol都是唯一的，相同参数的Symbol函数的返回值是不相等

  ```js
  let s1 = Symbol('foo');
  let s2 = Symbol('foo');
  s1 === s2 // false
  ```

- Symbol 值不能与其他类型的值进行运算，会报错。

  ```js
  let sym = Symbol('My symbol');
  "your symbol is " + sym
  // TypeError: can't convert symbol to string`your symbol is ${sym}`
  // TypeError: can't convert symbol to string
  ```

- Symbol 值可以显式转为字符串。

  ```js
  let sym = Symbol('My symbol');
  String(sym) // 'Symbol(My symbol)'
  sym.toString() // 'Symbol(My symbol)'
  ```

- Symbol 值也可以转为布尔值，但是不能转为数值。

  ```js
  let sym = Symbol();
  Boolean(sym) // true
  !sym  // false
  Number(sym) // TypeErrorsym + 2 // TypeError
  ```

- 使用 `Symbol.for()`方法和 `Symbol.keyFor()`方法从全局的 symbol 注册表设置和取得 symbol

常用：

- 可以使用`Symbol()` 作为对象的属性名，不会覆盖原有同名属性（创建对象的唯一标识符）

- 由于枚举不会列出`Symbol()` 属性，因此可以用`Symbol()` 定义私有属性

  ```js
  // 私有属性
     let private = Symbol('private')
     var obj = {
      _name:'张三',
      [private]:'私有的属性',
      say:function(){
          console.log(this[private])
      }
     }
  
     console.log(Object.keys(obj)) //['_name', 'say']
  ```

---


## 📕如何理解ES6中的迭代器（iterator）

### 可迭代对象

早期执行迭代必须使用循环等辅助结构，代码会十分混乱，因此ES6以后开始支持了迭代器模式。一些数据结构具有键为`[Symbol.interator]`的属性（如：字符串、数组、集合、映射(Map)、arguments等），称为可迭代对象。

**注意 : Object不是可迭代对象，因为对象的哪个属性先遍历，哪个属性后遍历是不确定的，需要开发者手动指定。**

### [Symbol.interator]

当启动`for...of`循环时，会调用`[Symbol.interator]`方法，这个方法必须返回一个迭代器，迭代器内具有 `next()` 方法，每一轮循环调用一次`next()` 方法，取得下一个成员数据。每一次调用next方法返回一个包含`value`和`done`两个属性的对象。其中，`value`属性是当前成员的值，`done`属性是一个布尔值，表示遍历是否结束（true则结束）

- 不同迭代器的实例相互没有联系，会独立遍历对象

  ```js
  let arr = ['foo','bar']
  let iter1 = arr[Symbol.iterator]
  let iter2 = arr[Symbol.iterator]
  //iter1 iter2迭代互不干涉
  ```

- 如果可迭代对象在迭代期间被修改了，迭代器也会反应相应变化

- 一旦done为true，后面调next()就一直返回相同的值

实现一个可迭代对象：

```js
let obj = {
  data: [ 'hello', 'world' ],
  [Symbol.iterator]() {
    const self = this;
    let index = 0;
    //返回一个迭代器
    return {
      next() {
        if (index < self.data.length) {
          return {
            value: self.data[index++],
            done: false
          };
        } else {
          return { value: undefined, done: true };
        }
      }
    };
  }
};
for (var i of obj){
    console.log(i);
    
}
```

## 📕理解async和await

## 📕async 和 await 在干什么?

任意一个名称都是有意义的，先从字面意思来理解。async 是“异步”的简写，而 await 可以认为是 async wait 的简写。所以应该很好理解 async 用于申明一个 function 是异步的，而 await 用于等待一个异步方法执行完成。

###  async 起什么作用?

这个问题的关键在于，async 函数是怎么处理它的返回值的！

我们当然希望它能直接通过 `return` 语句返回我们想要的值，但是如果真是这样，似乎就没 await 什么事了。所以，写段代码来试试，看它到底会返回什么：

```javascript
async function testAsync() {



    return "hello async";



}



 



const result = testAsync();



console.log(result);
```

async 函数返回的是一个 Promise 对象。从[文档](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/async_function)中也可以得到这个信息。async 函数（包含函数语句、函数表达式、Lambda表达式）会返回一个 Promise 对象，如果在函数中 `return` 一个直接量，async 会把这个直接量通过 `Promise.resolve()` 封装成 Promise 对象。

Promise.resolve(x) 可以看作是 new Promise(resolve => resolve(x)) 的简写，可以用于快速封装字面量对象或其他对象，将其封装成 Promise 实例。

async 函数返回的是一个 Promise 对象，所以在最外层不能用 await 获取其返回值的情况下，我们当然应该用原来的方式：`then()` 链来处理这个 Promise 对象，就像这样

```javascript
testAsync().then(v => {



    console.log(v);    // 输出 hello async



});
```

现在回过头来想下，如果 async 函数没有返回值，又该如何？很容易想到，它会返回 `Promise.resolve(undefined)`。

联想一下 Promise 的特点——无等待，所以在没有 `await` 的情况下执行 async 函数，它会立即执行，返回一个 Promise 对象，并且，绝不会阻塞后面的语句。这和普通返回 Promise 对象的函数并无二致。

那么下一个关键点就在于 await 关键字了。

### **await 到底在等啥?**

一般来说，都认为 await 是在等待一个 async 函数完成。不过按[语法说明](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Operators/await)，await 等待的是一个表达式，这个表达式的计算结果是 Promise 对象或者其它值（换句话说，就是没有特殊限定）。

因为 async 函数返回一个 Promise 对象，所以 await 可以用于等待一个 async 函数的返回值——这也可以说是 await 在等 async 函数，但要清楚，它等的实际是一个返回值。注意到 await 不仅仅用于等 Promise 对象，它可以等任意表达式的结果，所以，await 后面实际是可以接普通函数调用或者直接量的。所以下面这个示例完全可以正确运行

```javascript
function getSomething() {
    return "something";
}

async function testAsync() {
    return Promise.resolve("hello async");

}

async function test() {

    const v1 = await getSomething();

    const v2 = await testAsync();

    console.log(v1, v2);


}

test();
```

### **await 等到了要等的，然后呢?**

await 等到了它要等的东西，一个 Promise 对象，或者其它值，然后呢？我不得不先说，`await` 是个运算符，用于组成表达式，await 表达式的运算结果取决于它等的东西。

如果它等到的不是一个 Promise 对象，那 await 表达式的运算结果就是它等到的东西。

如果它等到的是一个 Promise 对象，await 就忙起来了，它会阻塞后面的代码，等着 Promise 对象 resolve，然后得到 resolve 的值，作为 await 表达式的运算结果。

看到上面的阻塞一词，心慌了吧……放心，这就是 await 必须用在 async 函数中的原因。async 函数调用不会造成阻塞，它内部所有的阻塞都被封装在一个 Promise 对象中异步执行。



## 📕一道经典的eventloop，promise和await，async的代码题

~~~js
function fn () {
  //3. 这里new Promise属于同步任务，因此会先打印 Promise1
  return new Promise((resolve) => {
    console.log('Promise1');
    //4. 调用fn1()
    fn1();
    //8. fn1()执行完毕以后，将setTimeout加入宏任务消息队列（由于上一个宏任务在队列前，因此先执行）
    setTimeout(() => {
      //11. 执行这个宏任务，输出promise2
      console.log('Promise2')
      //12. 改变fn()返回的promise状态
      resolve() 
      //13. 输出promise3
      console.log('Promise3')
    }, 0);
  })
}
async function fn1() {
  //5. promise异步任务——微任务 加入微任务消息队列
  var p = Promise.resolve().then(() => {
    console.log('Promise6')
  })
  //6. 遇到await等待await代码执行完毕，才会继续执行之后代码
  //由于p.then()必须等待p状态变化，因此会执行微任务消息队列中【5】，输出Promise6
  //然后执行这里的.then()，输出Promise7
  await p.then(() => {
    console.log('Promise7')
  })
  //7. await 执行完毕以后输出“end”
  console.log('end')
}

//1. 同步任务,打印“script”
console.log('script')
 
//异步任务—宏任务 加入宏任务消息队列
setTimeout(() => {
  //10. 执行这个宏任务，输出setTimeout
  console.log('setTimeout')
}, 0)

//2. 这里调用fn(),等待fn()返回promise状态改变以后，再调用.then()
fn().then(() => {
  //9. 由于这里需要fn()改变状态以后才能触发，因此先执行宏任务
  //14. 输出Promise4
  console.log('Promise4')
})

//script
//Promise1
//Promise6
//Promise7
//end
//setTimeout
//Promise2
//Promise3
//Promise4
~~~

