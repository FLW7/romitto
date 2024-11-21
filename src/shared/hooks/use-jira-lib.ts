import { useEffect } from 'react';

import { usePathname } from 'next/navigation';

export const useJiraLib = () => {
  const pathname = usePathname();

  useEffect(() => {
    const jira = document.querySelector('jdiv') as HTMLElement;

    if (jira) {
      jira.style.opacity = pathname === '/' || pathname === '/menu' ? '1' : '0';
      jira.style.pointerEvents =
        pathname === '/' || pathname === '/menu' ? 'auto' : 'none';
    }
  }, [pathname]);
};
