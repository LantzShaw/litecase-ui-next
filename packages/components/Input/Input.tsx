import type { FC, ReactElement } from 'react';

export interface InputProps {}

const Input: FC<InputProps> = (props): ReactElement => {
  return (
    <>
      <input type="text" />
    </>
  );
};

export default Input;
