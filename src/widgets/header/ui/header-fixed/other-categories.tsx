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
            'flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap bg-categoryButton px-categoryX py-categoryY text-base font-semibold leading-[17px] !text-categoryButtonText duration-100 hover:!text-categoryButtonTextActive',
            activeName && 'bg-categoryButtonActive !text-categoryButtonTextActive',
          )}
        >
          {activeName || 'Ещё'}
          <ChevronDown size={14} />
        </Typography>
      </HoverCardTrigger>
      <HoverCardContent
        sideOffset={10}
        align='start'
        className='flex w-fit flex-col gap-4 rounded-3xl border-none bg-bgSecondary px-6 py-5 shadow-categoriesHoverShadow'
      >
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
      </HoverCardContent>
    </HoverCard>
  );
};

export default OtherCategories;
