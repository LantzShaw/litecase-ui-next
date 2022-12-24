export type ButtonType = 'default' | 'primary' | 'secondary' | 'link' | 'text'
export type ButtonSize = 'small' | 'medium' | 'large'

// wraning info danger disabled loading dashed

export type BaseButtonProps = {
  /** button types */
  type?: ButtonType
  children?: ReactNode
  onClick?: MouseEventHandler<HTMLButtonElement>
  style?: ReactStyle
  className?: ReactNodeClass
  size?: ButtonSize
  rounded?: boolean
  disabled?: boolean
  [propName: string]: any
}

export type PrimaryButtonProps = {} & BaseButtonProps
