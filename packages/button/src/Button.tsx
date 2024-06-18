import React from 'react';
import cn from 'classnames';
import { useForkRef } from './utils/ref';
import { PolymorphicProps } from './utils/types';
import Box from './Box';
import { ButtonOwnProps } from './types';

export type ButtonProps<RootComponentType extends React.ElementType = 'button'> = PolymorphicProps<
  ButtonOwnProps,
  RootComponentType
>;

const ForwardButton = function Button<RootComponentType extends React.ElementType>(
  props: ButtonProps<RootComponentType>,
  forwardedRef: React.ForwardedRef<Element>,
) {
  const { children, className, classNames, action, slots = {}, ...rest } = props;
  const rootRef = React.useRef<HTMLElement>(null);
  const ref = useForkRef(rootRef, forwardedRef);
  React.useImperativeHandle(
    action,
    () => ({
      focus: () => {
        if (rootRef.current) {
          rootRef.current.focus();
        }
      },
    }),
    [],
  );

  const { prefix: Prefix, suffix: Suffix, content: Content } = slots;

  return (
    <Box component="button" ref={ref} className={cn(className, classNames.root)} {...rest}>
      <Box component={Prefix || 'span'} />
      <Box component={Content || 'span'}>{children}</Box>
      <Box component={Suffix || 'span'} />
    </Box>
  );
};

export default React.memo(React.forwardRef(ForwardButton)) as React.ForwardRefExoticComponent<ButtonProps>;
