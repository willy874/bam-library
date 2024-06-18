import { Button as BaseButton } from '@bam/button';
import React from 'react';
import type { ButtonProps as BaseButtonProps } from '@bam/button';
import { ButtonToken, useClassNames } from './styles';
import { useForkRef } from '@/utils/ref';
import { useDeepMemo } from '@/utils/memo';
import { merge } from '@/utils/merge';

export interface ButtonProps extends BaseButtonProps {
  token?: ButtonToken;
}

const ForwardButton = function Button(props: ButtonProps, forwardedRef: React.ForwardedRef<Element>) {
  const { token = {}, slotProps = {}, ...rest } = props;
  const classNames = useClassNames(token);
  const memoSlotProps = useDeepMemo(slotProps);
  const mergeSlotProps = React.useMemo(() => {
    const { content: cnContent, prefix: cnPrefix, suffix: cnSuffix } = classNames;
    return merge(memoSlotProps, {
      content: {
        className: cnContent,
      },
      prefix: {
        className: cnPrefix,
      },
      suffix: {
        className: cnSuffix,
      },
    });
  }, [classNames, memoSlotProps]);
  const ref = useForkRef(forwardedRef);

  return <BaseButton ref={ref} slotProps={mergeSlotProps} {...rest} />;
};

export default React.memo(React.forwardRef(ForwardButton));
