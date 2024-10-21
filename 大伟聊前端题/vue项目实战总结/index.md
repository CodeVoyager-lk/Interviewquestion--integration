
### 你将收获

-   vue框架使用注意事项和最佳经验
-   vue项目配置经验总结
-   vue组件设计经验总结
-   vue项目架构与服务化探索

## 正文

本文不仅仅是总结一些vue使用踩过的一些坑和项目经验

在开始文章之前，笔者建议大家对javascript, css, html基础有一定的了解，因为会用框架不一定能很好的实现业务需求和功能，要想实现不同场景下不同复杂度的需求，一定要对web基础有充足的了解，所以希望大家熟悉如下基础知识，如果不太熟悉可以花时间研究了解一下。

javascript：

-   数组常用方法的使用，比如遍历有forEach，map，filter，every， some，reduce，操作方法有splice，slice， join，push，shift， pop，sort等
-   基本数据结构，引用类型（对象，数组）
-   基本逻辑运算if else， switch，三目运算：？，for/while循环等
-   字符串常见api（如replace，slice， substr，indexOf）
-   基本正则使用
-   变量作用域，作用域链，变量提升，函数声明提升
-   对象基本用法，面向对象编程

css：

-   基本盒模型（border/content/padding等）
-   4种常用定位（static/absolute/relative/fixed）
-   常用布局方式（浮动布局/弹性布局flex/自适应布局/网格布局grid）
-   css3基本样式与动画（transition，animation）

html：

-   新标签基本用法和使用
-   head标签作用与用法（主要是meta属性的用法）

所以希望大家掌握好以上基础知识，也是前端开发的基础，接下来我们直接进入正文。

### 1\. vue框架使用注意事项和最佳经验

> vue学习最快的方式就是实践，根据官网多写几个例子是掌握vue最快的方式。 接下来笔者就来总结一下在开发vue项目中的一些实践经验。

#### 1.1 vue生命周期以及不同生命周期下的应用

![img](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/2/4/1700fc5ba6a36e6c~tplv-t2oaga2asx-image.image)

以上是vue官网上的生命周期的方法，大致划分一下分为创建前/后，挂载前/后，更新前/后，销毁前/后这四个阶段。各个阶段的状态总结如下：

-   **beforeCreate**：在beforeCreate生命周期执行时，data和methods中的数据还未初始化，所以此时不能使用data中的数据和methods中的方法
-   **created**：data 和 methods初始化完毕，此时可以使用methods 中的方法和data 中的数据
-   **beforeMount**：template模版已经编译好，但还未挂载到页面，此时页面还是上一个状态
-   **mounted**：此时Vue实例初始化完成了，DOM挂载完毕，可以直接操作dom或者使用第三发dom库
-   **beforeUpdate**： 此时data已更新，但还未同步页面
-   **updated**：data和页面都已经更新完成
-   **beforeDestory**：Vue实例进入销毁阶段，但所有的 data 和 methods ，指令， 过滤器等都处于可用状态
-   **destroyed**： 此时组件已经被销毁，data，methods等都不可用

根据以上介绍，页面第一次加载时会执行 beforeCreate， created， beforeMount， mounted这四个生命周期，所以我们一般在created阶段处理http请求获取数据或者对data做一定的处理， 我们会在mounted阶段操作dom，比如使用jquery，或这其他第三方dom库。其次，根据以上不同周期下数据和页面状态的不同，我们还可以做其他更多操作，所以说每个生命周期的发展状态非常重要，一定要理解，这样才能对vue有更多的控制权。

#### 1.2 vue常用的指令以及动态指令的使用

指令 (Directives) 是带有 v- 前缀的特殊属性，vue常用的指令有：

-   v-bind 用于响应式地更新 HTML属性
-   v-if 根据表达式的值的真假来决定是否插入/移除元素
-   v-on 用于监听 DOM 事件
-   v-show 用于决定是否展示该元素，底层通过display：none实现
-   v-html 在dom内插入html内容
-   v-for 循环
-   v-text 渲染指定dom的内容文本
-   v-cloak 和CSS规则如 \[v-cloak\] { display: none } 一起用，可以隐藏未编译的 Mustache 标签直到实例准备完毕

以上是比较常用的指令，具体用法就不一一举例了，其中v-cloak主要是用来避免页面加载时出现闪烁的问题，可以结合css的\[v-cloak\] { display: none }方式解决这一问题。关于指令的动态参数，使用也很简单，虽然是2.6.0 新增的，但是方法很灵活，具体使用如下：

```
<a v-on:[eventName]="doSomething"> ... </a>
```

我们可以根据具体情况动态切换事件名，从而绑定统一个函数。

#### 1.3 vue常用修饰符及作用

1.  事件修饰符

-   .stop 阻止事件冒泡
-   .prevent 阻止事件默认行为
-   .self 事件绑定的元素本身触发时才触发回调
-   .once 事件只能触发一次，第二次就不会触发了
-   .native 将一个vue组件变成一个普通的html，使其可以监听click等原生事件 具体使用如下：

```
<Tag @click.native="handleClick">ok</Tag>
```

2.  表单修饰符

-   .lazy 在输入框输入完内容，光标离开时才更新视图
-   .trim 过滤首尾空格
-   .number 如果先输入数字，那它就会限制你输入的只能是数字;如果先输入字符串，那就相当于没有加.number

用法如下：

```
<input type="text" v-model.trim="value">
```

还有很多修饰符比如键盘，鼠标等修饰符，感兴趣的大家可以自行学习研究。

#### 1.4 组件之间，父子组件之间的通信方案

组件之间的通信方案：

-   通过事件总线（bus），即通过发布订阅的方式
-   vuex

父子组件：

-   父组件通过prop向自组件传递数据
-   子组件绑定自定义事件，通过this.$emit(event,params) 来调用自定义事件
-   使用vue提供的 ![img](2.svg)children & $refs方法来通信

#### 1.5 vue实现按需加载组件

组件的按需加载是项目性能优化的一个环节，也可以降低首屏渲染时间，笔者在项目中用到的组件按需加载的方式如下：

1.  使用() => import()， 具体代码如下：

```
<template>
    <div>
       <ComponentA />
       <ComponentB />
    </div>
</template>
<script>
const ComponentA = () => import('./ComponentA')
const ComponentB = () => import('./ComponentB')
export default {
    // ...
    components: {
    ComponentA, 
    ComponentB 
    },
    // ...
}
</script>
```

2.  使用resolve => require(\['./ComponentA'\], resolve)，使用方法如下：

```
<template>
    <div>
       <ComponentA />
    </div>
</template>
<script>
const ComponentA = resolve => require(['./ComponentA'], resolve)
export default {
    // ...
    components: {
    ComponentA
    },
    // ...
}
</script>
```

#### 1.6 vuex的几种属性和作用，以及使用vuex的基本模式

> Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。

vuex的基本工作模式如下图所示：

![img](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/2/4/17010847c51e4150~tplv-t2oaga2asx-image.image)

state的改变完全由mutations控制， 我们也没必要任何项目都使用vuex，对于中大型复杂项目而言，需要共享的状态很多时，使用vuex才是最佳的选择。接下来我将详细介绍各api的概念和作用。

-   state 单一状态树，用一个对象就包含了全部的应用层级状态，并且作为一个唯一数据源而存在
-   getters 就像计算属性一样，getter 的返回值会根据它的依赖被缓存起来，且只有当它的依赖值发生了改变才会被重新计算 比如如下案例：

```
const store = new Vuex.Store({
  state: {
    todos: [
      { id: 1, text: '...', done: true },
      { id: 2, text: '...', done: false }
    ]
  },
  getters: {
    doneTodos: state => {
      return state.todos.filter(todo => todo.done)
    }
  }
})
// 访问getters里的属性
this.$store.getters.doneTodos
```

-   Mutation 更改 Vuex 的 store 中的状态的唯一方法，使用案例如下：

```
const store = new Vuex.Store({
  state: {
    num: 1
  },
  mutations: {
    add (state) {
      // 变更状态
      state.num++
    }
  }
})

// 在项目中使用mutation
store.commit('add')
// 添加额外参数
store.commit('add', 10)
```

-   Action Action提交的是mutation，而不是直接变更状态，可以包含任意异步操作，具体用法如下：

```
const store = new Vuex.Store({
  state: {
    num: 0
  },
  mutations: {
    add (state) {
      state.num++
    }
  },
  actions: {
    add (context) {
      context.commit('add')
    },
    asyncAdd ({ commit }) {
    setTimeout(() => {
      commit('add')
    }
  }
})
// 分发action
store.dispatch('add')
// 异步action
store.dispatch('asyncAdd')
// 异步传参
store.dispatch('asyncAdd', { num: 10 })
```

-   Module 将store分割成模块（module）。每个模块拥有自己的 state、mutation、action、getter、甚至是嵌套子模块

笔者更具实际经验总结了一套标准使用模式，就拿笔者之前的开源XPXMS举例，如下：

![img](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/2/4/17010eb739f357d3~tplv-t2oaga2asx-image.image)

store目录是用来组织vuex代码用的，我将action，mutation，state分文件管理，这样项目大了之后也很容易管理和查询。接下来看看此文件是如何组织的：

```
// type.ts 
// 用来定义state等的类型文件
export interface State {
    name: string;
    isLogin: boolean;
    config: Config;
    [propName: string]: any;  // 用来定义可选的额外属性
}

export interface Config {
    header: HeaderType,
    banner: Banner,
    bannerSider: BannerSider,
    supportPay: SupportPay
}

export interface Response {
    [propName: string]: any;
}

// state.ts
// 定义全局状态
import { State } from './type'
export const state: State = {
    name: '',
    isLogin: false,
    curScreen: '0', // 0为pc， 1为移动
    config: {
        header: {
            columns: ['首页', '产品', '技术', '运营', '商业'],
            height: '50',
            backgroundColor: '#000000',
            logo: ''
        }
    },
    // ...
    articleDetail: null
};

// mutation.ts
import { 
    State,
    Config, 
    HeaderType, 
    Banner,
    BannerSider,
    SupportPay
} from './type'

export default {
    // 预览模式
    setScreen(state: State, payload: string) {
        state.curScreen = payload;
    },

    // 删除banner图
    delBanner(state: State, payload: number) {
        state.config.banner.bannerList.splice(payload, 1);
    },

    // 添加banner图
    addBanner(state: State, payload: object) {
        state.config.banner.bannerList.push(payload);
    },

    // ...
};

// action.ts
import { 
    HeaderType,
    Response
 } from './type'
import http from '../utils/http'
import { uuid, formatTime } from '../utils/common'
import { message } from 'ant-design-vue'

export default {
    /**配置 */
    setConfig(context: any, paylod: HeaderType) {
        http.get('/config/all').then((res:Response) => {
            context.commit('setConfig', res.data)
        }).catch((err:any) => {
            message.error(err.data)
        })
    },
    /**header */
    saveHeader(context: any, paylod: HeaderType) {
        http.post('/config/setHeader', paylod).then((res:Response) => {
            message.success(res.data)
            context.commit('saveHeader', paylod)
        }).catch((err:any) => {
            message.error(err.data)
        })  
    },
    // ...
};

// index.ts
import Vue from 'vue';
import Vuex from 'vuex';
import { state } from './state';
import mutations from './mutation';
import actions from './action';

Vue.use(Vuex);

export default new Vuex.Store({
  state,
  mutations,
  actions
});

// main.ts
// 最后挂载到入口文件的vue实例上
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/';
import './component-class-hooks';
import './registerServiceWorker';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
```

我们在实际项目中都可以使用这种方式组织管理vuex相关的代码。

#### 1.7 vue-router基本使用模式和导航钩子的用法及作用

vue-router使用大家想必不是很陌生，这里直接写一个案例：

```
// router.ts
import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/admin/Home.vue';

Vue.use(Router);

const router =  new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: Home,
      beforeEnter: (to, from, next) => {
        next();
      },
      children: [
        {
          // 当 /user/:id/profile 匹配成功，
          // UserProfile 会被渲染在 User 的 <router-view> 中
          path: '',
          name: 'header',
          component: () => import(/* webpackChunkName: "header" */ './views/admin/subpage/Header.vue'),
        },

        {
          path: '/banner',
          name: 'banner',
          component: () => import(/* webpackChunkName: "banner" */ './views/admin/subpage/Banner.vue'),
        },
        {
          path: '/admin',
          name: 'admin',
          component: () => import(/* webpackChunkName: "admin" */ './views/admin/Admin.vue'),
        },
      ],
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "login" */ './views/Login.vue'),
      meta:{
        keepAlive:false //不需要被缓存的组件
      }
    },
    {
      path: '*',
      name: '404',
      component: () => import(/* webpackChunkName: "404" */ './views/404.vue'),
    },
  ],
});

// 路由导航钩子的用法
router.beforeEach((to, from, next) => {
  if(from.path.indexOf('/preview') < 0) {
    sessionStorage.setItem('prevToPreviewPath', from.path);
  }
  next();
})

export default router
```

以上案例是很典型的静态路由配置和导航钩子的用法（如何加载路由组件，动态加载路由组件，404页面路由配置，路由导航钩子使用）。如果在做后台系统，往往会涉及到权限系统，所以一般会采用动态配置路由，通过前后端约定的路由方式，路由配置文件更具不同用户的权限由后端处理后返。由于设计细节比较繁琐，涉及到前后端协定，所以这里只讲思路就好了。

#### 1.8 vue中检测变化的注意事项

受现代 JavaScript 的限制，Vue 无法检测到对象属性的添加或删除。由于 Vue 会在初始化实例时对属性执行 getter/setter 转化，所以属性必须在 data 对象上存在才能让 Vue 将它转换为响应式的。还有一种情况是，vue无法检测到data属性值为数组或对象的修改，所以我们需要用原对象与要混合进去的对象的属性一起创建一个新的对象。可以使用this.$set或者对象的深拷贝，如果是数组则可以使用splice，扩展运算符等方法来更新。

#### 1.9 对指定页面使用keep-alive路由缓存

keep-alive是Vue的内置组件，能在组件切换过程中将状态保留在内存中，防止重复渲染DOM。我们可以使用以下方式设置某些页面是否被缓存：

1.  通过路由配置文件和router-view设置：

```
// routes 配置
export default [
  {
    path: '/A',
    name: 'A',
    component: A,
    meta: {
      keepAlive: true // 需要被缓存
    }
  }, {
    path: '/B',
    name: 'B',
    component: B,
    meta: {
      keepAlive: false // 不需要被缓存
    }
  }
]
```

路由视图配置：

```
// 路由设置
<keep-alive>
    <router-view v-if="$route.meta.keepAlive">
        <!-- 会被缓存的视图组件-->
    </router-view>
</keep-alive>

<router-view v-if="!$route.meta.keepAlive">
    <!-- 不需要缓存的视图组件-->
</router-view>
```

2.  通过router-view的key属性 具体方式如下：

```
<template>
  <div id="app">
    <keep-alive>
      <router-view :key="key" />
    </keep-alive>
  </div>
</template>

<script lang="ts">
import { Vue } from 'vue-property-decorator';
import Component from 'vue-class-component';
@Component
export default class App extends Vue {
  get key() {
    // 缓存除预览和登陆页面之外的其他页面
    console.log(this.$route.path)
    if(this.$route.path.indexOf('/preview') > -1) {
      return '0'
    }else if(this.$route.path === '/login') {
      return '1'
    }else {
      return '2'
    }
  }
}
</script>
```

#### 1.10 vue常用工具函数总结

总结一下笔者在vue项目中的常用的工具函数。

-   识别ie浏览器

```
/**
 * 识别ie--浅识别
 */
export const isIe = () => {
    let explorer = window.navigator.userAgent;
        //判断是否为IE浏览器
    if (explorer.indexOf("MSIE") >= 0) {
        return true;
    }else {
        return false
    }
}
```

-   颜色16进制转rgba

```
/**
 * 颜色转换16进制转rgba
 * @param {String} hex 
 * @param {Number} opacity 
 */
export function hex2Rgba(hex, opacity) {
	if(!hex) hex = "#2c4dae";
    return "rgba(" + parseInt("0x" + hex.slice(1, 3)) + "," + parseInt("0x" + hex.slice(3, 5)) + "," + parseInt("0x" + hex.slice(5, 7)) + "," + (opacity || "1") + ")";
}
```

-   去除html标签

```
// 去除html标签
export const htmlSafeStr = (str) => {
    return str.replace(/<[^>]+>/g, "")
}
```

-   获取url参数对象

```
/* 获取url参数 */
export const getQueryString = () => {
    let qs = location.href.split('?')[1] || '',
        args = {},
        items = qs.length ? qs.split("&") : [];
        items.forEach((item,i) => {
            let arr = item.split('='),
                name = decodeURIComponent(arr[0]),
                value = decodeURIComponent(arr[1]);
                name.length && (args[name] = value)
        })
    return args;
}
```

-   解析url参数

```
/* 解析url参数 */
export const paramsToStringify = (params) => {
    if(params){
        let query = [];
        for(let key in params){
            query.push(`${key}=${params[key]}`)
        }
        return `${query.join('&')}`
    }else{
        return ''
    }
}
```

-   将数据转化为数组

```
export const toArray = (data) => {
    return Array.isArray(data) ? data : [data]
}
```

-   带参数跳转url（hash模式）

```
/**
 *  带参数跳转url（hash模式）
 * @param {String} url 
 * @param {Object} params 
 */
export const toPage = (url, params) => {
    if(params){
        let query = [];
        for(let key in params){
            query.push(`${key}=${params[key]}`)
        }
        window.location.href = `./index.html#/${url}?${query.join('&')}`;
    }else{
        window.location.href = `./index.html#/${url}`;
    }
}
```

-   控制字符串显示，超出指定字数则显示省略号

```
/**
 * 指定字符串 溢出显示省略号
 * @param {String} str
 * @param {Number} num
 */
export const getSubStringSum = (str = "", num = 1) => {
    let newStr;
    if(str){
        str = str + '';
        if (str.trim().length > num ) {
            newStr = str.trim().substring(0, num) + "...";
        } else {
            newStr = str.trim();
        }
    }else{
        newStr = ''
    }
    return newStr;
}
```

-   生成uuid

```
/**
 * 生成uuid
 * @param {number} len 生成指定长度的uuid
 * @param {number} radix uuid进制数
 */
export function uuid(len, radix) {
    let chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
    let uuid = [], i;
    radix = radix || chars.length;
 
    if (len) {
      for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random()*radix];
    } else {
      let r;
 
      uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
      uuid[14] = '4';
 
      for (i = 0; i < 36; i++) {
        if (!uuid[i]) {
          r = 0 | Math.random()*16;
          uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
        }
      }
    }
 
    return uuid.join('');
}
```

-   生成指定格式的时间字符串

```
/**
 * 生成指定格式的时间
 * @param {*} timeStemp 时间戳
 * @param {*} flag 格式符号
 */
export function formatTime(timeStemp, flag) {
    let time = new Date(timeStemp);
    let timeArr = [time.getFullYear(), time.getMonth() + 1, time.getDate()];
    return timeArr.join(flag || '/')
}
```

#### 1.11 如何基于axios二次封装一个具有请求/响应拦截的http请求

这个主要是对axios的理解，大家可以学习axios官方文档，这里给出一个二次封装的模版：

```
import axios from 'axios'
import qs from 'qs'

// 请求拦截
axios.interceptors.request.use(config => {
  // 此处可以封装一些加载状态
  return config
}, error => {
  return Promise.reject(error)
})

// 响应拦截
axios.interceptors.response.use(response => {
  return response
}, error => {
  return Promise.resolve(error.response)
})

function checkStatus (response) {
  // 此处可以封装一些加载状态
  // 如果http状态码正常，则直接返回数据
  if(response) {
    if (response.status === 200 || response.status === 304) {
      return response.data
      // 如果不需要除了data之外的数据，可以直接 return response.data
    } else if (response.status === 401) {
      location.href = '/login';
    } else {
      throw response.data
    }
  } else {
    throw {data:'网络错误'}
  }
  
}

// axios默认参数配置
axios.defaults.baseURL = '/api/v0';
axios.defaults.timeout = 10000;

// restful API封装
export default {
  post (url, data) {
    return axios({
      method: 'post',
      url,
      data: qs.stringify(data),
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      }
    }).then(
      (res) => {
        return checkStatus(res)
      }
    )
  },
  get (url, params) {
    return axios({
      method: 'get',
      url,
      params, // get 请求时带的参数
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      }
    }).then(
      (res) => {
        return checkStatus(res)
      }
    )
  },
  del (url, params) {
    return axios({
      method: 'delete',
      url,
      params, // get 请求时带的参数
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      }
    }).then(
      (res) => {
        return checkStatus(res)
      }
    )
  }
}
```

该模版只是一个大致框架，大家可以细化成业务需求的样子，该案例提供了restful接口方法，比如get/post/delete/put等。

#### 1.12 vue常用社区组件，插件

下面整理一下常用的vue社区组件和库。

1.  UI框架

-   [elementUI](https://element.eleme.cn/#/zh-CN/component/quickstart)
-   [arco-design](https://arco.design/)
-   [Vant 有赞团队的移动端组件库](https://youzan.github.io/vant/#/zh-CN/popup)
-   [Ant-design]](https://antdv.com/components/overview)

2.  社区组件

-   [Vuetable-2 基于vue的强大的表格组件](https://www.vuetable.com/guide/#features)
-   [vue-fa 基于vue的图标组件库](https://cweili.github.io/vue-fa/)
-   [vue-notification vue优美的信息通知组件](http://vue-notification.yev.io/)
-   [vue-progress-path vue个性的路径进度条组件](https://akryum.github.io/vue-progress-path/)
-   [Vue树组件，可让您以美观和逻辑的方式呈现层次结构的数据](https://github.com/amsik/liquor-tree)
-   [vue-social-sharing vue社区分享组件](https://nicolasbeauvais.github.io/vue-social-sharing/)
-   [vue-qrcode-reader 一组用于检测和解码二维码的Vue.js组件](https://gruhn.github.io/vue-qrcode-reader/)
-   [vue-clipboard2 基于vue的剪切板组件](https://vue-clipboard2.inndy.tw/)
-   [cool-emoji-picker vue表情包组件](https://kevinfaguiar.github.io/cool-emoji-picker/#home)
-   [Vue-tabs-component 强大而美观的tab组件](http://vue-tabs-component.spatie.be/)

更多组件可以在[vue插件社区](https://github.com/vuejs/awesome-vue)查看。
