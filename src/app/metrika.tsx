'use client';

import React, { useCallback, useEffect } from 'react';

import Router from 'next/router';
import ym, { YMInitializer } from 'react-yandex-metrika';

interface Props {
  enabled: boolean;
  ymIds: number[];
}

const YandexMetrikaContainer: React.FC<Props> = ({ enabled, ymIds }) => {
  const hit = useCallback(
    (url: string) => {
      if (enabled) {
        ym('hit', url);
      } else {
        console.log(`%c[YandexMetrika](HIT)`, `color: orange`, url);
      }
    },
    [enabled],
  );

  useEffect(() => {
    hit(window.location.pathname + window.location.search);
    Router.events.on('routeChangeComplete', (url: string) => {
      hit(url);
    });
  }, [hit]);

  if (!enabled) return null;

  return (
    <YMInitializer
      accounts={ymIds}
      options={{
        defer: true,
        webvisor: true,
        clickmap: true,
        trackLinks: true,
        accurateTrackBounce: true,
      }}
      version='2'
    />
  );
};

export default YandexMetrikaContainer;
