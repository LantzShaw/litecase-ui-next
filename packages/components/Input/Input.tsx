import classNames from 'classnames'
import type { FC, ReactElement } from 'react'

import { InputProps } from './Input.d'

import { LC_PREFIX } from '../../constants/classNamePrefix'

const Input: FC<InputProps> = (props): ReactElement => {
  const { disabled, className, ...rest } = props

  const classes = classNames([`${LC_PREFIX}-input`], className?.split(' '))

  return (
    <>
      <input disabled={disabled} className={classes} type="text" {...rest} />
    </>
  )
}

export default Input
