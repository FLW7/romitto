import { useEffect, useState } from 'react';

import { ChevronDown } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';

import { scrollToSection } from '../../lib/scroll-to-section';

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/shared/components/hover-card';
import Typography from '@/shared/components/typography';
import { cn } from '@/shared/lib/utils';
import { useActiveCategory } from '@/shared/state/active-category';
import { type ICategory } from '@/widgets/wrapper-menu/types';

interface IOtherCategoriesProps {
  categories: ICategory[];
}

const OtherCategories: React.FC<IOtherCategoriesProps> = ({ categories }) => {
  const pathname = usePathname();
  const router = useRouter();
  const { activeCategory } = useActiveCategory();
  const [activeName, setActiveName] = useState('');

  useEffect(() => {
    setActiveName(
      categories.find((item) => Number(item.id) === Number(activeCategory))?.name ?? '',
    );
  }, [activeCategory]);

  return (
    <HoverCard openDelay={0} closeDelay={500}>
      <HoverCardTrigger>
        <Typography
          variant='desc'
          className={cn(
            'flex cursor-pointer items-center gap-2 whitespace-nowrap pl-0 text-base font-semibold leading-[17px] text-primary duration-100 hover:text-main',
            activeName && '!text-main',
          )}
        >
          {activeName || 'Ещё'}
          <ChevronDown size={14} />
        </Typography>
      </HoverCardTrigger>
      <HoverCardContent
        sideOffset={-30}
        align='start'
        className='cursor-pointer border-none bg-none p-0 pt-10 shadow-none'
      >
        <div className='flex w-fit flex-col gap-4 rounded-[22px] border-none bg-white px-6 py-5 shadow-categoriesHoverShadow'>
          {categories?.map((item) => {
            return (
              <div
                key={item.id}
                className={cn(
                  'cursor-pointer whitespace-nowrap text-base font-semibold leading-[17px] text-primary duration-100 hover:text-main',
                  Number(activeCategory) === Number(item.id) &&
                    pathname === '/' &&
                    '!text-main',
                )}
                onClick={() => {
                  // isCloseSearch && onClose?.();
                  if (pathname === '/') {
                    scrollToSection(String(item.id));
                  } else {
                    router.push('/');
                    sessionStorage.setItem('cat', String(item.id));
                  }
                }}
              >
                {item.name}
              </div>
            );
          })}
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

export default OtherCategories;
