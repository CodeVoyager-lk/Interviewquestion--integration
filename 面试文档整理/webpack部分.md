
# webpack面试题

1. 有哪些常见的Loader？他们是解决什么问题的？

~~~
sass-loader：将SCSS/SASS代码转换成CSS
postcss-loader：扩展 CSS 语法，使用下一代 CSS，可以配合 autoprefixer 插件自动补齐 CSS3 前缀，加上兼容的浏览器厂商前缀

css-loader：处理样式之间互相引用的逻辑, 加载 CSS，支持模块化、压缩、文件导入等特性
style-loader：将 css-loader 解析后的内容挂载到 html 页面当中
file-loader：可以指定要复制和放置资源文件的位置，以及使用版本哈希命名以获得更好的缓存，在代码中通过相对 URL 去引用输出的文件 (处理图片和字体)。
url-loader：与 file-loader 类似，区别是用户可以设置一个阈值，大于阈值会交给 file-loader 处理，小于阈值时返回文件 base64 形式编码，减少HTTP请求

image-loader：加载并且压缩图片文件
source-map-loader：加载额外的 Source Map 文件，以方便断点调试
json-loader 加载 JSON 文件（默认包含）
babel-loader：把 ES6 转换成 ES5
ts-loader: 将 TypeScript 转换成 JavaScript
tslint-loader：通过 TSLint检查 TypeScript 代码
eslint-loader：通过 ESLint 检查 JavaScript 代码
mocha-loader：加载 Mocha 测试用例的代码
coverjs-loader：计算测试的覆盖率
vue-loader：将 Vue 组件转换为 JavaScript 模块
i18n-loader: 国际化
awesome-typescript-loader：将 TypeScript 转换成 JavaScript，性能优于 ts-loader

~~~

2. 有哪些常见的Plugin？他们是解决什么问题的？

~~~
html-webpack-plugin：在 dist 下生成 html 文件。简化 HTML 文件创建 (依赖于 html-loader)
clean-webpack-plugin: 目录清理。把 dist 删除再生成打包结果
copy-webpack-plugin 因为 public 文件下的资源是固定的，直接拷贝到编译后的文件夹引入使用就可以，例如 favicon.ico

open-browser-webpack-plugin 启动webpack之后，自动打开浏览器
mini-css-extract-plugin: 分离样式文件，CSS 提取为独立文件，支持按需加载
webpack-parallel-uglify-plugin: 多进程执行代码压缩，提升构建速度
HappyPack Plugin: 开启多进程打包，提升打包速度
webpack-bundle-analyzer: 可视化 Webpack 输出文件的体积 (业务组件、依赖第三方模块)
Dllplugin: 动态链接库，将项目中依赖的三方模块抽离出来，单独打包
DllReferencePlugin: 配合 Dllplugin，通过 manifest.json 映射到相关的依赖上去
vue-skeleton-webpack-plugin: vue 项目实现骨架屏
~~~

3. 如何利用webpack来优化前端性能？（提高性能和体验）

~~~~
用webpack优化前端性能是指优化webpack的输出结果，让打包的最终结果在浏览器运行快速高效。

压缩代码。删除多余的代码、注释、简化代码的写法等等方式。可以利用webpack的UglifyJsPlugin和ParallelUglifyPlugin来压缩JS文件， 利用cssnano（css-loader?minimize）来压缩css

利用CDN加速。在构建过程中，将引用的静态资源路径修改为CDN上对应的路径。可以利用webpack对于output参数和各loader的publicPath参数来修改资源路径

删除死代码（Tree Shaking）。将代码中永远不会走到的片段删除掉。可以通过在启动webpack时追加参数--optimize-minimize来实现提取公共代码。

~~~~

4. 如何提高webpack的构建速度？

~~~
多入口情况下，使用CommonsChunkPlugin来提取公共代码

通过externals配置来提取常用库

利用DllPlugin和DllReferencePlugin预编译资源模块 通过DllPlugin来对那些我们引用但是绝对不会修改的npm包来进行预编译，再通过DllReferencePlugin将预编译的模块加载进来。

使用Happypack 实现多线程加速编译

使用webpack-uglify-parallel来提升uglifyPlugin的压缩速度。 原理上webpack-uglify-parallel采用了多核并行压缩来提升压缩速度

使用Tree-shaking和Scope Hoisting来剔除多余代码

~~~

5. webpack中loader和plugin分别是什么？

~~~
loader：是一个转换器，将A文件进行编译形成B文件，在此操作的是文件，比如将A.scss装欢成A.css，loader是一个单纯的文件转换过程。
 plugin：是一个扩展器，丰富了webpack本身，针对的是loader结束后，webpack打包的整个过程，plugin扩展器不直接操作文件，而是基于事件机制工作，会监听webpack打包过程中的某些节点，执行广泛的任务。
~~~

6. source map是什么？生产环境怎么用？

~~~
source map是将编译、打包、压缩后的代码映射回源代码的过程。打包压缩后的代码不具备良好的可读性，想要调试源码就需要 soucre map。

map文件只要不打开开发者工具，浏览器是不会加载的。

线上环境一般有三种处理方案：

hidden-source-map：借助第三方错误监控平台 Sentry 使用

nosources-source-map：只会显示具体行数以及查看源代码的错误栈。安全性比 sourcemap 高

sourcemap：通过 nginx 设置将 .map 文件只对白名单开放(公司内网)

注意：避免在生产中使用inline-和eval-，因为它们会增加 bundle 体积大小，并降低整体性能。

~~~

7. 模块打包原理知道吗？

~~~
Webpack 实际上为每个模块创造了一个可以导出和导入的环境，本质上并没有修改 代码的执行逻辑，代码执行顺序与模块加载顺序也完全一致。
~~~

8. 如何对bundle体积进行监控和分析？

~~~、
VSCode中有一个插件Import Cost可以帮助我们对引入模块的大小进行实时监测，还可以使用webpack-bundle-analyzer生成bundle的模块组成图，显示所占体积。

bundlesize工具包可以进行自动化资源体积监控。

~~~

9. 是否写过Loader？简单描述一下编写loader的思路？

~~~
Loader 支持链式调用，所以开发上需要严格遵循“单一职责”，每个 Loader 只负责自己需要负责的事情。

Loader 运行在 Node.js 中，我们可以调用任意 Node.js 自带的 API 或者安装第三方模块进行调用

Webpack 传给 Loader 的原内容都是 UTF-8 格式编码的字符串，当某些场景下 Loader 处理二进制文件时，需要通过 exports.raw = true 告诉 Webpack 该 Loader 是否需要二进制数据

尽可能的异步化 Loader，如果计算量很小，同步也可以

Loader 是无状态的，我们不应该在 Loader 中保留状态

使用 loader-utils 和 schema-utils 为我们提供的实用工具

加载本地 Loader 方法

Npm link

ResolveLoader

~~~

10. 说一下 webpack 的热更新原理吧

~~~
1.启动开发服务器：在开发模式下，Webpack 会启动一个开发服务器，用于监听文件变化和接收来自浏览器的请求。

2.构建初始包：当开发服务器启动时，Webpack 会根据配置文件进行初始的打包构建，生成初始的资源文件。

3.HMR runtime 注入：在初始包中，Webpack 会通过特殊的 JavaScript 代码，将 HMR runtime 注入到客户端的代码中。这段代码负责与开发服务器建立 WebSocket 连接，接收来自开发服务器的更新通知，并触发相应的模块替换操作。

4.监听文件变化：开发服务器会监听项目文件的变化，当有文件发生变化时，会触发相应的编译和构建操作。

5.模块热替换：在编译和构建过程中，Webpack 会对每个模块进行标记，以确定哪些模块支持热替换。当一个模块发生变化时，Webpack 会将更新的模块代码发送给客户端的 HMR runtime。

6.客户端更新：HMR runtime 接收到更新的模块代码后，会通过热替换的机制将新的模块代码应用到页面上。这个过程中，HMR runtime 会尽力保留页面的状态，并尽量不重新渲染整个页面，而只更新需要替换的模块。

7.应用更新后的模块：在模块替换完成后，如果开发者在代码中定义了相应的回调函数，Webpack 还会调用这些回调函数，以便进行一些额外的操作，如重新渲染组件或执行其他业务逻辑。
~~~

11. 如何保证众多Loader按照想要的顺序执行？

~~~
可以通过enforce来强制控制Loader的执行顺序 （pre 表示在所有正常的loader执行之前执行，post则表示在之后执行）
~~~

12. 什么是文件指纹？文件指纹有什么作用？怎么用？

~~~
文件指纹是指文件打包后的一连串后缀

作用：
- 版本管理：  在发布版本时，通过文件指纹来区分 修改的文件 和 未修改的文件。
- 使用缓存：  浏览器通过文件指纹是否改变来决定使用缓存文件还是请求新文件。

种类：
- Hash：和整个项目的构建相关，只要项目有修改（compilation实例改变），Hash就会更新
- Contenthash：和文件的内容有关，只有内容发生改变时才会修改
- Chunkhash：和webpack构架的chunk有关 不同的entry会构建出不同的chunk （不同 ChunkHash之间的变化互不影响）

如何使用：
- JS文件：使用Chunkhash
- CSS文件：使用Contenthash
- 图片等静态资源： 使用hash
~~~

13. webpack 的打包流程

~~~js
1、初始化阶段 - webpack

合并配置项
创建 compiler
注册插件

2、编译阶段 - build

读取入口文件
从入口文件开始进行编译
调用 loader 对源代码进行转换
借助 babel 解析为 AST 收集依赖模块
递归对依赖模块进行编译操作

3、生成阶段 - seal

创建 chunk 对象
生成 assets 对象

4、写入阶段 - emit

~~~

14. webpack 和 vite 的区别

~~~
1.打包原理：Webpack 是基于静态依赖分析的打包工具，需要在配置文件中明确指定入口文件和输出文件，并通过 loader 和 plugin 对各种类型的文件进行处理。Vite 则采用了基于 ES 模块的编译原理，利用浏览器原生支持的 ES 模块功能，在开发阶段通过服务器动态编译和分发模块，而不需要事先打包成一个或多个文件。

2.构建速度：Webpack 在打包大型项目时的构建速度相对较慢，尤其是在第一次打包时需要分析所有的代码和依赖关系，耗时比较长。Vite 则在开发阶段具有非常快的启动速度，因为它无需打包整个应用，而是根据需要动态编译和分发模块。

3.开发体验：由于 Vite 的开发模式采用了基于浏览器原生支持的 ES 模块的编译原理，因此在开发阶段可以享受到类似于写原生 ES 模块化代码的体验，无需使用额外的构建工具或语法转换工具。同时，Vite 还提供了一些方便的开发辅助功能，如自动刷新、热模块替换等。

4.配置方式：Webpack 的配置文件比较复杂，需要掌握一定的知识和经验才能进行配置，而且不同的版本之间的配置方式也有所不同。Vite 的配置相对简单，而且由于采用了现代化的开发模式，因此可以省略掉一些繁琐的配置项。
~~~

15. 文件监听原理

~~~
Webpack开启监听模式，有两种方式：

启动 webpack 命令时，带上 --watch 参数
在配置 webpack.config.js 中设置 watch:true

原理：轮询判断文件的最后编辑时间是否变化，如果某个文件发生了变化，并不会立刻告诉监听者，而是先缓存起来，等 aggregateTimeout 后再执行。
~~~

16. SCSS文件在webpack中的编译打包过程是怎么样的？

~~~
加载scss：sass-loader在js文件中根据模块化规则找到scss文件
编译scss：sass编译器将scss编译为css
css-loader解析：根据css-loader对css文件进行加载并解析其中的@import和url()
style-loader工作：将css样式插入html文件中

~~~

17. Webpack 中的 Resolve 配置项是干什么用的？

~~~
Resolve 配置项用于配置模块解析的规则，包括模块的搜索路径、文件后缀名等。通过配置 Resolve，可以简化模块引入时的路径和文件后缀的书写，提高开发效率
~~~

18. Webpack 和 Babel 有什么关系？它们之间的区别是什么？

~~~
Webpack 和 Babel 是两个不同的工具，但通常会一起使用。

Webpack 是一个模块打包工具，用于分析应用程序的依赖关系，将所有的文件打包成一个或多个 bundle。

Babel 是一个 JavaScript 编译器，用于将新版本的 JavaScript 代码转换为向后兼容的旧版本，以确保代码在各种浏览器和环境中能够正常运行。

Webpack 可以通过 Loader 配置使用 Babel，将 Babel 作为一个 Loader，用于对 JavaScript 文件进行转换。这样可以在打包过程中，将 ES6+ 的代码转换为 ES5 语法，以适应更多的浏览器和环境。
~~~

19. Webpack 如何实现代码分割（Code Splitting）？有哪些常用的方式？

~~~
Webpack 实现代码分割的方式有以下几种：

1.使用入口起点（entry point）进行分割：通过配置多个入口起点，将不同的模块分割到不同的 bundle 中。
2.使用动态导入（Dynamic Import）：在代码中使用 import() 动态导入模块，在运行时根据需要进行模块加载。
3.使用 SplitChunks 插件：通过配置 optimization.splitChunks，将公共的模块抽离出来，形成单独的 chunk。
~~~

20. 什么是 Tree-shaking？如何在 Webpack 中使用它？

~~~
Tree-shaking 是指通过静态分析技术，将项目中未被引用的代码自动剔除，以减少打包后的文件体积。在 Webpack 中使用 Tree-shaking 需要做以下几个步骤：

确保使用 ES6 模块语法进行代码编写。
在 Webpack 配置文件中设置 mode 为 'production'。
确保使用的是支持 Tree-shaking 的工具链，如使用 Babel 时，需要配置 babel-preset-env 并启用 modules: false。
~~~

21. 如何指定 vite 插件 的执行顺序？

~~~
可以使用 enforce 修饰符来强制插件的位置:

pre：在 Vite 核心插件之前调用该插件
post：在 Vite 构建插件之后调用该插件
~~~

22. Vite是否支持 commonjs 写法？

~~~
纯业务代码，一般建议采用 ESM 写法。如果引入的三方组件或者三方库采用了 CJS 写法，vite 在预构建的时候就会将 CJS 模块转化为 ESM 模块。
~~~

23. 为什么说 vite 比 webpack 要快

~~~
1.vite 不需要做全量的打包
2.vite 在解析模块依赖关系时，利用了 esbuild，更快（esbuild 使用 Go 编写，并且比以 JavaScript 编写的打包器预构建依赖快 10-100 倍）
3.按需加载：在HMR（热更新）方面，当改动了一个模块后，vite 仅需让浏览器重新请求该模块即可，不像 webpack 那样需要把该模块的相关依赖模块全部编译一次，效率更高。
4.由于现代浏览器本身就支持 ES Module，会自动向依赖的Module发出请求。vite充分利用这一点，将开发环境下的模块文件，就作为浏览器要执行的文件，而不是像 webpack 那样进行打包合并。
5.按需编译：当浏览器请求某个模块时，再根据需要对模块内容进行编译，这种按需动态编译的方式，极大的缩减了编译时间。
6.webpack 是先打包再启动开发服务器，vite 是直接启动开发服务器，然后按需编译依赖文件。由于 vite在启动的时候不需要打包，也就意味着不需要分析模块的依赖、不需要编译，因此启动速度非常快。

~~~

24. vite 对比 webpack ，优缺点在哪？

~~~
优点:
更快的冷启动： Vite 借助了浏览器对 ESM 规范的支持，采取了与 Webpack 完全不同的 unbundle 机制
更快的热更新： Vite 采用 unbundle 机制，所以 dev server 在监听到文件发生变化以后，只需要通过 ws 连接通知浏览器去重新加载变化的文件，剩下的工作就交给浏览器去做了。
缺点:
开发环境下首屏加载变慢：由于 unbundle 机制， Vite 首屏期间需要额外做其它工作。不过首屏性能差只发生在 dev server 启动以后第一次加载页面时发生。之后再 reload 页面时，首屏性能会好很多。原因是 dev server 会将之前已经完成转换的内容缓存起来
开发环境下懒加载变慢：由于 unbundle 机制，动态加载的文件，需要做 resolve 、 load 、 transform 、 parse 操作，并且还有大量的 http 请求，导致懒加载性能也受到影响。
webpack支持的更广：由于 Vite 基于ES Module，所以代码中不可以使用CommonJs；webpack更多的关注兼容性, 而 Vite 关注浏览器端的开发体验。

~~~

25. Vite如何提高开发效率？

~~~
Vite通过快速的模块热更新和快速的构建速度来提高开发效率。它使用浏览器原生的ES模块化，无需打包，即可实现快速热更新。
~~~

26. Vite如何实现快速热更新？

~~~
Vite通过WebSocket与服务端建立连接，监听文件变化，并实时更新浏览器中的模块。同时，使用了浏览器缓存，避免了重复请求，提高了热更新的速度。
~~~

27. Vite如何使用插件？

~~~
Vite可以通过插件机制扩展功能。插件可以是JavaScript函数或一个返回JavaScript函数的对象。Vite的配置文件中可以通过plugin选项来添加插件。
~~~

28. Vite的开发服务器是如何工作的？

~~~
Vite的开发服务器使用了Koa框架和WebSocket技术。当启动开发服务器后，Vite会监听文件变化并通知客户端进行模块的重新加载，同时也会处理HTTP请求并返回构建结果。
~~~

29. Vite是否支持代码分割和懒加载？

~~~
是的，Vite支持代码分割和懒加载。通过动态导入语法（Dynamic Import），可以将代码分割成多个模块，并在需要时进行懒加载，从而减小初始加载的文件大小。
~~~

30. Vite是否支持自定义路由？

~~~
Vite本身并不提供路由功能，但可以配合第三方的路由库来实现自定义路由。常见的选择包括Vue Router、React Router等。
~~~

31. Vite的主要优势是什么？

~~~
Vite的主要优势有：
快速的冷启动和热更新速度
基于浏览器原生ES模块化，无需打包
支持快速的开发体验和即时反馈
灵活的插件机制，可扩展性强
对于大型项目，可以通过预构建（Pre-Building）来进一步提升构建速度
~~~

32. Grunt和Gulp之间有何区别？

~~~
Grunt和Gulp都是前端构建工具，但它们的工作原理和使用方式有所不同。Grunt使用配置文件来定义任务，而Gulp使用代码来定义任务。Gulp基于流（Stream）的方式实现任务，并且在性能方面更具优势。

~~~

33. Grunt的主要特点是什么？

~~~
Grunt的主要特点包括：

可以执行各种前端构建和自动化任务，如压缩、合并、编译等
丰富的插件生态系统，可以轻松扩展功能
灵活的配置文件，可以根据项目需求进行定制
支持多个任务的并行执行
良好的社区支持和文档资源
~~~

34. Grunt的插件是什么？如何使用插件？

~~~
Grunt的插件是用于执行特定任务的JavaScript模块。可以通过npm安装插件，并在Gruntfile.js文件中进行配置和加载。
~~~

35. Grunt的任务是如何定义和执行的？

~~~
Grunt的任务定义和执行通常在Gruntfile.js文件中进行。在文件中配置任务和插件的选项，然后使用grunt命令来执行指定的任务。
~~~

36. Grunt如何处理文件的压缩和合并？

~~~
Grunt通过使用特定的插件，如grunt-contrib-uglify和grunt-contrib-concat，来实现文件的压缩和合并。在Gruntfile.js文件中配置这些插件，并指定相应的任务选项即可。
~~~

37. Grunt的watch任务是用来做什么的？

~~~
watch任务用于监视文件的变化，并在文件发生变化时自动执行指定的任务。这对于实时编译、刷新浏览器等开发过程中的自动化操作非常有用。
~~~

38. 如何在Grunt中配置多个任务并行执行？

~~~
在Grunt的配置中，可以使用grunt.concurrent方法将多个任务进行并行执行。通过配置并行任务，可以提高构建过程的效率。
~~~

39. Grunt应该在什么时候使用？

~~~
Grunt适用于需要进行重复性任务的前端项目，如文件合并、压缩、编译等。当需要自动化这些任务，并减少手动操作时，可以考虑使用Grunt。
~~~

40. 前端主流的打包工具

~~~
Webpack、vite、Rollup、Gulp和Grunt等。
~~~





### 打包优化

#### 多线程构建

- 使用HappyPack或thread-loader插件将任务分配给多个线程进行并行处理

#### 缓存管理

- 使用hash或chunkhash命名输出文件，以便在文件内容发生变化时生成新的文件名。
- 使用webpack的cache选项启用持久化缓存。

### 项目优化

#### 按需加载

- 使用import()或动态导入的方式引入模块，实现按需加载。
- 使用webpack的代码分割功能进行模块拆分。

#### 资源压缩

- 使用url-loader或file-loader来处理图片，并设置合适的limit参数，将小图片转换为base64编码，减少http请求次数。
- 使用image-webpack-loader或imagemin等插件压缩图片

#### 减小打包体积

- 使用Tree Shaking来消除未使用的代码。
- 压缩和混淆JavaScript代码。
- 通过使用CSS预处理器（如Sass或Less）来减少CSS文件的大小。



