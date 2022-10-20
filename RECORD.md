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
$ git push origin --tags
```

```sh
rollup --config rollup.config.js

or

rollup -c rollup.config.js
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
};
```

`rollup.config.js`

```js
import typescript from '@rollup/plugin-typescript';

// ES6转ES5
import babel from '@rollup/plugin-babel';

// 将非ES6语法转换为ES6可用
import commonjs from '@rollup/plugin-commonjs';

// 帮助寻找node_modules里的包
import { nodeResolve } from '@rollup/plugin-node-resolve';

/**
 * 压缩代码
 *
 * rollup-plugin-terser基于terser
 *
 * 基于uglifyjs的rollup-plugin-uglify  这个也是压缩用的
 *
 * terser用的多
 */
import { terser } from 'rollup-plugin-terser';

import path from 'path';
import { existsSync } from 'fs';

function resolveNestedImport(packageFolder, importee) {
  console.log('----------', importee, packageFolder);

  const folder = importee.split('/')[2];

  console.log('---folder:', folder);

  const resolvedFilename = path.resolve(__dirname, `${packageFolder}/${folder}/index`);

  console.log('-----resolvedFilename-----', resolvedFilename);

  const resolvedTs = `${resolvedFilename}.ts`;

  if (existsSync(resolvedTs)) {
    return resolvedTs;
  }

  return `${resolvedFilename}.js`;
}

const nestedFolder = {
  resolveId: (importee) => {
    console.log('---------importee: ', importee, resolveNestedImport('components', importee));

    return resolveNestedImport('components', importee);

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

    return undefined;
  },
};

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
};
```

`rollup.config.js`参考

```js
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import externals from 'rollup-plugin-node-externals';
import del from 'rollup-plugin-delete';
import pkg from './package.json';

export default [
  {
    input: './src/index.ts',
    plugins: [
      // Delete existing build files.
      del({ targets: 'dist/*' }),
      // Leave out third-party dependencies (listed under `package.json`'s `dependencies` option) from the bundled outputs. For example, this library hosts components written with React. We can assume that developers using this library will already have React imported in their applications. And so, why include React in the bundled output and add unnecessary bloat?
      externals({ deps: true }),
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
    ],
    output: [
      { file: pkg.main, format: 'cjs' },
      { file: pkg.module, format: 'es' },
    ],
  },
];
```

### Questions

1. 由于在 packge.json 中设置了`"type": "module"`, 这时你需要将`rollup.config.js` 修改为 `rollup.config.mjs`, 否则打包会报错
