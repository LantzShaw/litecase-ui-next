import type { ReactNode, ReactStyle, ReactNodeClass } from 'react'

type ButtonType = 'default' | 'primary' | 'secondary' | 'link' | 'text'
type ButtonSize = 'mini' | 'small' | 'medium' | 'large'

// type: default primary secondary success wraning info danger dashed link text

// loading

// disabled

type BaseButtonProps = {
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

type PrimaryButtonProps = {} & BaseButtonProps

export { BaseButtonProps, PrimaryButtonProps, ButtonSize, ButtonType }
