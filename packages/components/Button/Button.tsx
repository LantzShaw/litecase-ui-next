import type { FC, ReactElement, MouseEventHandler, ReactNode } from 'react';

export interface BaseButtonProps {
  type?: 'primary' | 'secondary' | 'default';
  children?: ReactNode;
}

export type PrimaryButtonProps = {
  onClick?: () => MouseEventHandler<HTMLButtonElement>;
} & BaseButtonProps;

const Button: FC<PrimaryButtonProps> = (props): ReactElement => {
  const { type = 'default', ...rest } = props;

  return (
    <>
      <button>{props.children}</button>
    </>
  );
};

export default Button;
