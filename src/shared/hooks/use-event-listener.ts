import { useEffect, useRef } from 'react';

type EventCallback = (event: Event) => void;

type UseEventListener = (
  eventType: string,
  callback: EventCallback,
  element?: HTMLElement | Window | Document | EventTarget | null,
) => void;

const useEventListener: UseEventListener = (
  eventType,
  callback,
  element = typeof window === 'undefined' ? null : window,
) => {
  const callbackReference = useRef<EventCallback>(callback);

  useEffect(() => {
    callbackReference.current = callback;
  }, [callback]);

  useEffect(() => {
    if (!element) return;
    const handler = (event: Event) => {
      callbackReference.current(event);
    };

    element.addEventListener(eventType, handler);

    return () => {
      element.removeEventListener(eventType, handler);
    };
  }, [eventType, element]);
};

export default useEventListener;
