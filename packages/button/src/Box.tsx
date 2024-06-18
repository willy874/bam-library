import React from 'react';
import { useForkRef } from './utils/ref';
import { PolymorphicProps } from './utils/types';

interface BoxOwnProps {
  component?: React.ElementType;
}

type ButtonProps<RootComponentType extends React.ElementType = 'div'> = PolymorphicProps<
  BoxOwnProps,
  RootComponentType
>;

const ForwardBox = React.forwardRef(function Box<RootComponentType extends React.ElementType>(
  props: ButtonProps<RootComponentType>,
  forwardedRef: React.ForwardedRef<Element>,
) {
  const { children, className, component = 'div', slots, ...rest } = props;

  const Root = slots.root || component;

  const rootRef = React.useRef<HTMLElement>(null);
  const ref = useForkRef(rootRef, forwardedRef);

  return (
    <Root ref={ref} className={className} {...rest}>
      {children}
    </Root>
  );
});

export default ForwardBox as React.ForwardRefExoticComponent<ButtonProps>;
