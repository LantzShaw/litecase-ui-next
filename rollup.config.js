export default {
  input: './src/main.js',
  output: {
    file: './dist/bundle.js',
    format: 'cjs', // 输出格式 amd es6 iife umd cjs
    name: 'bundleName', // 如果iife,umd需要指定一个全局变量
  },
}
