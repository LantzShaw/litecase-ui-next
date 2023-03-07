// NOTE: 使用这种方式导出，引入的时候没有提示
// export type InputProps = {
//   rounded?: boolean
// }

// export type Test = {
//   name?: string
// }

export type InputSize = small | medium | large

type InputProps = {
  style?: ReactStyle
  className?: ReactNodeClass
  size?: InputSize
  disabled?: boolean
  rounded?: boolean
} & Record<string, any>

export { InputProps }
