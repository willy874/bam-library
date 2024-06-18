import React from 'react';
import { BaseProps } from './utils/types';

interface ButtonActions {
  focus(): void;
}

interface ButtonRootProps extends BaseProps, React.HTMLAttributes<HTMLButtonElement> {}

export interface ButtonSlotProps {
  content: React.HTMLAttributes<HTMLSpanElement>;
  prefix: React.HTMLAttributes<HTMLSpanElement>;
  suffix: React.HTMLAttributes<HTMLSpanElement>;
}

export interface ButtonOwnProps extends ButtonRootProps {
  slots?: {
    [K in keyof ButtonSlotProps]?: React.FC<ButtonSlotProps[K]>;
  };
  slotProps?: Partial<ButtonSlotProps>;
  action?: React.MutableRefObject<ButtonActions | null>;
}
