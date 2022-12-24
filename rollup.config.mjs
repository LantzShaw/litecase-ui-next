// import typescript from '@rollup/plugin-typescript';
import typescript from 'rollup-plugin-typescript2'
import dts from 'rollup-plugin-dts'
import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import { terser } from 'rollup-plugin-terser'
import externals from 'rollup-plugin-node-externals'
import strip from '@rollup/plugin-strip'
import postcss from 'rollup-plugin-postcss'
import autoprefixer from 'autoprefixer'
import cssnano from 'cssnano'
import del from 'rollup-plugin-delete'

// 去除注释等无效代码
// import awesome from 'rollup-plugin-awesome';
// import cleanup from 'rollup-plugin-cleanup';

import pkg from './package.json' assert { type: 'json' }

const globals = {
  react: 'React',
  'react-dom': 'ReactDOM',
}

export default {
  input: './packages/index.ts', // 入口文件
  output: [
    {
      // TODO: 打包 umd 可能不要externals 与 globals
      file: 'dist/umd/litecase-ui.min.js', // NOTE: 当设置 preserveModules 为 时，不能再设置 file 了
      // dir: 'dist/umd',
      format: 'umd',
      exports: 'named', // 指定导出模式（自动、默认、命名、无）
      name: pkg.name,
      sourcemap: false,
      // preserveModules: false, // umd不支持拆分
      preserveModulesRoot: 'packages', // 将保留的模块放在根级别的此路径下
      // globals,
    },
    {
      dir: 'dist/es',
      // file: 'dist/types.d.ts', // 当设置 preserveModules 为 时，不能再设置 file 了
      format: 'es',
      name: pkg.name,
      exports: 'named', // 指定导出模式（自动、默认、命名、无）
      sourcemap: false,
      preserveModules: true, // 保留原始模块结构
      preserveModulesRoot: 'packages', // 将保留的模块放在根级别的此路径下
      // globals,
    },
    {
      dir: 'dist/lib',
      format: 'cjs',
      name: pkg.name,
      exports: 'named', // 指定导出模式（自动、默认、命名、无）
      sourcemap: false,
      preserveModules: true, // 保留原始模块结构
      preserveModulesRoot: 'packages', // 将保留的模块放在根级别的此路径下
      // globals,
    },
  ],
  // external: Object.keys(globals),
  plugins: [
    // ts支持，以及导出类型声明文件
    typescript({
      // 设置为 true 则会走ts.config.json 中 declarationDir 配置的路径，如果单独想将 .d.ts文件输出一个目录下，可以使用此属性
      // useTsconfigDeclarationDir: true,
      // outDir: './types/index.d.ts',
      // declarationDir: './types/index.d.ts',
    }),
    // 处理外部依赖
    nodeResolve(),
    // 支持基于 CommonJS 模块方式 npm 包
    commonjs(),
    // 压缩代码
    terser(),
    // 自动将dependencies依赖声明为 externals
    externals({
      deps: true,
      devDeps: false,
    }),
    // 打包产物清除调试代码, 从代码中删除 debugger 语句和函数。包括 assert.equal、console.log 等等
    // TODO: 这个插件好像有问题，打包的时候，不能将console.log()移除
    strip(),
    // 默认集成了对 scss、less、stylus 的支持
    postcss({
      // modules: true,
      plugins: [
        autoprefixer(), // css 加前缀
        // cssnano(), // TODO: css压缩 打包less时不能使用 不然会使用时候会报错
      ],
      extract: 'styles/index.less', // 抽离单独的 css 文件
    }),
    // 删除 dist 中构建的产物
    del({ targets: 'dist/*' }),
    // dts(),
    babel({
      babelHelpers: 'bundled', // runtime or bundled
      exclude: '**/node_modules/**',
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    }),
  ],
}
