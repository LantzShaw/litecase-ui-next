import type { FC, ReactElement } from 'react'
import classnames from 'classnames'

import type { PrimaryButtonProps } from './Button.d'

const Button: FC<PrimaryButtonProps> = (props): ReactElement => {
  const {
    type = 'default',
    size = 'medium',
    rounded = false,
    disabled = false,
    className,
    children,
    ...rest
  } = props

  const LC_PREFIX = 'lc'

  const classes = classnames([`${LC_PREFIX}-button`], className?.split(' '), {
    [`${LC_PREFIX}-button__default`]: type === 'default',
    [`${LC_PREFIX}-button__primary`]: type === 'primary',
    [`${LC_PREFIX}-button__size--small`]: size === 'small',
    [`${LC_PREFIX}-button__size--medium`]: size === 'medium',
    [`${LC_PREFIX}-button__size--large`]: size === 'large',
    [`${LC_PREFIX}-button__round`]: rounded,
    [`${LC_PREFIX}-button__disabled`]: disabled,
  })

  return (
    <>
      <button disabled={disabled} className={classes} {...rest}>
        {children}
      </button>
    </>
  )
}

export default Button
