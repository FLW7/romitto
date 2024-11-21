/* eslint-disable unicorn/no-nested-ternary */
import Typography from '@/shared/components/typography';
import useMediaQuery from '@/shared/hooks/use-media-query';

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
      className={`ml-1 ${isSub && !isDesktop ? 'h-5' : 'h-9'} cursor-pointer select-none rounded-full ${!isSub || isDesktop ? 'border border-main2 px-5 py-2' : ''}  ${(activeIndex === undefined ? active : Number(id) === Number(activeIndex)) && (!isSub || isDesktop ? 'border-none bg-main2' : '')}`}
      onClick={() => {
        id === undefined && onClick ? onClick() : onClick?.(String(id ?? 0));
      }}
    >
      <Typography
        variant='desc'
        // eslint-disable-next-line prettier/prettier
        className={`flex items-center text-sm font-semibold leading-[19.6px] ${(activeIndex === undefined ? active : Number(id) === Number(activeIndex)) ? (isSub && !isDesktop ? '!text-main2' : '!text-white') : isSub && !isDesktop ? '!text-secondary' : '!text-main2'}`}
      >
        {text}
      </Typography>
    </div>
  );
};

export default MobileCategoryButton;
