/* eslint-disable unicorn/no-nested-ternary */
import Typography from '@/shared/components/typography';
import useMediaQuery from '@/shared/hooks/use-media-query';
import { cn } from '@/shared/lib/utils';

const MobileCategoryButton: React.FC<{
  text: string;
  id?: string;
  activeIndex?: number;
  active?: boolean;
  onClick?: (id?: string) => void;
  isSub?: boolean;
}> = ({ text, id, activeIndex, onClick, active = false, isSub = false }) => {
  const isDesktop = useMediaQuery('(min-width:768px)');

  return (
    <div
      className={cn(
        `ml-1 cursor-pointer select-none rounded-full`,
        isSub && !isDesktop ? 'h-5' : 'h-9',
        !isSub || isDesktop
          ? 'border border-categoryButton  bg-categoryButton max-lg:border-categoryBorderMobile max-lg:bg-categoryBgMobile  max-lg:px-5 max-lg:py-2'
          : '',
        (activeIndex === undefined ? active : Number(id) === Number(activeIndex)) &&
          (!isSub || isDesktop
            ? 'border-none bg-gradient-to-l from-categoryButtonActive to-categoryButtonActive max-lg:from-categoryBgMobileActive max-lg:to-categoryBgMobileActive'
            : ''),
      )}
      onClick={() => {
        id === undefined && onClick ? onClick() : onClick?.(String(id ?? 0));
      }}
    >
      <Typography
        variant='desc'
        // eslint-disable-next-line prettier/prettier
        className={cn(
          `flex items-center text-sm font-semibold leading-[19.6px]`,
          (activeIndex === undefined ? active : Number(id) === Number(activeIndex))
            ? isSub && !isDesktop
              ? '!text-categoryButtonText max-lg:!text-categoryMobileText'
              : '!text-categoryButtonTextActive max-lg:!text-categoryTextMobileActive'
            : isSub && !isDesktop
              ? '!text-categoryButtonText max-lg:!text-secondary'
              : '!text-categoryButtonTextActive max-lg:!text-categoryMobileText',
        )}
      >
        {text}
      </Typography>
    </div>
  );
};

export default MobileCategoryButton;
