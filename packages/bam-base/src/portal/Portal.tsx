import React from 'react';
import { createPortal } from 'react-dom';

const PortalName = 'Portal';

interface PortalProps extends Partial<React.PropsWithChildren> {
  container?: HTMLElement | null;
}

const Portal = React.forwardRef<HTMLDivElement, PortalProps>((props, portalRef) => {
  const { children, container: containerProps, ...restPortalProps } = props;
  const [mounted, setMounted] = React.useState(false);

  // Make sure the portal is mounted after the first render
  React.useLayoutEffect(() => setMounted(true), []);

  const container = containerProps || (mounted && window?.document?.body);

  return container
    ? createPortal(
        <div {...restPortalProps} ref={portalRef}>
          {children}
        </div>,
        container,
      )
    : null;
});

Portal.displayName = PortalName;

export default Portal;
export type { PortalProps };
