import type React from 'react';
import { useEffect, useState } from 'react';

import ReactDOM from 'react-dom';

interface PortalProps {
  children: React.ReactNode;
  id?: string;
  container?: HTMLElement | null;
}

const Portal: React.FC<PortalProps> = ({ children, container: containerProp, id }) => {
  const [el, setEl] = useState<HTMLElement | null>(null);
  let container = containerProp;

  useEffect(() => {
    if (!container) {
      container = document.body;
    }

    const newEl = document.createElement('div');

    newEl.setAttribute('style', 'position: fixed; z-index: 9999; pointer-events: auto;');
    newEl.id = id ?? 'portal';

    container?.append(newEl);

    setEl(newEl);

    return () => {
      newEl.remove();
    };
  }, [container]);

  if (!el) {
    return null;
  }

  return ReactDOM.createPortal(children, el);
};

export default Portal;
