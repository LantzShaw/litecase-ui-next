# Record

```sh
# 查看所有的tag
$ git tag

# -a (annotated：带注解的 ，首字母) -> 标签名字
# -m (msg) -> 标签说明
$ git tag -a v0.0.0-beta.1 -m 'v0.0.0-beta.1'

# git show [tag名称]
$ git show v0.0.0-beta.1

# 推送指定标签
$ git push origin v0.0.0-beta.1

# 推送所有的tag
$ git push origin master --tags
```

## Deployment

Choose your new version number
Set it in `package.json` and `bower.json`
Create a tag: `git tag [version]`
Push the tag: `git push --tags`
Create a release in GitHub
Run the publish to npm workflow
Done.

**添加 all-contributors**

```sh
# 参考文章: https://juejin.cn/post/6844903949883949063

all-contributors-cli

init 是初始化项目contributors

yarn all-contributors init
# Or
npm run all-contributors init
# Or directly execute the bin
./node_modules/.bin/all-contributors init



generate 是更新contributors

add 新增contributor

# Add new contributor <username>, who made a contribution of type <contribution>
all-contributors add <username> <contribution>

# Example:
# all-contributors add jfmengels code,doc

# generate table
yarn all-contributors generate
```

```sh
rollup --config rollup.config.js

or

rollup -c rollup.config.js

# rollup -c指的默认执行根目录下的rollup.config.js
```

rollup 打包需要的依赖

```sh
# babel
$ pnpm add @babel/core @babel/preset-env @babel/preset-react @babel/preset-typescript @babel/plugin-transform-runtime -D

# rollup
$ pnpm add @rollup/plugin-babel @rollup/plugin-typescript  -D


# @rollup/plugin-commonjs tslib可能需要
```

`.babelrc.js`

```js
// .babelrc.js
module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: '>0.2%, not dead, not op_mini all',
      },
    ],
    '@babel/preset-react',
    '@babel/preset-typescript',
  ],
  //   plugins: [['@babel/plugin-transform-runtime', { useESModules: true }]], // NOTE: 配置该项,roullup打包将报错
}
```

`rollup.config.js`

rollup 支持的打包文件的格式有 amd, cjs, es\esm, iife, umd。其中，amd 为 AMD 标准，cjs 为 CommonJS 标准，esm\es 为 ES 模块标准，iife 为立即调用函数， umd 同时支持 amd、cjs 和 iife.[参考文章](https://juejin.cn/post/7145090564801691684)

```js
import typescript from '@rollup/plugin-typescript'

// 类型声明文件（需要单独输出）
import dts from 'rollup-plugin-dts'

// ES6转ES5
import babel from '@rollup/plugin-babel'

// 将非ES6语法转换为ES6可用
import commonjs from '@rollup/plugin-commonjs'

// esm 帮助寻找node_modules里的包
import { nodeResolve } from '@rollup/plugin-node-resolve'

/**
 * 压缩代码
 *
 * rollup-plugin-terser基于terser
 *
 * 基于uglifyjs的rollup-plugin-uglify  这个也是压缩用的
 *
 * terser用的多
 */
import { terser } from 'rollup-plugin-terser'

import path from 'path'
import { existsSync } from 'fs'

function resolveNestedImport(packageFolder, importee) {
  console.log('----------', importee, packageFolder)

  const folder = importee.split('/')[2]

  console.log('---folder:', folder)

  const resolvedFilename = path.resolve(
    __dirname,
    `${packageFolder}/${folder}/index`
  )

  console.log('-----resolvedFilename-----', resolvedFilename)

  const resolvedTs = `${resolvedFilename}.ts`

  if (existsSync(resolvedTs)) {
    return resolvedTs
  }

  return `${resolvedFilename}.js`
}

const nestedFolder = {
  resolveId: (importee) => {
    console.log(
      '---------importee: ',
      importee,
      resolveNestedImport('components', importee)
    )

    return resolveNestedImport('components', importee)

    // if (importee.indexOf('@mui/base/') === 0) {
    //   return resolveNestedImport('mui-base', importee);
    // }

    // if (importee.indexOf('@mui/private-theming/') === 0) {
    //   return resolveNestedImport('mui-private-theming', importee);
    // }

    // if (importee.indexOf('@mui/styled-engine/') === 0) {
    //   return resolveNestedImport('mui-styled-engine', importee);
    // }

    // if (importee.indexOf('@mui/system/') === 0) {
    //   return resolveNestedImport('mui-system', importee);
    // }

    return undefined
  },
}

export default {
  input: './packages/index.ts', // 精确到index.ts
  output: {
    file: './dist/bundle.js',
    /**
     * 输出格式 amd es iife umd cjs
     *
     * umd 输出UMD格式，各种模块规范通用
     */
    format: 'cjs',
    /**
     * 如果iife,umd需要指定一个全局变量，打包后的全局变量，如浏览器端 window.LitecaseUI
     */
    name: 'LitecaseUI',
    // plugins: [['@babel/plugin-transform-runtime', { useESModules: true }]],
    globals: {
      // 与external结合使用
      react: 'React',
      'react-dom': 'ReactDOM',
    },
  },
  external: ['react', 'react-dom'], // 告诉rollup, react、react-dom不打包，将其视为外部依赖
  plugins: [
    typescript(),
    nodeResolve(),
    terser(),
    commonjs(), // 将Commonjs 模块转换成es模块
    // nestedFolder,
    // NOTE: babelrc.js中的配置, 也可以在这里配置
    babel({
      babelHelpers: 'bundled',
      exclude: '**/node_modules/**',
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      // presets: [
      //   [
      //     '@babel/preset-env',
      //     {
      //       targets: '>0.2%, not dead, not op_mini all',
      //     },
      //   ],
      //   '@babel/preset-react',
      //   '@babel/preset-typescript',
      // ],
      // plugins: [['@babel/plugin-transform-runtime', { useESModules: true }]],
    }),
  ],
}
```

`rollup.config.js`参考

1. 配置参考文章:
   https://juejin.cn/post/7145090564801691684
2. 项目参考:
   https://github.com/jiaozitang/react-masonry-component2/blob/dev/rollup.config.js
3. https://juejin.cn/post/6847902221733101575

4. 最佳实践参考: https://github.com/willson-wang/Blog/issues/99

```js
// 打包输出文件保留原始模块结构
// 自动将 dependencies 依赖声明为 externals
// 支持处理外部 npm 依赖
// 支持基于 CommonJS 模块引入
// 支持 typescript，并导出声明文件
// 支持 scss，并添加前缀
// 支持自动清除调试代码
// 支持按需加载

// rollup 支持输出格式为 es 模块化，就会按模块输出。

// 所以我们上面的配置已经实现了按需加载了。

// 去除注释等无效代码
import awesome from 'rollup-plugin-awesome'
import cleanup from 'rollup-plugin-cleanup'

import { nodeResolve } from '@rollup/plugin-node-resolve'
// rollup.js 编译源码中的模块引用默认只支持 ES6+的模块方式 import/export。然而大量的 npm 模块是基于 CommonJS 模块方式，这就导致了大量 npm 模块不能直接编译使用。
// 需要添加 @rollup/plugin-commonjs 插件来支持基于 CommonJS 模块方式 npm 包。
import commonjs from '@rollup/plugin-commonjs'
import babel from '@rollup/plugin-babel'
// 每个类库都要手动添加至 externals 未免太麻烦，这时候可以用 rollup-plugin-node-externals 插件，自动将外部类库声明为 externals。
import externals from 'rollup-plugin-node-externals'
import del from 'rollup-plugin-delete'
// rollup-plugin-postcss 默认集成了对 scss、less、stylus 的支持。
import postcss from 'rollup-plugin-postcss'
// css加前缀
import autoprefixer from 'autoprefixer'
// css 压缩
import cssnano from 'cssnano'

// 支持Ts 文件
import typescript from '@rollup/plugin-typescript'

// 打包产物清除调试代码
// 用于从代码中删除 debugger 语句和函数。包括 assert.equal、console.log 等等
import strip from '@rollup/plugin-strip'

import pkg from './package.json'

export default [
  {
    input: './src/index.ts',
    output: {
      dir: path.dirname('dist/bundle.js'),
      format: 'es',
      exports: 'named', // 指定导出模式（自动、默认、命名、无）
      preserveModules: true, // 保留模块结构 打包输出文件保留原始模块结构
      preserveModulesRoot: 'src', // 将保留的模块放在根级别的此路径下
    },

    plugins: [
      // Delete existing build files.
      del({ targets: 'dist/*' }),
      // Leave out third-party dependencies (listed under `package.json`'s `dependencies` option) from the bundled outputs. For example, this library hosts components written with React. We can assume that developers using this library will already have React imported in their applications. And so, why include React in the bundled output and add unnecessary bloat?
      externals({
        deps: true,
        devDeps: false, // devDependencies 类型的依赖就不用加到 externals 了。
      }),
      // Find third-party modules within `node_modules` with any one of the following file extensions: `.js`, `.ts` and `.tsx`.
      nodeResolve({
        extensions: ['.js', '.ts', '.tsx'],
      }),
      // Convert CommonJS modules into ES modules.
      commonjs(),
      // Compile the library's code into a format that is consumable by a wider set of browsers. The library's code lives inside `.js`, `.jsx`, `.ts` and `.tsx` files. Do not compile any files from `node_modules`. The `runtime` helper makes Babel's injected helper code reusable for all modules, which greatly reduces bundle size.
      babel({
        babelHelpers: 'runtime',
        exclude: '**/node_modules/**',
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      }),

      postcss({
        plugins: [autoprefixer(), cssnano()],
        extract: 'css/index.css', // 抽离单独的 css 文件
      }),

      typescript({
        // 导出类型声明文件
        outDir: 'dist',
        declaration: true,
        declarationDir: 'dist',
      }),

      strip(),
    ],
    output: [
      { file: pkg.main, format: 'cjs' },
      { file: pkg.module, format: 'es' },
    ],
  },
]
```

```javascript
// 参考链接:  https://juejin.cn/post/6847902221733101575

// Rollup plugins
// babel插件用于处理es6代码的转换，使转换出来的代码可以用于不支持es6的环境使用
import babel from 'rollup-plugin-babel'
// resolve将我们编写的源码与依赖的第三方库进行合并
import resolve from 'rollup-plugin-node-resolve'
// 解决rollup.js无法识别CommonJS模块
import commonjs from 'rollup-plugin-commonjs'
// 全局替换变量比如process.env
import replace from 'rollup-plugin-replace'
// 使rollup可以使用postCss处理样式文件less、css等
import postcss from 'rollup-plugin-postcss'
// 可以处理组件中import图片的方式，将图片转换成base64格式，但会增加打包体积，适用于小图标
import image from '@rollup/plugin-image'
// 压缩打包代码（这里弃用因为该插件不能识别es的语法，所以采用terser替代）
// import { uglify } from 'rollup-plugin-uglify';
// 压缩打包代码
import { terser } from 'rollup-plugin-terser'
// import less from 'rollup-plugin-less';
// PostCSS plugins
// 处理css定义的变量
import simplevars from 'postcss-simple-vars'
// 处理less嵌套样式写法
import nested from 'postcss-nested'
// 可以提前适用最新css特性（已废弃由postcss-preset-env替代，但还是引用进来了。。。）
// import cssnext from 'postcss-cssnext';
// 替代cssnext
import postcssPresetEnv from 'postcss-preset-env'
// css代码压缩
import cssnano from 'cssnano'

const env = process.env.NODE_ENV

export default {
  // 入口文件我这里在components下统一导出所有自定义的组件
  input: 'src/components/index.js',
  // 输出文件夹，可以是个数组输出不同格式（umd,cjs,es...）通过env是否是生产环境打包来决定文件命名是否是.min
  output: [
    {
      file: `dist/dna-ui-react-umd${env === 'production' ? '.min' : ''}.js`,
      format: 'umd',
      name: 'geneUI',
    },
    {
      file: `dist/dna-ui-react-es${env === 'production' ? '.min' : ''}.js`,
      format: 'es',
    },
  ],
  // 注入全局变量比如jQuery的$这里只是尝试 并未启用
  // globals: {
  //   react: 'React',                                         // 这跟external 是配套使用的，指明global.React即是外部依赖react
  //   antd: 'antd'
  // },
  // 自定义警告事件，这里由于会报THIS_IS_UNDEFINED警告，这里手动过滤掉
  onwarn: function (warning) {
    if (warning.code === 'THIS_IS_UNDEFINED') {
      return
    }
  },
  // 将模块视为外部模块，不会打包在库中
  external: ['antd', '@ant-design/icons', 'react', 'prop-types', 'gojs'],
  // 插件
  plugins: [
    image(),
    postcss({
      plugins: [
        simplevars(),
        nested(),
        // cssnext({ warnForDuplicates: false, }),
        postcssPresetEnv(),
        cssnano(),
      ],
      // 处理.css和.less文件
      extensions: ['.css', 'less'],
    }),
    resolve(),
    // babel处理不包含node_modules文件的所有js
    babel({
      exclude: '**/node_modules/**',
      runtimeHelpers: true,
      plugins: ['@babel/plugin-external-helpers'],
    }),
    // 这里有些引入使用某个库的api但报未导出改api通过namedExports来手动导出
    commonjs({
      namedExports: {
        'node_modules/react-is/index.js': ['isFragment'],
        'node_modules/react/index.js': [
          'Fragment',
          'cloneElement',
          'isValidElement',
          'Children',
          'createContext',
          'Component',
          'useRef',
          'useImperativeHandle',
          'forwardRef',
          'useState',
          'useEffect',
          'useMemo',
        ],
        'node_modules/react-dom/index.js': [
          'render',
          'unmountComponentAtNode',
          'findDOMNode',
        ],
        'node_modules/gojs/release/go.js': [
          'Diagram',
          'GraphLinksModel',
          'Overview',
          'Spot',
        ],
      },
    }),
    // 全局替换NODE_ENV，exclude表示不包含某些文件夹下的文件
    replace({
      // exclude: 'node_modules/**',
      'process.env.NODE_ENV': JSON.stringify(env || 'development'),
    }),
    // 生产环境执行terser压缩代码
    env === 'production' && terser(),
  ],
}
```

### Questions

1. 由于在 packge.json 中设置了`"type": "module"`, 这时你需要将`rollup.config.js` 修改为 `rollup.config.mjs`, 否则打包会报错

2. `rollup.config.dev.js` or `rollup.config.prod.js`

### Reference

1. [rollup 打包 TypeScript 库，输出 js 文件+类型声明文件](https://blog.csdn.net/OldDreamHYN/article/details/110090563)

2. [rollup 使用教程](https://juejin.cn/post/6956501799327137828)

3. 需要通过`rollup`启动项目，可以另外配置一项开发环境 `rollup.config.dev.js`, 配置如下:

```js
// rollup.config.dev.js
import postcss from 'rollup-plugin-postcss';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';

export default {
  input: './src/main.ts',
  output: {
    file: './dist/bundle.ts',
    format: 'cjs',
    name: 'LitecaseUI',
    sourcemap: true, // 开发环境下可以开启，方便调试
  },

  plugins: [
    postcss(),
    livereload(),
    serve({
      open: true,
      contentBase: 'dist',
    }),
  ],
};

// package.json
{
  ...rest,
   "scripts": {
    "build": "rollup --config",
    "dev": "rollup --config -w"
  },
}
```

4. 为什么是 rollup 而不是 webpack 呢？
   rollup 的特色是 ES6 模块和代码 Tree-shaking，这些 webpack 同样支持，除此之外 webpack 还支持热模块替换、代码分割、静态资源导入等更多功能。
   当开发应用时当然优先选择的是 webpack，但是若你项目只需要打包出一个简单的 bundle 包，并是基于 ES6 模块开发的，可以考虑使用 rollup。
   rollup 相比 webpack，它更少的功能和更简单的 api，是我们在打包类库时选择它的原因。

5. 使用 `@rollup/plugin-typescript`

打包报错:

```sh
[!] (plugin typescript) RollupError: @rollup/plugin-typescript: Path of Typescript compiler option 'outDir' must be l
ocated inside Rollup 'dir' option.
```

解决方法:

```sh
改用: rollup-plugin-typescript2
```

6. `rollup.config.mjs` 中为什么不能直接`import pkg from 'package.json';`

```sh
# 而要改成:
import pkg from './package.json' assert { type: 'json' };

# 也可以 安装 @rollup/plugin-json 没试过 ，不知道可不可行


```

7. BEM 规范参考
   https://juejin.cn/post/6844903672162304013

8. 修改`:root`变量

```js
document.documentElement.style.setProperty(
  '--lc-default-background-color',
  '#f40'
)
```

9. css 可以使用 cssnano 压缩 , less 可以压缩嘛

```sh
rollup-plugin-less 也可以处理样式 但不知道能不能压缩.less
```

10. rollup 打包会生成\_virtual、node_modules（使用了第三方库后会生成），可以删除嘛（可以 删除后不会报错） 如何删除

```sh
会生成node_modules 文件是因为将项目依赖的第三方模块放在了devDependencies中了
只需要将它移到dependencies中就可以了

至于 `_vitual/_tslib.js` 暂时不清楚 可能是`rollup-plugin-typescript2`的问题

# 参考文章:
# https://github.com/ezolenko/rollup-plugin-typescript2/issues/282
# https://github.com/ezolenko/rollup-plugin-typescript2/issues/240

打包的umd不会出现这个`_vitual/_tslib.js`文件

```

11. `package.json` 文件中 `publishConfig`

```sh
# 参考文章: https://blog.csdn.net/weixin_38384296/article/details/116403848

# .npmrc文件中配置

# 配置仓库认证信息，用于私有仓库读取或上传npm包：
always-auth=true
_auth="用户名:密码"的base64编码


# 配置_authToken配置认证信息
_authToken=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx

# 配置当通过https向注册中心发出请求时，不进行SSL密钥验证（一般不推荐，不安全）：
strict-ssl=false


# package.json
"publishConfig": {
    "registry": "要发布的私有仓库地址，然后在.npmrc配置用户名密码"
}

```

12. 使用 `verdaccio/verdaccio` 搭建私有仓库 npm 包

```sh
# windows
# 参考文章: https://blog.csdn.net/crper/article/details/106806297
# 参考文章: https://blog.csdn.net/crazy_jialin/article/details/109206070

verdaccio 的配置文件在 `C:\Users\think\AppData\Roaming\verdaccio`


# 参考文章: https://zhuanlan.zhihu.com/p/134603457
# docker 下载镜像
docker pull verdaccio/verdaccio

# docker运行名为verdaccio的服务，端口号为4873
docker run -it --name verdaccio -p 4873:4873 verdaccio/verdaccio


#【解决】阿里云云服务器启动nginx，无法通过ip访问80端口
# https://www.yuque.com/u548790/attention/woggz8
# 考虑是 安全组 80端口是否开放

# 使用curl命令在服务器内请求页面
curl http:localhost:80




如果你第一次在这个仓库发布npm包，请在发布前做如下几个操作：

输入登录命令；
npm adduser --registry http://your_ip:4873
// 后续需要填写自己的相关信息
// 填完回车就可以
发布；
npm publish --registry http://your_ip:4873
刷新页面，就可以看到你刚发布的npm包了。


# nrm 的基本使用
nrm是一个npm仓库管理器，方便在不同的仓库之间切换，来去自如。
比如，我们要下载私有仓库的内容，我们就需要把仓库地址，修改为对应的私有仓库，nrm可以让我快速切换。


nrm大致使用如下，点击进一步了解请点击：npm - nrm

// 全局安装
npm install -g nrm
 // 查看所有的仓库
nrm ls
// 切换仓库
nrm use cnpm
// 添加仓库
nrm add <name> <address>


全局安装nrm；npm install -g nrm
nrm中加入我们的私有仓库；（第一次使用时添加即可）nrm add test http://ip:4873/

切换npm源为私有仓库；nrm use test

下载我们需要的npm包。
npm i [包名]

```

### Others

some rollup plugins

```sh
rollup-plugin-postcss

rollup-plugin-serve

rollup-plugin-livereload
```
