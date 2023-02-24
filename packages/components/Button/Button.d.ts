export type ButtonType = 'default' | 'primary' | 'secondary' | 'link' | 'text'
export type ButtonSize = 'small' | 'medium' | 'large'

// wraning info danger disabled loading dashed

export type BaseButtonProps = {
  /** button types */
  type?: ButtonType

  /** button child node */
  children?: ReactNode

  /** button click event */
  onClick?: MouseEventHandler<HTMLButtonElement>

  /** inline style */
  style?: ReactStyle

  /** class name */
  className?: ReactNodeClass

  /** button size */
  size?: ButtonSize

  /** button round  */
  rounded?: boolean

  /** button disabled */
  disabled?: boolean

  // [propName: string]: any
} & Record<string, any>

export type PrimaryButtonProps = {} & BaseButtonProps
