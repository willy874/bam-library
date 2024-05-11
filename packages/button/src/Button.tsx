import React from 'react';
import classNames from 'classnames';

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  token?: any;
  css?: any;
}

function Button(props: ButtonProps) {
  const { css, children, className, ...rest } = props;
  if (css) {
    return (
      <button
        {...rest}
        className={classNames(
          className,
          css({
            cursor: 'pointer',
          }),
        )}
      >
        {children}
      </button>
    );
  }
  return (
    <button className={classNames(className)} {...rest}>
      {children}
    </button>
  );
}

export default Button;
