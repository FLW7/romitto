import { useState, useEffect } from 'react';

import useEventListener from './use-event-listener';

type MediaQueryHook = (mediaQuery: string) => boolean;

const useMediaQuery: MediaQueryHook = (mediaQuery) => {
  const [isMatch, setIsMatch] = useState(false);
  const [mediaQueryList, setMediaQueryList] = useState<MediaQueryList | null>();

  useEffect(() => {
    const list = window.matchMedia(mediaQuery);

    setMediaQueryList(list);
    setIsMatch(list.matches);
  }, [mediaQuery]);

  useEventListener(
    'change',
    (event: Event) => {
      if (event instanceof MediaQueryListEvent) {
        setIsMatch(event.matches);
      }
    },
    mediaQueryList,
  );

  return isMatch;
};

export default useMediaQuery;
