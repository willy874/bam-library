import { useJsonMemo } from '@/utils/memo';
import { css } from '@styled/css';
import React from 'react';

const defaultButtonToken = {
  backgroundColor: '',
  hoverBackgroundColor: '',
};

export type ButtonToken = typeof defaultButtonToken;

export const useClassNames = (value: Partial<ButtonToken> = defaultButtonToken) => {
  const token = useJsonMemo(value);
  return React.useMemo(
    () => ({
      root: css?.({
        '&:where': {
          cursor: 'pointer',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0.5rem 1rem',
          borderRadius: '0.25rem',
          border: '1px solid',
          borderColor: 'transparent',
          backgroundColor: token.backgroundColor,
          '&:hover': {
            backgroundColor: token.hoverBackgroundColor,
          },
        },
      }),
      content: css?.({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }),
      prefix: css?.({
        marginRight: '0.5rem',
      }),
      suffix: css?.({
        marginLeft: '0.5rem',
      }),
    }),
    [token],
  );
};
