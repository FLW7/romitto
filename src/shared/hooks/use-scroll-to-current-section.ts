import { useEffect } from 'react';

import { useSearchParams } from 'next/navigation';

export const useScrollToCurrentSection = () => {
  const searchParams = useSearchParams();

  const id = searchParams.get('id');

  useEffect(() => {
    if (id) {
      const element = document.querySelector(
        `[data-category-id="${id}"]`,
      ) as HTMLDivElement;

      const offset = element?.offsetTop || 0;

      window.scrollTo({
        behavior: 'smooth',
        top: offset - 100,
      });
    }
  }, [id]);
};
