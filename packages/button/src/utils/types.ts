import React from 'react';

export type PolymorphicProps<Props extends object, Component extends React.ElementType> = Props &
  Omit<React.ComponentPropsWithRef<Component>, keyof Props>;

export interface BaseProps {
  ref?: (instance: Element | null) => void;
}
