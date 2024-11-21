import { useState, useEffect } from 'react';

import TopArrow from '@/assets/icons/scroll-top-icon.svg';
import { cn } from '@/shared/lib/utils';

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div
      className={cn(isVisible ? 'opacity-100' : 'pointer-events-none opacity-0')}
      onClick={scrollToTop}
    >
      <TopArrow
        className='cursor-pointer max-lg:h-12 max-lg:w-12'
        width={56}
        height={56}
        color='white'
      />
    </div>
  );
};

export default ScrollToTop;
