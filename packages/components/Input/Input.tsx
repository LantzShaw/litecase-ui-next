import classNames from 'classnames'
import type { FC, ReactElement } from 'react'

import { createNamespace } from '../../utils/create'

import { InputProps } from './Input.d'

const [bem] = createNamespace('input')

const Input: FC<InputProps> = (props): ReactElement => {
  const { size = 'medium', disabled = false, className, ...rest } = props

  const classes = classNames([bem([size, { disabled }])], className?.split(' '))

  return (
    <>
      <input disabled={disabled} className={classes} type="text" {...rest} />
    </>
  )
}

export default Input
