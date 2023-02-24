import './styles/index.less'

export { default as Button } from './Button'

export type { BaseButtonProps, PrimaryButtonProps } from './Button.d'

// import Button from './Button'

// export type { BaseButtonProps, PrimaryButtonProps } from './Button.d'

// NOTE: 使用这种方式 就只能这么来引入 import Button from '' 而不是 import { Button } from ''
// export default Button
