// NOTE: 使用这种方式导出，引入的时候没有提示
// export type InputProps = {
//   rounded?: boolean
// }

// export type Test = {
//   name?: string
// }

type InputProps = {
  style?: ReactStyle
  className?: ReactNodeClass
  disabled?: boolean
  rounded?: boolean
}

export { InputProps }
